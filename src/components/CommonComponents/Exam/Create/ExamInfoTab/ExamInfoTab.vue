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
        @click="goToLastStep"
      >
        بازگشت
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
import API_ADDRESS from 'src/api/Addresses'
import { Exam } from 'src/models/Exam'
import mixinTree from 'src/mixin/Tree'

export default {
  name: 'CreateExam',
  components: { EntityCrudFormBuilder },
  mixins: [
    mixinTree
  ],
  props: {
    inputs: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['nextTab', 'lastTab'],

  data () {
    return {
      model: 'one',
      expanded: true,
      api: API_ADDRESS.exam.base(),
      entityIdKeyInResponse: 'data.id',
      showRouteParamKey: 'id',
      showRouteName: 'Admin.Exam.Show',
      indexRouteName: 'Admin.Exam.Index',
      inputList: [],
      gradesList: null,
      lessonGroupList: null,
      lessonsList: null,
      majorList: null,
      categoryOptions: [
        { title: 'دفترچه سؤالات عمومی', id: '60b7858d743940688b23c7f3' },
        { title: 'دفترچه سؤالات اختصاصی', id: '60b7858d743940688b23c7f4' }
      ],
      typeOptions: [],
      category: { title: '', id: '', order: 0, time: 0 },
      allTabs: ['createPage', 'chooseQuestion', 'finalApproval']
    }
  },

  inject: {
    exam: {
      from: 'providedExam', // this is optional if using the same key for injection
      default: new Exam()
    }
  },

  created () {
    this.inputList = this.inputs
    this.getPageReady()
  },

  mounted () {
    // const element = document.getElementsByClassName('')
    // console.log(element)
    // element.classList.remove('.col')
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
    }
  },

  methods: {
    getPageReady () {
      this.getExamTypeList()
      this.getGradesList()
      this.loadMajorList()
    },

    getExamTypeList () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          this.typeOptions = response.data.data.filter(data => data.type === 'exam_type')
          this.inputList.forEach(input => {
            if (input.type === 'formBuilder') {
              input.value.forEach(item => {
                if (item.name === 'question_type') {
                  item.options = []
                  this.typeOptions.forEach(type => {
                    item.options.push({ label: type.value, value: type.id })
                  })
                }
              })
            }
          })
        })
        .catch(() => {})
    },

    getGradesList () {
      this.getRootNode('test').then(response => {
        this.gradesList = response.data.data.children
        this.inputList.forEach(input => {
          if (input.type === 'formBuilder') {
            input.value.forEach(item => {
              if (item.name === 'grade_type') {
                item.options = []
                this.gradesList.forEach(type => {
                  item.options.push({ label: type.title, value: type.id })
                })
              }
            })
          }
        })
      })
    },

    loadMajorList () {
      this.$axios.get(API_ADDRESS.option.base + '?type=major_type')
        .then((response) => {
          this.majorList = response.data.data
          this.inputList.forEach(input => {
            if (input.type === 'formBuilder') {
              input.value.forEach(item => {
                if (item.name === 'major_type') {
                  item.options = []
                  this.majorList.forEach(type => {
                    item.options.push({ label: type.value, value: type.id })
                  })
                }
              })
            }
          })
        })
    },

    goToLastStep () {
      this.$emit('lastTab')
    },

    goToNextStep () {
      this.$emit('nextTab')
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

    &:deep(.q-btn-toggle) {
    }

    //&:deep(.setting-box) {
    //  padding: 8px 0 0 12px;
    //  .title {
    //    padding-bottom: 8px;
    //  }
    //}
    //&:deep(.editor-box div p) {
    //  margin-bottom: 0;
    //}
    //&:deep(.editor-section .row) {
    //  height: 100%;
    //}
    //&:deep(.form-builder .form-builder-col) {
    //  background: var(--3a-Neutral3);
    //  border-radius: 20px;
    //  padding: 0;
    //}
    //&:deep(.form-builder-tiptapEditor-col div) {
    //  &:first-child {
    //    height: 100%;
    //  }
    //}
    //&:deep(.exam-type-toggle-button) {
    //  padding-bottom: 0 !important;
    //}

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
