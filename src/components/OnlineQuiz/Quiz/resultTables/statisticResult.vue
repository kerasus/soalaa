<template>
  <div>
    <div class="d-flex justify-center">
      <v-col>
        <v-row class=" d-flex justify-center">
          <v-data-table
            hide-default-footer
            :headers="headers"
            :header-props="{sortByText: 'ترتیب'}"
            :items="dataTable"
            :items-per-page="15"
            class="elevation-1 dataTable"
          />
        </v-row>
        <v-row>
          <v-col>
            <div :style="{ 'max-width': '100%'}">
              <highcharts :options="chartOptions" />
            </div>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'StatisticResult',
  components: { highcharts: Chart },
  props: ['report'],
  data () {
    return {
      dataTable: [],
      headers: [
        {
          text: 'ردیف',
          align: 'center',
          sortable: false,
          value: 'index'
        },
        { text: 'درس', value: 'sub_category', align: 'center', sortable: true },
        { text: 'درصد', value: 'percent', align: 'center', sortable: true },
        { text: 'میانگین درصد نفرات برتر', value: 'top_ranks_percent_mean', align: 'center', sortable: true },
        { text: ' تراز', value: 'taraaz', align: 'center', sortable: true },
        { text: ' میانگین تراز نفرات برتر', value: 'top_ranks_taraaz_mean', align: 'center', sortable: true },
        { text: 'رتبه در شهر', value: 'rank_city', align: 'center', sortable: false },
        { text: 'رتبه در استان', value: 'rank_province', align: 'center', sortable: false },
        { text: 'رتبه در کشور', value: 'rank_country', align: 'center', sortable: true },
        { text: 'میانگین درصد', value: 'average', align: 'center', sortable: true }
      ],
      chartOptions: {
        series: [
        ],
        tooltip: {
          backgroundColor: '#FCFFC5',
          padding: 8,
          style: {
            direction: 'rtl'

          },
          formatter: function () {
            return '<span :style="{ display:  }">' + this.y + ' درصد' + '</span>' + '<span>' + this.x + '</span>'
          },
          useHTML: true
        },
        chart: {
          type: 'column',
          height: 700,
          style: {
            fontFamily: 'IranSans'
          }
        },
        title: {
          text: 'نمودار مقایسه عملکرد'
        },
        credits: {
          text: '3a.alaatv.com',
          href: 'https://www.3a.alaatv.com'
        },
        yAxis: {
          title: {
            text: 'درصد'
          },
          max: 100
        },
        xAxis: {
          categories: []
        }
      }
    }
  },
  created () {
    if (this.report && this.report.best) {
      if (this.report.sub_category[0].rank_school) {
        this.headers.splice(9, 0, { text: ' رتبه مدرسه', value: 'rank_school', align: 'center', sortable: true })
      }
      this.loadDataTable()
      this.loadChart()
    }
  },
  methods: {
    getPercentDataForChart () {
      let data = []
      this.dataTable.forEach((item) => {
        data.push(parseFloat(item.top_ranks_percent_mean))
      })
      this.chartOptions.series.push({
        name: 'نفرات برتر',
        color: 'green',
        data
      })
      data = []
      this.dataTable.forEach((item) => {
        data.push(parseFloat(item.percent))
      })
      this.chartOptions.series.push({
        name: 'من',
        color: 'red',
        data
      })
      data = []
      this.dataTable.forEach((item) => {
        data.push(parseFloat(item.average))
      })
      this.chartOptions.series.push({
        name: 'همه',
        color: 'blue',
        data
      })
    },
    loadDataTable () {
      this.loadUserDataOfDataTable()
    },
    loadChart () {
      this.getPercentDataForChart()
      this.report.sub_category.forEach((item) => {
        this.chartOptions.xAxis.categories.push(item.sub_category)
      })
    },
    loadUserDataOfDataTable () {
      const that = this
      this.report.sub_category.forEach((item) => {
        that.dataTable.push(item)
      })
    }
  }
}
</script>

<style scoped>
    .infoCard {
        margin-top: 10px;
        width: 90%;
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
        height: 100%;
        width: 90%;
        border-radius: 15px
    }

    .v-data-table > thead {
        background-color: rgba(255, 193, 7, 0.3) !important;
    }

    .v-data-table > thead th:first-child {
        border-radius: 0 20px 0 0 !important;
    }

    .v-data-table > thead th:last-child {
        border-radius: 20px 0 0 0 !important;
    }

    .v-data-table > tbody tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.04) !important;
    }

    .v-data-table > .v-data-table__wrapper > table {
        width: 96%;
        border-spacing: 0;
        margin: auto;
    }
    .v-data-table > thead tr th {
        width: 125px!important;
        text-align: center!important;
    }
</style>
