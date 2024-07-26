/* import _ from 'lodash' */

import './style.css'
import List from './modules/lists'
import Task from './modules/task'
import UI from './ui/ui'
import Storage from './utilities/storage'
/*import { subYears, addDays, addMonths, addYears, format } from 'date-fns' */

UI.initialize()

const task = new Task('123', 'laundry', 'sasas', '2-2-3023', 'high', '212')
task.toggleCompleted()
console.log(`from main: ${task.complete}`)
task.toggleCompleted()
console.log(`from main 2: ${task.complete}`)

/* Storage.clear() */
