<template>
  <q-card class="question-Bank-ToolBar theme-v1-box-shadow">
    <q-expansion-item
      expand-icon-toggle
      expand-icon="isax:arrow-down-1"
    >
      <template v-slot:header>
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
              {{ this.choicesNumber }}
              <span class="choices-number-title">سوال انتخاب شده</span>
            </div>
          </div>
        </q-card-section>
      </template>
    <q-card-section class="q-pa-0 toolbar-detail">
      <div class="toolbar-detail-container row">
        <div class="chosen-questions col-5">
          <div class="chosen-question-title">
            سوالات انتخاب شده:
          </div>
          <q-card-actions class="chosen-question-items">
            <div
              v-for="item in filters"
              :key="item"
              class="filter-items"
            >
              <div class="items-title">
                 {{ item.title }}: {{ item.amount }}
              </div>
              <div class="items-action">
                <q-btn flat rounded size="xs" @click="deleteFilter(item.id)">
                  <q-icon name="mdi-close"></q-icon>
                </q-btn>
              </div>
            </div>
          </q-card-actions>
        </div>
        <div class="question-level-chart col-5 justify-center flex q-pl-lg">
            <div class="row">
                <div class="col-4">
                  <div class="chart-titles">
                    <q-badge class="titles-icon hard" rounded  />
                    <div>سخت</div>
                  </div>
                  <div class="chart-titles">
                    <q-badge class="titles-icon medium" rounded></q-badge>
                    <div>متوسط</div>
                  </div>
                  <div class="chart-titles">
                    <q-badge class="titles-icon easy" rounded ></q-badge>
                    <div>آسان</div>
                  </div>
                </div>
                <div class="question-highchart col-8 q-pl-xs">
                  <highcharts :options="chartOptions" />
                </div>
            </div>
        </div>
        <div class="col-2" >
          <q-btn rounded flat class="deactivate-all">
            غیر فعال کردن همه
          </q-btn>
        </div>
      </div>
    </q-card-section>
    </q-expansion-item>
  </q-card>
</template>

<script>
import { Chart } from 'highcharts-vue'
export default {
  components: { highcharts: Chart },
  name: 'QuestionBankToolBar',
  data () {
    return {
      choicesNumber: 0,
      filters: [
        {
          title: 'شیمی',
          id: 1,
          amount: 3
        },
        {
          title: 'ریاضی',
          id: 2,
          amount: 55
        },
        {
          title: 'دینی',
          id: 3,
          amount: 55
        },
        {
          title: 'ادبیات',
          id: 4,
          amount: 24
        },
        {
          title: 'عربی',
          id: 5,
          amount: 23
        }
      ],
      chartOptions: {
        chart: {
          height: '90',
          width: '110',
          type: 'pie',
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        plotOptions: {
          pie: {
            innerSize: '98%',
            startAngle: -200,
            endAngle: 360,
            borderWidth: 10,
            center: ['50%', '50%'],
            size: '110%',
            borderColor: null,
            slicedOffset: 0,
            dataLabels: {
              connectorWidth: 0
            }
          }
        },
        title: {
          y: 28,
          style: {
            useHTML: true
          },
          verticalAlign: 'middle',
          floating: true,
          text: '<span  class="title-1"> ۳۵</span> <span dy="-8"class="title-2">سوال</span>'
        },
        series: [{
          id: 'idData',
          name: 'Data',
          data: [
            { name: '', y: 190000.00, color: '#FFCA28' },
            { name: '', y: 150000.00, color: '#8ED6FF' },
            { name: '', y: 240000.00, color: '#DA5F5C' }

          ]
        }]
      },
      checkBox: false
    }
  },
  computed: {
  },
  methods: {
    deleteFilter (id) {
      this.filters = this.filters.filter(e => e.id !== id)
    }
  }
}
</script>

<style lang="scss" scoped>
.question-Bank-ToolBar {
  .q-item-type{
    justify-content: space-between;
  }
  .toolbar-card {
    display: flex;
    min-width: 900px;
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

  }
  .toolbar-detail {
    .toolbar-detail-container {
      .chosen-questions {
        .chosen-question-title {
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }
        .chosen-question-items {
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
      .question-level-chart {
        .chart-titles {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
          display: flex;
          align-items: center;
          .titles-icon {
            width: 13px;
            height: 13px;
            margin-right: 4px;
          }
          .hard {
            background-color: #DA5F5C;
          }
          .medium {
            background-color: #FFCA28;
          }
          .easy {
            background-color: #8ED6FF;
          }
        }
      }
      .deactivate-all {
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #9690E4;
        position: absolute;
        bottom: 16px;
        right: 24px;
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
      background-image: url('../../../../public/img/QuestionBank/toolbar-back-ground.png');
    }
  }
}
</style>
<style lang="scss">
.question-Bank-ToolBar {
  .q-item-type{
    justify-content: space-between;
  }
  .q-expansion-item--collapsed{
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;
      &:before{
        content: 'بیشتر';
      }
      i{
        margin-top: 0;
        margin-left: 10px;
      }
      .q-expansion-item__toggle-focus{
        display: none;
      }
    }
  }
  .q-expansion-item--expanded {
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;
      &:before{
        content: 'بستن';
      }
      i{
        margin-top: 0;
        margin-left: 10px;
      }
      .q-expansion-item__toggle-focus{
        display: none;
      }
    }
  }
  .toolbar-detail{
    .toolbar-detail-container{
      .question-level-chart{
        .question-highchart{
          .title-1{
            font-weight: 700;
            font-size: 24px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }
          .title-2{
            font-weight: 400;
            font-size: 14px;
            line-height:20px;
            text-align: center;
            color: #23263B;
          }
          .highcharts-container{
            height: 180px;
          }
        }
      }
    }
  }
}
</style>
