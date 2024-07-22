/* import List from '../modules/lists' */

export default class Storage {
  static LOCAL_STORAGE_LIST_KEY = 'task.lists'
  static LOCAL_STORAGE_TASK_KEY = 'task'
  static loadLists () {
    let lists =
      JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_LIST_KEY)) || []
    return lists
  }

  static saveLists (lists) {
    localStorage.setItem(this.LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  }

  static getLists () {
    return this.loadLists()
  }

  static addList (list) {
    const lists = this.loadLists()
    if (!lists.some(lst => lst.id === lists.id)) {
      lists.push(list)
      this.saveLists(lists)
    }
  }

  static removeList (listId) {
    let lists = this.loadLists()
    lists = lists.filter(lst => lst.id !== listId)
    this.saveLists(lists)
  }

  static loadTasks () {
    let tasks =
      JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_TASK_KEY)) || []
    return tasks
  }

  static saveTasks (tasks) {
    localStorage.setItem(this.LOCAL_STORAGE_TASK_KEY, JSON.stringify(tasks))
  }

  static addTask (task) {
    const tasks = this.loadTasks()
    if (!tasks.some(element => element.id === task.id)) {
      tasks.push(task)
      this.saveTasks()
    }
  }

  static renderTasks () {
    let tasks = this.loadTasks()
    tasks.array.forEach(element => {
      console.log(element)
    })
  }

  static clear () {
    localStorage.clear()
  }
}
