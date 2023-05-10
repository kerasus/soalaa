import { Loading, uid } from 'quasar'

const mixinPrefetchServerData = {
  data() {
    return {
      widgetUid: null
    }
  },
  serverPrefetch () {
    return this.prefetchServerData(true)
  },
  created () {
    return this.prefetchServerData(false)
  },
  methods: {
    async prefetchServerData(prefetch) {
      const widgetName = this.$options.name
      if (prefetch) {
        this.widgetUid = uid()
        this.$store.dispatch('Widgets/addWidgetData', {
          data: null,
          name: widgetName,
          uid: this.widgetUid
        })
        Loading.show()
        return this.prefetchServerDataPromise()
          .then((data) => {
            this.$store.commit('Widgets/updateDataByUid', {
              data,
              name: widgetName,
              uid: this.widgetUid
            })
            this.prefetchServerDataPromiseThen(data)
            Loading.hide()
          })
          .catch((error) => {
            this.prefetchServerDataPromiseCatch(error)
            Loading.hide()
          })
      } else {
        const stack = this.$store.getters['Widgets/data'](widgetName)
        const fristItem = stack.slice(0, 1)
        const remainItems = stack.slice(1)
        this.$store.commit('Widgets/updateData', {
          name: widgetName,
          data: remainItems
        })

        const item = (fristItem && fristItem.length > 0) ? fristItem[0] : null
        if (!item || !item.widgetData) {
          this.prefetchServerDataPromise()
            .then((data) => {
              this.prefetchServerDataPromiseThen(data)
              Loading.hide()
            })
            .catch((error) => {
              this.prefetchServerDataPromiseCatch(error)
              Loading.hide()
            })
        } else {
          // console.trace('item.widgetData', item.widgetData)
          this.prefetchServerDataPromiseThen(item.widgetData)
        }

        // this.$store.dispatch('Widgets/getWidgetData', { name: widgetName })
        //   .then(item => {
        //     console.log('item', item)
        //     if (!item || !item.widgetData) {
        //       this.prefetchServerDataPromise()
        //         .then((data) => {
        //           this.prefetchServerDataPromiseThen(data)
        //           Loading.hide()
        //         })
        //         .catch((error) => {
        //           this.prefetchServerDataPromiseCatch(error)
        //           Loading.hide()
        //         })
        //     } else {
        //       this.prefetchServerDataPromiseThen(item.widgetData)
        //     }
        //   })
      }
    },
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
