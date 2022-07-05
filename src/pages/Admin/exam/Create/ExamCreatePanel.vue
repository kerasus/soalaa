<template>
  <div class="exam-create-page">
    <div class="exam-create-panel">
      <steps v-model:currentComponent="currentTab" @currentStepChanged="changeTab"/>
      <q-tab-panels v-model="currentTab" keep-alive animated style=" background: #f1f1f1;">
        <q-tab-panel name="createPage">
          <create-exam-page ref="createExam"/>
        </q-tab-panel>
        <q-tab-panel name="chooseQuestion">
          <question-bank
            v-model="exam.questions.list"
            @onFilter="onFilter"
            @addQuestionToExam="addQuestionToExam"
            @deleteQuestionFromExam="deleteQuestionFromExam"
          />
        </q-tab-panel>
        <q-tab-panel name="finalApproval">
          <final-exam-approval
            @deleteQuestionFromExam="deleteQuestionFromExam"
            @goToLastStep = goToLastStep
            @goToNextStep = goToNextStep
          />
        </q-tab-panel>
      </q-tab-panels>
      <div class="btn-box flex justify-end items-center">
        <q-btn
          unelevated
          color="white"
          text-color="black"
          class="q-mr-xl btn-md"
          :icon="'isax:arrow-right-3'"
          style="margin-right: 18px;"
          @click="goToLastStep"
        >
          بازگشت
        </q-btn>
        <q-btn
          unelevated
          color="primary"
          class="q-mr-xl btn-md"
          style="margin-right: 18px;"
          :icon-right="'isax:arrow-left-2'"
          @click="goToNextStep"
        >
          مرحله بعد
        </q-btn>
      </div>
      <q-dialog v-model="examConfirmedDialog">
        <q-card flat class="report-problem-dialog">
          <q-btn flat v-close-popup round dense icon="close" class="close-btn"/>
          <q-card-section class="problem-type no-padding">
            <q-icon name="isax:tick-circle" size="110px"/>
            <div class="title-style text-center" style="padding-bottom: 20px">
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
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Exam } from 'src/models/Exam'
import Steps from 'pages/Admin/exam/Create/Steps'
import CreateExamPage from 'pages/Admin/exam/Create/CreateExamPage'
import FinalExamApproval from 'pages/Admin/exam/Create/FinalExamApproval'
import API_ADDRESS from 'src/api/Addresses'
import QuestionBank from 'pages/Admin/Question/QuestionBank/QuestionBank'

export default {
  name: 'ExamCreatePanel',
  components: {
    QuestionBank,
    FinalExamApproval,
    CreateExamPage,
    Steps
  },
  data () {
    return {
      exam: new Exam(),
      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      isExamDataInitiated: false,
      examConfirmedDialog: false,
      accept: false
    }
  },
  provide () {
    return {
      providedExam: computed(() => this.exam)
    }
  },
  methods: {
    onFilter (filterData) {
      console.log('filterData', filterData)
    },
    addQuestionToExam (question) {
      this.exam.questions.list.push(question)
    },
    deleteQuestionFromExam (question) {
      const target = this.exam.questions.list.findIndex(questionItem => questionItem.id === question.id)
      if (target === -1) {
        return
      }
      this.exam.questions.list.splice(target, 1)
    },
    // FOR EDUCATIONAL PURPOSES
    camelize (word) {
      return word.replace(/-./g, x => x[1].toUpperCase())
    },
    // FOR EDUCATIONAL PURPOSES
    kebabize (word) {
      return word.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? '-' : '') + $.toLowerCase())
    },
    getCurrentIndexOfStep () {
      return this.allTabs.indexOf(this.currentTab)
    },
    isFinalStep (tab) {
      return this.allTabs.indexOf(tab) === this.allTabs.length - 1
    },
    changeTab (tab) {
      this.updateExamData()
      if (this.accept) { this.currentTab = tab }
    },
    goToLastStep () {
      this.updateExamData()
      this.currentTab = this.allTabs[this.getCurrentIndexOfStep() - 1] || 'createPage'
    },
    goToNextStep () {
      const nextStep = this.allTabs[this.getCurrentIndexOfStep() + 1]
      if (!nextStep) {
        this.setFinalStep()
        return
      }
      this.updateExamData()
      this.currentTab = this.allTabs[this.getCurrentIndexOfStep() + 1]
    },
    setFinalStep () {
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      this.createExam().then(res => {
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        this.examConfirmedDialog = true
      }).catch(err => {
        console.log('err', err)
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
      })
    },
    createExam () {
      console.log('exam', this.exam)
      return new Promise((resolve, reject) => {
        this.$axios.post(API_ADDRESS.exam.base())
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    showMessagesInNotify (messages, type) {
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
    checkValues (formDataValues) {
      const messages = []
      formDataValues.forEach((item) => {
        if (item.type !== 'input' && item.type !== 'dateTime') {
          return
        }
        if (typeof item.value !== 'undefined' && item.value !== null && item.value !== 0) {
          return
        }
        messages.push(item.label + ' الزامی است. ')
      })
      this.showMessagesInNotify(messages, 'negative')
    },
    checkValidate (formDataValues) {
      for (const item of Object.entries(formDataValues)) {
        const input = item[1]
        if (input.type === 'input' || input.type === 'dateTime') {
          if (!input.value || input.value === 'undefined' || input.value === null) {
            // this.accept = false
            break
          }
        }
      }
    },
    updateExamData () {
      if (this.currentTab === 'createPage') {
        const formData = this.$refs.createExam.$refs.EntityCrudFormBuilder.getFormData()
        const formDataValues = this.$refs.createExam.$refs.EntityCrudFormBuilder.getValues()
        this.accept = !this.accept
        this.checkValues(formDataValues)
        this.checkValidate(formDataValues)

        if (!this.isExamDataInitiated && this.accept) {
          this.exam = new Exam(formData)
          this.isExamDataInitiated = true
          this.accept = true
        }
        this.exam = Object.assign(this.exam, formData)
      }
      if (this.currentTab === 'chooseQuestion' && this.exam.questions.list.length > 0) {
        this.accept = true
      } else if (this.currentTab === 'chooseQuestion' && this.exam.questions.list.length === 0) {
        this.accept = false
        const messages = ['یه سوال برامون انتخاب کنن اخوی']
        this.showMessagesInNotify(messages)
      }
    }
  },
  watch: {
    /* exam: {
      handler (val) {
        console.log(val)
      },
      deep: true
    } */
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.exam-create-page {
  display: flex;
  .exam-create-panel {
    width: 1416px;
    margin: auto;
    .q-tab-panel {
      padding: 32px 0 0 0;
    }
    @media screen and (max-width: 1919px) {
      width: 100%;
      .q-tab-panel {
        padding: 32px 30px 0 0;
      }
    }
    @media screen and (max-width: 1439px) {
      .q-tab-panel {
        padding: 30px 30px 0 30px !important;
      }
    }
    @media screen and (max-width: 599px) {
      .q-tab-panel {
        padding: 16px 16px 0 16px !important;
      }
    }
    .btn-box {
      margin-bottom: 30px;
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
