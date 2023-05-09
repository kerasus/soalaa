import { Loading } from 'quasar'

const actions = {
  linearLoading: (context, value) => {
    context.commit('loading', value)
  },
  overlayLoading: (context, value) => {
    if (value) {
      context.commit('overlay', value)
      return Loading.show({ message: value.message })
    } else {
      context.commit('overlay', value)
      return Loading.hide()
    }
  }
}

export default actions
