<template>
  <div class="create-exam-panel">
    <div class="exam-create-panel">
      <steps v-model:currentComponent="currentTab"
             @currentStepChanged = "changeTab" />
      <q-tab-panels v-model="currentTab"
                    animated>
        <q-tab-panel name="createPage">
          <exam-info-tab ref="createExam"
                         v-model:exam="draftExam"
                         :gradesList="gradesList"
                         :majorList="majorList"
                         @nextTab="goToNextStep" />
        </q-tab-panel>
        <q-tab-panel name="chooseQuestion">
          <question-selection-tab v-model:lesson="exam.temp.lesson"
                                  v-model:exam="exam"
                                  :questionLoading="exam.questions.loading"
                                  @nextTab="goToNextStep"
                                  @lastTab="goToLastStep"
                                  @addQuestionToExam="addQuestionToExam"
                                  @deleteQuestionFromExam="deleteQuestionFromExam" />
        </q-tab-panel>
        <q-tab-panel name="finalApproval">
          <!--          deleteQuestionFromExam-->
          <final-approval-tab v-model:exam="exam"
                              :majors="majorList"
                              :grades="gradesList"
                              @detachQuestion="bulkDetachLastStep"
                              @updateOrders="updateQuestionOrder"
                              @creatFinalExam="submitFinalExam"
                              @goToNextStep="goToNextStep" />
        </q-tab-panel>
      </q-tab-panels>
      <q-dialog v-model="createDraftExamMessageDialog">
        <q-card flat
                class="report-problem-dialog">
          <q-btn v-close-popup
                 flat
                 round
                 dense
                 icon="close"
                 class="close-btn" />
          <q-card-section class="problem-type no-padding">
            <q-icon name="isax:tick-circle"
                    size="110px" />
            <div class="title-style text-center"
                 style="padding-bottom: 20px">
              آزمون شما با موفقیت ثبت شد
            </div>
            <q-btn unelevated
                   color="primary"
                   class="btn-lg final-btn"
                   :to="{name :'Admin.Exam.Index'}">
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
import { Exam } from 'src/models/Exam.js'
import mixinTree from 'src/mixin/Tree.js'
import Steps from 'src/pages/Admin/exam/Create/Steps.vue'
import ExamInfoTab from 'src/components/CommonComponents/Exam/Create/ExamInfoTab/ExamInfoTab.vue'
import FinalApprovalTab from 'src/components/CommonComponents/Exam/Create/FinalApprovalTab/FinalApprovalTab.vue'
import QuestionSelectionTab from 'src/components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionSelectionTab.vue'

export default {
  name: 'tabPanel',
  components: {
    QuestionSelectionTab,
    FinalApprovalTab,
    ExamInfoTab,
    Steps
  },
  mixins: [
    mixinTree
  ],
  props: {
    userRule: {
      type: String
    }
  },
  data() {
    return {
      draftExam: new Exam(),
      gradesList: [],
      majorList: [],

      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      isExamDataInitiated: false,
      createDraftExamMessageDialog: false,
      accept: false,
      continueWithOldDraftExamConfirmationDialog: false
    }
  },
  watch: {
    currentTab (newTap) {

    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData () {
      this.getOptions()
        .then(() => {
          this.$apiGateway.exam.user.getUserDraftExam()
            .then((draftExam) => {
              // ToDo: must check
              if (!draftExam) {
                return
              }
              this.continueWithOldDraftExamConfirmationDialog = true
              this.loadDraftExam(draftExam)
            })
            .catch(() => {
            })
        })
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
        .then(exam => {
          this.draftExam = new Exam(exam)
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
    goToLastStep () {
      this.currentTab = this.getlastStepName()
      this.setFinalStep()
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
      // if (!this.draftExam.temp.grade) {
      //   error = true
      //   messages.push('پایه آزمون مشخص نشده است.')
      // }

      return { error, messages }
    },
    validateStep2 () {
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
      // if (!this.draftExam.temp.grade) {
      //   error = true
      //   messages.push('پایه آزمون مشخص نشده است.')
      // }

      return { error, messages }
    },
    validateStep3 () {
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
      // if (!this.draftExam.temp.grade) {
      //   error = true
      //   messages.push('پایه آزمون مشخص نشده است.')
      // }

      return { error, messages }
    },
    goToNextStep () {
      const nextStep = this.getNextTabName()
      if (!nextStep) {
        this.goToLastStep()
        return
      }

      this.draftExam.loading = true
      const hasOldDraftExam = !!this.draftExam.id
      if (hasOldDraftExam) {
        this.updateExam()
          .then(exam => {
            this.draftExam.loading = false
            this.currentTab = nextStep
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      } else {
        this.createExam()
          .then(exam => {
            this.loadDraftExam(exam)
            this.currentTab = nextStep
            this.draftExam.loading = false
          })
          .catch(() => {
            this.draftExam.loading = false
          })
      }
    },
    onChangeTab (newTap) {
      let stepValidation = null
      const currentTabIndex = this.getCurrentTabIndex()
      if (currentTabIndex === 0) {
        stepValidation = this.getStep1Validation()
      }

      if (stepValidation.error) {
        this.showMessagesInNotify(stepValidation.messages)
      }
    },
    createExam () {
      this.draftExam.loading = true
      return this.$apiGateway.exam.userDraftExamCreate(this.draftExam)
    },
    updateExam (params) {
      return this.$apiGateway.exam.userDraftExamUpdate({
        examId: this.draftExam.id,
        data: this.draftExam
      })
    },

    loadAttachedQuestions () {
      this.draftExam.loading = true
      return this.$apiGateway.exam.userDraftExamGetAttachedQuestions(this.draftExam.id)
        .then((questionList) => {
          this.draftExam.questions.add(questionList.list)
          this.draftExam.loading = false
        })
        .catch(() => {
          this.draftExam.loading = false
        })
    },
    addQuestionsToExam(questions) {
      this.draftExam.loading = true
      return this.$apiGateway.exam.userDraftExamBulkAttachQuestions({
        examId: this.draftExam.id,
        data: this.draftExam.questions.list.map(question => {
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

    addQuestionToExam(question) {
      this.exam.questions.list.push(question)
    },

    deleteQuestionFromExam(question) {
      const target = this.exam.questions.list.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.exam.questions.list.splice(target, 1)
    },
    // FOR EDUCATIONAL PURPOSES
    camelize(word) {
      return word.replace(/-./g, x => x[1].toUpperCase())
    },

    // FOR EDUCATIONAL PURPOSES
    kebabize(word) {
      return word.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
    },
    isFinalStep(tab) {
      return this.allTabs.indexOf(tab) === this.allTabs.length - 1
    },
    changeTab(tab) {
      this.updateExamData(tab)
      if (this.accept) {
        this.currentTab = tab
      }
    },
    setFinalStep() {
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      this.createExam().then((exam) => {
        this.exam = new Exam(exam)
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        this.createDraftExamMessageDialog = true
      }).catch(err => {
        console.error('err', err)
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
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
    checkValues(formDataValues) {
      const messages = []
      formDataValues.forEach((item) => {
        if (item.label === 'عنوان آزمون') {
          return
        }
        if (typeof item.value !== 'undefined' && item.value !== null && item.value !== 0) {
          return
        }
        messages.push(item.label + ' الزامی است. ')
      })
      this.showMessagesInNotify(messages, 'negative')
    },
    checkValidate(formDataValues) {
      for (const item of Object.entries(formDataValues)) {
        const input = item[1]
        if (input.type === 'input' || input.type === 'dateTime' || input.type === 'select') {
          if (!input.value || input.value === 'undefined' || input.value === null) {
            this.accept = false
            break
          }
        }
      }
    },
    updateExamData(tab) {
      if (this.currentTab === 'createPage') {
        const formData = this.$refs.createExam.$refs.EntityCrudFormBuilder.getFormData()
        const formDataValues = this.$refs.createExam.$refs.EntityCrudFormBuilder.getValues()
        this.accept = !this.accept
        this.checkValues(formDataValues)
        this.checkValidate(formDataValues)

        if (!this.isExamDataInitiated && this.accept) {
          // this.exam = new Exam(formData)
          this.isExamDataInitiated = true
        }
        this.exam = Object.assign(this.exam, formData)
        this.createExam(formData)
        // return
      }
      if (tab === 'finalApproval' && this.exam.questions.list.length > 0) {
        this.accept = true
      } else if (tab === 'finalApproval' && this.exam.questions.list.length === 0) {
        this.accept = false
        const messages = ['سوالی انتخاب نشده است!']
        this.showMessagesInNotify(messages)
      }
    },
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
        this.$apiGateway.option.getUserOptions('major_type')
          .then((options) => {
            this.majorList = options
            resolve(options)
          }).catch(() => {
            reject()
          })
      })
    },

    submitFinalExam() {
      this.exam.enable = true
      this.createExam({
        params: {}
      })
    },
    async updateQuestionOrder(data) {
      this.exam.questions.loading = true
      try {
        await this.$apiGateway.exam.userUpdateOrders({
          examId: '633aed8b3b8e23f84807cca2',
          data
        })
        // console.log('response update exam :', response)
        this.exam.questions.loading = false
      } catch (e) {
        this.exam.questions.loading = false
      }
    },
    async bulkDetachLastStep(data) {
      this.exam.questions.loading = true
      try {
        await this.$apiGateway.exam.userDetachBulk({
          examId: '633aed8b3b8e23f84807cca2',
          data
        })
        // console.log('response bulkDetachLastStep:', response)
        this.exam.questions.loading = false
      } catch (e) {
        this.exam.questions.loading = false
      }
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
