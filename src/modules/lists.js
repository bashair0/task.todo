export default class List {
  constructor (listName) {
    this.id = this.generateUniqueId()
    this.listName = listName
    this.tasks = []
  }

  generateUniqueId () {
    return (
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 12).padStart(12, 0)
    )
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
      return task.toggleCompleted()
    }
  }
}
