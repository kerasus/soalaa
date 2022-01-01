<template>
      <div
        class="map-of-questions"
        :style="{ 'padding-bottom': '100px' }"
      >
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
                  color="--success-1"
                  name="mdi-check"
                />
              </q-btn>
            </div>
              </q-expansion-item>
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

<style scoped>
.end-exam {
  position: absolute;
  width: 240px;
  bottom: -78px;
  z-index: 5;
  background: #fff;
  padding: 20px 0;
}

.end-exam-btn .q-btn__content {
  display: flex;
  justify-content: center !important;
}

.map-of-questions {
  min-height: 42px !important;
  width: 80%;
  height: calc(100% - 200px);
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.map-of-questions .q-expansion-item {
  transition: all ease-in-out 0.3s;
  min-height: 52px;
  padding: 11px 24px;

}

.map-of-questions .theme--light.q-expansion-item .q-expansion-item-active .q-btn {
  color: var(--text-3);
}

.map-of-questions .q-expansion-item-active {
  background: var(--primary-1);
  border-radius: 40px;
  min-height: 42px !important;
  max-height: 42px !important;
  padding: 5px 24px;
  color: white;
}

.map-of-questions .q-expansion-item-wrap {
  padding: 16px 24px;
}

.map-of-questions .q-btn {
  font-size: 1.8ch;
  padding: 0 24px;
  color: #666;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.map-of-questions .q-btn {
  background: var(--surface-1) !important;
}

.v-navigation-drawer .q-navigation-drawer__content .map-of-questions .theme--light.q-btn__content {
  color: var(--accent-1);
}

.question-container .question-answers .answer-box,
.map-of-questions .q-expansion-item .q-btn.-size--default {
  font-size: 0.87rem;
}
.map-of-questions .categoryItem.q-btn {
  font-size: 1.2rem;
  margin-top: 50px;
}
.map-of-questions .q-expansion-item{
  font-size: 1.2rem;
}
</style>
