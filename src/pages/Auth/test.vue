<template>
  <div v-if="mounted">
    <component :is="highChartComponentName"
               ref="tiptap"
               v-model="content"
               :options="{
                 poem: true,
                 reading: true,
                 bubbleMenu: false,
                 floatingMenu: false,
                 onResizeEnd: onResizeEnd,
                 persianKeyboard: true,
                 // mathliveOptions: {
                 //   locale: 'fa',
                 // }
               }" />
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'Test',
  components: {
    VueTiptapKatex: defineAsyncComponent(() => {
      return new Promise((resolve) => {
        let Chart
        import('vue3-tiptap-katex')
          .then(({ VueTiptapKatex }) => {
            console.log('VueTiptapKatex', VueTiptapKatex)
            Chart = VueTiptapKatex
            resolve(Chart)
          })
      })
    })
  },
  mixins: [],
  beforeRouteEnter () {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave () {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate () {
    // console.log('debug beforeRouteUpdate')
  },
  props: {
    testProp: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      testValue: '',
      testValue1: '',
      content: 'test',
      mounted: false,
      isHighchartsReady: false,
      highChartComponentName: ''
    }
  },
  computed: {
    test1 () {
      return API_ADDRESS.question.uploadImage('dfbdgbdgbgfnhfn')
    },
    test2 () {
      return 'Bearer ' + this.$store.getters['Auth/accessToken']
    },
    getAuthorizationCode () {
      return 'Bearer ' + this.$store.getters['Auth/accessToken']
    }
  },
  watch: {
    testValue: {
      handler () {},
      deep: true
    },
    testValue1 (oldVal, newVal) {}
  },
  activated () {
    // console.log('debug activated')
  },
  updated () {
    // console.log('debug updated')
  },
  created () {
    // console.log('debug created')
  },
  mounted () {
    // console.log('debug mounted')
    this.mounted = true
    this.highChartComponentName = 'vue-tiptap-katex'
  },
  methods: {
    onResizeEnd(url, width, height) {
      return `${url.split('?w=')[0]}?w=${width}&h=${height}`
    }
  }
}
</script>

<style scoped lang="scss">
.video-player-container{
  width: 700px;
  height: auto;
  border-radius: 20px;
}
</style>
