import { Model, Collection } from 'js-abstract-model'
import API_ADDRESS from '../api/Addresses'
import { CommentList } from '../models/Comment'

class Log extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'baseRoute',
        default: API_ADDRESS.log.base
      },
      { key: 'id' },
      { key: 'title' },
      { key: 'description' },
      // {
      //     key: 'causer',
      //     relatedModel: User
      // },
      {
        key: 'causer',
        default: {
          id: null,
          full_name: null
        }
      },
      {
        key: 'subject',
        default: {
          id: null,
          type: null
        }
      },
      {
        key: 'comments',
        relatedModel: CommentList
      },
      { key: 'properties' },
      { key: 'created_at' },
      { key: 'updated_at' },
      {
        key: 'log_status',
        default: {
          title: '',
          actions: []
        }
      }
    ])

    this.loadProperties()

    // if (this.properties && (this.properties.new || this.properties.old)) {
    //   this.setStatus()
    // }
  }

  loadProperties () {
    this.loadPropertyType('new')
    this.loadPropertyType('old')
  }

  loadPropertyType (type) {
    if (!this.properties || !this.properties[type]) {
      return
    }

    this.properties.messages = {}

    Object.entries(this.properties[type]).forEach(prop => {
      const key = prop[0]
      const propertyValues = this.getPropertyValues(key, this.properties.new[key], this.properties.old[key])
      this.properties.messages[key] = {
        message: propertyValues.message,
        values: propertyValues.values
      }
    })
  }

  getPropertyValues (propertyKey, newPropertyValue, oldPropertyValue) {
    switch (propertyKey) {
      case 'status':
        return {
          message: function (values, callback) {
            const fromStatus = typeof callback === 'function' ? callback(values.fromStatus) : values.fromStatus
            const toStatus = typeof callback === 'function' ? callback(values.toStatus) : values.toStatus
            let text = 'وضعیت سوال '

            if (oldPropertyValue.display_title) {
              text += `از ${fromStatus} `
            }
            if (oldPropertyValue.display_title) {
              text += `به ${toStatus} `
            }

            text += 'تغییر کرد.'

            return text
          },
          values: {
            fromStatus: oldPropertyValue.display_title,
            toStatus: newPropertyValue.display_title
          }
        }
      case 'statement':
        return {
          message: function (values, callback) {
            return 'تغییراتی در صورت سوال ایجاد کرد.'
          },
          values: {}
        }
      case 'exams':
        return {
          message: function (values, callback) {
            if (newPropertyValue.length > oldPropertyValue.length) {
              return 'سوال را به آزمون اضافه کرد.'
            } else if (newPropertyValue.length < oldPropertyValue.length) {
              return 'سوال را از آزمون حذف کرد.'
            } else {
              return 'تغییراتی در آزمون های سوال ایجاد کرد.'
            }
          },
          values: {}
        }
      default:
        return {
          message: function (values, callback) {
            return ''
          },
          values: {}
        }
    }
  }

  setStatus () {
    const descriptions = [
      'update_question',
      'create_question',
      'update_question_status',
      'create_exam',
      'update_exam',
      'make_json_file_exam_question',
      'delete_exam',
      'delete_question',
      'create_update_zirgorooh'
    ]
    descriptions.forEach(description => {
      if (description === this.description) {
        this.setLogTitle(description)
        this.setLogAction(description)
      }
    })
  }

  setLogTitle (description) {
    if (description === 'create_question') {
      this.log_status.title = 'سوال را ایجاد کرد'
    } else if (description === 'create_exam') {
      this.log_status.title = 'آزمون را ایجاد کرد'
    } else {
      this.log_status.title = 'تغییراتی ایجاد کرد'
    }
  }

  setLogAction (description) {
    let text = ''
    switch (description) {
      case 'update_question':
        this.log_status.actions.push()
        break
      case 'create_question':
        this.log_status.actions.push()
        break
      case 'update_question_status':
        if (this.properties.old || this.properties.new) {
          if (this.properties.old.status && this.properties.old.status.display_title) {
            text = 'از ' + this.properties.old.status.display_title
          }
          if (this.properties.new.status && this.properties.new.status.display_title) {
            text += ' به ' + this.properties.new.status.display_title
          }
          this.log_status.actions.push('وضعیت سوال ' + text + 'تغییر کرد ')
        }
        break
      case 'create_update_zirgorooh':
        this.log_status.actions.push()
        break
    }
  }
}

class LogList extends Collection {
  // constructor (data, paginateData) {
  //   super(data, paginateData)
  //   // this.setNumbers()
  // }

  model () {
    return Log
  }
}

export { Log, LogList }
