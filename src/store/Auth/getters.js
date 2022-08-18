import { User } from 'src/models/User'

export function user (state) {
  return new User(state.user)
}
export function accessToken (state) {
  return state.accessToken
}
export function redirectTo (state) {
  return state.redirectTo
}

export function isUserLogin (state) {
  return new User(state.user).id
}
