import { Notify } from 'quasar'
import { axios } from 'src/boot/axios'

export function updateAppBarAndDrawer (context, newInfo) {
  context.commit('updateLayoutHeaderVisible', newInfo)
  context.commit('updateLayoutLeftDrawerVisible', newInfo)
}
export function showConfirmDialog (context, newInfo) {
  context.commit('showConfirmDialog', newInfo)
}
export function showLoginDialog (context, newInfo) {
  let redirectTo = newInfo?.redirectTo
  if (!newInfo?.redirectTo) {
    redirectTo = null
  }
  this.dispatch('Auth/logOut', null, { root: true })
  context.commit('Auth/updateRedirectTo', redirectTo, { root: true })
  context.commit('updateLoginDialog', true)
}
export function editPageWidget (context, data) {
  return new Promise((resolve, reject) => {
    axios
      .put('3a/api/v1/setting', { key: 'homePage', value: JSON.stringify(data) })
      .then(r => {
        const parsedData = JSON.parse(r.data.data.value)
        context.commit('updateCurrentSections', parsedData)
        context.commit('updateInitialSections', parsedData)
        Notify.create({
          message: 'تغییرات با موفقیت ذخیره شد',
          type: 'positive'
        })
      })
      .catch(e => {
        reject(e)
      })
  })
}
export function getPageWidget (context, value) {
  return new Promise((resolve, reject) => {
    axios
      .get('3a/api/v1/setting/show?key=' + value)
      .then(r => {
        const parsedData = JSON.parse(r.data.data.value)
        console.log('parsedData', parsedData)
        context.commit('updateCurrentSections', parsedData)
        context.commit('updateInitialSections', parsedData)
      })
      .catch(e => {
        reject(e)
      })
  })
}
export function updateTemplateLayout (context, newInfo) {
  if (newInfo.layoutHeaderType !== undefined) {
    context.commit('changeTemplateHeaderType', newInfo.layoutHeaderType)
  }
  if (newInfo.layoutLeftSideBarType !== undefined) {
    context.commit('changeTemplateLeftSideBarType', newInfo.layoutLeftSideBarType)
  }
  if (newInfo.layoutRightSideBarType !== undefined) {
    context.commit('changeTemplateRightSideBarType', newInfo.layoutRightSideBarType)
  }
  this.dispatch('AppLayout/updateStore', newInfo)
}
