<template>
  <div class="takhmin-rotbe">
    <div class="d-flex justify-center wrapper">
      <div v-if="report"
           class="row">
        <div class="col col-12 proceeds-table">
          <div class="q-pa-md">
            تخمین رتبه براساس نتایج کنکور سراسری
          </div>
          <q-btn class="full-width"
                 label="تخمین رتبه"
                 color="primary"
                 @click="sendData" />
        </div>
        <div
          class="col col-md-5 col-12 default-result-table"
        >
          <div class="row default-result-table default-resultTable-row">
            <div class="col default-resultTable-col">
              <span class="tableTitle col-12 q-pb-lg">
                انتخاب کنکور
              </span>
              <q-select
                v-model="takhminRotbeExam"
                option-value="id"
                option-label="title"
                :loading="takhminRotbeLoading"
                :options="takhminRotbeExamList"
                label-color="grey-8"
                label="انتخاب نوع آزمون"
                emit-value
                map-options
                @update:model-value="onTakhminRotbeExamChanged"
              />
            </div>
          </div>
          <div class="col col-12 row default-resultTable-row">
            <div class="col default-resultTable-col">
              <q-card class="default-result-card">
                <div class="row card-title-section">
                  <div v-for="(item, index) in ranks"
                       :key="index"
                       class="col col-4 text-center">
                    {{'رتبه ' + item.title}}
                  </div>
                </div>
                <span class="cardContent">
                  <div class="row">
                    <div v-for="(item, index) in ranks"
                         :key="index"
                         class="col col-4 text-center">
                      {{item.rank}}
                    </div>
                  </div>
                </span>
              </q-card>
            </div>
          </div>
        </div>
        <div class="col col-md-7 col-12 default-result-table">
          <div class="row default-resultTable-row">
            <div class="col default-resultTable-col">
              <span class="tableTitle col-12">
                جدول عملکرد دروس
              </span>
              <br>
              <br>
              <q-table
                :key="tableKey"
                :rows="takhminReport.sub_category"
                :columns="columns"
                row-key="name"
                color="amber"
                hide-bottom
                flat
                :rows-per-page-options="[0]"
              >
                <template v-slot:body="props">
                  <q-tr :props="props">
                    <q-td key="sub_category"
                          :props="props">
                      {{ props.row.sub_category }}
                    </q-td>
                    <q-td key="percent"
                          :props="props">
                      <q-input
                        v-model="percents[props.row.sub_category_id]"
                        type="number"
                        :rules="[numberRule, percentRule]"
                        dense
                        autofocus
                        @change="resetAnswerCount(props.row.sub_category_id)"
                      />
                    </q-td>
                  </q-tr>
                </template>
              </q-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'NewTakhminRotbe',
  props: {
    report: {
      default () {
        return null
      }
    }
  },
  data () {
    return {
      name: '',
      tableKey: 0,
      numberRule: v => {
        if (!isNaN(v) && v !== ' ' && v !== '') return true
        return 'مقدار وارد شده عدد نیست.'
      },
      percentRule: v => {
        if (!v.toString().trim()) return true
        if (!isNaN(parseFloat(v)) && v >= -33.33 && v <= 100) return true
        return 'درصد می بایست عددی در بازه 33.33- درصد تا 100 درصد باشد.'
      },
      ranks: [
        {
          title: 'منطقه 1',
          rank: 0
        },
        {
          title: 'منطقه 2',
          rank: 0
        },
        {
          title: 'منطقه 3',
          rank: 0
        }
      ],
      takhminReport: {
        main: {
          percent: 0
        },
        sub_category: [],
        zirgorooh: []
      },
      percents: {},
      columns: [
        { name: 'sub_category', label: 'درس', field: row => row.sub_category, align: 'center', sortable: false },
        { name: 'percent', label: ' درصد', field: row => row.percent, align: 'center', sortable: true }
      ],
      takhminRotbeLoading: false,
      takhminRotbeExam: '',
      takhminRotbeExamList: []
    }
  },
  created () {},
  mounted () {
    this.setTakhminRotbeExamList()
    this.prepareTakhmineRotbeReport(this.report, true)
  },
  methods: {
    onTakhminRotbeExamChanged (id) {
      const takhminRotbeExam = this.takhminRotbeExamList.find(item => item.id === id)
      const report = this.report
      report.sub_category = takhminRotbeExam.sub_category.map(item => {
        return {
          ...item,
          sub_category: item.title,
          sub_category_id: item.id
        }
      })
      this.prepareTakhmineRotbeReport(report, true)
      this.restTable()
      this.resetRank()
      this.setInitialPercents(this.takhminReport.sub_category)
    },
    restTable () {
      this.tableKey++
    },
    resetRank () {
      this.ranks.forEach(item => {
        item.rank = 0
      })
    },
    setTakhminRotbeExamList () {
      this.takhminRotbeLoading = true
      this.$axios.get(API_ADDRESS.exam.report.takhminRotbeExamList)
        .then(res => {
          this.takhminRotbeExamList = res.data.data
          this.takhminRotbeLoading = false
        })
        .catch(() => {
          this.takhminRotbeLoading = false
        })
    },
    resetAnswerCount (subcategoryId) {
      if (this.percents[subcategoryId] < -33.33 || this.percents[subcategoryId] > 100) {
        this.$q.notify({
          type: 'negative',
          message: 'درصد می بایست در بازه 33.33- درصد تا 100 درصد باشد.',
          position: 'top'
        })
        this.percents[subcategoryId] = 0
      }

      this.prepareTakhmineRotbeReport()
    },
    prepareTakhmineRotbeReport (report = {}, resetPercents = false) {
      const that = this
      let takhminReport = JSON.parse(JSON.stringify(this.report))
      if (report?.id) {
        takhminReport = JSON.parse(JSON.stringify(report))
      }
      if (!takhminReport.main) {
        takhminReport.main = {}
      }
      takhminReport.main.percent = 0
      takhminReport.zirgorooh.forEach(item => {
        item.percent = 0
      })
      if (resetPercents) {
        takhminReport.sub_category.forEach(item => {
          that.percents[item.sub_category_id] = 0
        })
      }
      this.takhminReport = takhminReport
    },
    setInitialPercents (subCategoryList) {
      this.percents = {}
      subCategoryList.forEach(item => {
        this.percents = Object.assign(this.percents, {
          [item.sub_category_id]: 0
        })
      })
    },
    validateSendData () {
      let status = true
      for (const subcategoryId in this.percents) {
        let percent = this.percents[subcategoryId]
        if (isNaN(percent)) {
          this.$q.notify({
            type: 'negative',
            message: 'مقدار صحیحی برای درصد وارد نشده است.',
            position: 'top'
          })
          status = false
        }
        percent = parseInt(percent)
        if (percent > 100 || percent < -33.33) {
          this.$q.notify({
            type: 'negative',
            message: 'درصد می بایست در بازه 33.33- درصد تا 100 درصد باشد.',
            position: 'top'
          })
          status = false
        }
      }

      return status
    },
    sendData () {
      if (!this.validateSendData()) {
        return
      }
      const keys = Object.keys(this.percents)
      const sentPercents = []
      for (let i = 0; i < keys.length; i++) {
        sentPercents.push({
          percent: parseFloat(this.percents[keys[i]]),
          subcategoryId: keys[i]
        })
      }
      this.$axios.post(API_ADDRESS.exam.konkurTakhminRotbe(this.takhminRotbeExam), {
        percents: sentPercents
      })
        .then(response => {
          this.ranks = response.data.ranks
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    .subColsPaddingRight {
        padding-right: 5px #{"/* rtl:ignore */"};
    }

    .subColsPaddingBottom {
        padding-bottom: 3px;
    }

    .firstColPadding {
        padding-right: 5px #{"/* rtl:ignore */"};
    }

    .wrapper {
        width: 97%;
        margin: auto;
    }

    .subRowHeight {
        height: 33%
    }

    .subCards {
        border-radius: 15px;
        margin-top: 10px;
    }

    .cardContent {
        white-space: nowrap;
        text-align: center;
        font-family: IRANSans(FaNum);
        font-style: normal;
        font-weight: normal;
        font-size: 40px;
        color: rgba(51, 51, 51, 1);
        display: flow-root #{"/* rtl:ignore */"};
    }

    .cardTitle {
        background-color: rgba(255, 193, 7, 0.3);
        border-radius: 15px;
        white-space: nowrap;
        line-height: 34px;
        margin-top: -8px;
        text-align: center;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        color: rgba(0, 0, 0, 1);
        place-content: space-evenly #{"/* rtl:ignore */"};
    }

    .tableTitle {
        margin-right: 15px #{"/* rtl:ignore */"};
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        text-align: right #{"/* rtl:ignore */"};
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: #2a2a2a;
        width: 100%;

    }

    .dataTableHeight1 {
        height: 100%;
    }

    .infoCard {
        margin-top: 10px;
        border-radius: 15px;
    }
    .takhmin-rotbe {
      background-color: rgb(244, 244, 244);
      .default-result-table{
        .q-table__container {
          border-radius: 20px;
        }
        .q-table {
          border: 1px solid #ececec;
          thead tr {
            background-color: #ffecb4;
            border-radius: 20px;
            color: rgba(62, 57, 43, 0.96);
          }
          tbody tr:nth-of-type(2n) {
            background-color: rgba(0, 0, 0, 0.02);
          }
          tbody td {
            font-size: 0.875rem;
          }
        }
      }
    }
    .final-report-scoreboard .cardContent {
      font-size: 22px;
    }
    .final-report-scoreboard {
      display: block;
    }
</style>
