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
          photo: 'https://nodes.alaatv.com/upload/images/profile/default_avatar.jpg',
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
          actions: {}
        }
      }
    ])

    if (this.properties && (this.properties.new || this.properties.old)) {
      this.loadLogData()
    }
  }

  loadLogData () {
    this.getStatusTitle(this.description)
    this.getStatusActions('new')
    this.getStatusActions('old')
  }

  getStatusTitle (description) {
    if (description === 'create_question') {
      this.log_status.title = 'سوال را ایجاد کرد'
    } else if (description === 'create_exam') {
      this.log_status.title = 'آزمون را ایجاد کرد'
    } else {
      this.log_status.title = 'تغییراتی ایجاد کرد'
    }
  }

  getStatusActions (type) {
    if (!this.properties || !this.properties[type]) {
      return
    }
    this.log_status.actions.message = {}
    Object.entries(this.properties[type]).forEach(prop => {
      const key = prop[0]
      const propertyValues = this.getActionsChanges(key, this.properties.new[key], this.properties.old[key])
      this.log_status.actions = {
        message: propertyValues.message(this.log_status.actions.values),
        values: propertyValues.values
      }
    })
  }

  getActionsChanges (propertyKey, newPropertyValue, oldPropertyValue) {
    switch (propertyKey) {
      case 'status':
        return {

          message: function (values, callback) {
            const fromStatus = values && values.fromStatus ? typeof callback === 'function' ? callback(values.fromStatus) : values.fromStatus : '-'
            const toStatus = values && values.toStatus ? typeof callback === 'function' ? callback(values.toStatus) : values.toStatus : '-'
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
            return 'تغییراتی در متن صورت سوال ایجاد شد.'
          },
          values: {}
        }
      case 'choices':
        return {
          message: function (values, callback) {
            return 'تغییراتی در گزینه های سوال ایجاد شد.'
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
}

class LogList extends Collection {
  model () {
    return Log
  }
}

export { Log, LogList }
