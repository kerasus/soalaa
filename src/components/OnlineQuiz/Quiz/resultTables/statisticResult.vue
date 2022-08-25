<template>
  <div class="statistic-result">
    <div class="row justify-center">
      <div class="col col-12 col-md-9 default-result-table statistic-result-table d-flex justify-center">
        <q-table
          :rows="dataTable"
          :columns="columns1"
          row-key="name"
          color="amber"
          hide-bottom
          flat
          :rows-per-page-options="[0]"
        ></q-table>
      </div>
      <div class="col-12 row">
        <div class="col">
          <div :style="{ 'max-width': '100%'}">
            <highcharts :options="chartOptions" />
          </div>
        </div>
      </div>
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
      columns1: [
        {
          name: 'index',
          align: 'center',
          label: 'ردیف',
          field: row => row.index,
          sortable: true
        },
        { name: 'sub_category', label: 'درس', field: row => row.sub_category, align: 'center', sortable: true },
        { name: 'percent', label: 'درصد', field: row => row.percent, align: 'center', sortable: true },
        { name: 'top_ranks_percent_mean', label: 'میانگین درصد نفرات برتر', field: row => row.top_ranks_percent_mean, align: 'center', sortable: true },
        { name: 'taraaz', label: 'تراز', field: row => row.taraaz, align: 'center', sortable: true },
        { name: 'top_ranks_taraaz_mean', label: 'میانگین تراز نفرات برتر', field: row => row.top_ranks_taraaz_mean, align: 'center', sortable: true },
        { name: 'rank_city', label: 'رتبه در شهر', field: row => row.rank_city, align: 'center', sortable: false },
        { name: 'rank_province', label: 'رتبه در استان', field: row => row.rank_province, align: 'center', sortable: false },
        { name: 'rank_country', label: 'رتبه در کشور', field: row => row.rank_country, align: 'center', sortable: true },
        { name: 'average', label: 'میانگین درصد', field: row => row.average, align: 'center', sortable: true }
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
          text: 'soalaa.com',
          href: 'https://www.soalaa.com'
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

<style lang="scss">
.statistic-result {
  background-color: #f1f1f1;
  padding-top: 20px;

  .default-result-table {
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
  .statistic-result-table {
    margin-bottom: 20px;
  }
}
</style>
<style scoped>
.q-tab-panels {
  background: #f1f1f1;
}
</style>
