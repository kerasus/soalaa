import { Model, Collection } from 'js-abstract-model'

class Choice extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      { key: 'title' },
      { key: 'rendered_title' },
      {
        key: 'active',
        default: false
      },
      {
        key: 'answer',
        default: false
      },
      { key: 'order' },
      { key: 'number' },
      { key: 'answered_at' }
    ])

    if (typeof this.title === 'string') {
      this.rendered_title = (this.title)
      // this.rendered_title = convertToMarkdownKatex(this.title)
      // this.rendered_title = md.render(this.title)
    }
  }

  getNumberTitle (type = 'number', number) {
    if (typeof number === 'undefined') {
      number = this.number
    }
    const numberTitle = {
      1: 'یک',
      2: 'دو',
      3: 'سه',
      4: 'چهار',
      5: 'پنج',
      6: 'شش',
      7: 'هفت',
      8: 'هشت',
      9: 'نه',
      10: 'ده'
    }

    const abjadTitle = {
      1: 'الف',
      2: 'ب',
      3: 'ج',
      4: 'د',
      5: 'ه',
      6: 'ز',
      7: 'ص',
      8: 'ط',
      9: 'چ',
      10: 'غ'
    }

    return (type === 'number') ? numberTitle[number] : abjadTitle[number]
  }
}

class ChoiceList extends Collection {
  constructor (data, paginateData) {
    super(data, paginateData)
    this.setNumbers()
  }

  setNumbers () {
    this.changeOrderToInt()
    this.sortByKey('order')
    this.list.forEach((choice, index) => {
      choice.number = index + 1
    })
  }

  model () {
    return Choice
  }

  getSelected () {
    return this.list.find((item) => (item.active || item.answer))
  }

  getLastOrder () {
    let order = 1
    this.list.forEach(choice => {
      if (choice.order > order) {
        order = choice.order
      }
    })

    return order
  }

  changeOrderToInt () {
    this.list.forEach((item, index, choices) => {
      choices[index].order = parseInt(choices[index].order)
    })
  }

  sortByOrder () {
    this.changeOrderToInt()
    this.reorder()
    return this.sortByKey('order')
  }

  reorder () {
    this.list.forEach((choice, index) => {
      choice.order = index
    })
  }

  addEmptyChoices (index) {
    for (let i = 0; i < index; i++) {
      this.addOneEmptyChoice()
    }
    this.reorder()
  }

  addOneEmptyChoice () {
    const lastOrder = this.getLastOrder()
    const newChoice = new Choice({ order: lastOrder + 1 })
    this.list.push(newChoice)
    this.sortByOrder()
  }
}

export { Choice, ChoiceList }
