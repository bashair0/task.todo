import Task from './task'
import { generateId } from './generateId'

export default class List {
  constructor (listName, id = generateId()) {
    this.listName = listName
    this.id = id
    this.tasks = []
  }

  addTask (task) {
    this.tasks.push(task)
  }

  printTasks () {
    this.tasks.forEach(task => {
      console.log(`${task.name} '${task.id}'`)
    })
  }

  removeTask (taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId)
  }

  toggleTaskStatus (taskId) {
    const task = this.tasks.find(task => task.id === taskId)
    if (task) {
      let toggleTask = task.toggleCompleted()
      return toggleTask
    }
  }

  static fromJSON (json) {
    const list = new List(json.listName, json.id)
    list.tasks = json.tasks.map(taskData => Task.fromJSON(taskData))
    return list
  }
}
