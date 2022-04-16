<template>
  <div class="question-details">
    <div class="box-title">شناسنامه سوال</div>
    <div class="details-container-2 default-details-container row">
      <div class="detail-box col-3" style="padding-right:0;">
        <div class="detail-box-title">طراح سوال</div>
        <q-select borderless v-model="questionAuthor" :options="questionAuthors" />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title">تاریخ تالیف</div>
        <q-select borderless v-model="authorshipDate" :options="authorshipDates" />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title">درجه سختی</div>
        <q-select borderless v-model="questionLevel" :options="levels" />
      </div>
      <attach-exam
        class="col-3"
        :exams="exams"
        :lessons="lessons"
        :categories="categories"
        @attach="emitAttachExam"
        @detach="emitDetachExam"
      />
      <div class="detail-box detail-box-first col-3">
        <div class="detail-box-title">پایه تحصیلی</div>
        <q-select borderless v-model="grade" :options="grades" />
      </div>
      <div class="detail-box col-3">
        <div class="detail-box-title ">رشته تحصیلی</div>
        <q-select borderless v-model="major" :options="majors" />
      </div>
      <div class="detail-box col-6">
        <div class="detail-box-title">مبحث</div>
        <div class="input-container flex">
          <div class="input-box">
            <q-input v-model="lesson" dense />
          </div>
          <div class="icon-box">
            <q-btn
              unelevated
              icon="isax:tree"
              class="open-modal-btn default-detail-btn"
              @click="test "
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <question-tree-modal />
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
    imgPanelVisibility: {
      type: Boolean,
      default () {
        return false
      }
    },
    buffer: {
      type: Boolean,
      default () {
        return false
      }
    },
    exams: { // possible removal for attach exam
      type: ExamList,
      default: new ExamList()
    },
    lessons: { // possible removal for attach exam
      type: QuestSubcategoryList,
      default: new QuestSubcategoryList()
    },
    categories: {
      default () {
        return new QuestCategoryList()
      },
      type: QuestCategoryList
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  methods: {
    test () {
      console.log('gdegghghhet', this.mitra)
      this.mitra = !this.mitra
    },
    emitAttachExam (item) {
      this.$emit('attach', item)
    },
    emitDetachExam (item) {
      this.$emit('detach', item)
    }
  },
  data () {
    return {
      mitra: false,
      modal: '',
      questionAuthor: '',
      authorshipDate: '',
      questionAuthors: [
        'سازمان سنجش - دی ماه 1402', 'سازمان سنجش - دی ماه 1403', 'سازمان سنجش - دی ماه 1404', 'سازمان سنجش - دی ماه 1405', 'سازمان سنجش - دی ماه 1406'
      ],
      authorshipDates: [
        'سه‌آ - دی ماه 1402', 'سه‌آ - دی ماه 1403', 'سه‌آ - دی ماه 1404', 'سه‌آ - دی ماه 1405', 'سه‌آ - دی ماه 1406'
      ],
      questionLevel: '',
      grades: [
        'دهم', 'یازدهم', 'دوازدهم'
      ],
      grade: '',
      majors: [
        'ریاضی', 'تجربی', 'انسانی'
      ],
      major: '',
      levels: [
        'آسان', 'متوسط', 'سخت'
      ],
      lesson: '',
      draftBtnLoading: false,
      saveBtnLoading: false
    }
  }
}
</script>
<style scoped lang="scss">
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
