<template>
  <h5>THIS COMPONENT IS JUST FOR TEST</h5>
  <!--  <div class="text-center flex justify-center items-center">-->
  <q-btn @click="run">fixQuestions</q-btn>
  ------------------------------------------
  <q-btn @click="doesHaveFailedQuestion">doesHaveFailedQuestion</q-btn>
  ------------------------------------------
<!--  <q-btn @click="fixQuestions(0)">attach1</q-btn>-->
<!--  <q-btn @click="fixQuestions(1)">attach2</q-btn>-->
<!--  <q-btn @click="fixQuestions(2)">attach3</q-btn>-->
<!--  <q-btn @click="fixQuestions(3)">attach4</q-btn>-->
<!--  <q-btn @click="fixQuestions(4)">attach5</q-btn>-->
<!--  <q-btn @click="fixQuestions(5)">attach6</q-btn>-->
<!--  <q-btn @click="fixQuestions(6)">attach7</q-btn>-->
<!--  <q-btn @click="fixQuestions(7)">attach8</q-btn>-->
<!--  <q-btn @click="fixQuestions(8)">attach9</q-btn>-->
<!--  <q-btn @click="fixQuestions(9)">attach10</q-btn>-->
<!--  <q-btn @click="fixQuestions(10)">attach11</q-btn>-->
<!--  <q-btn @click="fixQuestions(11)">attach12</q-btn>-->
<!--  <q-btn @click="fixQuestions(12)">attach13</q-btn>-->
<!--  <q-btn @click="fixQuestions(13)">attach14</q-btn>-->
<!--  <q-btn @click="fixQuestions(14)">attach15</q-btn>-->
<!--  <q-btn @click="fixQuestions(15)">attach16</q-btn>-->
<!--  <q-btn @click="fixQuestions(16)">attach17</q-btn>-->
<!--  <q-btn @click="fixQuestions(17)">attach18</q-btn>-->
<!--  <q-btn @click="fixQuestions(18)">attach19</q-btn>-->
<!--  <q-btn @click="fixQuestions(19)">attach20</q-btn>-->
</template>

<script>
// import VideoPlayer from 'components/VideoPlayer'
// import { PlayerSourceList } from 'src/models/PlayerSource'
import QuestionHandler from 'src/questionRepairer/QuestionHandler'
// import API_ADDRESS from 'src/api/Addresses'
// import { saveAs } from 'file-saver'

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
          const a = new QuestionHandler(this.allQuestions.slice(70000, (this.allQuestions.length)), this.$axios)
          a.run()
          // console.log('res.data.length', res.data.length)
        })
    },
    getFile () {
      // this.$axios.get('result8.json')
      //   .then((res) => {
      //     this.allResult = res.data
      //     console.log('file loaded')
      //   })

      const promise1 = this.$axios.get('result1.json')
      const promise2 = this.$axios.get('result2.json')
      const promise3 = this.$axios.get('result3.json')
      const promise4 = this.$axios.get('result4.json')
      const promise5 = this.$axios.get('result5.json')
      const promise6 = this.$axios.get('result6.json')
      const promise7 = this.$axios.get('result7.json')
      const promise8 = this.$axios.get('result8.json')

      Promise.all([promise1, promise2, promise3, promise4, promise5, promise6, promise7, promise8]).then((res) => {
        this.fillAllResult(res[0].data)
        this.fillAllResult(res[1].data)
        this.fillAllResult(res[2].data)
        this.fillAllResult(res[3].data)
        this.fillAllResult(res[4].data)
        this.fillAllResult(res[5].data)
        this.fillAllResult(res[6].data)
        this.fillAllResult(res[7].data)
        // const fileName = 'allResult.json'
        // const fileToSave = new Blob([JSON.stringify(this.allResult)], {
        //   type: 'application/json'
        // })
        // saveAs(fileToSave, fileName)
        console.log('file loaded')
      })
    },
    fillAllResult(fileData) {
      const fileDataArray = [
        ...fileData
      ]
      fileDataArray.forEach(attachExamObj => {
        const foundedExamIndex = this.allResult.findIndex(examObj => examObj.exam_id === attachExamObj.examId)
        if (foundedExamIndex === -1) {
          this.allResult.push({
            exam_id: attachExamObj.examId,
            questions: attachExamObj.questions.map((questionModifier, index) => {
              return {
                order: index + 1,
                sub_category_id: '60b7875428f350277f04c5e3',
                question_id: questionModifier.question.id
              }
            })
          })
        } else {
          this.allResult[foundedExamIndex].questions.push(...attachExamObj.questions.map((questionModifier, index) => {
            return {
              order: index + 1,
              sub_category_id: '60b7875428f350277f04c5e3',
              question_id: questionModifier.question.id
            }
          }))
        }
      })
    },
    doesHaveFailedQuestion () {
      const allFailedQuestions = this.allResult.map(attachExamObj => {
        const failedQuestions = attachExamObj.questions.filter(question => question.updateFailed)
        if (failedQuestions && failedQuestions.length > 0) {
          return failedQuestions
        }
        return null
      }).filter(attachExamObj => attachExamObj)
      console.log('allFailedQuestions', allFailedQuestions)
    }
  },
  computed: {

  },
  mounted() {
    window.countOfUR = 0
    window.countOfFlags = 0
    // this.getFile()
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
