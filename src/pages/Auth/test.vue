<template>
  <h5>THIS COMPONENT IS JUST FOR TEST</h5>
</template>

<script>

import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Test',
  mixins: [],
  components: { },
  data () {
    return {
      testValue: '',
      testValue1: ''
    }
  },
  props: {
    testProp: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {},
  computed: {
    test1 () {
      return API_ADDRESS.question.uploadImage('dfbdgbdgbgfnhfn')
    },
    test2 () {
      return 'Bearer ' + this.$store.getters['Auth/accessToken']
    }
  },
  beforeRouteEnter () {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave () {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate () {
    // console.log('debug beforeRouteUpdate')
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
  },
  watch: {
    testValue: {
      handler () {},
      deep: true
    },
    testValue1 (oldVal, newVal) {}
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
