const alaaServer = '/alaa'
const alaaServerApi = '/api/v2'
// const alaaServerWeb = '/web'
// const aaaServer = '/3a'
// const aaaServerApi = '/api'
// const aaaServerRabitApi = '/rb/api'

const API_ADDRESS = {
  auth: {
    login: alaaServer + alaaServerApi + '/login'
  },
  user: {
    mobile: {
      resend: alaaServer + alaaServerApi + '/mobile/resend',
      verify: alaaServer + alaaServerApi + '/mobile/verify'
    },
    formData: alaaServer + alaaServerApi + '/megaroute/getUserFormData',
    show_user (productId) {
      return alaaServer + alaaServerApi + '/product/' + productId
    }
  },
  set: {
    base: alaaServer + alaaServerApi + '/set',
  },
  content: {
    base: alaaServer + alaaServerApi + '/c',
  }
}
export default API_ADDRESS
