import List from '../modules/lists'

export default class Storage {
  static loadLists () {
    const LOCAL_STORAGE_LIST_KEY = 'task.lists'
    let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
    return lists
  }

  static saveLists (lists) {
    localStorage.setItem('task.lists', JSON.stringify(lists))
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

  static clear () {
    localStorage.clear()
  }
}
