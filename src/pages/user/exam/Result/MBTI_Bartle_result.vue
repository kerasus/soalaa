<template>
  <div class="char-results">
    <p class="exam-title">
      نتیجه تست شخصیت شناسی MBTI
    </p>
    <div
      class="char-info"
      :style="{ background: result.charBg }"
    >
      <v-container class="full-height">
        <v-row no-gutters>
          <v-col>
            <p class="char-type-title-mobile d-block d-sm-none">
              {{ mbtiGroup }}
              <span>{{ 'تیپ شخصیتی ' + result.type }}</span>
            </p>
          </v-col>
        </v-row>
        <v-row
          class="full-height flex-column flex-sm-row"
          no-gutters
        >
          <v-col
            lg="5"
            sm="6"
            class="d-flex flex-row"
            order="2"
            order-sm="1"
          >
            <div class="char-info-text">
              <p class="char-type-title d-none d-sm-block">
                {{ mbtiGroup }}
                <span>{{ 'تیپ شخصیتی ' + result.type }}</span>
              </p>
              <div class="char-details">
                <p>
                  <span>افراد {{ result.type }}</span>
                </p>
                <p v-html="mbtiBartleData.mbtiType[result.type].shortText" />
              </div>
            </div>
          </v-col>
          <v-col
            order="1"
            lg="7"
            sm="6"
            order-sm="2"
          >
            <v-img :src="mbtiBartleData.mbtiType[result.type].image1" />
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container>
      <v-row class="d-flex mbti-detail-box-parent">
        <v-col
          v-for="(item, index) in result.details"
          :key="index"
          md="6"
          cols="12"
          dir="ltr"
        >
          <div
            class="mbti-detail-box"
            dir="rtl"
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
                <v-progress-linear
                  v-if="item.values[0].percent > 50"
                  :value="item.values[0].percent"
                  elevation="3"
                  color="white"
                  rounded
                  height="12"
                  class="progress-left"
                />
                <v-progress-linear
                  v-else
                  :value="item.values[1].percent"
                  elevation="3"
                  color="white"
                  rounded
                  height="12"
                  class="progress-right"
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
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col class="type-explanation">
          <p class="type-header">
            ویژگی های شخصیت {{ result.type }}
          </p>
          <div :style="{ height: '450px' }">
            <v-img :src="mbtiBartleData.mbtiType[result.type].image2" />
          </div>
          <p
            class="full"
            v-html="mbtiBartleData.mbtiType[result.type].text"
          />
        </v-col>
      </v-row>
    </v-container>
    <p class="exam-title">
      نتیجه تست Bartle
    </p>
    <div
      v-if="bartleResult[0]"
      class="char-results-bartle"
    >
      <v-container>
        <v-row class="main-result">
          <v-col class="d-flex flex-column align-center">
            <p class="your-type">
              تیپ شخصیتی شما
            </p>
            <v-progress-circular
              class="mt-4 bartle-item-circle"
              :rotate="-90"
              :size="240"
              :width="10"
              :value="bartleResult[0].value"
              color="#ef5350"
              @click="changeSelectedBartleItem(bartleResult[0])"
            >
              <div class="inside-bartle-result-circle  pa-10">
                <v-img :src="bartleResult[0].image" />
              </div>
            </v-progress-circular>
            <p class="your-type-bartle">
              {{ bartleResult[0].text }} {{ bartleResult[0].value }}%
            </p>
          </v-col>
        </v-row>
        <v-row class="other-result">
          <v-col class="d-flex flex-sm-row flex-column justify-space-around">
            <div
              v-for="item in 3"
              :key="item"
              class="d-flex flex-sm-column flex-row align-center justify-center"
            >
              <v-progress-circular
                class="mt-4 bartle-item-circle"
                :rotate="-90"
                :size="125"
                :width="6"
                :value="bartleResult[item].value"
                color="#ef5350"
                @click="changeSelectedBartleItem(bartleResult[item])"
              >
                <div class="inside-bartle-result-circle pa-6">
                  <v-img
                    :src="bartleResult[item].image"
                  />
                </div>
              </v-progress-circular>
              <p class="other-type-bartle mr-6 mr-sm-0">
                {{ bartleResult[item].text }}  {{ bartleResult[item].value }}%
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-container v-if="selectedBartleItem">
      <v-row>
        <v-col class="type-explanation">
          <p class="type-header">
            ویژگی های شخصیت {{ selectedBartleItem.text }}
          </p>
          <p
            class="full"
            v-html="selectedBartleItem.fullText"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import {mixinDrawer} from "@/mixin/Mixins";
import mbtiData from "@/assets/js/MBTI_Bartle_Data";
import {mixinQuiz} from "@/mixin/Mixins"
import ExamData from "@/assets/js/ExamData";
export default {
  name: "MBTIBartle",
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
              },
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
              },
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
              },
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
              },
            ]
          },
        ],
        charBg: '#eae6ff'
      },
      examData: null,
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
      let results = []
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
    window.currentExamQuestions = null
    window.currentExamQuestionIndexes = null
    this.$store.commit('AppLayout/updateOverlay', {show: true, loading: true, text: ''})

    // const quizId = this.$route.params.exam_id
    // if (!this.userQuizListData || !this.userQuizListData[quizId] || !this.currentExamQuestions) {
    //   this.$router.push({name: 'user.exam.list'})
    //   return
    // }
    this.drawer = false
  },
  mounted () {
    const exam_id = this.$route.params.exam_id
    const user_exam_id = this.$route.params.user_exam_id
    let questions = []
    let that = this

    let examData = new ExamData()
    examData.getUserExamWithCorrectAnswers(user_exam_id, exam_id)
        .loadQuestionsFromFile()
        .getUserExamData(user_exam_id)
        .run()
        .then(() => {
          // save questions in localStorage
          questions = examData.exam.questions.list
          that.saveCurrentExamQuestions(examData.exam.questions.list)
          // save exam info in vuex store (remove questions of exam then save in store)
          that.$store.commit('updateQuiz', examData.exam)
          that.$store.commit('mergeDbAnswersIntoLocalstorage', {
            dbAnswers: examData.userExamData,
            exam_id: examData.exam.id
          })

          this.examData = examData

          examData.userExamData.choices.forEach(choice => {
            questions.forEach(question => {
              if (question.id === choice.question_id)
              question.choices.list.forEach(questionChoice => {
                if (questionChoice.id === choice.choice_id) {
                  questionChoice.active = true
                }
              })
            })
          })
          this.generateAnswer(questions)
        })
        .catch(() => {
          that.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
          that.goToExamList()
          that.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'مشکلی در دریافت اطلاعات کارنامه رخ داده است.',
            type: 'error'
          })
        })
  },
  methods: {
    changeSelectedBartleItem (bartle) {
      this.selectedBartleItem = bartle
    },
    generateAnswer (questions) {
      let answer = this.calculateExam(questions)
      let finalAnswer = {}
      finalAnswer.type = this.getMbtiTypeFromAnswers(answer)
      finalAnswer.details = this.getMbtiDetailsFromAnswers(answer)
      finalAnswer.charBg = this.getMbtiBg(finalAnswer.type)
      finalAnswer.bartle = this.getBartleResults(answer)
      this.result = finalAnswer
      this.$store.commit('AppLayout/updateOverlay', {show: false, loading: true, text: ''})

      this.$store.commit('setPsychometricAnswer', finalAnswer)
    },
    getMbtiBg (type) {
      if (!mbtiData.mbtiType[type]) {
        return ''
      }
      return mbtiData.mbtiType[type].backgroundColor
    },
    getBartleResults (answer) {
      let bartleResults = {}
      mbtiData.bartleKeys.forEach(item => {
        const bartleItrem = answer[Object.keys(answer)[1]]
        bartleResults[item.value] = bartleItrem[item.text].ratio
      })
      return bartleResults
    },
    getMbtiDetailsFromAnswers (answer) {
      let details = []
      for (let i = 0; i < 4; i++) {
        let title = mbtiData.mbtiGroups[i].title
        let text = mbtiData.mbtiGroups[i].text
        let values = []
        if (!answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]]) {
          return
        }
        values.push({
          title: mbtiData.mbtiKeys[2 * i].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[0]].ratio,
          label: mbtiData.mbtiKeys[2 * i].value,
        })
        if (!answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]]) {
          return
        }
        values.push({
          title: mbtiData.mbtiKeys[2 * i + 1].label,
          percent: answer[Object.keys(answer)[0]][mbtiData.mbtiGroups[i].value[1]].ratio,
          label: mbtiData.mbtiKeys[2 * i + 1].value,
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
      let answer = {}
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

.full-height {
  height: 100%;
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

    .container {
      @media only screen and (max-width: 959px) {
        padding: 20px;
      }
    }

    .char-type-title-mobile {
      text-align: center;
      font-size: 18px;
      font-weight: 500;
    }

    .char-info-text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .char-type-title {
        font-size: 20px;
        font-weight: 500;

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
    direction: ltr;
    margin: 38px 0;
    @media only screen and (max-width: 767px) {
      font-size: 14px;
    }
    @media only screen and (max-width: 599px) {
      margin: 16px 0;
    }

    :nth-child(1) .mbti-detail-box {
      background-image: linear-gradient(100deg, rgba(212, 255, 213, 0.4) 2%, rgba(242, 255, 242, 0.4) 90%);
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
      background-image: linear-gradient(100deg, rgba(244, 243, 255, 0.4) 2%, rgba(203, 194, 255, 0.4) 90%);
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
      background-image: linear-gradient(100deg, rgba(255, 227, 190, 0.4) 2%, rgba(255, 248, 238, 0.4) 90%);
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
      background-image: linear-gradient(100deg, rgba(243, 250, 255, 0.4) 2%, rgba(172, 217, 255, 0.4) 90%);
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
      direction: rtl;
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

          .v-progress-linear {
            box-shadow: 0 5px 10px 0 rgba(126, 87, 194, 0.2);
          }
        }
      }
    }
  }

  .type-explanation {

    .full {
      text-align: justify;
    }

    .type-header {
      font-size: 20px;
      font-weight: 500;
      text-align: center;
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
      width: 240px;
      height: 240px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 767px) {
        width: 200px;
        height: 200px;
      }
    }

    .v-progress-circular {
      @media only screen and (max-width: 767px) {
        width: 200px !important;
        height: 200px !important;
      }
    }
  }

  .other-result {
    justify-content: center;

    .inside-bartle-result-circle {
      background: #fff;
      width: 125px;
      height: 125px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      @media only screen and (max-width: 767px) {
        width: 100px;
        height: 100px;
      }
    }

    .v-progress-circular {
      @media only screen and (max-width: 767px) {
        width: 100px !important;
        height: 100px !important;
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

  .your-type-bartle {
    font-size: 40px;
    font-weight: bold;
    margin: 20px 0;
  }

  .other-type-bartle {
    font-size: 20px;
    font-weight: 500;
    margin: 20px 0;
  }
}
</style>

<style>
.char-results .mbti-detail-box-parent .mbti-detail-box .variable-details .progress-bar .v-progress-linear__background {
  opacity: 1 !important;
}

.char-results .mbti-detail-box-parent .mbti-detail-box .variable-details .progress-bar .v-progress-linear--rounded {
  border-radius: 6px;
}

.char-results .mbti-detail-box-parent :nth-child(1) .mbti-detail-box .progress-bar .v-progress-linear__determinate {
  background: #4caf50 !important;
}

.char-results .mbti-detail-box-parent :nth-child(2) .mbti-detail-box .progress-bar .v-progress-linear__determinate {
  background: #7e57c2 !important;
}

.char-results .mbti-detail-box-parent :nth-child(3) .mbti-detail-box .progress-bar .v-progress-linear__determinate {
  background: #ff9100 !important;
}

.char-results .mbti-detail-box-parent :nth-child(4) .mbti-detail-box .progress-bar .v-progress-linear__determinate {
  background: #1e88e5 !important;
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

</style>
