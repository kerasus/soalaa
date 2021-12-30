<template>
  <div>
      <q-list
        class="map-of-questions"
        :style="{ 'padding-bottom': '100px' }"
      >
          <q-btn
            flat
            :elevation="0"
            block
            label="دفترچه سوالات عمومی"
          />
          <q-expansion-item
            flat
            label="adabiat"
            expand-separator
            default-opened
          >
<!--            v-for="(subcategoryItem) in categoryItem.sub_categories.list"-->
<!--            :key="'subcategory-'+subcategoryItem.id"-->
<!--                v-for="(question) in getQuestionsOfSubcategory(subcategoryItem.id)"-->
<!--                :key="'question-'+question.id"-->
                  <q-btn
                    :elevation="0"
                    block
                    @click="changeQuestion(question.id)"
                  >
<!--                    :class="{ active: currentQuestion.id === question.id }"-->
                    تست شماره
                    {{ 1}}
                    <q-icon
                      color="red"
                      name="mdi-close"
                    />
<!--                    v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'x'"&ndash;&gt;-->
                    <q-icon
                      color="red"
                      name="mdi-checkbox-blank-circle"
                    />
                    <q-icon
                      color="red"
                      name="mdi-check"
                    />
                  </q-btn>
              </q-expansion-item>
      </q-list>
    <div class="end-exam">
      <q-btn
        v-if="false"
        :color="'#4caf50'"
        :style="{ backgroundColor: '#4caf50 !important' }"
        dark
        block
        class="end-exam-btn"
        @click="getConfirmation"
      >
        ارسال پاسخنامه
      </q-btn>
      <br>
      <br>
      <br>
      <br>
    </div>
  </div>
</template>
<script>
import ExamData from 'src/assets/js/ExamData'
import mixinQuiz from 'src/mixin/Quiz'
import Time from 'src/plugins/time'
// import Vue from 'vue'
// import VueConfirmDialog from 'vue-confirm-dialog'

// Vue.use(VueConfirmDialog)
// Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

export default {
  name: 'SideMenuMapOfQuestions',
  js: [ExamData],
  mixins: [mixinQuiz],
  data: () => ({
    currentCat: null
  }),
  created () {
    // this.getExamUserData()
    console.log(this.quiz.categories.list)
    const that = this
    this.interval = setInterval(() => {
      that.currentCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
    }, 1000)
  },
  methods: {
    getUserQuestionData (questionId) {
      if (!this.quiz.id || !questionId || !this.userQuizListData[this.quiz.id]) {
        return false
      }
      return this.userQuizListData[this.quiz.id][questionId]
    },
    getConfirmation () {
      const that = this
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'از ارسال پاسخ ها اطمینان دارید؟',
        button: {
          no: 'ادامه میدم',
          yes: 'ثبت میکنم'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          that.sendAnswersAndFinishExam()
        }
      })
    },
    sendAnswersAndFinishExam () {
      const that = this
      this.sendUserQuestionsDataToServerAndFinishExam(this.quiz.id, this.quiz.user_exam_id)
        .then(() => {
          that.$notify({
            group: 'notifs',
            text: 'اطلاعات آزمون شما ثبت شد.',
            type: 'success'
          })
          that.$store.commit('clearExamData', that.quiz.id)
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            type: 'error',
            duration: 30000
          })
          that.$router.push({ name: 'user.exam.list' })
        })
    }
  }
}
</script>

<style>
.map-of-questions {
  min-height: 42px !important;
  width: 80%;
  height: calc(100% - 200px);
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
