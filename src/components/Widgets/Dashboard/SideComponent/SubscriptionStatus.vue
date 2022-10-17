<template>
  <div class="subscription-status">
    <div class="subscription-title">
      وضعیت اشتراک
    </div>
    <div class="subscription-type">
      <div class="subscription-type-title">نوع اشتراک:</div>
      <div v-if="subscribe"
           class="subscription-type-value">
        <span class="subscription-type-value-base">
          {{subscribe.title}}
        </span>
        <span class="subscription-type-value-description">
          ({{subscribe.length + ' روزه'}}) -
        </span>
        <span class="subscription-type-value-duration">
          {{parseInt(subscribe.length) - subscribe.made.length}} روز باقیمانده
        </span>
      </div>
    </div>
    <div class="subscription-statistics">
      <q-tabs
        v-model="tab"
        color="secondary"
        class="subscription-tabs"
        active-class="text-secondary"
        align="left"
      >
        <q-tab name="tests"
               label="ساخت آزمون" />
        <q-tab name="pdf"
               label="دانلود سوال" />
      </q-tabs>
      <q-tab-panels v-model="tab"
                    class="quiz-panels"
                    animated>
        <q-tab-panel name="tests"
                     class="subscription-status-test-tab">
          <div class="subscription-status-test-tab-title">
            محدودیت ساخت آزمون
          </div>
          <highcharts class="flex flex-center"
                      :options="chartOptionsExam"
          />
          <div v-if="subscribe.abilities_n.exam !== -1"
               class="subscription-status-test-tab-info">
            <span><q-icon name="circle"
                          color="warning"
                          size="12px" /></span>
            <span class="text-tab-info-text">
              شما {{subscribe.made.exam }} آزمون از {{subscribe.abilities_n.exam }} آزمون اختصاص یافته در اشتراک خود را استفاده کردید اید.
            </span>
          </div>
        </q-tab-panel>
        <q-tab-panel name="pdf"
                     class="subscription-status-test-tab">
          <div class="subscription-status-test-tab-title">
            محدودیت دانلود PDF
          </div>
          <highcharts class="flex flex-center"
                      :options="chartOptionsPdf"
          />
          <div class="subscription-status-test-tab-info">
            <span><q-icon name="circle"
                          color="warning"
                          size="12px" /></span>
            <span class="text-tab-info-text">
              شما {{subscribe.made.pdf_questions }} PDF از {{subscribe.abilities_n.pdf_questions }} PDF اختصاص یافته در اشتراک خود را استفاده کردید اید.
            </span>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'

export default {
  name: 'SubscriptionStatus',
  props: {
    subscribe: {
      type: Object,
      default: null
    }
  },
  components: {
    highcharts: Chart
  },
  data() {
    return {
      tab: 'tests',
      chartOptionsExam: {
        chart: {
          height: '150',
          width: '150',
          type: 'pie',
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          shared: false,
          useHTML: true,
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0)',
          shadow: false,
          formatter: function () {
            const point = this.point
            return '<span class="myTooltip" style="padding:5px;border-radius:5px;background-color:' + point.color + ';">' + point.y + '&nbsp' + 'سوال' + '</span>'
          }
        },
        plotOptions: {
          pie: {
            innerSize: '98%',
            startAngle: 0,
            endAngle: 0,
            borderWidth: 20,
            center: ['50%', '52%'],
            size: '150%',
            borderColor: null,
            backgroundColor: '#F2F5F9',
            slicedOffset: 16,
            dataLabels: {
              connectorWidth: 0
            }
          }
        },
        title: {
          y: 20,
          style: {
            useHTML: true,
            fontSize: '12px'
          },
          verticalAlign: 'middle',
          floating: true,
          text: ' '
        },
        series: [{
          id: 'idData',
          data: [
            { name: '', y: 0, color: '#9690E4' }
          ]
        }]
      },
      chartOptionsPdf: {
        chart: {
          height: '150',
          width: '150',
          type: 'pie',
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          shared: false,
          useHTML: true,
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0)',
          shadow: false,
          formatter: function () {
            const point = this.point
            return '<span class="myTooltip" style="padding:5px;border-radius:5px;background-color:' + point.color + ';">' + point.y + '&nbsp' + 'PDF' + '</span>'
          }
        },
        plotOptions: {
          pie: {
            innerSize: '98%',
            startAngle: 0,
            endAngle: 0,
            borderWidth: 20,
            center: ['50%', '52%'],
            size: '150%',
            borderColor: null,
            backgroundColor: '#F2F500',
            slicedOffset: 16,
            dataLabels: {
              connectorWidth: 0
            }
          }
        },
        title: {
          y: 20,
          style: {
            useHTML: true,
            fontSize: '12px'
          },
          verticalAlign: 'middle',
          floating: true,
          text: ' '
        },
        series: [{
          id: 'idData',
          data: [
            { name: '', y: 0, color: '#9690E4' }
          ]
        }]
      }
    }
  },
  watch: {
    subscribe () {
      this.updateChartsOptions()
    }
  },
  created() {
    this.updateChartsOptions()
  },
  methods: {
    updateChartsOptions () {
      this.updateChartOptionsExam()
      this.updateChartOptionsPdf()
    },
    updateChartOptionsExam () {
      if (!this.subscribe) {
        return
      }

      this.chartOptionsExam.plotOptions.pie.endAngle = ((this.subscribe.abilities_n.exam - this.subscribe.made.exam) * 360) / this.subscribe.abilities_n.exam
      this.chartOptionsExam.title.text = `${(this.subscribe.abilities_n.exam - this.subscribe.made.exam)}<br>آزمون باقی‌مانده`
      this.chartOptionsExam.series[0].data[0].y = (this.subscribe.abilities_n.exam - this.subscribe.made.exam)
    },
    updateChartOptionsPdf () {
      if (!this.subscribe) {
        return
      }

      this.chartOptionsPdf.plotOptions.pie.endAngle = ((this.subscribe.abilities_n.pdf_questions - this.subscribe.made.pdf_questions) * 360) / this.subscribe.abilities_n.pdf_questions
      this.chartOptionsPdf.title.text = `PDF ${(this.subscribe.abilities_n.pdf_questions - this.subscribe.made.pdf_questions)} باقی‌مانده`
      this.chartOptionsPdf.series[0].data[0].y = (this.subscribe.abilities_n.pdf_questions - this.subscribe.made.pdf_questions)
    }
  }
}
</script>

<style scoped lang="scss">
.subscription-tabs {
  color: #8A8CA6;

  &:deep(.q-tab__indicator) {
    width: 100%;
    height: 6px;
    border-radius: 6px 6px 0 0;
  }

  &:deep(.q-tab) {
    color: var(--3a-TextSecondary);
    padding: 0;
  }

  &:deep(.q-tab__content) {
    padding: 0 24px;
  }

  &:deep(.q-tab__label) {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.03em;
  }
}
.q-tab-panels {
    background: transparent;
    border-top: 2px solid #E4E8EF;

    .q-tab-panel {
      padding: 16px 0;
    }
}
.subscription-status {
  background: #FFFFFF;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
  border-radius: 16px;
  height: 489px;
  padding: 20px 30px;

  .subscription-title {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 25px;
    letter-spacing: -0.03em;
    color: #434765;
  }

  .subscription-type {
    display: flex;
    flex-direction: column;

    .subscription-type-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      color: #434765;
      margin-top: 16px;
    }

    .subscription-type-value {
      margin: 4px 0;

      .subscription-type-value-base {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: -0.03em;
        color: #434765;
      }

      .subscription-type-value-description {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #8A8CA6;
      }

      .subscription-type-value-duration {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: -0.03em;
        color: #E86562;
      }
    }
  }

  .subscription-status-test-tab {
    .subscription-status-test-tab-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      letter-spacing: -0.03em;
      color: #6D708B;
      margin-bottom: 25px;
    }
    .subscription-status-test-tab-info {
      display: flex;
      margin: 15px 0;
      .text-tab-info-text {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        margin-left: 8px;
      }
    }
  }
  @media screen and (max-width: 1439px) {
    height: 410px;
  }
  @media screen and (max-width: 1023px) {
    height: 443px;
  }
  @media screen and (max-width: 1023px) {
    height: auto;
  }
}
</style>
