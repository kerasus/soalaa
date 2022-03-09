<template>
  <div class="question-details">
    <div class="box-title">مشخصات سوال</div>
    <div class="details-container-1 default-details-container row">
      <div class="detail-box detail-box-first" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title">نام آزمون</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
      <div class="detail-box" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title">طراح سوال</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
      <div class="detail-box" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title">تاریخ تالیف</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
      <div class="detail-box detail-box-last" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title">درجه سختی</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
    </div>
    <div class="details-container-2 default-details-container row">
      <div class="detail-box detail-box-first" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title">پایه</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
      <div class="detail-box" :class="[imgPanelVisibility ? 'col-6' : 'col-6']">
        <div class="detail-box-title">مبحث</div>
        <div class="input-container flex">
          <div class="icon-box">
            <q-img
              src="/img/question-details-subject.png"
              spinner-color="primary"
              class="question-details-subject-img"
            />
          </div>
          <div class="input-box">
            <q-input v-model="text" dense />
          </div>
        </div>
      </div>
      <div class="detail-box detail-box-last-of-row" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <q-btn
          unelevated
          :loading="draftBtnLoading"
          label="پیش نویس"
          class="draft-btn default-detail-btn"
        ></q-btn>
        <q-btn
          unelevated
          :loading="saveBtnLoading"
          color="primary"
          label="ذخیره سوال"
          class="save-btn default-detail-btn"
        />
      </div>
      <div class="detail-box detail-box-last" :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
        <div class="detail-box-title ">رشته</div>
        <q-select borderless v-model="model" :options="options" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDetails',
  props: {
    imgPanelVisibility: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      model: '',
      options: [
        'سه‌آ - دی ماه 1402', 'سه‌آ - دی ماه 1403', 'سه‌آ - دی ماه 1404', 'سه‌آ - دی ماه 1405', 'سه‌آ - دی ماه 1406'
      ],
      text: '',
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
  background: #FFFFFF;
  border-radius: 10px;
}
</style>
