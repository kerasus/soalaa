<template>
  <div class="exam-details">
    <div class="exam-details-all-boxes">
      <div class="details-container-2 default-details-container row">
        <div class="detail-box">
          <div class="detail-box-title">آزمون ها</div>
          <div class="input-container">
            <div class="input-box">
              <q-input v-model="definedExamsTitle"
                       dense
                       disable />
            </div>
            <div class="icon-box">
              <q-btn
                unelevated
                icon="isax:add-square"
                class="open-modal-btn default-detail-btn"
                @click="modal = true"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <q-dialog v-model="modal">
      <q-card class="attach-exam-card">
        <q-card-section>
          <div class="question-details">
            <div class="box-title">اضافه کردن به آزمون</div>
            <div class="details-container-1 default-details-container row">
              <div class="col-12 detail-box detail-box-first">
                <div class="detail-box-title">آزمون</div>
                <q-select
                  v-model="selectedExam"
                  borderless
                  :options="exams.list"
                  option-value="exam_id"
                  option-label="title"
                  :rules="selectorRules"
                  :loading="exams.loading"
                />
              </div>
              <div class="col-4 detail-box detail-box-first">
                <div class="detail-box-title ">دفترچه</div>
                <q-select
                  v-model="selectedCategory"
                  borderless
                  :options="categories.list"
                  option-value="id"
                  option-label="title"
                  :rules="selectorRules"
                  :loading="categories.loading"
                />
              </div>
              <div class="col-3 detail-box">
                <div class="detail-box-title">درس</div>
                <q-select
                  v-model="selectedLesson"
                  borderless
                  :options="subCategoriesFilteredList"
                  option-value="id"
                  option-label="title"
                  :rules="selectorRules"
                  :loading="lessons.loading"
                />
              </div>
              <div class="col-3">
                <div class="detail-box box-order">
                  <div class="detail-box-title">ترتیب</div>
                  <q-input
                    v-model="order"
                    borderless
                    type="number"
                    :rules="numberRules"
                  />
                </div>
              </div>
              <div class="detail-box detail-box-last-of-row-1 col-2">
                <q-btn
                  unelevated
                  :loading="draftBtnLoading"
                  label="افزودن"
                  class="attach-btn default-detail-btn"
                  @click="attach"
                />
              </div>
            </div>
            <div class="box-title title-show-exams">آزمون‌های تعریف شده</div>
            <div class="attached-exam-box">
              <div class="flex row exam-result-box">
                <div class="col-6 exam-result-title">
                  آزمون
                </div>
                <div class="col-3 exam-result-title">
                  درس
                </div>
                <div class="col-1 exam-result-title">
                  ترتیب
                </div>
              </div>
              <div v-if="exams && lessons.list.length"
                   :key="question.exams.list.length">
                <div v-for="(item, index) in question.exams.list"
                     :key="index"
                     class="flex row attached-exam">
                  <div class="detail-box exam-result attached-exam-title  detail-box-first col-7">
                    {{ item.exam.title }}
                  </div>
                  <div class="detail-box exam-result detail-box-first col-3">
                    {{ item.sub_category.title }}
                  </div>
                  <div class="detail-box exam-result order-exam-title detail-box-last col-1">
                    {{ item.order }}
                  </div>
                  <div class="detail-box detach-box detail-box-last col-1">
                    <q-btn
                      unelevated
                      icon="isax:trash"
                      class="detach-btn
                   default-detail-btn"
                      @click="detach(item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="text-right close-btn-box">
            <q-btn
              class="close-btn"
              label="بستن"
              color="primary"
              @click="modal = false"
            />
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
import { QuestCategoryList } from 'src/models/QuestCategory'

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
  created () {},
  data () {
    return {
      text: '',
      draftBtnLoading: false,
      saveBtnLoading: false,
      selectedExam: null,
      selectedLesson: null,
      selectedCategory: null,
      order: null,
      numberRules: [
        v => v !== null || 'پر کردن این فیلد الزامی است.',
        v => Number.isInteger(parseInt(v)) || 'یک عدد وارد کنید.'
      ],
      selectorRules: [
        v => v !== null || 'پر کردن این فیلد الزامی است.'
      ],
      questionData: this.question,
      modal: false,
      categoryDisability: false
    }
  },
  computed: {
    definedExamsTitle () {
      let number = this.question.exams.list.length
      if (number.toString() === '0') {
        number = '00'
      }
      return number + ' آزمون تعریف شده'
    },
    subCategoriesFilteredList () {
      if (this.selectedCategory) {
        return this.lessons.list.filter(item => item.category_id === this.selectedCategory.id)
      }
      return []
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
      if (this.buffer) {
        this.question.exams.addItem({
          id: Date.now(),
          exam: this.selectedExam,
          // exam_id: this.selectedExam.id,
          sub_category: this.selectedLesson,
          // sub_category_id: this.selectedLesson.id,
          order: this.order
        })
      } else {
        this.$emit('attach', {
          exam: this.selectedExam,
          sub_category: this.selectedLesson,
          order: this.order
        })
      }
      this.selectedLesson = ''
      this.selectedCategory = ''
      this.selectedExam = ''
      this.order = '0'
    },
    detach (item) {
      if (this.buffer) {
        // this.question.exams.remove(item.id)
        const itemIndex = this.question.exams.list.findIndex(i => (i.id === item.id))
        if (itemIndex !== -1) {
          this.question.exams.list.splice(itemIndex, 1)
        }
      } else {
        this.$emit('detach', item)
      }
    },
    getLessonTitleById (exam) {
      const target = this.lessons.list.find(item => item.id === exam.sub_category_id || (exam.sub_category && item.id === exam.sub_category.id))
      if (!target) {
        return ''
      }
      return target.title
    }
  },
  watch: {
    selectedCategory: {
      handler () {
        this.selectedLesson = ''
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.input-container {
  display: flex;
  flex-flow: row;
}
.q-dialog {
  .q-dialog__inner--minimized > div {
    width: 720px;
    height: 600px;
  }
  .attach-exam-card {
    background: #FFFFFF;
    border-radius: 15px;
    .q-card__section--vert {
          padding: 30px;
    }
  }
}
.exam-details{
  .exam-details-title {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #23263B;
  }
}
.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  .attached-exam-box {
    margin-bottom: 10px;
    height: 216px;
    overflow: auto;
  }
  .title-show-exams {
    margin-top: 40px;
  }
  .exam-result {
    background: #F4F5F6;
    border-radius: 10px;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: #65677F;
    margin-bottom: 16px;
    min-width: 58px;
  }
  .exam-result-box {
    margin-top: 16px;
    margin-bottom: 8px;
    :first-child {
      margin-left: 0px !important;
    }
    .exam-result-title {
      font-weight: 400;
      font-size: 12px;
      line-height: 21px;
      margin-left: 10px;
      color: #9092A7;
    }
  }
  .attached-exam {
    align-items: center;
    .attached-exam-title {
      width: 320px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-left: 0px !important;
    }
    .detach-box {
      margin-left: 16px;
      margin-bottom: 16px;
      color: #E86562;
    }
    .detach-btn {
      background: #F4F5F6;
      border-radius: 10px;
      width: 40px;
      height: 40px;
    }
    .exam-result {
      padding: 8px 16px;
      margin-left: 16px;
    }
    .order-exam-title {
      padding: 8px;
    }
  }
  //.q-card .attach-exam-card {
  //  background: #FFFFFF;
  //  border-radius: 15px;
  //  .q-card__section--vert {
  //    padding: 30px;
  //  }
  //}
  .default-details-container {
    .detail-box {
      margin-top: 5px;

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
      padding-right: 0px;
      padding-left: 10px;
    }
    .box-order {
      //padding-left: 32px;
    }

    .detail-box-first {
      padding-left: 0px;
    }

    .detail-box-last {
      padding-right: 0px;
    }
  }

  .details-container-2 {
    .detail-box {
      padding-right: 0px ;
      padding-left: 0px ;

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
.close-btn-box {
  .close-btn {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background: #9690E4;
    border-radius: 10px;
    width: 96px;
    height: 40px;
  }
}
</style>

<style lang="scss">
.exam-details {
  .exam-details-all-boxes {
    .details-container-2 {
      .detail-box {
        width: 100%;
        .detail-box-title {
          font-weight: 500;
          font-size: 16px;
          line-height: 28px;
          color: #23263B;
          margin-top: 5px;
        }
        .input-container {
          margin-top: 5px;
          .input-box {
            //width: initial;
            width: 78%;
          }
          .icon-box {
            width: 40px;
            height: 40px;
            background: #FFFFFF;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 16px ;
            color: #65677F ;
            .default-detail-btn {
              width: 40px;
              height: 40px;
              border-radius: 10px;
              font-size: 14px;
              line-height: 24px;
              text-align: center;
            }
            .question-details-subject-img {
              height: 24px;
              max-width: 24px;
            }
          }
        }
      }
      .open-modal-btn {}
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
          background: #9690E4;
          font-weight: 500;
          color: #FFFFFF;
        }
      }
    }
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
}
.attach-exam-card {
  .question-details {
    .q-card .attach-exam-card {
      background: #FFFFFF;
      border-radius: 15px;

      .q-card__section--vert {
        padding: 30px;
      }
    }

    //.attach-exam-card {
    .default-details-container {
      .box-order {
        .q-field {
          width: 155px;
        }
      }

      .detail-box {
        .q-field__control {
          height: 42px;
          background: #F4F5F6 ;

        }

        .q-field {
          background: #F4F5F6 !important;
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

          .q-field__bottom {
            top: 15px;
          }
        }

        .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
        }

        .q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
          min-height: 40px;
          color: #65677F;
          background: #F4F5F6 ;

        }

        .q-field__control::before, .q-field__control::after {
          display: none;
        }

        .q-field__native, .q-field__prefix, .q-field__suffix, .q-field__input {
          color: #65677F;
        }
      }
    }

    //}
  }
}
.q-menu {
  // I'm in charge of this one and did this on purpose, if you need to change this please let me know.TU
  background: #FFFFFF;
  border-radius: 10px;
}
</style>
