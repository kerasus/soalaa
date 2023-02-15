import { axios } from 'src/boot/axios'
import { Notify } from 'quasar'

export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}
export function showConfirmDialog (context, newInfo) {
  this.commit('AppLayout/showConfirmDialog', newInfo)
}
export function showLoginDialog (context, newInfo) {
  let redirectTo = newInfo?.redirectTo
  if (!newInfo?.redirectTo) {
    redirectTo = null
  }
  this.dispatch('Auth/logOut', null, { root: true })
  this.commit('Auth/updateRedirectTo', redirectTo, { root: true })
  this.commit('AppLayout/updateLoginDialog', true)
}
export function editPageWidget (context, data) {
  return new Promise((resolve, reject) => {
    axios
      .put('3a/api/v1/setting', { key: 'homePage', value: JSON.stringify(data) })
      .then(r => {
        this.commit('AppLayout/updateCurrentSections', JSON.parse(r.data.data.value))
        this.commit('AppLayout/updateInitialSections', JSON.parse(r.data.data.value))
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
export function getPageWidget (context) {
  return new Promise((resolve, reject) => {
    axios
      .get('3a/api/v1/setting/show?key=homePage')
      .then(r => {
        this.commit('AppLayout/updateCurrentSections', JSON.parse(r.data.data.value))
        this.commit('AppLayout/updateInitialSections', JSON.parse(r.data.data.value))
      })
      .catch(e => {
        reject(e)
      })
  })
}
export function updateTemplateLayout (context, newInfo) {
  if (newInfo.layoutHeaderType !== undefined) {
    this.commit('AppLayout/changeTemplateHeaderType', newInfo.layoutHeaderType)
  }
  if (newInfo.layoutLeftSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateLeftSideBarType', newInfo.layoutLeftSideBarType)
  }
  if (newInfo.layoutRightSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateRightSideBarType', newInfo.layoutRightSideBarType)
  }
  this.dispatch('AppLayout/updateStore', newInfo)
}
