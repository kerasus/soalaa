<template>
  <div class="takhmin-rotbe">
    <div style="background-color: rgb(244, 244, 244)">
      <div class="d-flex justify-center wrapper">
        <div class="row" v-if="report">
          <div class="col col-12 proceeds-table">
            <q-btn class="full-width" label="تخمین رتبه" @click="sendData" style="background-color: #00bcd4; color: #fffaee"/>
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
                  :rows="takhminReport.sub_category"
                  :columns="columns1"
                  row-key="name"
                  color="amber"
                  hide-bottom
                  flat
                  :rows-per-page-options="[0]"
                >
                  <template v-slot:body="props">
                    <q-tr :props="props">
                      <q-td key="sub_category" :props="props">
                        {{ props.row.sub_category }}
                      </q-td>
                      <q-td key="right_answer" :props="props">
    <!--                    {{ props.row.right_answer }}-->
                          <q-input
                            type="number"
                            v-model="answerCounts[props.row.sub_category_id].correct"
                            debounce="500"
                            :rules="[numberRule]"
                            @change="calcPercent(props.row.sub_category_id, $event.target)"
                            dense
                            autofocus
                          />
                      </q-td>
                      <q-td key="wrong_answer" :props="props">
    <!--                    {{ props.row.wrong_answer }}-->
                          <q-input
                            type="number"
                            v-model="answerCounts[props.row.sub_category_id].incorrect"
                            debounce="500"
                            :rules="[numberRule]"
                            @change="calcPercent(props.row.sub_category_id, $event.target)"
                            dense
                            autofocus
                          />
                      </q-td>
                      <q-td key="percent" :props="props">
    <!--                    {{ props.row.percent }}-->
                          <q-input
                            type="number"
                            v-model="percents[props.row.sub_category_id]"
                            :rules="[numberRule, percentRule]"
                            @change="resetAnswerCount(props.row.sub_category_id)"
                            dense
                            autofocus
                          />
                      </q-td>
                      <q-td key="rank_city" :props="props">
                        {{ props.row.rank_city }}
                      </q-td>
                      <q-td key="rank_province" :props="props">
                        {{ props.row.rank_province }}
                      </q-td>
                      <q-td key="rank_country" :props="props">
                        {{ props.row.rank_country }}
                      </q-td>
                      <q-td key="taraaz" :props="props">
                        {{ props.row.taraaz }}
                      </q-td>
                    </q-tr>
                  </template>
                </q-table>
              </div>
            </div>
          </div>
          <div
            class="col col-md-5 col-12 default-result-table"
          >
            <div class="row default-result-table default-resultTable-row">
              <div class="col default-resultTable-col">
                  <span class="tableTitle col-12">
                        نتیجه در زیر گروه ها
                  </span>
                  <br>
                  <br>
                  <q-table
                    :rows="takhminReport.zirgorooh"
                    :columns="columns2"
                    row-key="name"
                    color="amber"
                    hide-bottom
                    flat
                    :rows-per-page-options="[0]"
                  ></q-table>
              </div>
            </div>
            <div class="row final-report-scoreboard">
              <div class="col col-12 row default-resultTable-row">
                <div class="col default-resultTable-col" >
                <q-card class="default-result-card">
                  <div class="row">
                    <div class="col card-title-section text-center">
                      ماکزمیم تراز کل زیر گروه
                    </div>
                  </div>
                  <span class="cardContent">
                    <div class="row">
                      <div class="col">
                        {{ takhminReport.main.taraaz }}
                      </div>
                    </div>
                  </span>
                </q-card>
              </div>
              </div>
              <div class="col col-12 row default-resultTable-row">
                <div class="col default-resultTable-col">
                <q-card class="default-result-card">
                    <div class="row card-title-section">
                      <div class="col col-4 text-center">
                        رتبه کل کشوری
                      </div>
                      <div class="col col-4 text-center">
                        رتبه در استان
                      </div>
                      <div class="col col-4 text-center">
                        رتبه در شهر
                      </div>
                    </div>
                  <span class="cardContent">
                    <div class="row">
                      <div class="col col-4 text-center">{{ takhminReport.main.rank_country }}</div>
                      <div class="col col-4 text-center" >{{ takhminReport.main.rank_province }}</div>
                      <div class="col col-4 text-center">{{ takhminReport.main.rank_city }}</div>
                    </div>
                  </span>
                </q-card>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
// import Assistant from 'src/plugins/assistant'
export default {
  name: 'TakhminRotbe',
  props: {
    report: {
      // type : Array,
      default () {
        return null
      }
    }
  },
  data () {
    return {
      name: '',
      numberRule: v => {
        if (!isNaN(v) && v !== ' ' && v !== '') return true
        return 'مقدار وارد شده عدد نیست.'
      },
      percentRule: v => {
        if (!v.toString().trim()) return true
        if (!isNaN(parseFloat(v)) && v >= -33.33 && v <= 100) return true
        return 'درصد می بایست عددی در بازه 33.33- درصد تا 100 درصد باشد.'
      },
      takhminReport: {
        main: {
          percent: 0,
          rank_city: 0,
          rank_country: 0,
          taraaz: 0
        },
        sub_category: [],
        zirgorooh: []
      },
      percents: {},
      answerCounts: {},
      columns1: [
        // {
        //   name: 'index',
        //   align: 'center',
        //   label: 'ردیف',
        //   field: row => row.index,
        //   sortable: true
        // },
        { name: 'sub_category', label: 'درس', field: row => row.sub_category, align: 'center', sortable: false },
        { name: 'right_answer', label: ' تعداد درست', field: row => row.right_answer, align: 'center', sortable: true },
        { name: 'wrong_answer', label: ' تعداد غلط', field: row => row.wrong_answer, align: 'center', sortable: true },
        { name: 'percent', label: ' درصد', field: row => row.percent, align: 'center', sortable: true },
        { name: 'rank_city', label: 'رتبه در شهر', field: row => row.rank_city, align: 'center', sortable: false },
        { name: 'rank_province', label: 'رتبه در استان', field: row => row.rank_province, align: 'center', sortable: false },
        { name: 'rank_country', label: 'رتبه در کشور', field: row => row.rank_country, align: 'center', sortable: false },
        { name: 'taraaz', label: ' تراز', field: row => row.taraaz, align: 'center', sortable: true }
      ],
      columns2: [
        { name: 'title', label: 'زیر گروه', field: row => row.title, align: 'center', sortable: true },
        { name: 'percent', label: 'درصد خام', field: row => row.percent, align: 'center', sortable: true },
        { name: 'taraaz', label: ' تراز', field: row => row.taraaz, align: 'center', sortable: true },
        { name: 'rank_city', label: 'رتبه شهر', field: row => row.rank_city, align: 'center', sortable: true },
        { name: 'rank_province', label: 'رتبه استان', field: row => row.rank_province, align: 'center', sortable: true },
        { name: 'rank_country', label: 'رتبه کشور', field: row => row.rank_country, align: 'center', sortable: true }
      ]
    }
  },
  created () {},
  mounted () {
    this.prepareTakhmineRotbeReport(true)
  },
  methods: {
    resetAnswerCount (subcategoryId) {
      for (const sub_category_id in this.answerCounts) {
        this.answerCounts[sub_category_id].correct = 0
        this.answerCounts[sub_category_id].incorrect = 0
      }

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
    calcValidate (subcategoryId, correct, incorrect, totalQuestions) {
      if (
        typeof this.answerCounts[subcategoryId].correct === 'undefined' ||
                    this.answerCounts[subcategoryId].correct === null ||
                    isNaN(this.answerCounts[subcategoryId].correct) ||
                    typeof this.answerCounts[subcategoryId].incorrect === 'undefined' ||
                    this.answerCounts[subcategoryId].incorrect === null ||
                    isNaN(this.answerCounts[subcategoryId].incorrect)
      ) {
        this.percents[subcategoryId] = 0
        return false
      }

      if (correct < 0 || incorrect < 0) {
        this.answerCounts[subcategoryId].correct = 0
        this.answerCounts[subcategoryId].incorrect = 0
        this.$q.notify({
          type: 'negative',
          message: 'تعداد موارد درست و غلط نباید منفی باشد',
          position: 'top'
        })
        this.percents[subcategoryId] = 0
        return false
      }

      if (correct + incorrect > totalQuestions) {
        this.answerCounts[subcategoryId].correct = 0
        this.answerCounts[subcategoryId].incorrect = 0
        this.$q.notify({
          type: 'negative',
          message: 'مجموع گزینه های درست و غلط نباید بیشتر از ' + totalQuestions + ' باشد.',
          position: 'top'
        })
        this.percents[subcategoryId] = 0
        return false
      }

      return true
    },
    calcPercent (subcategoryId) {
      const correct = parseInt(this.answerCounts[subcategoryId].correct),
        incorrect = parseInt(this.answerCounts[subcategoryId].incorrect),
        totalQuestions = parseInt(this.answerCounts[subcategoryId].totalQuestions)
      if (!this.calcValidate(subcategoryId, correct, incorrect, totalQuestions)) {
        this.prepareTakhmineRotbeReport()
        return
      }

      let calculated = (((correct * 3) - incorrect) / (totalQuestions * 3)) * 100
      calculated = parseFloat(calculated).toFixed(1)
      if (isNaN(calculated)) {
        calculated = 0
      }
      this.percents[subcategoryId] = calculated

      this.prepareTakhmineRotbeReport()
    },
    prepareTakhmineRotbeReport (resetPercents) {
      const that = this,
        takhminReport = JSON.parse(JSON.stringify(this.report))
      takhminReport.main.percent = 0
      takhminReport.main.rank_city = 0
      takhminReport.main.rank_province = 0
      takhminReport.main.rank_country = 0
      takhminReport.main.taraaz = 0
      takhminReport.sub_category.forEach(item => {
        item.taraaz = 0
        item.rank_city = 0
        item.rank_province = 0
        item.rank_country = 0
      })
      takhminReport.zirgorooh.forEach(item => {
        item.taraaz = 0
        item.rank_city = 0
        item.rank_province = 0
        item.rank_country = 0
        item.percent = 0
      })
      if (resetPercents) {
        takhminReport.sub_category.forEach(item => {
          that.percents[item.sub_category_id] = 0
          that.answerCounts[item.sub_category_id] = { correct: 0, incorrect: 0, totalQuestions: item.total_answer }
        })
      }
      this.takhminReport = takhminReport
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

      const that = this
      const keys = Object.keys(this.percents)
      const sentPercents = []
      for (let i = 0; i < keys.length; i++) {
        sentPercents.push({
          percent: parseFloat(this.percents[keys[i]]),
          sub_category_id: keys[i]
        })
      }
      axios.post(API_ADDRESS.exam.takhminRotbe, {
        exam_user_id: that.takhminReport.exam_user.id,
        percents: sentPercents
      })
        .then(response => {
          that.takhminReport.main = response.data.main
          that.takhminReport.sub_category = response.data.sub_category
          that.takhminReport.zirgorooh = response.data.zirgorooh
        })
    }
  }
}
</script>

<style lang="scss" scoped >
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
</style>

<style lang="scss">
    .takhmin-rotbe {
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
