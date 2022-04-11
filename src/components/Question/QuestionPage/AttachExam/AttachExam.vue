<template>
  <div class="exam-details">
    <button @click="alert = true">alert</button>
    <q-dialog v-model="alert">
      <q-card class="attach-exam-card">
        <q-card-section>
          <div class="question-details">
            <div class="box-title">اضافه کردن به آزمون</div>
            <div class="details-container-1 default-details-container row">
              <div class="col-12 detail-box detail-box-first">
                <div class="detail-box-title">آزمون</div>
                <q-select
                  borderless
                  v-model="selectedExam"
                  :options="exams.list"
                  option-value="exam_id"
                  option-label="title"
                  :rules="selectorRules"
                  :loading="exams.loading"
                />
              </div>
              <div class="col-3 detail-box">
                <div class="detail-box-title">درس</div>
                <q-select
                  borderless
                  v-model="selectedLesson"
                  :options="lessons.list"
                  option-value="id"
                  option-label="title"
                  :rules="selectorRules"
                  :loading="lessons.loading"
                />
              </div>
              <div class="col-5">
                <div class="detail-box">
                  <div class="detail-box-title">ترتیب</div>
                  <q-input
                    borderless
                    v-model="order"
                    type="number"
                    :rules="numberRules"
                  />
                </div>
              </div>
              <!--      <div class="detail-box detail-box-last" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">-->
              <!--        <div class="detail-box-title">درجه سختی</div>-->
              <!--        <q-select borderless v-model="model" :options="options"/>-->
              <!--      </div>-->
              <div class="detail-box detail-box-last-of-row-1" :class="[imgPanelVisibility ? 'col-6' : 'col-4']">
                <q-btn
                  unelevated
                  :loading="draftBtnLoading"
                  label="افزودن"
                  class="attach-btn default-detail-btn"
                  @click="attach"
                />
              </div>
            </div>
            <div v-if="exams && lessons.list.length" :key="question.exams.list.length">
            <div v-for="(item, index) in question.exams.list" :key="index" class="flex row">

              <div class="detail-box detail-box-first" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
                {{ item.exam.title }}
              </div>
              <div class="detail-box detail-box-first" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
                {{ item.sub_category.title }}
              </div>
              <div class="detail-box detail-box-last" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
                {{ item.order }}
              </div>
              <div class="detail-box detail-box-last" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
                <q-btn unelevated icon="mdi-delete" class="draft-btn default-detail-btn" @click="detach(item)" />
              </div>
            </div>
          </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Question } from 'src/models/Question'
import { ExamList } from 'src/models/Exam'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'

export default {
  name: 'AttachExam',
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
    }
  },
  inject: {
    question: {
      from: 'providedQuestion', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  created () {
    this.alert = true
  },
  data () {
    return {
      text: '',
      draftBtnLoading: false,
      saveBtnLoading: false,
      selectedExam: null,
      selectedLesson: null,
      order: null,
      numberRules: [
        v => v !== null || 'پر کردن این فیلد الزامی است.',
        v => Number.isInteger(parseInt(v)) || 'یک عدد وارد کنید.'
      ],
      selectorRules: [
        v => v !== null || 'پر کردن این فیلد الزامی است.'
      ],
      questionData: this.question,
      alert: false
    }
  },
  methods: {
    attach () {
      if (!this.selectedLesson || !this.selectedExam || !this.order) {
        this.$q.notify({
          message: 'لطفا فیلد های مشخصات آزمون را پر کنید',
          color: 'negative',
          icon: 'report_problem'
        })
        return
      }
      this.$emit('attach', {
        exam: this.selectedExam,
        sub_category: this.selectedLesson,
        order: this.order
      })
      if (this.buffer) {
        this.question.exams.addItem({
          id: Date.now(),
          exam: this.selectedExam,
          // exam_id: this.selectedExam.id,
          sub_category: this.selectedLesson,
          // sub_category_id: this.selectedLesson.id,
          order: this.order
        })
      }
      this.selectedLesson = ''
      this.selectedExam = ''
      this.order = '0'
    },
    detach (item) {
      this.$emit('detach', item)

      if (this.buffer) {
        // this.question.exams.remove(item.id)
        const itemIndex = this.question.exams.list.findIndex(i => (i.id === item.id))
        if (itemIndex !== -1) {
          this.question.exams.list.splice(itemIndex, 1)
        }
      }
    },
    getLessonTitleById (exam) {
      const target = this.lessons.list.find(item => item.id === exam.sub_category_id || (exam.sub_category && item.id === exam.sub_category.id))
      if (!target) {
        return ''
      }
      return target.title
    }
  }
}
</script>

<style scoped lang="scss">
.q-dialog {
  .attach-exam-card {
    background: #FFFFFF;
    border-radius: 15px;
    .q-card__section--vert {
          padding: 30px;
    }
  }
}
.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  //.q-card .attach-exam-card {
  //  background: #FFFFFF;
  //  border-radius: 15px;
  //  .q-card__section--vert {
  //    padding: 30px;
  //  }
  //}
  .default-details-container {
    .detail-box {
      margin-top: 10px;

      .detail-box-title {
        margin-bottom: 5px;
      }
    }
  }
  .detail-box-last-of-row-1 {
    display: flex ;
    align-items: flex-end;
    margin-bottom: 2px ;
    justify-content: flex-end;
    .attach-btn {
      background-color: #FFB74D;
      color: #FFFFFF;
      border-radius: 10px;
      width: 106px;
      height: 40px;
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
          margin-left: 16px #{"/* rtl:ignore */"};

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

      .default-detail-btn {
        width: 144px;
        height: 40px;
        border-radius: 10px;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
      }

      .draft-btn {
        background: #FFFFFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }

      .save-btn {
        background: #FFB74D;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
</style>

<style lang="scss">
.question-details {
  .q-card .attach-exam-card {
    background: #FFFFFF;
    border-radius: 15px;
    .q-card__section--vert {
      padding: 30px;
    }
  }
  .default-details-container {
    .detail-box {
      .q-field__control {
        height: 42px;
      }
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
