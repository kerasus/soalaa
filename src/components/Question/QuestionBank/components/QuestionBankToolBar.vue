<template>
  <q-card class="question-Bank-ToolBar theme-v1-box-shadow">
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
    <q-card-section class="q-pa-0 toolbar-detail ">
      <div class="row">
        <div class="col-5 question-choose">
          <div class="question-choose-header row"> سوالات انتخاب شده:</div>
          <div class="question-choose-selected row">
            <div v-for="item in filters" :key="item" class="filter-items row">
              <div class="items-title">
                {{ item }}
              </div>
              <div class="items-action">
                <q-btn flat rounded size="xs">
                  <q-icon name="mdi-close"></q-icon>
                </q-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 question-level-box" >
        <div class="row">
          <div class="col-3 question-levels" >
            <div class="row">
              <span
                class="question-level-circles"
                style="background-color:red"
              />
              <p class="question-level"> سخت</p>
            </div>
            <div class="row">
              <span
                class="question-level-circles"
                style="background-color:orange"
              />
              <p class="question-level"> متوسط</p>
            </div>
            <div class="row">
              <span
                class="question-level-circles"
                style="background-color:deepskyblue"
              />
              <p class="question-level">  آسان</p>
            </div>
          </div>
          <div class="col question-levels-chart" > </div>
        </div>
        </div>
        <div class="col-3 deactivate-all">
          <div class="deactivate-all-title">
            غیر فعال کردن همه
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'QuestionBankToolBar',
  data () {
    return {
      filters: ['شیمی دهم', 'فصل یک', 'تستی', 'فیلتر شماره یک', 'فیلتر شماره دو'],
      checkBox: false
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.question-Bank-ToolBar {
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
  .toolbar-detail {
    .question-choose {
      .question-choose-header {
        width: 122px;
        height: 24px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
      }

      .question-choose-selected {
        .filter-items {
          margin-right: 8px;
          margin-bottom: 8px;
          background: #F4F5F6;
          border-radius: 11px;
          display: flex;

          .items-title {
            font-style: normal;
            font-weight: normal;
            font-size: 12px;
            line-height: 21px;
            color: #23263B;
            padding: 2px 0 0 9px;
          }

          .items-action {
            padding: 1px 1px 0 3px;
          }
        }
      }
    }
    .question-level-box{
      .question-levels{
        .question-level-circles{
          margin-right: 5px;
          width: 20px;
          height: 20px;
          border-radius: 10px;
        }
        .question-level{
          width: 39px;
          height: 24px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }
      }
      .question-levels-chart{
      }
    }
    .deactivate-all {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      .deactivate-all-title {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #9690E4;

      }
    }
  }
}

@media only screen and (max-width: 1919px) {
  .question-Bank-ToolBar {
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

}

@media only screen and (max-width: 1439px) {
  .question-Bank-ToolBar {
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
}

@media only screen and (max-width: 1024px) {
  .question-Bank-ToolBar {
    .toolbar-card {
      padding: 10px 16px 10px 16px;

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
}

@media only screen and (max-width: 599px) {
  .question-Bank-ToolBar {
    .toolbar-card {
      background-image: url('../../../../../public/img/QuestionBank/toolbar-back-ground.png');
    }
  }
}
</style>
<style>
.more-section .q-btn {
  padding: 0 3px;
}
</style>
