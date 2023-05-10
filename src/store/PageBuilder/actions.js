import { Notify } from 'quasar'
import { APIGateway } from 'src/api/APIGateway.js'

const actions = {
  createPageWidget: (context, data) => {
    return new Promise((resolve, reject) => {
      APIGateway.pageSetting.create({ key: data.key, value: data.sections })
        .then(parsedData => {
          context.commit('updateCurrentSections', parsedData.value)
          context.commit('updateInitialSections', parsedData.value)
          Notify.create({
            message: 'تغییرات با موفقیت ذخیره شد',
            type: 'positive'
          })
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  editPageWidget: (context, data) => {
    return new Promise((resolve, reject) => {
      APIGateway.pageSetting.update({ key: data.key, value: data.sections })
        .then(parsedData => {
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          Notify.create({
            message: 'تغییرات با موفقیت ذخیره شد',
            type: 'positive'
          })
          resolve(parsedData)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getPageWidget: (context, value) => {
    return new Promise((resolve, reject) => {
      APIGateway.pageSetting.get(value)
        .then(r => {
          const parsedData = JSON.parse(r.data.data.value)
          context.commit('updateCurrentSections', parsedData)
          context.commit('updateInitialSections', parsedData)
          resolve(r)
        })
        .catch(e => {
          reject(e)
        })
    })
  }
}

export default actions
