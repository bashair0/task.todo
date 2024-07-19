export default class Task {
  constructor (name, description, dueDate, priority, note) {
    this.id = this.generateUniqueId()
    ;(this.name = name),
      (this.description = description),
      (this.dueDate = dueDate),
      (this.priority = priority),
      (this.note = note),
      (this.completed = false)
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
}
