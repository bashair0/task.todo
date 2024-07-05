import _ from 'lodash'
import './style.css'

const hello = document.createElement('h1')
hello.classList.add('red')
hello.textContent = 'Hello world!'

document.body.appendChild(hello)
