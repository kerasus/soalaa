<template>
  <div class="download-exam row">
    <div class="col-3 form">
      <q-card>
        <div class="exam-info q-col-gutter-y-sm row">
          <div class="col-12">
            <div class="header flex justify-between">
              <div class="title">اطلاعات آزمون</div>
              <div class="disable-all">غیرفعال کردن همه</div>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-between items-center">
              <q-checkbox v-model="pdfConfig.hasTitle">
                عنوان آزمون
              </q-checkbox>
              <div class="value">
                {{ examInfo.title }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-between items-center">
              <q-checkbox v-model="pdfConfig.hasMajor">
                رشته تحصیلی
              </q-checkbox>
              <div class="value">
                {{ examInfo.majorTitle }}
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-between items-center">
              <q-checkbox v-model="pdfConfig.hasGrade">
                پایه تحصیلی
              </q-checkbox>
              <div class="value">
                {{ examInfo.gradeTitle }}
              </div>
            </div>
          </div>
          <!-- <div class="col-12">
            <q-checkbox v-model="pdfConfig.hasCreator">
              منبع / طراح سوال
            </q-checkbox>
          </div>
          <q-checkbox v-model="pdfConfig.hasCreator">
            سال طراحی سوال
          </q-checkbox> -->
        </div>
        <q-separator class="separator-margin" />
        <div class="spaces">
          <div class="header flex justify-between">
            <div class="title">فاصله گذاری</div>
            <div class="disable-all"> حدف همه</div>
          </div>
          <div class="sub-title">حاشیه اطراف کاغذ</div>
          <div class="l-t flex justify-between">
            <q-input v-model="pdfConfig.rightMargin"
                     filled
                     class="side-input"
                     prefix=" mm | "
            >
              <template v-slot:before>
                راست
              </template>
            </q-input>
            <q-input v-model="pdfConfig.leftMargin"
                     filled
                     class="side-input"
                     prefix=" mm | "
            >
              <template v-slot:before>
                چـــــپ
              </template>
            </q-input>
          </div>
          <div class="sub-sub-title">
            فاصله بین صورت سوال و گزینه ها
          </div>
          <q-input v-model="pdfConfig.questionAndChoices"
                   type="number"
                   filled
                   prefix=" mm | "
          />

          <div class="sub-sub-title">
            فاصله بین گزینه ها
          </div>
          <q-input v-model="pdfConfig.betweenChoices"
                   type="number"
                   filled
                   prefix=" mm | "
          />

          <div class="sub-sub-title">
            فاصله بین سوالات
          </div>
          <q-input v-model="pdfConfig.spaceBetweenQuestion"
                   type="number"
                   filled
                   prefix=" mm | "
          />

        </div>
        <q-separator class="separator-margin" />
        <div class="question-info">
          <div class="header flex justify-between">
            <div class="title">شماره گذاری</div>
            <div class="disable-all"> حدف همه</div>
          </div>
          <!-- <div class="sub-title">
            شماره شروع سوالات
          </div>
          <q-input v-model="number"
                   type="number"
                   filled
          /> -->

          <div class="sub-title">
            صفحه بندی سوالات
          </div>
          <div class="radio-btn">
            <q-radio v-model="pdfConfig.hasPaginate"
                     :val="true"
                     label="بله" />

            <q-radio v-model="pdfConfig.hasPaginate"
                     :val="false"
                     label="خیر" />
          </div>

          <div class="sub-title">
            شماره اولین صفحه سوال
          </div>
          <q-input v-model="pdfConfig.paginateStart"
                   type="number"
                   filled
          />
        </div>

        <q-btn
          unelevated
          color="primary"
          class="submit-btn full-width"
          @click="requestPdf">
          <span class="btn-label">
            اعمال
          </span>
        </q-btn>
      </q-card>
    </div>
    <div class="col-9 pdf">
      <q-card>
        <q-tabs
          v-model="tab"
          class="tabs-box"
          active-color="secondary"
          align="left"
          @update:model-value="requestPdf"
        >
          <q-tab name="questions"
                 label="سوالات" />
          <q-tab name="descriptiveAnswer"
                 label="پاسخنامه تشریحی" />
          <q-tab name="keyAnswer"
                 label="پاسخنامه کلیدی" />
        </q-tabs>
        <q-tab-panels v-model="tab"
                      animated>
          <q-tab-panel class="tab-panel-style"
                       name="questions">
            <div class="question-info flex">
              <div class="question-count">
                تعداد کل سوالات :
                {{ examInfo.n_questions }}
              </div>
              <div class="pages">
                تعداد کل صفحات : {{ questionPagesCount }}
              </div>
              <div class="action-box full-width flex justify-between items-end">
                <div class="description">
                  توضیحات: ندارد.
                </div>
                <div class="action-btn">
                  <q-btn unelevated
                         class="btn cancel"
                         label="انصراف"></q-btn>
                  <q-btn unelevated
                         color="primary"
                         class="btn"
                         label="دانلود PDF"
                         @click="generatePDF('questionPdf')"
                  />
                </div>
              </div>
            </div>
            <div ref="questionPdf"
                 class="pdf-container">
              <div v-if="loading"
                   class="loading">
                <q-skeleton height="900px"
                            class="pdf-skeleton" />
              </div>
              <p-d-f-container v-else-if="doesHaveQuestion"
                               :exam="examInfo"
                               :questions="questions"
                               :pdfConfig="pdfConfig"
                               @loaded="onQuestionsLoaded"
              />
            <!--            <vue-pdf-embed-->
            <!--              v-else-->
            <!--              ref="pdfRef"-->
            <!--              :page="page"-->
            <!--              class="pdf"-->
            <!--              :source="pdfSrc"-->
            <!--              @rendered="handleDocumentRender"-->
            <!--            />-->
            </div>
          </q-tab-panel>
          <q-tab-panel class="tab-panel-style"
                       name="descriptiveAnswer">
            <div class="question-info flex">
              <div class="question-count">
                تعداد کل سوالات :
                {{ examInfo.n_questions }}
              </div>
              <div class="pages">
                تعداد کل صفحات : {{ questionPagesCount }}
              </div>
              <div class="action-box full-width flex justify-between items-end">
                <div class="description">
                  توضیحات : ندارد
                </div>
                <div class="action-btn">
                  <q-btn unelevated
                         class="btn cancel"
                         label="انصراف"></q-btn>
                  <q-btn unelevated
                         color="primary"
                         class="btn"
                         label="دانلود PDF"
                         @click="generatePDF('descriptiveAnswerPdf')"
                  />
                </div>
              </div>
            </div>
            <div ref="descriptiveAnswerPdf"
                 class="pdf-container">
              <div v-if="loading"
                   class="loading">
                <q-skeleton height="900px"
                            class="pdf-skeleton" />
              </div>
              <p-d-f-container v-else-if="doesHaveQuestion"
                               :exam="examInfo"
                               :questions="questions"
                               :pdfConfig="pdfConfig"
                               :mode="'onlyDescriptiveAnswers'"
                               @loaded="onQuestionsLoaded"
              />
            <!--            <vue-pdf-embed-->
            <!--              v-else-->
            <!--              ref="pdfRef"-->
            <!--              :page="page"-->
            <!--              class="pdf"-->
            <!--              :source="pdfSrc"-->
            <!--              @rendered="handleDocumentRender"-->
            <!--            />-->
            </div>
          </q-tab-panel>
          <q-tab-panel class="tab-panel-style"
                       name="keyAnswer">
            <div class="question-info flex">
              <div class="question-count">
                تعداد کل سوالات :
                {{ examInfo.n_questions }}
              </div>
              <div class="pages">
                تعداد کل صفحات : {{ questionPagesCount }}
              </div>
              <div class="action-box full-width flex justify-between items-end">
                <div class="description">
                  توضیحات : ندارد
                </div>
                <div class="action-btn">
                  <q-btn unelevated
                         class="btn cancel"
                         label="انصراف"></q-btn>
                  <q-btn unelevated
                         color="primary"
                         class="btn"
                         label="دانلود PDF"
                         @click="generatePDF('keyAnswerPdf')"
                  />
                </div>
              </div>
            </div>
            <div ref="keyAnswerPdf">
              <pdf-page :title="examInfo.title"
                        :grade="examInfo.gradeTitle"
                        :major="examInfo.majorTitle"
                        :page="1"
              >
                <template v-slot:body>
                  <paginate-bubble-sheet :questions="questions"
                                         :info="{
                                           type: 'pasokh-nameh'
                                         }"
                                         @loaded="onQuestionsLoaded"
                  />
                </template>
              </pdf-page>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
      <div class="row text-center justify-center pagination-box">
        <q-pagination v-model="page"
                      :max="pageCount"
                      icon-first="isax:arrow-right-4"
                      icon-next="isax:arrow-right"
                      icon-last="isax:arrow-left"
                      @update:model-value="onChangePage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import PdfPage from 'src/components/Utils/PDF/PDFPage.vue'
import PDFContainer from 'src/components/Utils/PDF/PDFContainer.vue'
// import VuePdfEmbed from 'vue-pdf-embed'
import html2pdf from 'html2pdf.js'
// import html2canvas from 'html2canvas'
import 'src/Utils/PrintElements/print.css'
import PaginateBubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/paginateBubbleSheet.vue'
export default {
  name: 'DownloadExam',
  components: {
    PaginateBubbleSheet,
    PdfPage,
    PDFContainer
    // VuePdfEmbed
  },
  data: () => ({
    tab: 'questions',
    questionPagesCount: 0,
    pageCount: 0,
    page: 1,
    pdfSrc: '',
    examInfo: {
      title: '',
      gradeTitle: '',
      majorTitle: '',
      n_questions: 0
    },
    radioOne: false,
    radioTow: false,
    pdfConfig: {
      hasTitle: true,
      hasMajor: true,
      hasGrade: true,
      hasPaginate: true,
      paginateStart: 1,
      spaceBetweenQuestion: 5,
      rightMargin: 5,
      leftMargin: 5,
      questionAndChoices: 5,
      betweenChoices: 5
    },
    loading: false,
    doesHaveQuestion: false,
    questions: []
  }),
  mounted() {
    this.requestPdf()
    this.getExamInfo()
  },
  methods: {
    onQuestionsLoaded (pages) {
      if (!pages) {
        this.questionPagesCount = 0
        return
      }
      this.questionPagesCount = pages.length
    },
    handleDocumentRender(data) {
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    onChangePage(value) {
      // console.log('value :', value)
    },
    getExamInfo () {
      this.loading = true
      this.$axios.get(API_ADDRESS.exam.user.examInfo(this.$route.params.examId))
        .then((response) => {
          this.examInfo.title = response.data.data.title
          this.examInfo.gradeTitle = response.data.data.temp.grade.title
          if (response.data.data.temp.major) {
            this.examInfo.majorTitle = response.data.data.temp.major.title
          }
          this.examInfo.n_questions = response.data.data.n_questions
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    requestPdf() {
      this.loading = true
      this.pdfSrc = ''
      this.$axios.post(API_ADDRESS.exam.user.questionsWithAnswer(this.$route.params.examId), this.pdfConfig)
        .then((response) => {
          this.questions = response.data.data
          this.doesHaveQuestion = true
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    replacePdf() {
      this.pdfSrc = 'https://nodes.alaatv.com/media/c/pamphlet/1210/jalase1moshavere.pdf'
    },
    generatePDF (ref) {
      html2pdf()
        .from(this.$refs[ref])
        .save()
    }
  }
}
</script>
<style>
@media print {
  /* * {
    visibility: hidden;
  } */
  body * {
    visibility: hidden;
  }
  #pdf-container, #pdf-container * {
    visibility: visible;
  }
  #pdf-container {
    left: 0;
    top: 0;
  }
  .page-break {
    clear: both;
    page-break-before: always;
  }
}
</style>
<style scoped lang="scss">
.download-exam {
  :deep(.q-col-gutter-y-sm) {
    padding-top: 10px;
  }

  :deep(.q-card) {
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    color: #434765;

    .header {
      .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
      }

      .disable-all {
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        text-align: right;
        letter-spacing: -0.03em;
        color: #9690E4;
        cursor: pointer;
      }
    }
  }

  .form {
    .separator-margin {
      margin: 20px 0;
    }

    .submit-btn {
      margin-top: 38.5px;

      .btn-label {
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        align-items: center;
        letter-spacing: -0.03em;
        color: #FFFFFF;
      }
    }

    padding-right: 15px;

    .value {
      width: 155px;
      padding: 9px 16px;
      background: #F2F5F9;
      border-radius: 8px;
      color: #6D708B;
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      min-height: 40px;
    }

    .exam-info {
      .header {
        margin-bottom: 16px;
      }
    }
    .spaces {
      .sub-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        margin-top: 20px;
        margin-bottom: 8px;
      }

      .side-input {
        width: 124px;
        height: 40px;

        :deep(.q-field__prefix) {
          padding: 9px;
        }

        :deep(.q-field__before) {
          font-size: 14px;
          line-height: 22px;
          height: 40px;
        }

        :deep(.q-field__inner) {
          background-color: transparent;
          height: 40px
        }

        :deep(.q-field__native) {
          padding: 3px;
        }
      }

      .l-t {
        margin-bottom: 10px;
      }

      .u-p {
        margin-bottom: 20.5px;
      }

      .sub-sub-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 8px;
      }
    }

    .question-info {
      .sub-title {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        margin-bottom: 8px;
        margin-top: 20px;
      }

      .radio-btn{
        .q-radio {
          .q-radio__inner {
            .q-radio__icon-container {
              border-radius: 50%;
              color: white;
              background: var(--3a-Secondary);
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }

  .loading {
    width: 100%;

    .pdf-skeleton {
      border-radius: 15px;
    }
  }

  .pdf {
    padding-left: 15px;

    :deep(.q-card) {
      padding: 32px;
    }

    :deep(.q-tab) {
      margin-right: 36px;
      border-radius: 0;

    }

    .tabs-box {
      color: #8A8CA6;

      :deep(.q-tab__indicator) {
        width: 100%;
        height: 3px;
        padding-right: 30px;
        border-radius: 6px;
      }

      :deep(.q-tab) {
        color: var(--3a-TextSecondary);
        padding: 0;
      }

      :deep(.q-tab__content) {
        padding: 0;
        border-radius: 0 !important;
      }

      :deep(.q-tab--inactive) {
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: right;
        letter-spacing: -0.03em;
        color: #6D708B;
      }

    }

    .tab-panel-style {
     padding: 30px 0 0 0;
      border-top: 1px solid #E4E8EF;

      // .pdf-container{
      //   direction: ltr!important ;
      //   :deep(.vue-pdf-embed){
      //     direction: rtl!important;
      //     canvas{
      //       border-radius: 12px !important;
      //     }
      //   }
      //   .pdf{
      //     direction: rtl!important;
      //     *{
      //       direction: rtl!important;
      //     }
      //   }
      // }

      .pagination-box{
          margin-top: 30px;
      }

      .ifa{
        height: 500px;
      }

      .question-info{
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        text-align: right;
        color: #434765;
        margin-bottom: 5px;
        .question-count{
          margin-right: 33px;
        }
      }

      .action-box{
        margin-bottom: 25px;
        .description{
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          text-align: right;
          color: #434765;
        }
        .cancel{
          margin-right: 12px;
          background: #F2F5F9;
          :deep(.q-btn__content){
            color: #6D708B;
          }
        }
        .btn{
          width: 120px;
          :deep(.q-btn__content){
            font-weight: 600;
            font-size: 14px;
            line-height: 22px;
            letter-spacing: -0.03em;
          }
        }
      }
    }
  }
}
</style>
