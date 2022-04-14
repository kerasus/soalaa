import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { Notify } from 'quasar'

const AjaxResponseMessages = (function () {
  const messageMap = {
    0: 'مشکلی پیش آمده است. مجدد تلاش کنید.',
    400: 'ابتدا وارد سامانه شوید.',
    401: 'ابتدا وارد سامانه شوید.',
    1: 'پیش از این در این آزمون ثبت نام انجام شده است.',
    2: 'زمان آزمون فرا نرسیده است',
    3: 'ثبت نام در این آزمون انجام نشده است.',
    4: 'دانش آموز برای این آزمون ثبت نام نکرده است.',
    5: 'نتیجه آزمونی برای این آزمون وجود ندارد.',
    6: 'پاسخنامه داوطلب پیش از این ارسال شده است.',
    7: 'زمان پاسخگویی قبل از شروع آزمون است.',
    8: 'آزمون متعلق به کاربر نیست.',
    13: 'سوالات آزمون آماده نشده است.',
    14: 'آزمون بسته شده است.',
    17: 'ثبت درس تکراری در یک دفترچه امکان پذیر نیست.'
  }

  function isCustomMessage (statusCode) {
    return !!(messageMap[statusCode.toString()])
  }

  function getMessage (statusCode) {
    return messageMap[statusCode]
  }

  return {
    isCustomMessage,
    getMessage
  }
}())

const AxiosHooks = (function () {
  let $notify = null

  function setNotifyInstance ($q) {
    if (!$q.notify) {
      return
    }
    $notify = $q.notify
  }

  function handleErrors (error, router, store) {
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
      deAuthorizeUser(router, store)
    } else if (error.response.data.error && AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
      console.log('error.response.data.error.code', AjaxResponseMessages.getMessage(error.response.data.error.code))
      messages.push(AjaxResponseMessages.getMessage(error.response.data.error.code))
    } else if (error.response.data.error && !AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
      for (const [key, value] of Object.entries(error.response.data.error)) {
        console.log('key', key)
        if (typeof value === 'string') {
          messages.push(value)
        }
      }
    } else if (error.response.data.errors) {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        console.log('key', key)
        if (typeof value === 'string') {
          messages.push(value)
        } else {
          messages = messages.concat(getMessagesFromArrayWithRecursion(value))
        }
      }
    }

    toastMessages(messages)
  }

  function toastMessages (messages) {
    messages.forEach((item) => {
      if ($notify) {
        $notify({
          type: 'negative',
          color: 'negative',
          message: item,
          icon: 'report_problem'
        })
      } else {
        Notify.create({
          type: 'negative',
          color: 'negative',
          timeout: 5000,
          position: 'top',
          message: item,
          icon: 'report_problem'
        })
      }
    })
  }

  function deAuthorizeUser (router, store) {
    store.dispatch('Auth/logOut')

    const loginRouteName = 'login'
    if (router.history.current.name === loginRouteName) {
      return
    }

    router.push({ name: loginRouteName })
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
    handleErrors,
    setNotifyInstance
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

  AxiosHooks.setNotifyInstance(app.config.globalProperties.$q)
  axios.interceptors.response.use(undefined, function (error) {
    AxiosHooks.handleErrors(error, router, store)
    return Promise.reject(error)
  })

  app.axios = instance
  store.$axios = instance
  router.$axios = instance
})

export { axios, api }
