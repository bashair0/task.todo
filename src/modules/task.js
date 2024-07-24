/* import { generateId } from './generateId' */

export default class Task {
  constructor (id, name, description, dueDate, priority, parentListId) {
    this.id = id
    ;(this.name = name),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.parentListId = parentListId),
      (this.complete = false)
  }

  /* generateUniqueId () {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 12).padStart(12, 0)
    )
  } */

  toggleCompleted () {
    this.completed = !this.completed
    return this.completed
  }

  static fromJSON (json) {
    const task = new Task(
      json.id,
      json.name,
      json.description,
      json.dueDate,
      json.priority,
      json.parentListId
    )
    task.complete = json.complete
    return task
  }
}
