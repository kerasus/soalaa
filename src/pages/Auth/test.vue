<template>
  <div>
    <h5>THIS COMPONENT IS JUST FOR TEST</h5>
    <video-player   :sources="videosSrc"
                    poster="https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/video%20tubmail.jpg" />
  </div>
</template>

<script>
import VideoPlayer from 'components/VideoPlayer'
import { PlayerSourceList } from 'src/models/PlayerSource'
export default {
  name: 'Test',
  components: { VideoPlayer },
  mixins: [],
  data () {
    return {
      videosSrc: new PlayerSourceList([
        // { link: 'https://nodes.alaatv.com/media/1612/HD_720p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت عالی', res: '720p' },
        { link: 'https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/landing%20video.mp4', ext: 'mp4', size: null, caption: 'کیفیت بالا', res: '480p' }
        // { link: 'https://nodes.alaatv.com/media/1612/240p/1612005jkiq.mp4', ext: 'mp4', size: null, caption: 'کیفیت متوسط', res: '240p' }
      ]),
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
  computed: {},
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

</style>
