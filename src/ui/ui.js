import Task from '../modules/task'
import List from '../modules/lists'
import Storage from '../utilities/storage'
import { generateId } from '../modules/generateId'
import {
  isToday,
  isTomorrow,
  isYesterday,
  isPast,
  formatDistanceToNow,
  format
} from 'date-fns'

export default class UI {
  static selectedList
  static initialize () {
    this.cacheDOMElements()
    this.eventListeners()
    this.render()
  }

  static cacheDOMElements () {
    this.addListButton = document.querySelector('[data-add-list-btn]')
    this.addListForm = document.querySelector('[data-list-form]')
    this.plusButton = document.querySelector('[data-plus-btn]')
    this.listsContainer = document.querySelector('[data-my-lists]')
    this.taskFormContainer = document.querySelector(
      '[data-task-form-container]'
    )
    this.addTaskButton = document.querySelector('[data-add-task-btn]')
    this.closeFormButton = document.querySelector('[data-close-form-btn]')

    this.submitTaskButton = document.querySelector('[data-submit-task-btn]')
    this.taskCardTemplate = document.querySelector('[data-task-card-template]')
    this.tasksContainer = document.querySelector('[data-tasks-list-container]')

    this.dashboardButton = document.querySelector('[data-dashboard-btn]')
    this.todayButton = document.querySelector('[data-today-btn]')
    this.upcomingButton = document.querySelector('[data-upcoming-btn]')
    /* this.calendarButton = document.querySelector('[data-cal-btn]') */
    this.tasksListHeader = document.querySelector('[data-list-name]')
    this.currentDateTextElement = document.querySelector('[data-current-date]')
  }

  static eventListeners () {
    this.plusButton.addEventListener('click', () => {
      this.toggleNewListForm()
    })

    this.addListButton.addEventListener('click', event => {
      this.addNewList(event)
    })

    this.listsContainer.addEventListener('click', event => {
      if (event.target.tagName.toLowerCase() === 'li') {
        this.activeList(event)
      }

      if (event.target.closest('button')) {
        this.deleteList(event)
      }
    })

    this.closeFormButton.addEventListener('click', () => {
      this.hideNewTaskForm()
    })

    this.addTaskButton.addEventListener('click', () => {
      this.displayNewTaskForm()
    })

    this.submitTaskButton.addEventListener('click', event => {
      this.createNewTask(event)
    })

    this.tasksContainer.addEventListener('click', event => {
      if (event.target.closest('button')) {
        this.deleteTask(event)
      }
      if (event.target.tagName.toLowerCase() === 'input') {
        this.toggleTaskStatus(event)
      }
    })

    this.dashboardButton.addEventListener('click', () => {
      this.renderAllTasks()
    })

    this.todayButton.addEventListener('click', () => {
      this.renderTodayTasks()
    })

    this.upcomingButton.addEventListener('click', () => {
      this.renderUpcomingTasks()
    })

    /* this.calendarButton.addEventListener('click', () => {
      this.tasksListHeader.textContent = 'calendar: '
    }) */
  }

  static getCurrentDate () {
    const date = new Date()

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let fullDate = `${year}-${month}-${day}`
    return format(fullDate, 'dd MMM yyyy')
  }

  static render () {
    this.currentDateTextElement.textContent = this.getCurrentDate()
    this.clearElement(this.listsContainer)
    this.renderLists()
    this.renderListsOption()
    this.renderAllTasks()
  }

  static renderActiveNavButton (activeButton) {
    const navButtons = document.querySelectorAll('.nav-btn')

    navButtons.forEach(button => {
      if (button.id === activeButton) {
        button.classList.add('active-btn')
      } else {
        button.classList.remove('active-btn')
      }
    })
  }

  static toggleNewListForm () {
    this.addListForm.classList.toggle('hidden')
  }

  static addNewList (event) {
    event.preventDefault()
    const newListInput = document.querySelector('[data-add-list-input]')
    let inputValue = newListInput.value
    if (!inputValue || inputValue == null) return

    const newList = new List(inputValue)
    /* newList.addTask = newList.addTask.toString() */
    newListInput.value = null
    Storage.addList(newList)
    this.render()
  }

  static activeList (event) {
    let selectedListId = event.target.dataset.listId
    this.selectedList = selectedListId
    this.render()
    this.renderActiveListTasks(selectedListId)
  }

  static renderActiveListTasks (listId) {
    const lists = Storage.loadLists()

    this.tasksContainer.innerHTML = ''
    lists.forEach(list => {
      if (list.id === listId) {
        this.tasksListHeader.textContent = `${list.listName}`
        list.tasks.forEach(task => {
          this.createTaskCard(task)
        })
      }
    })
  }

  static renderTodayTasks () {
    const lists = Storage.loadLists()

    this.tasksContainer.innerHTML = ''
    this.tasksListHeader.textContent = `Today's tasks:`
    lists.forEach(list => {
      list.tasks.forEach(task => {
        if (this.formatDueDate(task.dueDate) === 'Today') {
          this.createTaskCard(task)
        }
      })
    })
  }

  static renderUpcomingTasks () {
    const lists = Storage.loadLists()

    this.tasksContainer.innerHTML = ''
    this.tasksListHeader.textContent = `Upcoming tasks:`
    lists.forEach(list => {
      list.tasks.forEach(task => {
        if (!isPast(task.dueDate)) {
          this.createTaskCard(task)
        }
      })
    })
  }

  static deleteList (event) {
    let removeListId = event.target.closest('li').dataset.listId
    Storage.removeList(removeListId)
    this.render()
  }

  static hideNewTaskForm () {
    this.taskFormContainer.classList.add('hidden')
  }

  static displayNewTaskForm () {
    this.taskFormContainer.classList.remove('hidden')
  }

  static deleteTask (event) {
    let selectedTaskId = event.target.closest('li').dataset.taskId
    let parentListId = event.target.closest('li').dataset.parentId
    Storage.removeTaskFromList(selectedTaskId, parentListId)
    this.renderTasks()
  }

  static toggleTaskStatus (event) {
    let selectedTaskId = event.target.closest('li').dataset.taskId
    let parentListId = event.target.closest('li').dataset.parentId
    Storage.toggleTaskStatus(selectedTaskId, parentListId)
    this.renderTasks()
  }

  static createNewTask (event) {
    event.preventDefault()
    const form = document.querySelector('[data-task-form]')
    const taskNameInput = document.querySelector('[data-task-name-input]').value
    const taskDescriptionInput = document.querySelector(
      '[data-task-desc-input]'
    ).value
    const taskPriorityInput = document.querySelectorAll(
      'input[name="priority"]'
    )
    const taskDueDateInput = document.querySelector(
      '[data-due-date-input]'
    ).value
    const taskParentListInput = document.querySelector(
      '[data-parent-list-input]'
    ).value

    let taskPriorityValue = ''

    taskPriorityInput.forEach(el => {
      if (el.checked) {
        taskPriorityValue = el.value
      }
    })

    if (!taskNameInput || !taskPriorityValue || !taskDueDateInput) return
    let parentListId = this.getParentListId(taskParentListInput)
    const newTask = new Task(
      generateId(),
      taskNameInput,
      taskDescriptionInput,
      taskDueDateInput,
      taskPriorityValue,
      parentListId
    )

    Storage.addTaskToList(newTask, parentListId)
    this.renderTasks()

    form.reset()
    this.hideNewTaskForm()
  }

  static renderTasks () {
    if (this.selectedList === undefined) {
      this.renderAllTasks()
    } else {
      this.renderActiveListTasks(this.selectedList)
    }
  }

  static getParentListId (listName) {
    const lists = Storage.loadLists()
    let listId
    lists.forEach(list => {
      if (list.listName === listName) {
        listId = list.id
      }
    })
    return listId
  }

  static renderLists () {
    let lists = Storage.loadLists()
    lists.forEach(list => {
      const li = document.createElement('li')
      li.dataset.listId = list.id
      li.classList.add('flex')
      if (list.id === '1xx') {
        li.textContent = list.listName
      } else {
        li.innerHTML = `${list.listName}
              <button type="button" data-delete-list-btn>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  height="20"
                  width="20"
                  id="cross">
                  <path
                    d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"></path>
                </svg>
              </button>`
      }

      if (list.id === this.selectedList) {
        li.classList.add('active-list')
      }

      this.listsContainer.appendChild(li)
    })
  }

  static renderAllTasks () {
    const lists = Storage.loadLists()
    this.tasksContainer.innerHTML = ''
    this.tasksListHeader.textContent = 'All tasks:'
    lists.forEach(list => {
      list.tasks.forEach(task => {
        this.createTaskCard(task)
      })
    })
  }

  static formatDueDate (dueDate) {
    const date = new Date(dueDate)

    if (isToday(date)) {
      return 'Today'
    } else if (isTomorrow(date)) {
      return 'Tomorrow'
    } else if (isYesterday(date)) {
      return 'Yesterday'
    } else {
      return formatDistanceToNow(date, { addSuffix: true })
    }
  }

  static createTaskCard (task) {
    const taskElement = document.importNode(this.taskCardTemplate.content, true)
    const li = taskElement.querySelector('li')
    li.dataset.parentId = task.parentListId
    li.dataset.taskId = task.id
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete

    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    const priorityTextElement = taskElement.querySelector('[data-priority]')
    priorityTextElement.textContent = `${task.priority} priority`
    this.setPriorityColor(priorityTextElement, task.priority)
    const dueDateTextElement = taskElement.querySelector('[data-dueDate]')
    dueDateTextElement.textContent = `dueDate: ${this.formatDueDate(
      task.dueDate
    )}`
    const p = taskElement.querySelector('p')
    p.textContent = task.description

    this.tasksContainer.appendChild(taskElement)
  }

  static setPriorityColor (element, value) {
    switch (value) {
      case 'high':
        element.classList.add('urgent-important')
        break
      case 'mid':
        element.classList.add('urgent')
        break
      case 'low':
        element.classList.add('important')
        break
    }
  }

  static renderListsOption () {
    const parentListInput = document.querySelector('[data-parent-list-input]')
    const lists = Storage.loadLists()
    parentListInput.innerHTML = ''
    lists.forEach(list => {
      const option = document.createElement('option')
      option.value = list.listName
      option.textContent = list.listName
      parentListInput.appendChild(option)
    })
  }

  static clearElement (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
}
