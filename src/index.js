/* import _ from 'lodash' */

import './style.css'
import List from './modules/lists'
import Task from './modules/task'
import UI from './ui/ui'
import Storage from './utilities/storage'
import {
  subYears,
  addDays,
  addMonths,
  addYears,
  format,
  isToday,
  isTomorrow,
  isYesterday,
  formatDistanceToNow
} from 'date-fns'

const date = new Date()

let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()

let fullDate = `${year}-${month}-${day}`
console.log(fullDate)

const formatDueDate = dueDate => {
  const date = new Date(dueDate)

  if (isToday(date)) {
    return 'Today'
  } else if (isTomorrow(date)) {
    return 'Tomorrow'
  } else if (isYesterday(date)) {
    return 'Yesterday'
  } else {
    return formatDistanceToNow(date, { addSuffix: true })
  }
}

console.log(formatDueDate('2024-4-27'))
UI.initialize()

/* Storage.clear() */
