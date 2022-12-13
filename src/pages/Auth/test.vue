<template>
  <h5>THIS COMPONENT IS JUST FOR TEST</h5>
  <!--  <div class="text-center flex justify-center items-center">-->
  <q-btn @click="fixQuestions">fixQuestions</q-btn>
  ------------------------------------------
  <!--  <q-btn @click="fixQuestions">fixQuestions</q-btn>-->
  <q-btn @click="fixQuestions(0)">attach1</q-btn>
  <q-btn @click="fixQuestions(1)">attach2</q-btn>
  <q-btn @click="fixQuestions(2)">attach3</q-btn>
  <q-btn @click="fixQuestions(3)">attach4</q-btn>
  <q-btn @click="fixQuestions(4)">attach5</q-btn>
  <q-btn @click="fixQuestions(5)">attach6</q-btn>
  <q-btn @click="fixQuestions(6)">attach7</q-btn>
  <q-btn @click="fixQuestions(7)">attach8</q-btn>
  <q-btn @click="fixQuestions(8)">attach9</q-btn>
  <q-btn @click="fixQuestions(9)">attach10</q-btn>
  <q-btn @click="fixQuestions(10)">attach11</q-btn>
  <q-btn @click="fixQuestions(11)">attach12</q-btn>
  <q-btn @click="fixQuestions(12)">attach13</q-btn>
  <q-btn @click="fixQuestions(13)">attach14</q-btn>
  <q-btn @click="fixQuestions(14)">attach15</q-btn>
  <q-btn @click="fixQuestions(15)">attach16</q-btn>
  <q-btn @click="fixQuestions(16)">attach17</q-btn>
  <q-btn @click="fixQuestions(17)">attach18</q-btn>
  <q-btn @click="fixQuestions(18)">attach19</q-btn>
  <q-btn @click="fixQuestions(19)">attach20</q-btn>
<!--  <div>-->
<!--    from q {{this.index }} to q {{(this.index * this.count) + 10000}}-->
<!--  </div>-->
  <!--    <div class="video-player-container ">-->
  <!--      <video-player-->
  <!--        :sources="videosSrc"-->
  <!--        poster="https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/video%20tubmail.jpg" />-->
  <!--    </div>-->

<!--  </div>-->
</template>

<script>
// import VideoPlayer from 'components/VideoPlayer'
// import { PlayerSourceList } from 'src/models/PlayerSource'
import QuestionHandler from 'src/questionRepairer/QuestionHandler'
// import API_ADDRESS from 'src/api/Addresses'

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
      testValue1: '',
      testValue2: '',
      testValue3: '',
      testValue4: '',
      testValue5: '',
      testValue6: '',
      testValue7: '',
      allQuestions: [],
      allResult: [],
      count: 0,
      index: 0,
      sent: 0,
      countOfExamAttach: 0
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
    fixQuestions (index) {
      console.log('exam index', index)
      const attachExamObj = this.allResult[index]
      console.log('attachExamObj index', index)
      console.log('attachExamObj id', attachExamObj.examId)
      console.log('attachExamObj q length', attachExamObj.questions.length)
      // const examQuestions = []
      // examQuestions = attachExamObj.questions.slice(0, 120)
      // examQuestions = attachExamObj.questions.slice(120, 180)
      // examQuestions = attachExamObj.questions.slice(180, 240)
      // examQuestions = attachExamObj.questions.slice(240, 360)
      // examQuestions = attachExamObj.questions.slice(360, 480)
      // examQuestions = attachExamObj.questions.slice(480, attachExamObj.questions.length)
      // this.$axios.post(API_ADDRESS.exam.bulkAttachQuestions(), {
      //   exam_id: attachExamObj.examId,
      //   questions: examQuestions.map((questionModifier, index) => {
      //     return {
      //       order: index + 1,
      //       sub_category_id: '60b7875428f350277f04c5e3',
      //       question_id: questionModifier.question.id
      //     }
      //   })
      // })
    },
    run () {
      this.$axios.get('allquestions.json')
        .then((res) => {
          this.allQuestions = res.data
          // (this.allQuestions.length)
          const a = new QuestionHandler(this.allQuestions.slice(60001, (this.allQuestions.length)), this.$axios)
          a.run()
          // console.log('res.data.length', res.data.length)
        })
    },
    getFile () {
      this.$axios.get('result7.json')
        .then((res) => {
          this.allResult = res.data
          console.log('file loaded')
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
    window.countOfUR = 0
    window.countOfFlags = 0
    this.getFile()
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
