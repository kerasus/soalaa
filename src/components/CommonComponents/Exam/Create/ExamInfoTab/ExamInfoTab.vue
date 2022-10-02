<template>
  <div class="exam-info-component">
    <div class="exam-info-form">
      <entity-crud-form-builder
        ref="EntityCrudFormBuilder"
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

export default {
  name: 'CreateExam',
  components: { EntityCrudFormBuilder },
  props: {
    inputs: {
      type: Object,
      default: () => {}
    },
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
      default: () => []
    }
  },
  emits: ['nextTab'],
  data () {
    return {
      model: 'one',
      expanded: true,
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      inputList: [],
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
  created () {
    this.onLoadPage()
  },

  computed: {
    examCategoriesIndex () {
      return this.inputList.findIndex(item => item.name === 'categories')
    },
    totalCategory () {
      return this.inputList[this.examCategoriesIndex].value && this.inputList[this.examCategoriesIndex].value.length >= 2
    }
  },

  watch: {
    inputs: {
      deep: true,
      handler (newValue) {
        this.inputList = newValue
      }
    },
    typeOptions: {
      deep: true,
      handler (newValue) {
        this.loadQuestionTypesInput(newValue.map(type => {
          return {
            label: type.value,
            value: type.id
          }
        }))
      }
    },
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
      this.loadSelectInputOptions('temp.level', options)
    },

    loadMajorInput (options) {
      this.loadSelectInputOptions('temp.tags', options)
    },
    onLoadPage () {
      this.inputList = this.inputs
    },
    goToNextStep () {
      this.$emit('nextTab')
    },
    cancelExam() {
      this.$router.push({ name: 'User.Exam.List' })
    },
    getValueByName(name) {
      this.inputList.findIndex()
    }
  }
}
</script>

<style lang="scss" scoped>
.exam-info-component {
  .exam-info-form {
    &:deep(.q-field__native.q-placeholder) {
      color: #6D708B;
    }

    &:deep(.form-builder-separator-col) {
      b {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: -0.03em;
        color: #434765;
      }
    }
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
