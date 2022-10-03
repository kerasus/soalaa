<template>
  <div class="create-exam-panel">
    <div class="exam-create-panel">
      <steps
        v-model:currentComponent="currentTab"
        @currentStepChanged = "changeTab"
      />
      <!--        keep-alive-->
      <q-tab-panels
        v-model="currentTab"
        animated
      >
        <q-tab-panel name="createPage">
          <exam-info-tab
            ref="createExam"
            v-model:exam="exam"
            v-model:currentTab="currentTab"
            :typeOptions="typeOptions"
            :gradesList="gradesList"
            :majorList="majorList"
            :inputs="examInfoInputs"
            @nextTab="goToNextStep"
            @getInputValue="setInputValue($event)"
          />
        </q-tab-panel>

        <q-tab-panel name="chooseQuestion">
          <question-selection-tab
            :currentTab="currentTab"
            @onFilter="onFilter"
            @nextTab="goToNextStep"
            @lastTab="goToLastStep"
            @addQuestionToExam="addQuestionToExam"
            @deleteQuestionFromExam="deleteQuestionFromExam"
          />
        </q-tab-panel>

        <q-tab-panel name="finalApproval">
          <final-approval-tab
            @deleteQuestionFromExam="deleteQuestionFromExam"
            @goToLastStep="goToLastStep"
            @goToNextStep="goToNextStep"
          />
        </q-tab-panel>
      </q-tab-panels>
      <q-dialog v-model="examConfirmedDialog">
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
      <q-dialog v-model="draftDialog"
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
                   @click="clearDraft" />
            <q-btn v-close-popup
                   label="ادامه"
                   color="primary"
                   @click="setDraft" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { Exam } from 'src/models/Exam'
import Steps from 'pages/Admin/exam/Create/Steps'
import ExamInfoTab from 'components/CommonComponents/Exam/Create/ExamInfoTab/ExamInfoTab'
import FinalApprovalTab from 'components/CommonComponents/Exam/Create/FinalApprovalTab/FinalApprovalTab'
import API_ADDRESS from 'src/api/Addresses'
import QuestionSelectionTab from 'components/CommonComponents/Exam/Create/ExamSelectionTab/QuestionSelectionTab'
import mixinTree from 'src/mixin/Tree'

export default {
  name: 'tabPanel',
  components: {
    QuestionSelectionTab,
    FinalApprovalTab,
    ExamInfoTab,
    Steps
  },
  props: {
    examInfoInputs: {
      type: Object,
      default: () => {
      }
    },
    userRule: {
      type: String
    }
  },
  mixins: [
    mixinTree
  ],
  data() {
    return {
      exam: new Exam(),
      currentTab: 'createPage',
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval'],
      isExamDataInitiated: false,
      examConfirmedDialog: false,
      accept: false,
      draftDialog: false,
      draftExam: new Exam(),
      gradesList: null,
      majorList: null,
      typeOptions: []
    }
  },

  provide() {
    return {
      providedExam: computed(() => this.exam)
    }
  },

  created() {
    this.onLoadPage()
    this.getExamTypeList()
    this.getGradesList()
    this.loadMajorList()
  },

  methods: {
    onLoadPage() {
      this.$axios.get(API_ADDRESS.exam.user.draft())
        .then(response => {
          if (response.data.data !== null) {
            this.draftDialog = true
            this.draftExam = new Exam(response.data.data)
          }
        }).catch(() => {})
    },

    onFilter(filterData) {
      // console.log('filterData', filterData)
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
    getCurrentIndexOfStep() {
      return this.allTabs.indexOf(this.currentTab)
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
    goToLastStep() {
      this.currentTab = this.allTabs[this.getCurrentIndexOfStep() - 1] || 'createPage'
    },
    goToNextStep() {
      const nextStep = this.allTabs[this.getCurrentIndexOfStep() + 1]
      if (!nextStep) {
        this.setFinalStep()
        return
      }
      if (this.currentTab === 'chooseQuestion' && this.exam.questions.list.length === 0) {
        this.accept = false
        const messages = ['سوالی انتخاب نشده است!']
        this.showMessagesInNotify(messages)
      } else if (this.currentTab === 'chooseQuestion' && this.exam.questions.list.length > 0) {
        this.accept = true
      }
      this.updateExamData()
      if (this.accept) {
        this.currentTab = this.allTabs[this.getCurrentIndexOfStep() + 1]
      }
    },
    setFinalStep() {
      // this.$store.dispatch('loading/overlayLoading', { loading: true, message: '' })
      this.createExam().then(() => {
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
        this.examConfirmedDialog = true
      }).catch(err => {
        console.error('err', err)
        // this.$store.dispatch('loading/overlayLoading', { loading: false, message: '' })
      })
    },
    createExam(params) {
      return new Promise((resolve, reject) => {
        this.$axios.post(API_ADDRESS.exam.user.create, params)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
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
          this.exam = new Exam(formData)
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
    createExammm() {
      this.$axios.get(API_ADDRESS.exam.user.create)
        .then(() => {
          // console.log(r)
        })
    },
    setDraft() {
      this.exam = new Exam(this.draftExam)
    },
    clearDraft() {
      this.draftExam = {}
    },
    getGradesList () {
      this.getRootNode('test')
        .then(response => {
          this.gradesList = response.data.data.children
        })
    },
    getExamTypeList () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          this.typeOptions = response.data.data.filter(data => data.type === 'exam_type')
        })
        .catch(() => {})
    },
    loadMajorList () {
      this.$axios.get(API_ADDRESS.option.base + '?type=major_type')
        .then((response) => {
          this.majorList = response.data.data
        })
    },
    setInputValue(event) {
      if (event.name === 'title') {
        this.exam.title = event.value
      } else if (event.name === 'question_type') {
        this.exam.type_id = event.value
      } else if (event.name === 'major') {
        this.exam.temp.major = event.value
      } else if (event.name === 'grade') {
        this.exam.temp.grade = event.value
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
