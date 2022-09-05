import { Notify } from 'quasar'

const Assistant = (function () {
  function getId (id) {
    if (typeof id === 'undefined' || id === null || id === '') {
      return false
    } else {
      return id.toString()
    }
  }

  function handleAxiosError (error) {
    if (error.response) {
      console.error('in assis :', error.response)
      const err = error.response
      if (err.status === 429 && err.config.url === '/alaa/api/v2/mobile/resend') {
        return
      }
      if (err.status === 400 && err.config.url === '/alaa/api/v2/mobile/verify') {
        return
      }
      let messages = []
      if (error === "can't get exam file") {
        toastMessages(['مشکلی در دریافت اطلاعات آزمون رخ داده است. لطفا مجدد تلاش کنید.'])
        return
      }
      if (error === 'exam file url is not set') {
        toastMessages(['فایل آزمون ساخته نشده است.'])
        return
      }
      if (!error || !err) {
        return
      }
      const statusCode = parseInt(err.status)
      if (statusCode >= 500 && statusCode <= 599) {
        messages.push('مشکلی رخ داده است. مجدد تلاش کنید.')
      } else if (statusCode === 404) {
        messages.push('موردی یافت نشد.')
      } else if (statusCode === 401) {
        messages.push('ابتدا وارد سامانه شوید.')
      } else if (err.data.errors) {
        for (const [key, value] of Object.entries(err.data.errors)) {
          messages.push(value)
          console.error(`${key}: ${value}`)
        }
      } else if (err.data.error && !AjaxResponseMessages.isCustomMessage(err.data.error.code)) {
        messages.push(err.data.error.message)
      } else if (err.data.error && AjaxResponseMessages.isCustomMessage(err.data.error.code)) {
        messages.push(AjaxResponseMessages.getMessage(err.data.error.code))
      } else if (err.data) {
        // eslint-disable-next-line no-unused-vars
        for (const [key, value] of Object.entries(err.data)) {
          if (typeof value === 'string') {
            messages.push(value)
          } else {
            messages = messages.concat(getMessagesFromArrayWithRecursion(value))
          }
          // console.log(`${key}: ${value}`);
        }
      }

      toastMessages(messages)
    }
  }

  function toastMessages (messages) {
    messages.forEach((item) => {
      Notify.create({
        group: false,
        color: 'negative',
        message: item,
        icon: 'report_problem'
      })
    })
  }

  function getMessagesFromArrayWithRecursion (array) {
    // let messages = []
    // array.forEach(item => {
    //     if (typeof item === 'string') {
    //         messages.push(item)
    //     } else {
    //         messages = messages.concat(getMessagesFromArrayWithRecursion(item))
    //     }
    // })
    // return messages
    return array.flat(Math.min())
  }

  function reportErrors (error) {
    if (error) {
      console.error('error :', error)
      const location = (error && error.location) ? error.location : 'undefined error',
        message = (error && error.message) ? error.message : 'undefined error',
        data = (error && error.data) ? error.data : 'undefined error'
      // console.group();
      console.groupCollapsed()
      // console.table(data);
      // console.count();

      // console.group();
      // console.time();
      // ...
      // console.timeEnd();
      // console.groupEnd();

      if (location) {
        console.error('locationCode', location)
      }
      if (message) {
        console.error('message', message)
      }
      if (data) {
        console.error('data', data)
      }

      console.trace()
      console.groupEnd()
    }
  }

  function isOnline () {
    return window.navigator.onLine
  }

  return {
    getId,
    isOnline,
    reportErrors,
    handleAxiosError
  }
}())

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
    13: 'موردی یافت نشد.',
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

export default Assistant
