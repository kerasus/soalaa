import { Loading } from 'quasar'
export function linearLoading (context, value) {
  context.commit('loading', value)
}
export function overlayLoading (context, value) {
  if (value) {
    context.commit('overlay', value)
    return Loading.show({ message: value.message })
  } else {
    context.commit('overlay', value)
    return Loading.hide()
  }
}
