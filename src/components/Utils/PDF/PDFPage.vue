<template>
  <div class="page-wrapper">
    <div class="page-header">
      <div class="title">
        <span class="subject">: عنوان آزمون</span>
        {{ title }}
      </div>
      <div class="major">
        <span class="subject">: رشته تحصیلی</span>
        {{ major }}
      </div>
      <div class="grade">
        <span class="subject">: پایه تحصیلی</span>
        {{ grade }}
      </div>
      <div class="pagination">
        <span class="subject">صفحه</span>
        {{ page }}
      </div>
    </div>
    <div class="page-body"
         :style="{paddingRight: paddingRight + 'px', paddingLeft: paddingLeft + 'px', paddingTop:paddingTop + 'px', paddingBottom:paddingBottom + 'px'}"
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
      default: 35
    },
    paddingLeft: {
      type: Number,
      default: 35
    },
    paddingTop: {
      type: Number,
      default: 0
    },
    paddingBottom: {
      type: Number,
      default: 0
    }
  }
})
</script>

<style lang="scss" scoped>
.page-wrapper {
  width: 794px;
  height: 1123px;
  background: url(../../../../public/img/PdfBackground.png) no-repeat;
  background-size: cover;
  margin: auto;

  .page-header {
    position: relative;
    width: 100%;
    height: 140px;
    margin-bottom: 20px;

    .title {
      position: absolute;
      top: 55px;
      left: 180px;

      .subject {
        font-weight: 500;
      }
    }
    .major {
      position: absolute;
      top: 95px;
      left: 180px;

      .subject {
        font-weight: 500;
      }
    }
    .grade {
      position: absolute;
      top: 95px;
      left: 445px;

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
      .subject {
        font-weight: 500;
        font-size: 10px;
      }
    }
  }
}
</style>
