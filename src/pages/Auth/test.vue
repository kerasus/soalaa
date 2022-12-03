<template>
  <h5>THIS COMPONENT IS JUST FOR TEST</h5>
  <div class="text-center flex justify-center items-center">

    <!--    <div class="video-player-container ">-->
    <!--      <video-player-->
    <!--        :sources="videosSrc"-->
    <!--        poster="https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/video%20tubmail.jpg" />-->
    <!--    </div>-->

  </div>
</template>

<script>
// import VideoPlayer from 'components/VideoPlayer'
// import { PlayerSourceList } from 'src/models/PlayerSource'
import QuestionHandler from 'src/questionRepairer/QuestionHandler'

export default {
  name: 'Test',
  // components: { VideoPlayer },
  mixins: [],
  data () {
    return {
      // videosSrc: new PlayerSourceList([
      //   { link: 'https://nodes.alaatv.com/media/968/HD_720p/968102dftr.mp4', ext: 'mp4', size: null, caption: 'کیفیت بالا', res: '480p' }
      // ]),
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
  methods: {
    run () {
      this.$axios.get('allquestions.json')
        .then((res) => {
          const a = new QuestionHandler(res.data, this.$axios)
          a.run().then(() => {
            console.log('a.attachExamList', a.attachExamList)
          })
          // console.log('res.data.length', res.data.length)
        })
    }
  },
  computed: {

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
  // mounted () {
  // const video = this.$refs.videoPlayer
  // if (video) {
  // console.log('hasta')
  // }
  // console.log('debug mounted')
  // },
  mounted() {
    this.run()
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
