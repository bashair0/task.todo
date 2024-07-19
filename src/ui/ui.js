export default class UI {
  static initialize () {
    this.cacheDOMElements()
    this.eventListeners()
  }

  static cacheDOMElements () {
    this.addListButton = document.querySelector('[data-add-list-btn]')
    this.addListForm = document.querySelector('[data-list-form]')
    this.plusButton = document.querySelector('[data-plus-btn]')
  }

  static eventListeners () {
    this.plusButton.addEventListener('click', () => {
      this.toggleNewListForm()
    })

    this.addListButton.addEventListener('click', event => {
      this.addNewList(event)
    })
  }

  static toggleNewListForm () {
    this.addListForm.classList.toggle('hidden')
  }

  static addNewList (event) {
    event.preventDefault()
    const newListInput = document.querySelector('[data-add-list-input]')
    let inputValue = newListInput.value
    if (!inputValue || inputValue == null) return
    console.log(inputValue)
  }
}
