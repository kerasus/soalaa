<template>
  <div class="question-details">
    <div class="details-container-2 default-details-container row">
      <div class="detail-box detail-box-last-of-row"
           :class="[imgPanelVisibility ? 'col-6' : 'col-3']">
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
          @click="saveQuestion"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BtnBox',
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
  },
  methods: {
    saveQuestion () {
      this.$emit('saveQuestion')
    }
  }
}
</script>

<style scoped lang="scss">
.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  .default-details-container {
    .detail-box {
      margin-top: 10px;
    }
  }
  .details-container-2 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
    }
    .detail-box-last-of-row {
      padding-left: 0px #{"/* rtl:ignore */"};
      margin-top: 43px;
      text-align: end;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      width: 100%;
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
  // I'm in charge of this one and did this on purpose, if you need to change this please let me know.TU
  background: #FFFFFF;
  border-radius: 10px;
}
</style>
