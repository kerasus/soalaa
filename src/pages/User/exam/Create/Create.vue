<template>
  <div class="exam-create-panel">
    <q-scroll-observer @scroll="onScroll" />
    <steps v-model:step="currentTab"
           :loading="draftExam.loading"
           :isConfirmd="draftExamIsConfirmed"
           :disabled="draftExamIsConfirmed || !subscribed"
    />
    <q-tab-panels v-if="subscribed && !draftExamIsConfirmed"
                  v-model="currentTab"
                  animated
    >
      <q-tab-panel :disable="draftExamIsConfirmed"
                   name="createPage">
        <exam-info-tab ref="createPage"
                       v-model:exam="draftExam"
                       :gradesList="gradesList"
                       :majorList="majorList"
                       @nextTab="goToNextStep"
        />
      </q-tab-panel>
      <q-tab-panel :disable="draftExamIsConfirmed"
                   name="chooseQuestion">
        <question-selection-tab ref="chooseQuestion"
                                v-model:exam="draftExam"
                                @update:exam="onSecondTabUpdate"
                                @nextTab="goToNextStep"
                                @lastTab="goToPrevStep"
                                @addQuestionToExam="bulkAttachQuestionsOfDraftExam"
                                @deleteQuestionFromExam="bulkDetachQuestionsOfDraftExam"
        />
      </q-tab-panel>
      <q-tab-panel :disable="draftExamIsConfirmed"
                   name="finalApproval">
        <final-approval-tab ref="finalApproval"
                            v-model:exam="draftExam"
                            :majors="majorList"
                            :grades="gradesList"
                            @detachQuestion="bulkDetachQuestionsOfDraftExam"
                            @updateOrders="replaceQuestionsOfDraftExam"
                            @previousStep="goToPrevStep"
                            @confirmExam="confirmDraftExam"
        />
      </q-tab-panel>
    </q-tab-panels>
    <div v-else-if="subscribed && draftExamIsConfirmed">
      <div class="confirmed-draft-exam-page">
        <div class="icon-section">
          <svg width="100%"
               height="100%"
               viewBox="0 0 290 290"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <circle cx="144.5"
                    cy="145.5"
                    r="122.5"
                    fill="url(#paint0_linear_2989_11788)" />
            <path
              d="M145 235C194.5 235 235 194.5 235 145C235 95.5 194.5 55 145 55C95.5 55 55 95.5 55 145C55 194.5 95.5 235 145 235Z"
              stroke="#4CAF50"
              stroke-width="10"
              stroke-linecap="round"
              stroke-linejoin="round" />
            <path d="M106.75 145L132.22 170.47L183.25 119.53"
                  stroke="#4CAF50"
                  stroke-width="10"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
            <defs>
              <linearGradient id="paint0_linear_2989_11788"
                              x1="144.5"
                              y1="-10.5"
                              x2="144.5"
                              y2="268"
                              gradientUnits="userSpaceOnUse">
                <stop stop-color="white"
                      stop-opacity="0" />
                <stop offset="1"
                      stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div class="message">
          آزمون شما با موفقیت ساخته شد
        </div>
        <div class="actions-section">
          <q-btn flat
                 class="btn-go-to-exam-list"
                 :to="{name: 'User.Exam.List'}"
          >
            مشاهده آزمون در پنل کاربری
          </q-btn>
          <q-btn flat
                 class="btn-go-to-print-exam">
            دانلود فایل آزمون
          </q-btn>
        </div>
      </div>
    </div>
    <div v-else-if="!subscribed"
         class="subscription-error">
      <div class="subscription-error-title">شما دسترسی برای ایجاد آزمون ندارید</div>
      <q-btn color="primary"
             unelevated
             label="تهیه اشتراک"
             @click="gotoSubscription" />
    </div>
    <q-dialog v-model="createDraftExamMessageDialog">
      <q-card
        flat
        class="report-problem-dialog"
      >
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="close"
          class="close-btn"
        />
        <q-card-section class="problem-type no-padding">
          <q-icon name="isax:tick-circle"
                  size="110px" />
          <div class="title-style text-center"
               style="padding-bottom: 20px">
            آزمون شما با موفقیت ثبت شد
          </div>
          <q-btn
            unelevated
            color="primary"
            class="btn-lg final-btn"
            :to="{name :'Admin.Exam.Index'}"
          >
            رفتن به صفحه لیست آزمون
          </q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="continueWithOldDraftExamConfirmationDialog"
              persistent>
      <q-card class="draft-dialog">
        <q-btn v-close-popup
               flat
               class="close-btn"
               icon="close"
               @click="clearDraftExam" />
        <q-card-section class="flex column items-center">
          <div class="exam-icon">
            <q-icon size="70px"
                    name="isax:info-circle" />
          </div>
          <div class="exam-slogan">
            یک آزمون نیمه تمام دارید، آیا می خواهید آن را تکمیل کنید؟
          </div>
          <div class="exam-info">
            <div class="exam-title">نام آزمون: {{ draftExam.title }}</div>
            <div class="exam-major">رشته: {{ draftMajor }}</div>
            <div class="exam-grade">پایه: {{ draftGrade }}</div>
          </div>
        </q-card-section>
        <q-card-actions class="flex flex-center">
          <q-btn label="خیر"
                 class="cancel-draft"
                 unelevated
                 @click="clearDraftExam"
          />
          <q-btn label="بله، ادامه می‌دهم"
                 color="primary"
                 unelevated
                 @click="setDraftExam"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Exam } from 'src/models/Exam'
import mixinTree from 'src/mixin/Tree'
import API_ADDRESS from 'src/api/Addresses'
import Steps from 'pages/Admin/exam/Create/Steps'
import ExamInfoTab from 'components/CommonComponents/Exam/Create/ExamInfoTab/ExamInfoTab'
import FinalApprovalTab from 'components/CommonComponents/Exam/Create/FinalApprovalTab/FinalApprovalTab'
import QuestionSelectionTab from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionSelectionTab'
import { computed } from 'vue'

export default {
  name: 'Create',
  components: {
    Steps,
    ExamInfoTab,
    FinalApprovalTab,
    QuestionSelectionTab
  },
  props: {
    userRule: {
      type: String
    }
  },
  provide() {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  mixins: [
    mixinTree
  ],
  data() {
    return {
      scrollInfo: {},
      subscribed: true,
      draftExamIsConfirmed: false,
      draftExam: new Exam(),
      gradesList: [],
      majorList: [],
      oldTab: 'createPage',
      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      createDraftExamMessageDialog: false,
      continueWithOldDraftExamConfirmationDialog: false
    }
  },
  created() {
    this.draftExam.loading = true
    this.checkSubscription().then((res) => {
      if (res.data.data) {
        this.subscribed = true
        this.getData()
      } else {
        this.currentTab = 'notSubscribed'
        this.draftExam.loading = false
        this.subscribed = false
      }
    }).catch((e) => {
      this.subscribed = false
      this.draftExam.loading = false
    })
  },
  computed: {
    draftMajor() {
      const major = this.majorList.find(x => x.id === this.draftExam.temp.major)
      if (!major) {
        return ''
      }
      return major.value
    },
    draftGrade() {
      const grade = this.gradesList.find(x => x.id === this.draftExam.temp.grade)
      if (!grade) {
        return ''
      }
      return grade.title
    }
  },
  watch: {
    currentTab(newStep) {
      this.onChangeTab(newStep)
    }
  },
  methods: {
    onScroll(info) {
      this.scrollInfo = info
    },
    getData() {
      this.draftExam.loading = true
      this.getOptions()
        .then(() => {
          this.getDraftExam()
            .then(response => {
              if (response.data?.data) {
                this.loadDraftExam(response.data.data)
                this.continueWithOldDraftExamConfirmationDialog = true
              } else {
                this.loadDraftExam()
              }
            })
            .catch(() => {
              this.draftExam.loading = false
            })
        })
    },
    getDraftExam() {
      return this.$axios.get(API_ADDRESS.exam.user.draft())
    },
    getOptions() {
      return Promise.all([
        this.getGradesList(),
        this.loadMajorList()
      ])
    },
    checkSubscription() {
      return this.$axios.get(API_ADDRESS.user.feature('exam'))
    },
    getGradesList() {
      return new Promise((resolve, reject) => {
        this.getRootNode('test')
          .then(response => {
            this.gradesList = response.data.data.children
            resolve(response)
          }).catch(() => {
            reject()
          })
      })
    },
    loadMajorList() {
      return new Promise((resolve, reject) => {
        this.$axios.get(API_ADDRESS.option.user('major_type'))
          .then((response) => {
            this.majorList = response.data.data
            resolve(response)
          }).catch(() => {
            reject()
          })
      })
    },
    loadDraftExam(draftExam) {
      this.draftExam = new Exam(draftExam)
      if (this.draftExam.id) {
        this.loadAttachedQuestions()
      }
    },
    setDraftExam() {
      this.currentTab = this.allTabs[this.draftExam.temp.level - 1]
      this.continueWithOldDraftExamConfirmationDialog = false
    },
    clearDraftExam() {
      this.$axios.delete(API_ADDRESS.exam.user.draft()).then((res) => {
        this.draftExam = new Exam()
        this.goToFirstStep()
        this.continueWithOldDraftExamConfirmationDialog = false
        this.showMessagesInNotify(['آزمون قبلی شما با موفقیت پاک شد'], 'positive')
      }).catch(() => {
        this.showMessagesInNotify(['مشکلی رخ داده است'])
      })
    },
    onSecondTabUpdate() {
      this.updateExam('chooseQuestion')
    },
    onLessonChanged(lessonId) {
      this.updateExam('chooseQuestion')
    },
    getNextTabName() {
      return this.allTabs[this.getTabIndex(this.currentTab) + 1]
    },
    getPrevTabName() {
      return this.allTabs[this.getTabIndex(this.currentTab) - 1]
    },
    getTabIndex(tab) {
      return this.allTabs.indexOf(tab)
    },
    getFirstStepName() {
      return this.allTabs[0]
    },
    getlastStepName() {
      return this.allTabs[this.allTabs.length - 1]
    },
    goToFirstStep() {
      this.currentTab = this.getFirstStepName()
    },
    goToPrevStep() {
      this.currentTab = this.getPrevTabName()
    },
    goToLastStep() {
      this.currentTab = this.getlastStepName()
    },
    goToNextStep() {
      const nextStep = this.getNextTabName()
      if (!nextStep) {
        this.goToLastStep()
        return
      }

      this.currentTab = nextStep
    },
    onChangeTab(newStep) {
      const stepValidation = this.$refs[`${this.oldTab}`].isValid()
      const currentTabIndex = this.getTabIndex(this.currentTab)
      const oldTabIndex = this.getTabIndex(this.oldTab)

      if (stepValidation && stepValidation.error && oldTabIndex < currentTabIndex) {
        this.showMessagesInNotify(stepValidation.messages)
        this.currentTab = this.oldTab
        return false
      }

      const hasOldDraftExam = !!this.draftExam.id
      if (oldTabIndex === 0 && hasOldDraftExam) {
        this.updateExam(newStep)
          .then(response => {
            this.draftExam.loading = false
            this.currentTab = newStep
            this.oldTab = newStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      } else if (oldTabIndex === 0 && !hasOldDraftExam) {
        this.createExam()
          .then(response => {
            this.loadDraftExam(response.data.data)
            this.draftExam.loading = false
            this.currentTab = newStep
            this.oldTab = newStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      } else if (oldTabIndex < currentTabIndex) {
        this.updateExam(newStep)
          .then(response => {
            this.draftExam.loading = false
            this.currentTab = newStep
            this.oldTab = newStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      } else {
        this.currentTab = newStep
        this.oldTab = newStep
      }

      return true
    },
    createExam() {
      this.draftExam.loading = true
      // return this.$axios.post(API_ADDRESS.exam.user.draftExam.create, this.draftExam.loadApiResource())
      return this.$axios.post(API_ADDRESS.exam.user.draftExam.create, {
        title: this.draftExam.title,
        temp: {
          major: this.draftExam.temp.major,
          grade: this.draftExam.temp.grade,
          level: 2
        }
      })
    },
    updateExam(newStep) {
      return this.$axios.put(API_ADDRESS.exam.user.draftExam.update(this.draftExam.id), {
        enable: this.draftExam.enable,
        title: this.draftExam.title,
        temp: {
          major: this.draftExam.temp.major,
          lesson: this.draftExam.temp.lesson,
          grade: this.draftExam.temp.grade,
          tags: this.draftExam.temp.tags,
          level: newStep === 'createPage' ? 1 : newStep === 'chooseQuestion' ? 2 : 3
        }
      })
    },
    loadAttachedQuestions() {
      this.draftExam.loading = true
      return this.$axios.post(API_ADDRESS.exam.user.draftExam.getAttachedQuestions(this.draftExam.id))
        .then((response) => {
          this.draftExam.questions.clear()
          this.draftExam.questions.add(...response.data.data)
          this.draftExam.loading = false
        })
        .catch(() => {
          this.draftExam.loading = false
        })
    },
    bulkAttachQuestionsOfDraftExam(questions) {
      this.draftExam.loading = true
      let lastOrder = this.draftExam.questions.list.length
      return this.$axios.post(API_ADDRESS.exam.user.draftExam.bulkAttachQuestions(this.draftExam.id), {
        questions: questions.map(question => {
          return {
            question_id: question.id,
            order: ++lastOrder
          }
        })
      })
        .then(() => {
          this.loadAttachedQuestions()
        })
        .catch(() => {
          this.loadAttachedQuestions()
        })
    },
    bulkDetachQuestionsOfDraftExam(questions) {
      this.draftExam.loading = true
      return this.$axios.post(API_ADDRESS.exam.user.draftExam.bulkDetachQuestions(this.draftExam.id), {
        detaches: questions.map(question => {
          return {
            question_id: question.id
          }
        })
      })
        .then(() => {
          this.loadAttachedQuestions()
        })
        .catch(() => {
          this.loadAttachedQuestions()
        })
    },
    replaceQuestionsOfDraftExam(questions) {
      this.draftExam.loading = true
      return this.$axios.post(API_ADDRESS.exam.user.draftExam.replaceQuestions(this.draftExam.id), {
        questions: questions.map(question => {
          return {
            question_id: question.id,
            order: question.order
          }
        })
      })
        .then(() => {
          this.loadAttachedQuestions()
          this.draftExam.loading = false
        })
        .catch(() => {
          this.draftExam.loading = false
        })
    },
    showMessagesInNotify(messages, type) {
      if (!type) {
        type = 'negative'
      }

      messages.forEach((message) => {
        this.$q.notify({
          type,
          message
        })
      })
    },
    confirmValidation() {
      let error = false
      const messages = []
      if (!this.draftExam.title) {
        error = true
        messages.push('عنوان آزمون مشخص نشده است.')
      }
      if (this.draftExam.questions.list.length === 0) {
        error = true
        messages.push('هیچ سوالی انتخاب نشده است.')
      }

      return { error, messages }
    },
    confirmDraftExam() {
      this.draftExam.loading = true
      const confirmValidation = this.confirmValidation()
      if (confirmValidation.error) {
        this.showMessagesInNotify(confirmValidation.messages)
        this.draftExam.loading = false
      } else {
        this.draftExam.enable = true
        this.updateExam('chooseQuestion')
          .then(() => {
            this.showMessagesInNotify(['آزمون شما با موفقیت ساخته شد.'], 'positive')
            // this.$router.push({ name: 'User.Exam.List' })
            this.currentTab = 'confirmedPage'
            this.draftExam.loading = false
            this.draftExamIsConfirmed = true
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      }
    },
    gotoSubscription() {
      this.$router.push({ name: 'subscription' })
    }
  }
}
</script>

<style scoped lang="scss">
.exam-create-panel {
  &:deep(.q-tab-panels) {
    background: transparent;
    padding: 30px 0 0 0;

    .q-tab-panel {
      padding: 0;
    }
  }

  @media screen and (max-width: 1919px) {
    width: 100%;
    .q-tab-panel {
      padding: 0;
    }
  }
  @media screen and (max-width: 1439px) {
    //.q-tab-panel {
    //  padding: 30px 30px 0 30px !important;
    //}
  }
  @media screen and (max-width: 599px) {
    .q-tab-panel {
      //padding: 16px 16px 0 16px !important;
    }
  }

  .report-problem-dialog {
    position: relative;

    .close-btn {
      position: absolute;
      top: 12px;
      left: 12px;
      z-index: 1000000;
    }

    border-radius: 15px;
    padding: 24px;

    .title-style {
      font-style: normal;
      font-weight: 400;
      font-size: 18px;
      line-height: 31px;
      color: #23263B;
      margin-bottom: 8px;
    }

    .problem-type {
      display: flex;
      margin-top: 10px;
      width: 300px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .q-icon {
        color: #4CAF50;
        padding-bottom: 28px;
      }

      .final-btn {
        padding-right: 25px;
        padding-left: 25px;
      }
    }

    .problem-description {
      margin-top: 16px;
    }

    .action-box {
      margin-top: 20px;

      .btn-style {
        border-radius: 10px;
        color: #23263B;
        width: 96px;
        height: 40px;
      }

      .cancel {
        background-color: #F4F5F6;
      }
    }
  }

  .confirmed-draft-exam-page {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;

    .icon-section {
      width: 245px;
      height: 245px;
      @media screen and (max-width: 1439px) {
        width: 194px;
        height: 194px;
      }
      @media screen and (max-width: 1023px) {
        width: 245px;
        height: 245px;
      }
      @media screen and (max-width: 599px) {
        width: 168px;
        height: 168px;
      }
    }

    .message {
      font-weight: 700;
      font-size: 24px;
      line-height: 37px;
      text-align: center;
      letter-spacing: -0.03em;
      color: #6D708B;
      @media screen and (max-width: 1023px) {
        font-size: 22px;
        line-height: 34px;
      }
      @media screen and (max-width: 599px) {
        font-size: 18px;
        line-height: 28px;
      }
    }

    .actions-section {
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;

      .q-btn {
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        letter-spacing: -0.03em;
        color: #8075DC;
        font-weight: 600;
        margin-top: 5px;
        @media screen and (max-width: 599px) {
          font-size: 14px;
          line-height: 22px;
        }
      }
    }
  }

  .subscription-error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 100px;

    .subscription-error-title {
      font-weight: 700;
      font-size: 24px;
      line-height: 37px;
      text-align: center;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 100px;
    }

    @media screen and (max-width: 1023px) {
      font-size: 22px;
      line-height: 34px;
    }
    @media screen and (max-width: 599px) {
      font-size: 18px;
      line-height: 28px;
    }
  }
}

.draft-dialog {
  width: 348px;
  height: 343px;
  background: #FFFFFF;
  border-radius: 18px;
  position: relative;

  .close-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    color: #6D708B;
  }

  .exam-icon {
    color: #F2A9A7;
  }

  .exam-slogan {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    text-align: center;
    color: #434765;
    margin-top: 20px;
  }

  .exam-info {
    margin: 10px 0 20px;

    .exam-title {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
      color: #6D708B;
    }

    .exam-major {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
      color: #6D708B;
      margin: 4px 0;
    }

    .exam-grade {
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 19px;
      color: #6D708B;
    }
  }

  .cancel-draft {
    width: 144px;
    height: 40px;
    background: #F2F5F9;
    border-radius: 8px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: #6D708B;
  }
}
</style>
