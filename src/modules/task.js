export default class Task {
  constructor (name, description, dueDate, priority, parentListId) {
    this.id = this.generateUniqueId()
    ;(this.name = name),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.parentListId = parentListId((this.completed = false)))
  }

  generateUniqueId () {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 12).padStart(12, 0)
    )
  }

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
      json.parentProjectId
    )
    task.completed = json.completed
    return task
  }
}
