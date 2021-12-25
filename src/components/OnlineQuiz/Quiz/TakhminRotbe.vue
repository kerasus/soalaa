<template>
  <div>
<!--    <div style="background-color: rgb(244, 244, 244)">-->
<!--      <div class="d-flex justify-center wrapper">-->
<!--        <v-row v-if="report">-->
<!--          <v-col cols="12">-->
<!--            <v-btn-->
<!--              block-->
<!--              dark-->
<!--              color="cyan"-->
<!--              @click="sendData"-->
<!--            >-->
<!--              تخمین رتبه-->
<!--            </v-btn>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            md="7"-->
<!--            cols="12"-->
<!--          >-->
<!--            <v-data-table-->
<!--              hide-default-footer-->
<!--              :headers="headers1"-->
<!--              :header-props="{sortByText: 'ترتیب'}"-->
<!--              :items="takhminReport.sub_category"-->
<!--              :items-per-page="99"-->
<!--              class="elevation-1 dataTable dataTableHeight1"-->
<!--            >-->
<!--              <template v-slot:top>-->
<!--                <span class="tableTitle">-->
<!--                  جدول عملکرد دروس-->
<!--                </span>-->
<!--              </template>-->
<!--              <template v-slot:item.percent="props">-->
<!--                <v-text-field-->
<!--                  v-model="percents[props.item.sub_category_id]"-->
<!--                  :rules="[numberRule, percentRule]"-->
<!--                  @input.native="resetAnswerCount(props.item.sub_category_id)"-->
<!--                />-->
<!--              </template>-->
<!--              <template v-slot:item.right_answer="props">-->
<!--                <v-text-field-->
<!--                  v-model="answerCounts[props.item.sub_category_id].correct"-->
<!--                  :rules="[numberRule]"-->
<!--                  @input.native="calcPercent(props.item.sub_category_id, $event.target)"-->
<!--                />-->
<!--              </template>-->
<!--              <template v-slot:item.wrong_answer="props">-->
<!--                <v-text-field-->
<!--                  v-model="answerCounts[props.item.sub_category_id].incorrect"-->
<!--                  :rules="[numberRule]"-->
<!--                  @input.native="calcPercent(props.item.sub_category_id, $event.target)"-->
<!--                />-->
<!--              </template>-->
<!--            </v-data-table>-->
<!--          </v-col>-->
<!--          <v-col-->
<!--            md="5"-->
<!--            cols="12"-->
<!--            class="firstColPadding"-->
<!--          >-->
<!--            <v-data-table-->
<!--              hide-default-footer-->
<!--              :headers="headers2"-->
<!--              :header-props="{sortByText: 'ترتیب'}"-->
<!--              :items="takhminReport.zirgorooh"-->
<!--              :items-per-page="5"-->
<!--              class="elevation-1 dataTable dataTableHeight2"-->
<!--            >-->
<!--              <template v-slot:top>-->
<!--                <span class="tableTitle ">-->
<!--                  نتیجه در زیر گروه ها-->
<!--                </span>-->
<!--              </template>-->
<!--            </v-data-table>-->
<!--            <v-row class="subRowHeight final-report-scoreboard">-->
<!--              <v-col-->
<!--                class="subColsPaddingBottom"-->
<!--                cols="12"-->
<!--              >-->
<!--                <v-card class="subCards">-->
<!--                  <v-card-title class="cardTitle">-->
<!--                    <v-row>-->
<!--                      <v-col>-->
<!--                        ماکزمیم تراز کل زیر گروه-->
<!--                      </v-col>-->
<!--                    </v-row>-->
<!--                  </v-card-title>-->

<!--                  <span class="cardContent">-->
<!--                    <v-row>-->
<!--                      <v-col>-->
<!--                        {{ takhminReport.main.taraaz }}-->
<!--                      </v-col>-->
<!--                    </v-row>-->
<!--                  </span>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--              <v-col-->
<!--                class="subColsPaddingBottom subColsPaddingRight"-->
<!--                cols="12"-->
<!--              >-->
<!--                <v-card class="subCards">-->
<!--                  <v-card-title class="cardTitle">-->
<!--                    <v-row>-->
<!--                      <v-col cols="4">-->
<!--                        رتبه کل کشوری-->
<!--                      </v-col>-->
<!--                      <v-col cols="4">-->
<!--                        رتبه در استان-->
<!--                      </v-col>-->
<!--                      <v-col cols="4">-->
<!--                        رتبه در شهر-->
<!--                      </v-col>-->
<!--                    </v-row>-->
<!--                  </v-card-title>-->

<!--                  <span class="cardContent">-->
<!--                    <v-row>-->
<!--                      <v-col cols="4">{{ takhminReport.main.rank_country }}</v-col>-->
<!--                      <v-col cols="4">{{ takhminReport.main.rank_province }}</v-col>-->
<!--                      <v-col cols="4">{{ takhminReport.main.rank_city }}</v-col>-->
<!--                    </v-row>-->
<!--                  </span>-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script>
/* eslint-disable camelcase */
// todo: vue.set
// import Vue from 'vue'
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
// import Assistant from "@/plugins/assistant";
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
  // props: ['report'],
  data () {
    return {
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
        zirgorooh: {}
      },
      percents: {},
      answerCounts: {},
      headers1: [
        { text: 'درس', value: 'sub_category', align: 'center', sortable: false },
        { text: 'تعداد درست', value: 'right_answer', align: 'center', sortable: true },
        { text: ' تعداد غلط', value: 'wrong_answer', align: 'center', sortable: true },
        { text: ' درصد', value: 'percent', align: 'center', sortable: true },
        { text: 'رتبه در شهر', value: 'rank_city', align: 'center', sortable: false },
        { text: 'رتبه در استان', value: 'rank_province', align: 'center', sortable: false },
        { text: 'رتبه در کشور', value: 'rank_country', align: 'center', sortable: false },
        { text: ' تراز', value: 'taraaz', align: 'center', sortable: true }
      ],
      headers2: [
        {
          text: 'زیر گروه',
          align: 'center',
          sortable: true,
          value: 'title'
        },
        { text: 'درصد خام', value: 'percent', align: 'center', sortable: true },
        { text: 'تراز', value: 'taraaz', align: 'center', sortable: true },
        { text: ' رتبه شهر', value: 'rank_city', align: 'center', sortable: true },
        { text: ' رتبه استان', value: 'rank_province', align: 'center', sortable: true },
        { text: ' رتبه کشور', value: 'rank_country', align: 'center', sortable: true }
      ]
    }
  },
  created () {
    console.log('TakhminRotbe----------')
    this.prepareTakhmineRotbeReport(true)
  },
  methods: {
    resetAnswerCount (subcategoryId) {
      for (const sub_category_id in this.answerCounts) {
        this.answerCounts[sub_category_id].correct = 0
        this.answerCounts[sub_category_id].incorrect = 0
      }

      if (this.percents[subcategoryId] < -33.33 || this.percents[subcategoryId] > 100) {
        this.$notify({
          group: 'notifs',
          title: 'توجه!',
          text: 'درصد می بایست در بازه 33.33- درصد تا 100 درصد باشد.',
          type: 'error'
        })
        // todo: vue.set
        // Vue.set(this.percents, subcategoryId, 0)
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
        // todo: vue.set
        // Vue.set(this.percents, subcategoryId, 0)
        return false
      }

      if (correct < 0 || incorrect < 0) {
        this.answerCounts[subcategoryId].correct = 0
        this.answerCounts[subcategoryId].incorrect = 0
        this.$notify({
          group: 'notifs',
          title: 'توجه!',
          text: 'تعداد موارد درست و غلط نباید منفی باشد',
          type: 'error'
        })
        // todo: vue.set
        // Vue.set(this.percents, subcategoryId, 0)
        return false
      }

      if (correct + incorrect > totalQuestions) {
        this.answerCounts[subcategoryId].correct = 0
        this.answerCounts[subcategoryId].incorrect = 0
        this.$notify({
          group: 'notifs',
          title: 'توجه!',
          text: 'مجموع گزینه های درست و غلط نباید بیشتر از ' + totalQuestions + ' باشد.',
          type: 'error'
        })
        // todo: vue.set
        // Vue.set(this.percents, subcategoryId, 0)
        return false
      }

      return true
    },
    calcPercent (subcategoryId) {
      const correct = parseInt(this.answerCounts[subcategoryId].correct)
      const incorrect = parseInt(this.answerCounts[subcategoryId].incorrect)
      const totalQuestions = parseInt(this.answerCounts[subcategoryId].totalQuestions)

      if (!this.calcValidate(subcategoryId, correct, incorrect, totalQuestions)) {
        this.prepareTakhmineRotbeReport()
        return
      }

      let calculated = (((correct * 3) - incorrect) / (totalQuestions * 3)) * 100
      calculated = parseFloat(calculated).toFixed(1)
      if (isNaN(calculated)) {
        calculated = 0
      }
      // todo: vue.set
      // Vue.set(this.percents, subcategoryId, calculated)

      this.prepareTakhmineRotbeReport()
    },
    prepareTakhmineRotbeReport (resetPercents) {
      console.log('this.report', this.report)
      const that = this
      const takhminReport = JSON.parse(JSON.stringify(this.report))
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
      // todo: vue.set
      // Vue.set(this, 'takhminReport', takhminReport)
    },
    validateSendData () {
      let status = true
      for (const subcategoryId in this.percents) {
        let percent = this.percents[subcategoryId]
        if (isNaN(percent)) {
          this.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'مقدار صحیحی برای درصد وارد نشده است.',
            type: 'error'
          })
          status = false
        }
        percent = parseInt(percent)
        if (percent > 100 || percent < -33.33) {
          this.$notify({
            group: 'notifs',
            title: 'توجه!',
            text: 'درصد می بایست در بازه 33.33- درصد تا 100 درصد باشد.',
            type: 'error'
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

<style scoped>
    .subColsPaddingRight {
        padding-right: 5px;
    }

    .subColsPaddingBottom {
        padding-bottom: 3px
    }

    .firstColPadding {
        padding-right: 5px;
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
        display: flow-root;
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
        place-content: space-evenly;
    }

    .tableTitle {
        margin-right: 30px;
        white-space: nowrap;
        line-height: 34px;
        margin-top: -9px;
        text-align: right;
        font-family: IRANSans;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        color: rgba(102, 102, 102, 1);
        width: 100%;

    }

    .dataTableHeight1 {
        height: 100%;
    }

    .infoCard {
        margin-top: 10px;
        border-radius: 15px;
    }

    .v-card > *:last-child:not(.v-btn):not(.v-chip) {
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;

    }

    .v-card > *:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *:not(.v-btn):not(.v-chip) {
        border-top-left-radius: 0 !important;
        border-top-right-radius: 0 !important;
    }

    .dataTable {
        margin-top: 20px;
        width: 100%;
        border-radius: 15px;
        margin: auto;
    }

    .v-data-table >>> thead {
        background-color: rgba(255, 193, 7, 0.3) !important;
    }

    .v-data-table >>> thead th:first-child {
        border-radius: 0 20px 0 0 !important;
    }

    .v-data-table >>> thead th:last-child {
        border-radius: 20px 0 0 0 !important;
    }

    .v-data-table >>> tbody tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.04) !important;
    }

    .v-data-table >>> thead tr th {
        width: 125px !important;
        text-align: center !important;
    }

    .v-data-table >>> .v-data-table__wrapper > table {
        width: 96%;
        border-spacing: 0;
        margin: auto;
    }

    .v-card > *[data-v-338241d2]:first-child:not(.v-btn):not(.v-chip), .v-card > .v-card__progress + *[data-v-338241d2]:not(.v-btn):not(.v-chip) {
        border-top-left-radius: 15px !important;
        border-top-right-radius: 15px !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
    }
</style>

<style>
    .final-report-scoreboard .v-card__title.cardTitle {
        padding: 0 10px;
        font-size: 14px;
    }
    .final-report-scoreboard .cardContent {
        font-size: 22px;
    }
    .final-report-scoreboard {
        display: block;
    }
</style>
