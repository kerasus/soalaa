import axios from 'src/plugins/axios'
import store from '../store/index'
import router from '../router/index'
import Assistant from '../plugins/assistant'
import Time from 'src/plugins/time'

const Axios = (function () {
  function notFound () {
    console.log('The requested resource does not exist or has been deleted')
  }

  function unauthorized () {
    const loginRouteName = 'login'
    if (router.history.current.name === loginRouteName) {
      return
    }

    store.commit('Auth/updateAccessToken', '')
    console.log('Please login to access this resource')
    router.push({ name: loginRouteName })
  }

  function handleError () {
    axios.interceptors.response.use(undefined, function (error) {
      const statusCode = error.response ? error.response.status : null

      if (statusCode === 404) {
        notFound()
      }

      if (statusCode === 401) {
        unauthorized()
      }

      Assistant.handleAxiosError(error)

      return Promise.reject(error)
    })
  }
  function synchronizeTimeAfterResponse () {
    axios.interceptors.response.use(function (response) {
      if (response.config.url.indexOf(process.env.VUE_APP_LUMEN_INTERNAL_API_SERVER) === 0) {
        Time.synchronizeTimeWithData(response)
      }
      return Promise.resolve(response)
    })
  }
  return {
    handleError,
    synchronizeTimeAfterResponse
  }
}())

export default Axios
