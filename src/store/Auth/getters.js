import { User } from 'src/models/User'

const getters = {
  user: (state) => {
    return new User(state.user)
  },
  canEditPage () {

  },
  accessToken: (state) => {
    return state.accessToken
  },
  redirectTo: (state) => {
    return state.redirectTo
  },
  isUserLogin: (state) => {
    return !!new User(state.user).id
  }
}

export default getters
