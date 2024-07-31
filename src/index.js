/* import _ from 'lodash' */

import './style.css'
import List from './modules/lists'
import UI from './ui/ui'
import Storage from './utilities/storage'

const generateDefaultList = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const lists = Storage.loadLists()
    if (!lists.length) {
      const defaultList = new List('inbox', '1xx')
      Storage.addList(defaultList)
    }
  })
  UI.initialize()
}
generateDefaultList()
