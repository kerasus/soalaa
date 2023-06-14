<template>
  <div>
    THIS COMPONENT IS JUST FOR TEST
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
export default {
  name: 'Test',
  components: {},
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
      testValue1: ''
    }
  },
  computed: {
    test1 () {
      return API_ADDRESS.question.uploadImage('dfbdgbdgbgfnhfn')
    },
    test2 () {
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
