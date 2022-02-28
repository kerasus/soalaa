<template>
  <q-layout>
    <q-page-container>
      <div class="char-results">
        <p class="exam-title">
          نتیجه تست شخصیت شناسی MBTI
        </p>
        <div
          class="char-info"
          :style="{ background: result.charBg }"
        >
            <div class="container full-height">
              <div class="row">
                <p class="char-type-title-mobile">
                 {{ mbtiGroup }}
                  <span>{{ 'تیپ شخصیتی ' + result.type }}</span>
                </p>
              </div>
              <div class="full-height row safari-flex">
                <div class="col-lg-5 col-sm-6 col-12 text-box-order"
                >
                  <div class="char-info-text full-height">
                    <p class="char-type-title">
                        {{ mbtiGroup }}
                      <span>{{ 'تیپ شخصیتی ' + result.type }}</span>
                    </p>
                    <div class="char-details">
                      <p>
                        <span>افراد {{ result.type }}</span>
                      </p>
                      <p v-html="mbtiBartleData.mbtiType[result.type].shortText"/>
                    </div>
                  </div>
                </div>
                <div class="col-lg-7 col-sm-6 col-12 img-box-order" >
                  <q-img :src="mbtiBartleData.mbtiType[result.type].image1"/>
                </div>
              </div>
            </div>

        </div>
        <div class="container">
          <div class="row justify-center mbti-detail-box-parent"
          dir="ltr"
          >
            <div
              class="col-md-6 col-12 mitra"
              v-for="(item, index) in result.details"
              :key="index"
              dir="rtl"
            >
              <div
                class="mbti-detail-box"
              >
                <div :class="{ 'variable-box': true, active: item.values[0].percent > 50 }">
                  <div class="variable-label">
                    {{ item.values[0].label }}
                  </div>
                  <span>
                    {{ item.values[0].title }}
                  </span>
                  <span>
                    {{ item.values[0].percent }}٪
                  </span>
                </div>
                <div class="variable-details">
                  <p class="variable-title">
                    {{ item.title }}
                  </p>
                  <p class="variable-description">
                    {{ item.text }}
                  </p>
                  <div class="progress-bar">
                    <q-linear-progress
                      :value="item.values[0].percent > 50 ? item.values[0].percent/100 :item.values[1].percent/100"
                      rounded
                      :reverse="item.values[1].percent > 50"
                      track-color="white"
                      size="12px"
                    />
                  </div>
                </div>
                <div :class="{ 'variable-box': true, active: item.values[1].percent > 50 }">
                  <div class="variable-label">
                    {{ item.values[1].label }}
                  </div>
                  <span>
                    {{ item.values[1].title }}
                  </span>
                  <span>
                    {{ item.values[1].percent }}٪
                  </span>
                </div>
              </div>
            </div>
          </div>

        <div class="row type-explanation justify-center">
          <p class="type-header">
            ویژگی های شخصیت {{ result.type }}
          </p>
          <div class="banner">
            <q-img :src="mbtiBartleData.mbtiType[result.type].image2"/>
          </div>
          <p
            class="full"
            v-html="mbtiBartleData.mbtiType[result.type].text"
          />
        </div>
        </div>
        <p class="exam-title">
          نتیجه تست Bartle
        </p>
        <div
          v-if="bartleResult[0]"
          class="char-results-bartle"
        >
        <div class="container q-mb-lg">
          <div class="row main-result justify-center">
            <div class="column items-center">
              <p class="your-type">
                تیپ شخصیتی شما
              </p>
              <q-circular-progress
                show-value
                reverse
                class="mt-4 bartle-item-circle"
                :value="bartleResult[0].value"
                color="red"
                size="240px"
                :thickness="0.1"
                track-color="grey-4"
              >
                <div class="inside-bartle-result-circle  q-pa-lg">
                  <q-img :src="bartleResult[0].image"/>
                </div>
              </q-circular-progress>
              <p
                class="your-type-bartle"
              >
                {{ bartleResult[0].text }} {{ bartleResult[0].value }}%
              </p>
            </div>
          </div>
          <div class="row other-result q-mt-lg ">
            <div class="other-result-circular-progress-box">
              <div
                v-for="item in 3"
                :key="item"
                class="circular-progress-box"
              >
                <q-circular-progress
                  show-value
                  reverse
                  :value="bartleResult[item].value"
                  color="red"
                  size="125px"
                  :thickness="0.1"
                  track-color="grey-4"
                  @click="changeSelectedBartleItem(bartleResult[item])"
                >
                  <div class="inside-bartle-result-circle q-pa-md q-pa-xs-none">
                    <q-img
                      :src="bartleResult[item].image"
                    />
                  </div>
                </q-circular-progress>
                <p class="other-type-bartle">
               {{ bartleResult[item].text }} {{ bartleResult[item].value }}%
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div v-if="selectedBartleItem">
          <div class="row type-explanation container" >
            <p class="type-header">
              ویژگی های شخصیت {{ selectedBartleItem.text }}
            </p>
            <p
              class="full"
              v-html="selectedBartleItem.fullText"
            />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mixinDrawer, mixinQuiz } from 'src/mixin/Mixins'
import mbtiData from 'src/assets/js/MBTI_Bartle_Data'
import ExamData from 'src/assets/js/ExamData'

export default {
  name: 'MBTIBartle',
  mixins: [mixinDrawer, mixinQuiz],
  data () {
    return {
      selectedBartleItem: null,
      result: {
        type: 'INTP',
        details:
          [
            {
              title: 'انرژی',
              text: 'از کجا انرژی میگیرید و کجا مصرفش میکنید؟',
              values: [
                {
                  title: 'برونگرایی',
                  percent: 24,
                  label: 'E'
                },
                {
                  title: 'درونگرایی',
                  percent: 76,
                  label: 'I'
                }
              ]
            },
            {
              title: 'جمع آوری اطلاعات',
              text: 'ترجیح شما در جمع آوری اطلاعات چگونه است؟',
              values: [
                {
                  title: 'شهودی',
                  percent: 72,
                  label: 'N'
                },
                {
                  title: 'حسی',
                  percent: 28,
                  label: 'S'
                }
              ]
            },
            {
              title: 'تصمیم گیری',
              text: 'ترجیح شما در تصمیم گیری چگونه است؟',
              values: [
                {
                  title: 'احساسی',
                  percent: 33,
                  label: 'F'
                },
                {
                  title: 'منطقی',
                  percent: 67,
                  label: 'T'
                }
              ]
            },
            {
              title: 'اجرا',
              text: 'ترجیح شما در سازماندهی و اجرای تصمیمات چگونه است؟',
              values: [
                {
                  title: 'منعطف',
                  percent: 44,
                  label: 'P'
                },
                {
                  title: 'ساختارمند',
                  percent: 56,
                  label: 'J'
                }
              ]
            }
          ],
        charBg: '#eae6ff'
      },
      examData: null
    }
  },
  computed: {
    mbtiGroup () {
      return mbtiData.mbtiType[this.result.type].farsiTitle
    },
    mbtiBartleData () {
      return mbtiData
    },
    bartleResult () {
      const results = []
      if (!this.result.bartle) {
        return results
      }
      Object.keys(this.result.bartle).forEach(key => {
        results.push({ key, value: this.result.bartle[key] })
      })
      results.forEach(item => {
        item.text = mbtiData.bartleKeys.find(bartle => bartle.value === item.key).label
        item.fullText = mbtiData.bartleKeys.find(bartle => bartle.value === item.key).fullText
        item.image = mbtiData.bartleKeys.find(bartle => bartle.value === item.key).image
      })

      const sortedResult = results.sort((first, second) => {
        if (first.value < second.value) {
          return 1
        } else {
          return -1
        }
      })

      return sortedResult
    }
  },
  watch: {
    bartleResult (newValue) {
      this.selectedBartleItem = newValue[0]
    }
  },
  created () {
    this.$store.commit('AppLayout/updateDrawer', true)
    window.currentExamQuestions = null
    window.currentExamQuestionIndexes = null
    this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })

    // const quizId = this.$route.params.exam_id
    // if (!this.userQuizListData || !this.userQuizListData[quizId] || !this.currentExamQuestions) {
    //   this.$router.push({name: 'user.exam.list'})
    //   return
    // }
    this.drawer = false
  },
  mounted () {
    const examId = this.$route.params.exam_id
    const userExamId = this.$route.params.user_exam_id
    let questions = []
    const that = this

    const examData = new ExamData()
    examData.getUserExamWithCorrectAnswers(userExamId, examId)
      .loadQuestionsFromFile()
      .getUserExamData(userExamId)
      .run()
      .then(() => {
        // save questions in localStorage
        questions = examData.exam.questions.list
        that.saveCurrentExamQuestions(examData.exam.questions.list)
        // save exam info in vuex store (remove questions of exam then save in store)
        that.$store.commit('quiz/updateQuiz', examData.exam)
        that.$store.commit('quiz/mergeDbAnswersIntoLocalstorage', {
          dbAnswers: examData.userExamData,
          exam_id: examData.exam.id
        })

        this.examData = examData

        examData.userExamData.choices.forEach(choice => {
          questions.forEach(question => {
            if (question.id === choice.question_id) {
              question.choices.list.forEach(questionChoice => {
                if (questionChoice.id === choice.choice_id) {
                  questionChoice.active = true
                }
              })
            }
          })
        })
        this.generateAnswer(questions)
      })
      .catch(() => {
        that.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        that.goToExamList()
        // that.$notify({
        //   group: 'notifs',
        //   title: 'توجه!',
        //   text: 'مشکلی در دریافت اطلاعات کارنامه رخ داده است.',
        //   type: 'error'
        // })
      })
  },
  methods: {
    changeSelectedBartleItem (bartle) {
      this.selectedBartleItem = bartle
    },
    generateAnswer (questions) {
      const answer = this.calculateExam(questions)
      const finalAnswer = {}
      finalAnswer.type = this.getMbtiTypeFromAnswers(answer)
      finalAnswer.details = this.getMbtiDetailsFromAnswers(answer)
      finalAnswer.charBg = this.getMbtiBg(finalAnswer.type)
      finalAnswer.bartle = this.getBartleResults(answer)
      this.result = finalAnswer
      this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })

      this.$store.commit('quiz/setPsychometricAnswer', finalAnswer)
    },
    getMbtiBg (type) {
      if (!mbtiData.mbtiType[type]) {
        return ''
      }
      return mbtiData.mbtiType[type].backgroundColor
    },
    getBartleResults (answer) {
      const bartleResults = {}
      mbtiData.bartleKeys.forEach(item => {
        const bartleItrem = answer[Object.keys(answer)[1]]
        bartleResults[item.value] = bartleItrem[item.text].ratio
      })
      return bartleResults
    },
    getMbtiDetailsFromAnswers (answer) {
      const details = []
      for (let i = 0; i < 4; i++) {
        const title = mbtiData.mbtiGroups[i].title
        const text = mbtiData.mbtiGroups[i].text
        const values = []
        if (!answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]]) {
          return
        }
        values.push({
          title: mbtiData.mbtiKeys[2 * i].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]].ratio,
          label: mbtiData.mbtiKeys[2 * i].value
        })
        if (!answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]]) {
          return
        }
        values.push({
          title: mbtiData.mbtiKeys[2 * i + 1].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]].ratio,
          label: mbtiData.mbtiKeys[2 * i + 1].value
        })
        details.push({
          title,
          text,
          values
        })
      }
      return details
    },
    getMbtiTypeFromAnswers (answer) {
      let type = ''

      if (!answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[0].text]) {
        return type
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[0].text].ratio > 50) {
        type += mbtiData.mbtiKeys[0].value
      } else {
        type += mbtiData.mbtiKeys[1].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[2].text].ratio > 50) {
        type += mbtiData.mbtiKeys[2].value
      } else {
        type += mbtiData.mbtiKeys[3].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[4].text].ratio > 50) {
        type += mbtiData.mbtiKeys[4].value
      } else {
        type += mbtiData.mbtiKeys[5].value
      }

      if (answer[Object.keys(answer)[0]][mbtiData.mbtiKeys[6].text].ratio > 50) {
        type += mbtiData.mbtiKeys[6].value
      } else {
        type += mbtiData.mbtiKeys[7].value
      }

      return type
    },
    calculateExam (questions) {
      const answer = {}
      questions.forEach(question => { // set the sub categories in the answer obj
        if (!answer[question.sub_category.id]) {
          answer[question.sub_category.id] = {}
        }

        question.choices.list.forEach(choice => { // set the values in the answer obj
          if (!answer[question.sub_category.id][choice.answer]) {
            answer[question.sub_category.id][choice.answer] = {
              repeat: 0,
              possible: 0,
              ratio: 0
            }
          }
        })
      })

      questions.forEach(question => {
        question.choices.list.forEach(choice => {
          answer[question.sub_category.id][choice.answer].possible++
          if (choice.active) {
            answer[question.sub_category.id][choice.answer].repeat++
          }
        })
      })

      Object.keys(answer).forEach((subCategory) => {
        Object.keys(answer[subCategory]).forEach((value) => {
          answer[subCategory][value].ratio = Math.round(answer[subCategory][value].repeat / answer[subCategory][value].possible * 100)
        })
      })

      return answer
    }
  }
}
</script>

<style scoped lang="scss">
.bartle-item-circle {
  cursor: pointer;
}
.test{
  border: 2px solid mediumvioletred;
}
.test2{
  border: 2px solid #5486f1;
}
.container {
  max-width: 1185px;
  margin: 0 auto;
  padding: 15px;
}
.full-height {
  height: 100%;
}

.banner {
  margin-bottom: 50px;
  @media only screen and (max-width: 990px) {
    margin-bottom: 30px;
  }
}

.char-results {
  background: white;

  .exam-title {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    padding-top: 30px;
  }

  .char-info {
    height: 400px;
    @media only screen and (max-width: 1263px) {
      height: 300px;
    }
    @media only screen and (max-width: 599px) {
      height: auto;
    }
    .safari-flex{
      display: -webkit-flex;
    }
    .text-box-order{
      /* Safari 6.1+ */
      -webkit-order: 1;
      order: 1;
      @media only screen and (max-width: 599px) {
        -webkit-order: 3;
        order: 3;

      }
    }
    .img-box-order{
      -webkit-order: 1;
      order: 1;
      @media only screen and (max-width: 599px) {
        -webkit-order: 2;
        order: 2;
      }
    }
    .container {
      @media only screen and (max-width: 959px) {
        padding: 20px;
      }
    }

    .char-type-title-mobile {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      display: none;
      @media only screen and (max-width: 600px) {
        display: block;
      }
    }

    .char-info-text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .char-type-title {
        font-size: 20px;
        font-weight: 500;
        @media only screen and (max-width: 600px) {
          display: none;
        }
        span {
          margin-right: 15px;
          @media only screen and (max-width: 959px) {
            display: block;
            margin-right: 0;
            margin-top: 10px;
          }
        }
      }

      .char-details {
        background: #fff;
        border-radius: 20px;
        width: 400px;
        padding: 24px;
        @media only screen and (max-width: 959px) {
          width: 300px;
          padding: 14px 24px;
        }
        @media only screen and (max-width: 767px) {
          width: 264px;
          padding: 14px 24px;
          p {
            margin-bottom: 0;
          }
        }
        @media only screen and (max-width: 600px) {
          width: 100%;
        }

        p {
          font-size: 16px;
          text-align: justify;
          font-weight: 500;

          span {
            display: block;
            color: #f6c30a;
            margin-bottom: 15px;
          }
        }
      }
    }
  }

  .mbti-detail-box-parent {
    margin: 38px 0;
    @media only screen and (max-width: 767px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 599px) {
      margin: 16px 0;
    }
    .mbti-detail-box{
      margin: 12px;
    }

    :nth-child(1) .mbti-detail-box {
      background-image: linear-gradient(100deg,rgba(242, 255, 242, 0.4) 2%, rgba(212, 255, 213, 0.4) 90%);
      color: #4caf50;

      .variable-box:nth-child(1) * {
        opacity: 0.5;
      }

      .variable-box.active .variable-label {
        background: #4caf50;
        opacity: 1 !important;
        color: #fff;
      }
    }

    :nth-child(2) .mbti-detail-box {
      background-image: linear-gradient(100deg, rgba(203, 194, 255, 0.4) 2%, rgba(244, 243, 255, 0.4) 90%);
      color: #7e57c2;

      .variable-box:nth-child(3) * {
        opacity: 0.5;
      }

      .variable-box.active .variable-label {
        background: #7e57c2;
        color: #fff;
        opacity: 1 !important;
      }
    }

    :nth-child(3) .mbti-detail-box {
      background-image: linear-gradient(100deg, rgba(255, 248, 238, 0.4) 2%, rgba(255, 227, 190, 0.4) 90%);
      color: #ff9100;

      .variable-box:nth-child(1) * {
        opacity: 0.5;
      }

      .variable-box.active .variable-label {
        background: #ff9100;
        color: #fff;
        opacity: 1 !important;
      }
    }

    :nth-child(4) .mbti-detail-box {
      background-image: linear-gradient(100deg, rgba(172, 217, 255, 0.4) 2%, rgba(243, 250, 255, 0.4) 90%);
      color: #1e88e5;

      .variable-box:nth-child(3) * {
        opacity: 0.5;
      }

      .variable-box.active .variable-label {
        background: #1e88e5;
        color: #fff;
        opacity: 1 !important;
      }
    }

    .mbti-detail-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px 20px;
      //opacity: 0.4;
      border-radius: 30px;
      height: 156px;
      @media only screen and (max-width: 599px) {
        padding: 14px 10px;
      }

      .variable-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .variable-label {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-weight: 500;
          padding-top: 4px;
        }

        span {
          display: block;
        }

        * {
          text-align: center;
        }
      }

      .variable-details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        @media only screen and (max-width: 959px) {
          width: 66%;
        }

        .variable-title {
          margin: 0;
          height: 50px;
          font-size: 20px;
          @media only screen and (max-width: 767px) {
            font-size: 18px;
          }
        }

        .variable-description {
          margin: 0;
          text-align: center;
        }

        .progress-bar {
          width: 360px;
          height: 18px;
          @media only screen and (max-width: 1263px) {
            width: 260px;
          }
          @media only screen and (max-width: 959px) {
            width: 100%;
          }

        }
      }
    }
  }

  .type-explanation {
    .banner{
      width: 100%;
    }
    .full {
      font-size: 16px;
      text-align: justify;
      color: rgba(0, 0, 0, 0.87);
    }

    .type-header {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }
  }
}

.exam-title {
  margin-bottom: 25px;
}

.char-results-bartle {
  margin-bottom: 18px;
  height: 680px;
  background-color: #ffe6e6;
  @media only screen and (max-width: 599px) {
    height: 800px;
  }

  .main-result {
    .inside-bartle-result-circle {
      background: #fff;
      width: 220px;
      z-index: 0;
      height: 220px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 767px) {
        width: 180px;
        height: 180px;
      }
    }

    .v-progress-circular {
      @media only screen and (max-width: 767px) {
        width: 200px !important;
        height: 200px !important;
      }
    }
    .your-type-bartle {
      font-size: 40px;
      font-weight: bold;
      margin: 20px 0;
      color: rgba(0, 0, 0, 0.87);
    }
  }

  .other-result {
    justify-content: center;
    max-width: 700px !important;
    margin: 50px auto;
    .other-result-circular-progress-box{
      display: flex;
      width: 100%;
      justify-content: space-around;
      @media only screen and (max-width: 600px) {
        flex-direction: column;
      }
    }
    .circular-progress-box{
      margin: 0 15px;
      display: flex;
      flex-direction: column;
      @media only screen and (max-width: 600px) {
        margin: 10px 0;
       flex-direction: row;
        justify-content: center;
      }
    }
    .inside-bartle-result-circle {
      background: #fff;
      width: 115px;
      height: 115px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 767px) {
        width: 90px;
        height:90px;
      }
    }
    .other-type-bartle {
      min-width: 117px;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      margin: 20px 0;
      color: rgba(0, 0, 0, 0.87);
      @media only screen and (max-width: 600px) {
        margin: 0 20px;
        display: flex;
        align-items: center;
      }

    }
    .col {
      max-width: 700px !important;
    }
  }

  .your-type {
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    margin-top: 18px;
  }

}
</style>

<style lang="scss">

.main-result{
  .q-circular-progress{
    @media only screen and (max-width: 767px) {
      font-size: 200px !important;
    }
  }
}
.other-result{
  .q-circular-progress{
    @media only screen and (max-width: 767px) {
      font-size: 100px !important;
    }
  }
}
.char-results{
  .mbti-detail-box-parent {
    .mbti-detail-box{
      .variable-details{
        .progress-bar{
          .q-linear-progress{
            border-radius: 6px ;
            box-shadow: 0 5px 10px 0 rgba(126, 87, 194, 0.2);
          }
        }
      }
    }
  }
}
.char-results{
  .mbti-detail-box-parent {
    :nth-child(1){
      .mbti-detail-box{
        .variable-details{
          .progress-bar{
            .q-linear-progress{
              .q-linear-progress__model{
                color: #4caf50 !important;
              }
            }
          }
        }
      }
    }
    :nth-child(2){
      .mbti-detail-box{
        .variable-details{
          .progress-bar{
            .q-linear-progress{
              .q-linear-progress__model{
                color: #7e57c2 ;
              }
            }
          }
        }
      }
    }
    :nth-child(3){
      .mbti-detail-box{
        .variable-details{
          .progress-bar{
            .q-linear-progress{

              .q-linear-progress__model{
                color: #ff9100 ;
              }
            }
          }
        }
      }
    }
    :nth-child(4){
      .mbti-detail-box{
        .variable-details{
          .progress-bar{
            .q-linear-progress{
              .q-linear-progress__model{
                color: #1e88e5 ;
              }
            }
          }
        }
      }
    }
  }
}

.char-results .mbti-detail-box-parent :nth-child(n) .mbti-detail-box .progress-bar .progress-right .v-progress-linear__determinate {
  left: 0;
  right: auto;
}

.char-results .mbti-detail-box-parent :nth-child(n) .mbti-detail-box .progress-bar .progress-right .v-progress-linear__background {
  right: 0 !important;
}

@media (min-width: 1904px) {
  .container {
    max-width: 1185px;
  }
}

.space {
  @media only screen and (max-width: 990px) {
    max-height: 20px !important;
    overflow: hidden;
  }
}
</style>
