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
      { key: 'answered_at' }
    ])

    if (typeof this.title === 'string') {
      this.rendered_title = (this.title)
      // this.rendered_title = convertToMarkdownKatex(this.title)
      // this.rendered_title = md.render(this.title)
    }
  }

  getOrderTitle (type = 'number') {
    const number = {
      1: 'یک',
      2: 'دو',
      3: 'سه'
    }

    const abjad = {
      1: 'الف',
      2: 'ب',
      3: 'ج'
    }

    return (type === 'number') ? number[this.order] : abjad[this.order]
  }
}

class ChoiceList extends Collection {
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

  addEmptyChoices (index) {
    for (let i = 0; i < index; i++) {
      this.addOneEmptyChoice()
    }
  }

  addOneEmptyChoice () {
    const lastOrder = this.getLastOrder()
    const newChoice = new Choice({ order: lastOrder + 1 })
    this.list.push(newChoice)
    // this.list = this.list.concat(newChoice)
  }
}

export { Choice, ChoiceList }
