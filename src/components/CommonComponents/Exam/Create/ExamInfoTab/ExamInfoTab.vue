<template>
  <div v-if="exam.loading"
       class="exam-info-component loading">
    <div class="row">
      <div class="col-12 q-pa-sm">
        <q-skeleton width="50px" />
        <q-skeleton class="q-mt-sm"
                    width="150px"
                    height="40px" />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-3 q-pa-sm">
        <q-skeleton type="QInput"
                    animation="wave" />
      </div>
      <div class="col-12 col-md-3 q-pa-sm">
        <q-skeleton type="QInput"
                    animation="wave" />
      </div>
      <div class="col-12 col-md-3 q-pa-sm">
        <q-skeleton type="QInput"
                    animation="wave" />
      </div>
      <div class="col-12 col-md-3 q-pa-sm">
        <q-skeleton type="QInput"
                    animation="wave" />
      </div>
    </div>
  </div>
  <div v-else
       class="exam-info-component">
    <div class="exam-info-form">
      <entity-crud-form-builder
        ref="EntityCrudFormBuilder"
        :key="formBuilderCrud"
        v-model:value="inputList"
      />
    </div>
    <div class="exam-info-buttons">
      <div
        class="exam-info-button back-button"
        @click="cancelExam"
      >
        لغو
      </div>
      <div
        class="exam-info-button next-button"
        @click="goToNextStep"
      >
        مرحله بعد
        <q-icon
          class="next-button-icon"
          name="isax:arrow-left"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { EntityCrudFormBuilder } from 'quasar-crud'
import { Exam } from 'src/models/Exam'

export default {
  name: 'ExamInfoTab',
  components: { EntityCrudFormBuilder },
  props: {
    exam: {
      type: Object,
      default: () => {}
    },
    majorList: {
      type: Array,
      default: () => []
    },
    gradesList: {
      type: Array,
      default: () => []
    },
    typeOptions: {
      type: Array,
      default: () => ['کنکور']
    }
  },
  emits: ['nextTab', 'update:exam'],
  data () {
    return {
      model: 'one',
      inputList: [
        {
          type: 'toggleButton',
          name: 'type_id',
          responseKey: 'data.exam_type',
          col: 'col-12 exam-type-toggle-button',
          value: '6225f4828044517f52500c02',
          ripple: false,
          color: 'white',
          toggleColor: 'primary',
          toggleTextColor: 'white',
          textColor: 'black',
          label: 'نوع آزمون',
          disable: true,
          options: [{ label: 'عادی', value: '6225f4828044517f52500c02' }, { label: 'جامع(به زودی)', value: 'test' }]
        },
        {
          type: 'input',
          name: 'title',
          responseKey: 'data.title',
          label: 'عنوان آزمون',
          placeholder: 'وارد کنید',
          col: 'col-12 col-md-3 col-sm-6'
        },
        {
          type: 'select',
          name: 'question_type',
          responseKey: 'data.question_type',
          label: 'نوع سوالات',
          placeholder: ' ',
          value: 'کنکور',
          options: [],
          behavior: 'menu',
          disable: true,
          col: 'col-12 col-md-3 col-sm-6',
          icon: 'isax:arrow-right-3',
          dropdownIcon: 'isax:arrow-down-1'
        },
        {
          type: 'select',
          name: 'temp.major',
          responseKey: 'data.temp.major',
          label: 'رشته تحصیلی',
          placeholder: 'انتخاب کنید',
          behavior: 'menu',
          col: 'col-12 col-md-3 col-sm-6',
          dropdownIcon: 'isax:arrow-down-1',
          options: []
        },
        {
          type: 'select',
          name: 'temp.grade',
          responseKey: 'data.temp.grade',
          label: 'پایه تحصیلی',
          placeholder: 'انتخاب کنید',
          behavior: 'menu',
          col: 'col-12 col-md-3 col-sm-6',
          dropdownIcon: 'isax:arrow-down-1',
          options: []
        }
      ],
      localExam: new Exam(),
      formBuilderCrud: 0,
      expanded: true,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      lessonsList: null,
      lessonGroupList: null,
      categoryOptions: [
        { title: 'دفترچه سؤالات عمومی', id: '60b7858d743940688b23c7f3' },
        { title: 'دفترچه سؤالات اختصاصی', id: '60b7858d743940688b23c7f4' }
      ],
      category: { title: '', id: '', order: 0, time: 0 },
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval']
    }
  },
  computed: {
    title() {
      return this.getValueByName('title')
    },
    // questionType() {
    //   return this.getValueByName('question_type')
    // },
    tempMajor() {
      return this.getValueByName('temp.major')
    },
    tempGrade() {
      return this.getValueByName('temp.grade')
    },
    examId () {
      return this.exam.id
    }
  },
  watch: {
    // typeOptions: {
    //   deep: true,
    //   handler (newValue) {
    //     this.loadQuestionTypesInput(newValue.map(type => {
    //       return {
    //         label: type.value,
    //         value: type.id
    //       }
    //     }))
    //   }
    // },
    gradesList: {
      deep: true,
      handler (newValue) {
        this.loadGradesInput(newValue.map(type => {
          return {
            label: type.title,
            value: type.id
          }
        }))
      }
    },
    majorList: {
      deep: true,
      handler (newValue) {
        this.loadMajorInput(newValue.map(type => {
          return {
            label: type.value,
            value: type.id
          }
        }))
      }
    },
    title(newValue) {
      this.localExam.title = newValue
      this.$emit('update:exam', this.localExam)
    },
    // questionType: {
    //   deep: true,
    //   handler (newValue) {
    //     this.localExam.type_id = newValue
    //     this.$emit('update:exam', this.localExam)
    //   }
    // },
    tempMajor: {
      deep: true,
      handler (newValue) {
        this.localExam.temp.major = newValue
        this.$emit('update:exam', this.localExam)
      }
    },
    tempGrade: {
      deep: true,
      handler (newValue) {
        this.localExam.temp.grade = newValue
        this.$emit('update:exam', this.localExam)
      }
    },
    examId (newValue) {
      this.loadExamData()
    }
  },
  methods: {
    loadSelectInputOptions (inputName, options) {
      const inputIndex = this.inputList.findIndex(input => input.name === inputName)
      if (inputIndex === -1) {
        return
      }
      this.inputList[inputIndex].options = options
    },
    loadQuestionTypesInput (options) {
      this.loadSelectInputOptions('question_type', options)
    },

    loadGradesInput (options) {
      this.loadSelectInputOptions('temp.grade', options)
    },

    loadMajorInput (options) {
      this.loadSelectInputOptions('temp.major', options)
    },

    isValid () {
      let error = false
      const messages = []
      if (!this.exam.title) {
        error = true
        messages.push('عنوان آزمون مشخص نشده است.')
      }
      if (!this.exam.temp.major) {
        error = true
        messages.push('رشته آزمون مشخص نشده است.')
      }
      if (!this.exam.temp.grade) {
        error = true
        messages.push('پایه آزمون مشخص نشده است.')
      }

      return { error, messages }
    },
    goToNextStep () {
      this.$emit('nextTab')
    },
    cancelExam() {
      this.$router.push({ name: 'User.Exam.List' })
    },
    getValueByName(name) {
      const inputIndex = this.inputList.findIndex(item => item.name === name)
      if (inputIndex === -1) {
        return
      }
      return this.inputList[inputIndex].value
    },
    loadExamData(setOptions) {
      if (setOptions) {
        this.loadGradesInput(this.gradesList.map(type => {
          return {
            label: type.title,
            value: type.id
          }
        }))
        this.loadMajorInput(this.majorList.map(type => {
          return {
            label: type.value,
            value: type.id
          }
        }))
      }
      this.localExam = new Exam(this.exam)
      this.inputList.forEach(element => {
        if (element.name === 'title') {
          element.value = this.exam.title
        } else if (element.name === 'temp.major') {
          element.value = this.exam.temp.major
        } else if (element.name === 'temp.grade') {
          element.value = this.exam.temp.grade
        }
      })
    },
    forceRender() {
      this.formBuilderCrud += 1
    }
  },
  mounted() {
    if (this.exam.id) {
      this.loadExamData(true)
    }
    this.forceRender()
  }
}
</script>

<style lang="scss" scoped>
.exam-info-component {
  overflow: hidden;
  .exam-info-form {
    &:deep(.q-btn-group) {
      width: 190px;
      .q-btn {
        width: 100px;
      }
    }
    // &:deep(.q-field__native.q-placeholder) {
    //   color: #6D708B;
    // }

    // &:deep(.form-builder-separator-col) {
    //   b {
    //     font-style: normal;
    //     font-weight: 400;
    //     font-size: 16px;
    //     line-height: 25px;
    //     letter-spacing: -0.03em;
    //     color: #434765;
    //   }
    // }
  }

  .exam-info-buttons {
    margin-bottom: 30px;
    margin-top: 382px;
    display: flex;
    justify-content: left;

    @media screen and (max-width: 1919px) {
      margin-top: 280px;
    }

    @media screen and (max-width: 1023px) {
      margin-top: 380px;
    }

    @media screen and (max-width: 599px) {
      margin-top: 100px;
      justify-content: center;
    }

   .exam-info-button {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      height: 40px;
      width: 144px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      text-align: center;
      letter-spacing: -0.03em;
      cursor: pointer;

      @media screen and (max-width: 599px) {
        width: 104px;
        height: 36px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
      }

      &.back-button {
        background: #FFFFFF;
        color: #6D708B;
        margin-right: 30px;

        @media screen and (max-width: 1023px) {
          margin-right: 24px;
        }
      }

      &.next-button {
        background: #9690E4;
        color: #FFFFFF;

        .next-button-icon {
          margin-left: 8px;
        }
      }
    }
  }
}
</style>
