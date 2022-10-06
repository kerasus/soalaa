<template>
  <div class="create-exam-panel">
    <div class="exam-create-panel">
      <steps v-model:step="currentTab"
             :loading="draftExam.loading"
             @update:step="onChangeTab"
      />
      <q-tab-panels v-model="currentTab"
                    animated
      >
        <q-tab-panel name="createPage">
          <exam-info-tab ref="createExam"
                         v-model:exam="draftExam"
                         :gradesList="gradesList"
                         :majorList="majorList"
                         @nextTab="goToNextStep"
          />
        </q-tab-panel>
        <q-tab-panel name="chooseQuestion">
          <question-selection-tab v-model:exam="draftExam"
                                  v-model:lesson="draftExam.temp.lesson"
                                  @nextTab="goToNextStep"
                                  @lastTab="goToPrevStep"
                                  @addQuestionToExam="bulkAttachQuestionsOfDraftExam"
                                  @deleteQuestionFromExam="bulkDetachQuestionsOfDraftExam"
          />
        </q-tab-panel>
        <q-tab-panel name="finalApproval">
          <final-approval-tab v-model:exam="draftExam"
                              :majors="majorList"
                              :grades="gradesList"
                              @detachQuestion="bulkDetachQuestionsOfDraftExam"
                              @updateOrders="replaceQuestionsOfDraftExam"
                              @creatFinalExam="submitFinalExam"
                              @goToNextStep="goToNextStep"
          />
        </q-tab-panel>
      </q-tab-panels>
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
        <q-card>
          <q-card-section class="row items-center">
            <div class="q-ma-md">
              شما یک آزمون ساخته شده دارید ، آیا تمایل به ادامه فرآیند ساخت آن دارید؟
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn v-close-popup
                   flat
                   label="انصراف"
                   color="primary"
                   @click="clearDraftExam" />
            <q-btn v-close-popup
                   label="ادامه"
                   color="primary"
                   @click="setDraftExam" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
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
  mixins: [
    mixinTree
  ],
  data() {
    return {
      draftExam: new Exam(),
      gradesList: [],
      majorList: [],
      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      createDraftExamMessageDialog: false,
      continueWithOldDraftExamConfirmationDialog: false
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.getOptions()
        .then(() => {
          this.getDraftExam()
            .then(response => {
              if (!response.data?.data) {
                return
              }
              this.continueWithOldDraftExamConfirmationDialog = true
              this.loadDraftExam(response.data.data)
            })
            .catch(() => {
            })
        })
    },
    getDraftExam () {
      return this.$axios.get(API_ADDRESS.exam.user.draft())
    },
    getOptions () {
      return Promise.all([
        this.getGradesList(),
        this.loadMajorList()
      ])
    },
    loadDraftExam (draftExam) {
      this.draftExam = new Exam(draftExam)
      this.loadAttachedQuestions()
    },
    setDraftExam () {
      // load tab page based on draftExam level
    },
    clearDraftExam () {
      this.draftExam = new Exam()
    },
    createAndLoadNewDraftExam () {
      this.createExam(this.draftExam)
        .then(response => {
          this.draftExam = new Exam(response.data.data)
        })
        .catch(() => {

        })
    },
    getNextTabName () {
      return this.allTabs[this.getCurrentTabIndex() + 1]
    },
    getPrevTabName () {
      return this.allTabs[this.getCurrentTabIndex() - 1]
    },
    getCurrentTabIndex () {
      return this.allTabs.indexOf(this.currentTab)
    },
    getFirstStepName () {
      return this.allTabs[0]
    },
    getlastStepName () {
      return this.allTabs[this.allTabs.length - 1]
    },
    goToFirstStep () {
      this.currentTab = this.getFirstStepName()
    },
    goToPrevStep () {
      this.currentTab = this.getPrevTabName()
    },
    goToLastStep () {
      // this.currentTab = this.getlastStepName()
      // this.setFinalStep()
    },
    getStep1Validation () {
      let error = false
      const messages = []
      if (!this.draftExam.title) {
        error = true
        messages.push('عنوان آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.major) {
        error = true
        messages.push('رشته آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.grade) {
        error = true
        messages.push('پایه آزمون مشخص نشده است.')
      }

      return { error, messages }
    },
    getStep2Validation () {
      let error = false
      const messages = []
      if (!this.draftExam.title) {
        error = true
        messages.push('عنوان آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.major) {
        error = true
        messages.push('رشته آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.grade) {
        error = true
        messages.push('پایه آزمون مشخص نشده است.')
      }

      return { error, messages }
    },
    getStep3Validation () {
      let error = false
      const messages = []
      if (!this.draftExam.title) {
        error = true
        messages.push('عنوان آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.major) {
        error = true
        messages.push('رشته آزمون مشخص نشده است.')
      }
      if (!this.draftExam.temp.grade) {
        error = true
        messages.push('پایه آزمون مشخص نشده است.')
      }

      return { error, messages }
    },
    goToNextStep () {
      const nextStep = this.getNextTabName()
      if (!nextStep) {
        this.goToLastStep()
        return
      }

      this.onChangeTab(nextStep)
      this.currentTab = nextStep
    },
    onChangeTab (newStep) {
      let stepValidation = null
      const currentTabIndex = this.getCurrentTabIndex()
      if (currentTabIndex === 0) {
        stepValidation = this.getStep1Validation()
      }

      if (stepValidation && stepValidation.error) {
        this.showMessagesInNotify(stepValidation.messages)
      }

      const hasOldDraftExam = !!this.draftExam.id
      if (currentTabIndex === 0 && hasOldDraftExam) {
        this.updateExam()
          .then(response => {
            this.draftExam.loading = false
            this.currentTab = newStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      } else if (currentTabIndex === 0 && !hasOldDraftExam) {
        this.createExam()
          .then(response => {
            this.loadDraftExam(response.data.data)
            this.draftExam.loading = false
            this.currentTab = newStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      }

      // if (currentTabIndex === 1) {
      //
      // }
      this.currentTab = newStep
    },
    createExam () {
      this.draftExam.loading = true
      return this.$axios.post(API_ADDRESS.exam.user.create, this.draftExam)
    },
    updateExam (params) {
      return this.$axios.put(API_ADDRESS.exam.user.draftExam.update(this.draftExam.id), this.draftExam)
    },
    loadAttachedQuestions () {
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
          this.draftExam.loading = false
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
          this.draftExam.loading = false
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

    // setFinalStep() {
    //   // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
    //   this.createExam().then((createExam) => {
    //     this.exam = new Exam(createExam.data.data)
    //     // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
    //     this.createDraftExamMessageDialog = true
    //   }).catch(err => {
    //     console.error('err', err)
    //     // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
    //   })
    // },

    getGradesList () {
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
    loadMajorList () {
      return new Promise((resolve, reject) => {
        this.$axios.get(API_ADDRESS.option.user('major_type'))
          .then((response) => {
            this.majorList = response.data.data
            resolve(response)
          }).catch(() => {
            reject()
          })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.create-exam-panel {
  display: flex;

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
  }
}
</style>
