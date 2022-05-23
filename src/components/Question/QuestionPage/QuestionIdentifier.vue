<template>
  <div class="question-details">
    <div class="box-title">شناسنامه سوال</div>
    <div class="details-container-2 default-details-container row">
      <div class="detail-box col-3" style="padding-right:0;">
        <div class="detail-box-title">مرجع</div>
        <q-select
          borderless
          v-model="questionAuthor"
          option-value="id"
          option-label="value"
          use-input
          use-chips
          multiple
          :options="questionAuthorsList"
        />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title">تاریخ تالیف</div>
        <q-select
          borderless
          option-value="id"
          option-label="value"
          v-model="authorshipDate"
          :options="authorshipDatesList"
          use-input
          use-chips
          multiple
        />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title">درجه سختی</div>
        <q-select
          option-value="id"
          option-label="value"
          borderless
          v-model="questionLevel"
          :options="levels"
          emit-value
          map-options
        />
      </div>
      <attach-exam
        class="col-3"
        :exams="exams"
        :lessons="lessons"
        :categories="categories"
        :buffer="buffer"
        @attach="emitAttachExam"
        @detach="emitDetachExam"
      />
      <div class="detail-box detail-box-first col-3">
        <div class="detail-box-title">پایه تحصیلی</div>
        <q-select
          borderless
          option-value="id"
          option-label="title"
          v-model="grade"
          :options="gradesList"
          @update:model-value="gradeSelected"
        />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title">رشته تحصیلی</div>
        <q-select
          borderless
          option-value="id"
          option-label="value"
          v-model="major"
          :options="majorList"
          use-input
          use-chips
          multiple
        />
      </div>
      <div class="detail-box col-6">
        <div class="detail-box-title">مبحث</div>
        <div class="input-container flex">
          <div class="input-box">
            <q-input v-model="lessonsTitles" dense disable/>
          </div>
          <div class="icon-box">
            <q-btn
              unelevated
              icon="isax:tree"
              class="open-modal-btn default-detail-btn"
              @click="dialogValue = true"
              :disable="!doesHaveLessons"
            />
          </div>
        </div>
      </div>
    </div>
    <q-btn
      unelevated
      color="primary"
      class="q-mr-xl btn-md text-right"
      style="float: left;margin-top: 10px;margin-right: 0px;margin-left: 14px;"
      @click="getIdentifierData"
    >
      ثبت مباحث انتخاب شده
    </q-btn>
      <question-tree-modal
        v-model:dialogValue="dialogValue"
        v-model:subjectsField="allSubjects"
        :lessons-list="lessonsList"
        :groups-list="groupsList"
        @groupSelected="groupSelected"
        @lessonSelected="lessonSelected"
      />
  </div>
</template>

<script>
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestCategoryList } from 'src/models/QuestCategory'
import AttachExam from 'components/Question/QuestionPage/AttachExam/AttachExam'
import QuestionTreeModal from 'components/Question/QuestionPage/QuestionTreeModal'

export default {
  name: 'QuestionIdentifier',
  components: {
    QuestionTreeModal,
    AttachExam
  },
  props: {
    buffer: {
      type: Boolean,
      default () {
        return false
      }
    },
    exams: {
      type: ExamList,
      default: new ExamList()
    },
    lessons: {
      type: QuestSubcategoryList,
      default: new QuestSubcategoryList()
    },
    categories: {
      default () {
        return new QuestCategoryList()
      },
      type: QuestCategoryList
    },
    lessonsList: {
      type: Array,
      default () {
        return []
      }
    },
    majorList: {
      type: Array,
      default () {
        return []
      }
    },
    groupsList: {
      type: Array,
      default () {
        return []
      }
    },
    questionAuthorsList: {
      type: Array,
      default () {
        return []
      }
    },
    authorshipDatesList: {
      type: Array,
      default () {
        return []
      }
    },
    gradesList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'groupSelected',
    'lessonSelected',
    'gradeSelected',
    'tags-collected',
    'attach',
    'attach'
  ],
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  data () {
    return {
      dialogValue: false,
      questionAuthor: null,
      authorshipDate: null,
      finalSelectedNodes: [],
      questionAuthors: [
        {
          id: 'skadlfksdjfnkkhjks543djf',
          title: 'سازمان سنجش 1'
        },
        {
          id: 'skadlfksdjfnk63546s543djf',
          title: 'سازمان سنجش 2'
        },
        {
          id: 'skadlfdfgdfgdffdksdjfnks543djf',
          title: 'سازمان سنجش 3'
        },
        {
          id: 'sk;sdljflsdkf56465adlfksdjfnks543djf',
          title: 'سازمان سنجش 4'
        }
      ],
      authorshipDates: [
        {
          value: 'skadlfksdjfnkkhjks543djf',
          label: 'دی ماه 1402'
        },
        {
          value: 'skadlfksdjfnk63546s543djf',
          label: 'دی ماه 1403'
        },
        {
          value: 'skadlfdfgdfgdffdksdjfnks543djf',
          label: 'دی ماه 1404'
        },
        {
          value: 'sk;sdljflsdkf56465adlfksdjfnks543djf',
          label: 'دی ماه 1405'
        }
      ],
      questionLevel: null,
      grade: '',
      model: null,
      // majors: [
      //   {
      //     id: '1',
      //     value: 'ریاضی'
      //   },
      //   {
      //     id: '2',
      //     value: 'تجربی'
      //   },
      //   {
      //     id: '3',
      //     value: 'انسانی'
      //   }
      // ],
      major: null,
      levels: [
        {
          id: '1',
          value: 'آسان'
        },
        {
          id: '2',
          value: 'متوسط'
        },
        {
          id: '3',
          value: 'سخت'
        }
      ],
      test: [
        {
          value: '1',
          label: 'آسان'
        },
        {
          value: '2',
          label: 'متوسط'
        },
        {
          value: '3',
          label: 'سخت'
        }
      ],
      subjectsFieldText: [],
      allSubjects: {},
      allSubjectsFlat: [],
      lastSelectedNodes: [],
      identifierData: [],
      draftBtnLoading: false,
      saveBtnLoading: false,
      lessonsTitles: []
    }
  },
  computed: {
    doesHaveGroups () {
      return !!(this.groupsList && this.groupsList.length > 0)
    },
    doesHaveLessons () {
      return !!(this.lessonsList && this.lessonsList.length > 0)
    }
  },
  methods: {
    emitAttachExam (item) {
      this.$emit('attach', item)
    },
    emitDetachExam (item) {
      this.$emit('detach', item)
    },
    gradeSelected (item) {
      this.$emit('gradeSelected', item)
    },
    groupSelected (item) {
      this.$emit('groupSelected', item)
    },
    lessonSelected (item) {
      this.$emit('lessonSelected', item)
    },
    setTags (allTags) {
      this.$emit('tags-collected', allTags)
    },
    updateLessonsTitles () {
      const fieldText = []
      const flatSelectedNodes = []
      if (Object.keys(this.allSubjects).length !== 0) {
        for (const key in this.allSubjects) {
          if (this.allSubjects[key].nodes && this.allSubjects[key].nodes.length > 0) {
            this.allSubjects[key].nodes.forEach(val => {
              fieldText.push(val.title)
              flatSelectedNodes.push(val)
            })
          }
        }
      }
      this.allSubjectsFlat = flatSelectedNodes
      this.lessonsTitles = fieldText
    },
    getLastNodesLessonsTitles () {
      return this.lastSelectedNodes.map(item => item.title)
    },
    // getLastNodesLessonsTitles () {
    //   return this.lastSelectedNodes.map(item => item.title)
    // },
    getIdentifierData (setTags) {
      this.updateLessonsTitles()
      this.identifierData.push(...this.getLastNodesLessonsTitles())
      this.identifierData.push(...this.getTagsTitles(this.subjectsFieldText))
      // this.identifierData.push(...this.getTagsTitles(this.grade))
      this.question.major = this.major
      this.question.years = this.authorshipDate
      this.question.reference = this.questionAuthor
      // this.identifierData.push(...this.getTagsTitles(this.major))
      // this.identifierData.push(...this.getTagsTitles(this.authorshipDate))
      // this.identifierData.push(...this.getTagsTitles(this.questionAuthor))
      this.question.level = this.questionLevel
      console.log('this.identifierData', this.identifierData)
      if (setTags) {
        this.setTags(this.identifierData)
        return
      }
      this.question.tags = this.identifierData
    },
    getTagsTitles (tag) {
      const finalArray = []
      if (!tag) {
        return []
      }
      if (Array.isArray(tag)) {
        tag.forEach(item => {
          finalArray.push(item)
        })
      } else {
        finalArray.push(tag.title)
      }
      return finalArray
    },
    getUniqueListBy (arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    },
    getTheLastSelectedNode () {
      const foundedNodes = []
      let cleaned = []
      this.allSubjectsFlat.forEach((selectedNode) => {
        selectedNode.ancestors.forEach((parentNode) => {
          if (this.allSubjectsFlat.find(item => item.id === parentNode.id)) {
            foundedNodes.push(parentNode)
          }
        })
      })
      cleaned = this.getUniqueListBy(foundedNodes, 'id')
      this.lastSelectedNodes = this.allSubjectsFlat.filter((selectedNode) => {
        return !(cleaned.find(item => item.id === selectedNode.id))
      })
    }
  },
  watch: {
    allSubjects: {
      handler () {
        this.updateLessonsTitles()
        this.getTheLastSelectedNode()
      },
      deep: true
    }
  }
}
</script>
<style scoped lang="scss">
.q-card {
  min-width: 830px;
  height: 580px;
  background: #FFFFFF;
  border-radius: 15px;
  padding: 30px;
}
.question-details {
  margin-top: 40px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  .default-details-container {
    .detail-box {
      margin-top: 10px;
      .detail-box-title {
        margin-bottom: 5px;
      }
    }
  }
  .details-container-1 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
    }
    .detail-box-first {
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-left: 0px #{"/* rtl:ignore */"};
    }
  }
  .default-detail-btn {
    color: #65677F;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
  .details-container-2 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
      .input-container {
        .input-box {
          width: 91%;
        }
        .icon-box {
          width: 40px;
          height: 40px;
          background: #FFFFFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px  ;
          .question-details-subject-img {
            height: 24px;
            max-width: 24px;
          }
        }
      }
    }
    .detail-box-first {
      padding-right: 0px #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-right: 0px #{"/* rtl:ignore */"};
      width: 200px;
      //margin-right: 132px #{"/* rtl:ignore */"};
    }
    .detail-box-last-of-row {
      padding-left: 0px #{"/* rtl:ignore */"};
      margin-top: 43px;
      text-align: end;
      display: flex;
      align-items: center;
      justify-content: center;
      .draft-btn {
        background: #FFFFFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }
      .save-btn {
        background: #9690E4;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
</style>
<style lang="scss">
.question-details {
    .default-details-container {
      .detail-box {
        .q-field {
          background: #FFFFFF;
          border-radius: 10px;
          line-height: 24px;
          height: 40px;
          min-height: 40px;
          .q-field__marginal {
            height: 40px;
          }
          .q-field__inner {
            padding-right: 16px;
            padding-left: 16px;
          }
        }
        .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
        }
        .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
        }
        .q-field__control::before, .q-field__control::after {
          display: none;
        }
        .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
          color: #65677F;
        }
      }
    }
}
.q-menu {
  // I'm in charge of this one and did this on purpose, if you need to change this please let me know.TU
  background: #FFFFFF;
  border-radius: 10px;
}
</style>
