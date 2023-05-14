import { boot } from 'quasar/wrappers'
import { Notify, Cookies } from 'quasar'
import APIInstanceWrapper from 'src/api/classes/APIInstanceWrapper.js'

const alaaApi = process.env.AUTH_API
const alaaApiServer = process.env.AUTH_API_SERVER
const appApi = process.env.AAA_API
const appApiServer = process.env.AAA_API_SERVER

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
      console.error('error.response.data.error.code', AjaxResponseMessages.getMessage(error.response.data.error.code))
      messages.push(AjaxResponseMessages.getMessage(error.response.data.error.code))
    } else if (error.response.data.error && !AjaxResponseMessages.isCustomMessage(error.response.data.error.code)) {
      for (const [key, value] of Object.entries(error.response.data.error)) {
        if (typeof error.response.data.error[key] === 'string') {
          messages.push(value)
        }
      }
    } else if (error.response.data.errors) {
      for (const [key, value] of Object.entries(error.response.data.errors)) {
        if (typeof error.response.data.errors[key] === 'string') {
          messages.push(value)
        } else {
          messages = messages.concat(getMessagesFromArrayWithRecursion(value))
        }
      }
    }

    toastMessages(messages)
    return Promise.reject(error)
  }

  function deAuthorizeUser (router, store) {
    store.dispatch('Auth/logOut')
    const loginRouteName = 'login'
    const currentRoute = (router?.currentRoute?._value) ? router.currentRoute._value : (router?.history?.current) ? router.history.current : null
    if (currentRoute && currentRoute.name === loginRouteName) {
      return
    }
    store.commit('Auth/updateRedirectTo', currentRoute)
    router.push({ name: loginRouteName })
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
// good idea to move this instance creation inside the
// "export default () => {}" function below (which runs individually
// for each client)

const alaaApiInstance = APIInstanceWrapper.createInstance(alaaApi, alaaApiServer)
const appApiInstance = APIInstanceWrapper.createInstance(appApi, appApiServer)

export default boot(({ app, store, router, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies // otherwise we're on client

  const cookiesAccessToken = cookies.get('BearerAccessToken')

  if (cookiesAccessToken) {
    const tokenType = 'Bearer'
    store.$accessToken = cookiesAccessToken
    store.$accessToken = cookiesAccessToken
    alaaApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + cookiesAccessToken
    appApiInstance.defaults.headers.common.Authorization = tokenType + ' ' + cookiesAccessToken
  }

  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  AxiosHooks.setNotifyInstance(app.config.globalProperties.$q)

  if (alaaApiInstance.interceptors) {
    alaaApiInstance.interceptors.response.use(undefined, async function (error) {
      return await AxiosHooks.handleErrors(error, router, store)
    })
  }

  store.$appApiInstance = appApiInstance
  router.$appApiInstance = appApiInstance

  store.$alaaApiInstance = alaaApiInstance
  router.$alaaApiInstance = alaaApiInstance

  store.$axios = appApiInstance
  router.$axios = appApiInstance

  app.config.globalProperties.$axios = appApiInstance
  app.config.globalProperties.$alaaApiInstance = alaaApiInstance
  app.config.globalProperties.$appApiInstance = appApiInstance
})

export { appApiInstance, alaaApiInstance }
