import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

const AxiosError = (function () {
  function handle (error) {
    let messages = []
    if (!error || !error.response) {
      return
    }
    const statusCode = parseInt(error.response.status)
    if (statusCode >= 500 && statusCode <= 599) {
      messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
    } else if (statusCode === 404) {
      messages.push('موردی یافت نشد.')
    } else if (statusCode === 401) {
      messages.push('ابتدا وارد سامانه شوید.')
      axios.defaults.headers.common.Authorization = ''
      this.$router.push({ name: 'login' })
    } else if (error.response.data) {
      for (const [key, value] of Object.entries(error.response.data)) {
        if (typeof value === 'string') {
          messages.push(value)
        } else {
          messages = messages.concat(getMessagesFromArrayWithRecursion(value))
        }
        console.log(`${key}: ${value}`)
      }
    }

    toastMessages(messages)

    // if (statusCode === 401) {
    //   axios.defaults.headers.common.Authorization = ''
    //   that.$router.push({ name: 'login'})
    // }
  }

  function toastMessages (messages) {
    messages.forEach((item) => {
      Notify.create({
        type: 'negative',
        color: 'negative',
        timeout: 5000,
        position: 'top',
        message: item,
        icon: 'report_problem'
      })
    })
  }

  function getMessagesFromArrayWithRecursion (array) {
    if (array) {
      if (Array.isArray(array)) {
        return array.flat(Math.min())
      }
      return array[0]
    }
  }

  return {
    handle
  }
}())

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app, store, router }) => {
  const accessToken = store.getters['Auth/accessToken']
  if (accessToken) {
    axios.defaults.headers.common.Authorization = 'Bearer ' + accessToken
  }
  // for use inside Vue files (Options API) through this.$axios and this.$api
  const instance = axios.create(/* ... */)

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  axios.interceptors.response.use(undefined, function (error) {
    AxiosError.handle(error)
    return Promise.reject(error)
  })

  app.axios = instance
  store.$axios = instance
  router.$axios = instance
})

export { axios, api }
