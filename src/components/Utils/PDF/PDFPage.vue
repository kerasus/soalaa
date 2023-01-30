<template>
  <div class="page-wrapper">
    <div class="page-header">
      <div class="logo"></div>
      <div class="info">
        <div class="titles-column"
             :class="{'full-width': !pdfConfig.hasPaginate}"
        >
          <div v-if="pdfConfig.hasTitle"
               class="row">
            <div class="col-12 exam-title">
              <div class="header-field right-mark">
                <span class="subject">
                  عنوان آزمون
                  :
                </span>
                {{ title }}
              </div>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div v-if="pdfConfig.hasMajor"
                 :class="{'col-6': pdfConfig.hasGrade, 'col-12': !pdfConfig.hasGrade}"
                 class="major-title"
            >
              <div class="header-field right-mark">
                <span class="subject">
                  رشته تحصیلی
                  :
                </span>
                {{ major }}
              </div>
            </div>
            <div v-if="pdfConfig.hasGrade"
                 :class="{'col-6': pdfConfig.hasMajor, 'col-12': !pdfConfig.hasMajor}"
                 class="grade-title"
            >
              <div class="header-field right-mark">
                <span class="subject">
                  پایه تحصیلی
                  :
                </span>
                {{ grade }}
              </div>
            </div>
          </div>
        </div>
        <div v-if="pdfConfig.hasPaginate"
             class="paginate-column">
          <div class="header-field">
            <span class="subject">صفحه</span>
            {{ page }}
          </div>
        </div>
      </div>
    </div>
    <div class="page-body"
         :style="{paddingRight: paddingRight + 'mm', paddingLeft: paddingLeft + 'mm', paddingTop:paddingTop + 'mm', paddingBottom:paddingBottom + 'mm'}"
    >
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'PDFPage',
  props: {
    title: {
      type: String,
      default: ''
    },
    major: {
      type: String,
      default: ''
    },
    grade: {
      type: String,
      default: ''
    },
    page: {
      type: String,
      default: ''
    },
    paddingRight: {
      type: Number,
      default: 9
    },
    paddingLeft: {
      type: Number,
      default: 9
    },
    paddingTop: {
      type: Number,
      default: 0
    },
    paddingBottom: {
      type: Number,
      default: 0
    },
    pdfConfig: {
      type: Object,
      default () {
        return {
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
        }
      }
    }
  }
})
</script>
<style>
@media print {
  .page-wrapper{
    margin: 0 !important;
  }
}
</style>
<style lang="scss" scoped>
.page-wrapper {
  width: 794px;
  height: 1123px;
  //background: url(../../../../public/img/PdfBackground.png) no-repeat;
  background: url(../../../../public/img/PdfBackground-empty.png) no-repeat;
  background-size: cover;
  margin: auto;

  .page-header {
    position: relative;
    width: 100%;
    height: 140px;
    margin-bottom: 20px;
    direction: ltr;

    .header-field {
      width: 100%;
      height: 100%;
      background-color: #f7f7ff;
      border: none;
      display: flex;
      align-items: center;
      padding-left: 15px;
      border-radius: 7px;
      &.right-mark {
        border-left: solid 2px #ffb74d;
      }
    }

    .logo {}
    .info {
      display: flex;
      position: absolute;
      left: 163px;
      top: 49px;
      width: 565px;
      height: 73px;

      .paginate-column {
        width: 32px;
        .header-field {
          display: flex;
          flex-flow: column;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 10px;
          padding: 0;
        }
      }
      .titles-column {
        display: flex;
        flex-flow: column;
        justify-content: center;
        width: calc( 100% - 32px );
        padding-right: 8px;
        .header-field {
          height: 34px;
          margin-bottom: 5px;
        }
      }
    }

    .title {
      position: absolute;
      top: 49px;
      left: 164px;
      height: 34px;
      direction: ltr;

      .subject {
        font-weight: 500;
      }
    }
    .major {
      position: absolute;
      top: 95px;
      left: 180px;
      direction: ltr;

      .subject {
        font-weight: 500;
      }
    }
    .grade {
      position: absolute;
      top: 95px;
      left: 445px;
      direction: ltr;

      .subject {
        font-weight: 500;
      }
    }
    .pagination {
      position: absolute;
      top: 55px;
      right: 70px;
      height: 67px;
      width: 23px;
      font-size: 10px;
      display: flex;
      flex-flow: column;
      align-items: center;
      justify-content: center;
      .subject {
        font-weight: 500;
        font-size: 10px;
      }
    }
  }
}
</style>
