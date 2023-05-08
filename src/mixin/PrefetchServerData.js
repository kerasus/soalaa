import { Loading } from 'quasar'

const mixinPrefetchServerData = {
  created () {
    this.prefetchServerDataPromise()
      .then((data) => {
        this.prefetchServerDataPromiseThen(data)
        Loading.hide()
      })
      .catch((error) => {
        this.prefetchServerDataPromiseCatch(error)
        Loading.hide()
      })
  },
  methods: {
    prefetchServerDataPromise () {
      return Promise.resolve()
    },
    prefetchServerDataPromiseThen (data) {
    },
    prefetchServerDataPromiseCatch () {
    }
  }
}

export default mixinPrefetchServerData
