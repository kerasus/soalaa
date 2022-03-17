<template>
  <q-card class="theme-v1-box-shadow">
    <q-card-section class="toolbar-card q-pa-0">
      <div class="toolbar-card-actions">
        <div class="toolbar-btn">
          <q-btn class="delete-choices-btn" flat>
            حذف انتخاب ها
          </q-btn>
          <q-btn class="add-to-btn" flat>
            <q-icon name="isax:add">
            </q-icon>
            <span>
            افزودن به
          </span>
          </q-btn>
        </div>
        <div class="toolbar-checkbox">
          <q-checkbox class="choices-checkbox" label="انتخاب همه" v-model="checkBox"></q-checkbox>
        </div>
        <div class="choices-number">
          35
          <span class="choices-number-title">سوال انتخاب شده</span>
        </div>
      </div>
      <div class="more-section">
        <q-btn flat class="more-btn">
          بیشتر
          <q-icon name="isax:arrow-down-1" size="16px" style="margin-right: 10px">
          </q-icon>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'QuestionBankToolBar',
  data () {
    return {
      checkBox: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.toolbar-card {
  display: flex;
  justify-content: space-between;
  padding: 17px 40px 17px 40px;
  .toolbar-card-actions {
    width: 90%;
    display: flex;
    .toolbar-btn {
      align-items: center;
      display: flex;

      .delete-choices-btn {
        background-color: #F4F5F6;
        color: #23263B;
        border-radius: 10px;
        width: 144px;
        height: 40px;
      }

      .add-to-btn {
        background-color: #9690E4;
        color: #ffffff;
        border-radius: 10px;
        width: 144px;
        height: 40px;
        margin-left: 20px;
      }
    }

    .toolbar-checkbox {
      align-items: center;
      display: flex;
      margin-left: 14.1%;
    }

    .choices-number {
      margin-left: 6.4%;
      align-items: center;
      display: flex;
      font-style: normal;
      font-weight: 700;
      font-size: 30px;
      line-height: 52px;
      color: #23263B;

      .choices-number-title {
        margin-left: 10px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #23263B;
      }
    }
  }
  .more-section {
    align-items: center;
    display: flex;
  }
}

@media only screen and (max-width: 1919px) {
  .toolbar-card {
    padding: 17px 24px 17px 24px;
    .toolbar-card-actions {
      .toolbar-btn {
        .add-to-btn {
          margin-left: 16px;
        }
      }
      .toolbar-checkbox {
        margin-left: 7.75%;
      }
      .choices-number {
        margin-left: 5.25%;
      }
    }
    }
}
@media only screen and (max-width: 1439px) {
  .toolbar-card {
    padding: 10px 20px 10px 20px;
    .toolbar-card-actions {
      .toolbar-checkbox {
        margin-left: 1.7%;
      }
      .choices-number {
        margin-left: 2.6%;
      }
    }
  }
}
@media only screen and (max-width: 1024px) {
  .toolbar-card {
    padding: 10px 16px 10px  16px;
    .toolbar-card-actions {
      width: 85%;
      .toolbar-btn {
        .delete-choices-btn {
          display: none;
        }
        .add-to-btn {
          margin-left: 0;
        }
      }
      .toolbar-checkbox {
        margin-left: 1.4%;
      }
      .choices-number {
        margin-left: 3.6%;
      }
    }
  }
}
@media only screen and (max-width: 599px) {
  .toolbar-card {
    background-image: url('../../../../../public/img/QuestionBank/toolbar-back-ground.png');
  }
  }
</style>
<style>
.more-section .q-btn {
  padding: 0 3px;
}
</style>
