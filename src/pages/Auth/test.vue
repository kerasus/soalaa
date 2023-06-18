<template>
  <div>
    THIS COMPONENT IS JUST FOR TEST
  </div>
</template>

<script>
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
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.video-player-container{
  width: 700px;
  height: auto;
  border-radius: 20px;
}
</style>
