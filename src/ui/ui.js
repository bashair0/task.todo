import Task from '../modules/task'
import List from '../modules/lists'
import Storage from '../utilities/storage'

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
      event.preventDefault()
      const taskNameInput = document.querySelector(
        '[data-task-name-input]'
      ).value
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
      /* const newTask = new Task(
        taskNameInput,
        taskDescriptionInput,
        taskDueDateInput,
        taskPriorityInput,
        taskParentListInput
      ) */
    })
  }

  static renderTasks () {
    const tasks = Storage.loadTasks()
    tasks.forEach(task => {
      console.log(task.name)
      console.log(task.dueDate)
      console.log(task.priority)
    })
  }

  static render () {
    this.clearElement(this.listsContainer)
    this.renderLists()
  }

  static toggleNewListForm () {
    this.addListForm.classList.toggle('hidden')
  }

  static hideNewTaskForm () {
    this.taskFormContainer.classList.add('hidden')
  }

  static displayNewTaskForm () {
    this.taskFormContainer.classList.remove('hidden')
  }

  static addNewList (event) {
    event.preventDefault()
    const newListInput = document.querySelector('[data-add-list-input]')
    let inputValue = newListInput.value
    if (!inputValue || inputValue == null) return

    const newList = new List(inputValue)
    newListInput.value = null
    Storage.addList(newList)
    this.render()
  }

  static deleteList (event) {
    let removeListId = event.target.closest('li').dataset.listId
    Storage.removeList(removeListId)
    this.render()
  }

  static activeList (event) {
    let selectedListId = event.target.dataset.listId
    this.selectedList = selectedListId
    this.render()
  }

  static renderLists () {
    let lists = Storage.loadLists()
    lists.forEach(list => {
      const li = document.createElement('li')
      li.dataset.listId = list.id
      li.classList.add('flex')
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
      if (list.id === this.selectedList) {
        li.classList.add('active-list')
      }
      this.listsContainer.appendChild(li)
    })
  }

  static clearElement (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
  }
}
