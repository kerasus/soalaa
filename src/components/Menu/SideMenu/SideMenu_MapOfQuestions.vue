<template>
  <div class="map-of-questions">
    <div class="side-logo">
      <div class="logo-image">
        <q-img
          src="https://3a.alaatv.com/img/logo-1.png"
          width="150px"
        />
      </div>
    </div>
    <q-list class="questions-list">
      <div
        v-for="(categoryItem) in quiz.categories.list"
        :key="'category-'+categoryItem.id"
        class="menu-body"
      >
        <div v-if="categoryItem.is_active">
          <q-item v-if="categoryItem.is_active"
                  class="category-item">
            <q-item-section class="category-item-section">
              <q-item-label class="category-item-label">
                {{ categoryItem.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-for="(subcategoryItem) in categoryItem.sub_categories.list"
            :key="'subcategory-'+subcategoryItem.id"
            flat
            group
            dense
            :label="subcategoryItem.title"
            :header-class="'lessons-expansion'"
          >
            <div
              v-for="(question, index) in getQuestionsOfSubcategory(subcategoryItem.id)"
              :key="index"
              class="expansion-items"
            >
              <q-btn
                flat
                class="questions-btn"
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
    </q-list>
    <div class="end-exam">
      <SendAnswers />
    </div>
  </div>
</template>

<script>
import ExamData from 'src/assets/js/ExamData'
import mixinQuiz from 'src/mixin/Quiz'
import SendAnswers from 'components/Menu/SideMenu/SendAnswers'
import Time from 'src/plugins/time'

export default {
  name: 'SideMenuMapOfQuestions',
  components: { SendAnswers },
  js: [ExamData],
  mixins: [mixinQuiz],
  data: () => ({
    currentCat: null
  }),
  created () {
    const that = this
    this.interval = setInterval(() => {
      that.currentCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
    }, 1000)
  },
  methods: {
    getUserQuestionData (questionId) {
      if (!this.quiz.user_exam_id || !questionId || !this.userQuizListData[this.quiz.user_exam_id]) {
        return false
      }
      return this.userQuizListData[this.quiz.user_exam_id][questionId]
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
      this.sendUserQuestionsDataToServerAndFinishExam(this.quiz.user_exam_id)
        .then(() => {
          // that.$notify({
          //   group: 'notifs',
          //   text: 'اطلاعات آزمون شما ثبت شد.',
          //   type: 'success'
          // })
          that.$store.commit('clearExamData', that.quiz.user_exam_id)
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          // that.$notify({
          //   group: 'notifs',
          //   title: 'توجه!',
          //   text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
          //   type: 'error',
          //   duration: 30000
          // })
          that.$router.push({ name: 'user.exam.list' })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.map-of-questions {
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: white;

  .side-logo {
    display: flex;
    height: 167px;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    @media screen and (max-width: 1919px) {
      height: 136px;
    }
    @media screen and (max-width: 1439px) {
      height: 100px;
    }
    @media screen and (max-width: 599px) {
      height: 110px;
    }

    .logo-image {
      width: 140px;
      height: 95px;
      @media screen and (max-width: 1919px) {
        height: 76px;
      }
      @media screen and (max-width: 1439px) {
        width: 100px;
        height: 50px;
      }

      .q-img__container {
        width: 140px;
        height: 95px;
        @media screen and (max-width: 1919px) {
          height: 76px;
        }
        @media screen and (max-width: 1439px) {
          width: 100px;
          height: 50px;
        }
      }
    }
  }

  .questions-list {
    max-width: 260px;

    .menu-body {
      margin-bottom: 40px;

      .category-item {
        .category-item-section {
          .category-item-label {
            display: flex;
            color: #666;
            height: 36px;
            font-size: 20px;
            margin: auto;
          }
        }
      }

      .expansion-items {
        display: flex;

        .questions-btn {
          margin: auto;
          color: #666;

          &.active {
            color: var(--accent-1);
          }
        }
      }
    }

    margin-bottom: 100px;
  }

  .end-exam {
    position: sticky;
    display: flex;
    justify-content: center;
    bottom: 0;
    width: 240px;
    z-index: 5;
    background: #fff;
  }
}
</style>

<style lang="scss">
.map-of-questions {
  .questions-list {
    .menu-body {
      .lessons-expansion {
        font-size: 18px !important;
        padding: 8px 30px !important;
      }
    }
  }
}
</style>
