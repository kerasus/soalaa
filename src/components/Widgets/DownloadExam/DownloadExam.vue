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
              <q-checkbox v-model="pafConfig.hasTitle">
                عنوان آزمون
              </q-checkbox>
              <div class="value">
                gtgytr
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-between items-center">
              <q-checkbox v-model="pafConfig.hasMajor">
                رشته تحصیلی
              </q-checkbox>
              <div class="value">
                gtgytr
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="flex justify-between items-center">
              <q-checkbox v-model="pafConfig.hasGrade">
                پایه تحصیلی
              </q-checkbox>
              <div class="value">
                gtgytr
              </div>
            </div>
          </div>
          <div class="col-12">
            <q-checkbox v-model="pafConfig.hasCreator">
              منبع / طراح سوال
            </q-checkbox>
          </div>
          <q-checkbox v-model="pafConfig.hasCreator">
            سال طراحی سوال
          </q-checkbox>
        </div>
        <q-separator class="separator-margin" />
        <div class="spaces">
          <div class="header flex justify-between">
            <div class="title">فاصله گذاری</div>
            <div class="disable-all"> حدف همه</div>
          </div>
          <div class="sub-title">حاشیه اطراف کاغذ</div>
          <div class="l-t flex justify-between">
            <q-input v-model="number"
                     filled
                     class="side-input"
                     prefix=" cm | "
            >
              <template v-slot:before>
                راست
              </template>
            </q-input>
            <q-input v-model="number"
                     filled
                     class="side-input"
                     prefix=" cm | "
            >
              <template v-slot:before>
                چـــــپ
              </template>
            </q-input>
          </div>
          <div class="u-p flex justify-between">
            <q-input v-model="number"
                     filled
                     class="side-input"
                     prefix=" cm | "
            >
              <template v-slot:before>
                بـــــــالا
              </template>
            </q-input>
            <q-input v-model="number"
                     filled
                     class="side-input"
                     prefix=" cm | "
            >
              <template v-slot:before>
                پاییـن
              </template>
            </q-input>
          </div>
          <div class="sub-sub-title">
            فاصله بین سوالات
          </div>
          <q-input v-model="number"
                   type="number"
                   filled
                   prefix=" cm | "
          />

        </div>
        <q-separator class="separator-margin" />
        <div class="question-info">
          <div class="header flex justify-between">
            <div class="title">شماره گذاری</div>
            <div class="disable-all"> حدف همه</div>
          </div>
          <div class="sub-title">
            شماره شروع سوالات
          </div>
          <q-input v-model="number"
                   type="number"
                   filled
                   prefix=" cm | "
          />

          <div class="sub-title">
            صفحه بندی سوالات
          </div>
          <div class="radio-btn">
            <q-radio v-model="radioOne"
                     val=""
                     label="بله" />

            <q-radio v-model="radioTow"
                     val=""
                     label="خیر" />
          </div>

          <div class="sub-title">
            شماره اولین صفحه سوال
          </div>
          <q-input v-model="number"
                   type="number"
                   filled
                   prefix=" cm | "
          />
        </div>

        <q-btn
          unelevated
          color="primary"
          class="submit-btn full-width">
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
        >
          <q-tab name="questions"
                 label="سوالات" />
          <q-tab name="descriptiveAnswer"
                 label="پاسخنامه تشریحی" />
          <q-tab name="keyAnswer"
                 label="پاسخنامه کلیدی" />
        </q-tabs>
        <q-tab-panel class="tab-panel-style"
                     name="questions">
          <div class="question-info flex">
            <div class="question-count">
              تعداد کل سوالات : 50
            </div>
            <div class="pages">
              تعداد کل صفحات : 14
            </div>
            <div class="action-box full-width flex justify-between items-end">
              <div class="description">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
              </div>
              <div class="action-btn">
                <q-btn unelevated
                       class="btn cancel"
                       label="انصراف"></q-btn>
                <q-btn unelevated
                       color="primary"
                       class="btn"
                       label="دانلود PDF"></q-btn>
              </div>
            </div>
          </div>
          pageCount : {{ pageCount }}
          <div class="pdf-container">
            <vue-pdf-embed
              ref="pdfRef"
              :page="page"
              class="pdf"
              :source="pdfSrc"
              @rendered="handleDocumentRender"
            />
          </div>
        </q-tab-panel>
      </q-card>
      <div class="row text-center justify-center pagination-box">
        <q-pagination
          v-model="page"
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

import VuePdfEmbed from 'vue-pdf-embed'
export default {
  name: 'DownloadExam',
  components: {
    VuePdfEmbed
  },
  data: () => ({
    tab: 'questions',
    pageCount: 0,
    page: 1,
    pdfSrc: 'https://nodes.alaatv.com/media/c/pamphlet/1210/jalase4moshavere.pdf',
    radioOne: false,
    radioTow: false,
    pafConfig: {
      hasTitle: false,
      hasMajor: true,
      hasGrade: true,
      hasCreator: true,
      space: 0
    }
  }),
  methods: {
    handleDocumentRender(data) {
      this.pageCount = this.$refs.pdfRef.pageCount
    },
    onChangePage(value) {
      // console.log('value :', value)
    }
  }
}
</script>

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

      .pdf-container{
        direction: rtl!important ;
        :deep(.vue-pdf-embed){
          direction: rtl!important;
          canvas{
            border-radius: 12px !important;
          }
        }
        .pdf{
          direction: rtl!important;
          *{
            direction: rtl!important;
          }
        }
      }

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
