import List from '../modules/lists'
/* import Task from '../modules/task' */

export default class Storage {
  static LOCAL_STORAGE_LIST_KEY = 'task.lists'
  static loadLists () {
    let lists =
      JSON.parse(localStorage.getItem(this.LOCAL_STORAGE_LIST_KEY)) || []

    return lists.map(list => List.fromJSON(list))
  }

  static saveLists (lists) {
    localStorage.setItem(this.LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  }

  static getLists () {
    return this.loadLists()
  }

  static getList (listId) {
    const lists = this.loadLists()
    return lists.find(lst => lst.id === listId)
  }

  static addList (list) {
    const lists = this.loadLists()
    if (!lists.some(lst => lst.id === lists.id)) {
      lists.push(list)
      this.saveLists(lists)
    }
  }

  static updateList (updatedList) {
    const lists = this.loadLists()
    const listIndex = lists.findIndex(lst => lst.id === updatedList.id)
    if (listIndex !== -1) {
      lists[listIndex] = updatedList
      this.saveLists(lists)
    }
  }

  static removeList (listId) {
    let lists = this.loadLists()
    lists = lists.filter(lst => lst.id !== listId)
    this.saveLists(lists)
  }

  static addTaskToList (task, listId) {
    const lists = this.loadLists()
    const list = lists.find(lst => lst.id === listId)
    if (list) {
      list.addTask(task)
      this.updateList(list)
    }
  }

  static updateTask (taskId, listId, updatedTask) {
    const list = this.getList(listId)
    if (list) {
      if (listId !== updatedTask.parentListId) {
        this.removeTaskFromList(taskId, listId)
        this.addTaskToList(updatedTask, updatedTask.parentListId)
      } else {
        list.editTask(taskId, updatedTask)
        this.updateList(list)
      }
    }
  }

  static removeTaskFromList (taskId, listId) {
    const list = this.getList(listId)
    if (list) {
      list.removeTask(taskId)
      this.updateList(list)
    }
  }

  static toggleTaskStatus (taskId, listId) {
    const list = this.getList(listId)
    if (list) {
      list.toggleTaskStatus(taskId)
      this.updateList(list)
    }
  }

  static clear () {
    localStorage.clear()
  }
}
