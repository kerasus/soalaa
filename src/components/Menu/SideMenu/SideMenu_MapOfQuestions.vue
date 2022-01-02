<template>
      <div
        class="map-of-questions"
      >
        <div
          :style="{ 'padding-bottom': '100px' }" >
        <div
          v-for="(categoryItem) in quiz.categories.list"
          :key="'category-'+categoryItem.id"
        >
          <q-btn
            flat
            class="categoryItem"
          >
            {{ categoryItem.title }}
          </q-btn>
          <q-expansion-item
            v-for="(subcategoryItem) in categoryItem.sub_categories.list"
            :key="'subcategory-'+subcategoryItem.id"
            flat
            group
            dense
            :label="subcategoryItem.title"
          >
            <div
              v-for="(question) in getQuestionsOfSubcategory(subcategoryItem.id)"
              :key="'question-'+question.id"
            >
              <q-btn
                flat
                :class="{ active: currentQuestion.id === question.id }"
                block
                @click="changeQuestion(question.id)"
              >
                تست شماره
                {{ getQuestionNumberFromIndex(question.index) }}
                <q-icon
                  v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'x'"
                  color="red"
                  name="mdi-close"
                />
                <q-icon
                  v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).status === 'o'"
                  color="yellow"
                  size="15"
                  name="mdi-checkbox-blank-circle"
                />
                <q-icon
                  v-if="getUserQuestionData(question.id) && getUserQuestionData(question.id).answered_choice_id"
                  color="green"
                  name="mdi-check"
                />
              </q-btn>
            </div>
              </q-expansion-item>
      </div>
        </div>
        <div class="end-exam">
          <q-btn
            v-if="false"
            :color="'#4caf50'"
            :style="{ backgroundColor: '#4caf50 !important' }"
            dark
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
.end-exam {
  position: absolute;
  display: flex;
  justify-content: center;
  bottom: 0;
  width: 240px;
  z-index: 5;
  background: #fff;
  padding: 20px 0;
}

.map-of-questions .q-expansion-item .q-expansion-item__content{
  color: #666;
  height: 36px;
  transition: all ease-in-out 0.3ms;
  padding: 11px 24px;

}

.map-of-questions .q-expansion-item--expanded .q-item {
  background: var(--primary-1);
  border-radius: 40px;
  min-height: 42px !important;
  max-height: 42px !important;
  padding: 5px 24px;
  color: white;
}

.map-of-questions .q-expansion-item__content {
  padding: 16px 24px;
}

.map-of-questions .q-btn__content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.map-of-questions .q-btn {
  background: var(--surface-1) !important;
}

.map-of-questions .q-expansion-item__container .q-expansion-item__content .active {
  color: var(--accent-1)!important;
}

.question-container .question-answers .answer-box,
.map-of-questions .q-expansion-item .q-expansion-item__content  .q-btn {
  width: 100%;
  font-size: 0.87rem;
}
.map-of-questions .categoryItem.q-btn {
  display: flex;
  color: #666;
  height: 36px;
  width: 100%;
  padding: 0px 24px;
  font-size: 1.2rem;
  margin-top: 50px;
}
.map-of-questions .q-expansion-item .q-item {
  font-size: 1.1rem;
}
</style>
