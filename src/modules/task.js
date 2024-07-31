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

  toggleCompleted () {
    this.complete = !this.complete
    return this.complete
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
