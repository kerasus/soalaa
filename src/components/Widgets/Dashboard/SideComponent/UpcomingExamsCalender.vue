<template>
  <div class="calender">
    <div class="box">
      <div class="calendar-wrapper">
        <div class="calendar-header">
          <div class="calendar-title">
            {{ calendarTitle }}
          </div>
          <div class="calendar-panel">
            <div class="calendar-date">
              <q-icon :name="calendarIcon"
                      size="18px" />
              <div class="calendar-date-label"
                   @click="openCalendarDialog">
                {{calendarMonth}} ماه {{calendarYear}}
              </div>
            </div>
            <div class="calendar-view-type">
              <q-tabs
                v-model="tab"
                active-color="white"
                class="text-accent"
              >
                <q-tab name="week"
                       label="هفته" />
                <q-tab name="month"
                       label="ماه" />
              </q-tabs>
            </div>
          </div>
        </div>
        <div class="calendar-body">
          <div class="calendar-first-row row"
               :class="{'weekly': tab === 'week'}">
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">شنبه</span>
              <span v-if="tab === 'week'  && chartWeek[0].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[0].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">یکشنبه</span>
              <span v-if="tab === 'week'  && chartWeek[1].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[1].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">دوشنبه</span>
              <span v-if="tab === 'week'  && chartWeek[2].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[2].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">سه‌شنبه</span>
              <span v-if="tab === 'week'  && chartWeek[3].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[3].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">چهارشنبه</span>
              <span v-if="tab === 'week'  && chartWeek[4].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[4].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">پنجشنبه</span>
              <span v-if="tab === 'week' && chartWeek[5].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[5].persianDate.toString().substring(5,10)}}
              </span>
            </div>
            <div class="col-1 calendar-col"
                 :class="{'weekly': tab === 'week'}">
              <span class="day-name">جمعه</span>
              <span v-if="tab === 'week'  && chartWeek[6].persianDate !== undefined"
                    class="day-date">
                {{chartWeek[6].persianDate.toString().substring(5,10)}}
              </span>
            </div>
          </div>
          <q-tab-panels v-model="tab"
                        animated>
            <q-tab-panel name="month">
              <div class="calendar-table">
                <div v-for="row in 6"
                     :key="row"
                     class="calendar-table-row row">
                  <div v-for="col in 7"
                       :key="col"
                       class="calendar-table-col col-1"
                       :class="{'top-right': row === 1 && col === 1 ,
                                'top-left': row === 1 && col === 7 ,
                                'bottom-right': row === 6 && col === 1 ,
                                'bottom-left':row === 6 && col === 7,
                                'holiday': month[row-1][col-1].is_holiday}">
                    {{ month[row-1][col-1].num !== 0 ? month[row-1][col-1].num : '' }} <br />
                    <div class="flex">
                      <q-icon v-for="event in month[row-1][col-1].events"
                              :key="event"
                              name="circle"
                              class="q-mx-xs"
                              color="primary">
                        <q-tooltip anchor="top middle"
                                   self="center middle">
                          {{ event.title }}
                        </q-tooltip>
                      </q-icon>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="week">
              <div class="calendar-weekly-view">
                <div class="calendar-weekly-background">
                  <div v-for="day in 7"
                       :key="day"
                       class="day-col">
                    <div v-for="hour in 25"
                         :key="hour"
                         class="hour-line">
                      <div v-if="day === 1 "
                           class="hour">
                        {{ `${hour + baseHour - 1 }:00` }}
                      </div>
                    </div>
                    <div v-for="event in chartWeek[day - 1].events"
                         :key="event.id"
                         class="weekly-event"
                         :style = "{ top: ((parseInt(event.start_at.substring(11,13)) + (parseInt(event.start_at.substring(14,16))/60) )- baseHour) * baseHight + 'px', height: (parseInt(event.finish_at.substring(11,13)) - parseInt(event.start_at.substring(11,13))) * baseHight + 'px' }"
                    >
                      <q-tooltip class="flex column flex-center"
                                 anchor="top middle"
                                 self="center middle">
                        <span>{{ event.title }}</span>
                        <span>شروع آزمون {{ event.start_at.substring(11,16) }}</span>
                        <span>پایان آزمون {{ event.finish_at.substring(11,16) }}</span>
                      </q-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
    <q-dialog v-model="calendarDialog"
              persistent>
      <q-card class="calendar-dialog">
        <q-card-section class="row items-center content-section">
          <div class="calendar-dialog-header">
            {{calendarMonth + ' '  + calendarYear}}
          </div>
          <div class="row month-row">
            <div v-for="item in monthList"
                 :key="item"
                 class="col-4">
              <div class="month-item"
                   :class="item === selectedMonth ? 'selected' : ''"
                   @click="setSelectedMonth(item)">
                {{item}}
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-actions class="action-section">
          <q-btn v-close-popup
                 label="انصراف"
                 class="cancel-btn" />
          <q-btn v-close-popup
                 label="تایید"
                 class="submit-btn"
                 @click="setCalendarMonth(selectedMonth)" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import moment from 'moment-jalaali'
import API_ADDRESS from 'src/api/Addresses'
import Time from 'src/plugins/time'

export default defineComponent({
  name: 'UpcomingExamsCalender',
  props: {
    calendarTitle: {
      type: String,
      default: 'تقویم پارسی'
    },
    calendarIcon: {
      type: String,
      default: 'calendar_month'
    }
  },
  setup() {
    const month = ref([
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ],
      [
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        },
        {
          date: 0,
          is_holiday: false,
          num: 0,
          events: []
        }
      ]
    ])
    const baseHight = ref(50)
    const baseHour = ref(0)
    const chartWeek = ref([])
    const dayList = ref(['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'آدینه'])
    const monthList = ref(['فرودین', 'اردیبهشت', 'خرداد', 'تیر', 'امرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'])
    const tab = ref('month')
    const calendarYear = ref(null)
    const calendarDate = ref(null)
    const persianDate = ref(null)
    const startOfMonth = ref(null)
    const startIndex = ref(null)
    const calendarMonth = ref(null)
    const dayNum = ref(null)
    const isLeapYear = ref(false)
    const dayOfWeek = ref(null)
    const startFrom = ref(null)
    const startTill = ref(null)
    const calendarDialog = ref(false)
    const thisMonth = ref(null)
    const selectedMonth = ref(null)

    const openCalendarDialog = () => {
      calendarDialog.value = true
    }

    const setSelectedMonth = (month) => {
      selectedMonth.value = month
    }

    const loadCalendar = (date, first) => {
      // assign variables data
      let dayCounter = 1
      moment.loadPersian()
      calendarDate.value = moment(date)
      persianDate.value = new Intl.DateTimeFormat('fa-IR').format(calendarDate.value)
      startOfMonth.value = calendarDate.value.startOf('jMonth').format('dddd')
      startIndex.value = dayList.value.indexOf(startOfMonth.value)
      calendarMonth.value = monthList.value[moment(calendarDate.value.jMonth(), 'jM').format('jM')]
      calendarYear.value = calendarDate.value.jWeekYear()
      dayNum.value = moment.jDaysInMonth(calendarYear.value, calendarDate.value.jMonth())
      isLeapYear.value = moment.jIsLeapYear(calendarDate.value.jWeekYear())
      dayOfWeek.value = calendarDate.value.startOf('jMonth')
      startFrom.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${moment().startOf('jMonth').jDate()}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      startTill.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${dayNum.value}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      if (first) {
        thisMonth.value = calendarMonth.value
      }
      selectedMonth.value = calendarMonth.value

      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          month.value[w][col] = {
            date: 0,
            is_holiday: false,
            num: 0,
            events: []
          }
        }
      }

      // import data to month view object
      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          if ((col < startIndex.value && w === 0) || dayCounter > dayNum.value) {
            month.value[w][col].date = 0
          } else {
            month.value[w][col].num = dayCounter
            month.value[w][col].date = calendarDate.value.startOf('jMonth').add(dayCounter - 1, 'd').format('YYYY/MM/DD')
            const persianDate = new Intl.DateTimeFormat('fa-IR').format(calendarDate.value.startOf('jMonth').add(dayCounter - 1, 'd'))
            month.value[w][col].persianDate = persianDate
            dayCounter++
          }
        }
      }

      // import data to weekly view object
      for (let w = 0; w < 6; w++) {
        for (let col = 0; col < 7; col++) {
          if (month.value[w][col].date === moment().format('YYYY/MM/DD')) {
            chartWeek.value = month.value[w]
          }
        }
      }
    }

    const setAttr = (event) => {
      // console.log(document.getSelection(), event)
    }

    return {
      calendarDate,
      baseHight,
      baseHour,
      month,
      monthList,
      selectedMonth,
      chartWeek,
      calendarMonth,
      calendarYear,
      startOfMonth,
      tab,
      dayNum,
      startFrom,
      startTill,
      calendarDialog,
      openCalendarDialog,
      setSelectedMonth,
      loadCalendar,
      setAttr
    }
  },
  methods: {
    getEvents() {
      this.$axios.get(API_ADDRESS.exam.userExamList.base(), { params: { start_at_from: this.startFrom, start_at_till: this.startTill } }).then((res) => {
        for (let w = 0; w < 6; w++) {
          for (let col = 0; col < 7; col++) {
            for (let e = 0; e < res.data.data.length; e++) {
              // console.log(res.data.data[e].start_at.substring(0, 10))
              if (res.data.data[e].start_at.substring(0, 10) === this.month[w][col].date.toString().split('/').join('-')) {
                this.month[w][col].events.push(res.data.data[e])
              }
            }
          }
        }
      })
    },
    setCalendarMonth(selectedMonth) {
      const month = this.monthList.indexOf(selectedMonth)
      const shamsi = `${this.calendarYear}-${month + 1}-01`
      moment.loadPersian()
      if (selectedMonth === this.thisMonth) {
        this.loadCalendar(Time.now(), false)
        this.getEvents()
      } else {
        const newDate = moment(shamsi, 'jYYYY/jM/jD').format('YYYY-M-D HH:MM:SS')
        this.loadCalendar(newDate, false)
        this.getEvents()
      }
    }
  },
  created() {
    this.loadCalendar(Time.now(), true)
    this.getEvents()
  }
})
</script>

<style scoped lang="scss">
.calender {
  @media screen and (max-width: 1023px) {
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1023px) {
    margin-bottom: 16px;
  }
  .box {
    background: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05) #{"/* rtl:ignore */"};
    border-radius: 16px;
    height: 489px;
    padding-bottom: 18px;
    position: relative;

    .calendar-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;

      .calendar-header {
        height: 65px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .calendar-title {
          padding: 20px 30px;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          text-align: right;
          letter-spacing: -0.03em;
          color: #434765;

          @media screen and (max-width: 600px) {
            padding: 7px 7px;
            position: absolute;
            top: 10px;
            left: 10px;
          }
        }

        .calendar-panel {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 16px 30px;

          @media screen and (max-width: 600px) {
            margin-top: 40px;
            padding: 16px 5px;
          }

          .calendar-date {
            padding: 10px 20px;
            margin-right: 22px;
            background: #F2F5F9;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;

            .calendar-date-label {
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              text-align: center;
              color: #434765;
              margin-left: 10px;

              @media screen and (max-width: 600px) {
                font-size: 10px;
              }
            }

            @media screen and (max-width: 600px) {
              padding: 10px 10px;
              margin-right: 4px;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
            }
          }

          .calendar-view-type {
            background: #F2F5F9;
            border-radius: 20px;
            width: 110px;
            height: 40px;

            &:deep(.q-tab__indicator) {
              height: 40px;
              width: 53px;
              z-index: 0;
              background: #9690E4;
              border-radius: 20px;
            }

            &:deep(.q-tab) {
              width: 53px;
              height: 40px;
              min-height: 40px;
              padding: 0;
            }

            &:deep(.q-tab__label) {
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 40px;
              text-align: center;
              letter-spacing: -0.03em;
              z-index: 1;
            }

            &:deep(.q-hoverable:hover > .q-focus-helper) {
              background: transparent;
              border-radius: 20px;
            }
          }
        }

        @media screen and (max-width: 600px) {
          flex-direction: column;
          align-items: flex-start;
          height: 120px;
          position: absolute;
          top: 0;
        }
      }

      .calendar-body {
        width: 100%;

        .q-tab-panel {
          padding: 0;
        }

        .calendar-first-row {
          display: flex;
          justify-content: center;
          align-items: center;

          .calendar-col {
            min-width: 90px;
            height: 59px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .day-name {
              text-align: center;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: #6D708B;
            }

            &.weekly {
              min-width: 80px;
              justify-content: flex-start;
            }
          }

          &.weekly {
            margin-left: 20px;
          }
        }

        .calendar-table {
          width: 100%;

          .calendar-table-row {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .calendar-table-col {
              width: 92px;
              height: 59px;
              border: 1px solid #F2F5F9;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              text-align: center;
              font-style: normal;
              font-weight: 600;
              font-size: 14px;
              line-height: 24px;
              text-align: center;
              color: #6D708B;

              &.holiday {
                color: #E86562;
              }

              &.top-left {
                border-radius: 0px 15px 0px 0px;
              }
              &.top-right {
                border-radius: 15px 0px 0px 0px;
              }
              &.bottom-left {
                border-radius: 0px 0px 15px 0px;
              }
              &.bottom-right {
                border-radius: 0px 0px 0px 15px;
              }
            }
          }
        }

        .calendar-weekly-view {
          width: 100%;
          position: relative;
          height: 350px;

          .calendar-weekly-background {
            position: absolute;
            top: 0;
            left: 0;
            overflow-y: auto;
            display: flex;
            width: 100%;
            padding: 20px 0 0 60px;

            .day-col {
              position: relative;

              .hour-line {
                width: 80px;
                height: 50px;
                border-top: 1px solid #E4E8EF;
                position: relative;
                display: flex;
                justify-content: center;

                .hour {
                  position: absolute;
                  top: -13px;
                  left: -35px;
                  font-style: normal;
                  font-weight: 400;
                  font-size: 12px;
                  line-height: 24px;
                  display: flex;
                  align-items: center;
                  text-align: center;
                  color: #6D708B;

                }
              }

              .weekly-event {
                position: absolute;
                left: 25%;
                width: 40px;
                background: #9690E4;
                border-radius: 8px;
              }
            }
          }
        }

        @media screen and (max-width: 720px) {
          min-width: 660px;
        }
      }

      @media screen and (max-width: 720px) {
        overflow-x: auto;
      }
    }
    @media screen and (max-width: 1439px) {
      margin-right: 0;
      height: 394px;
    }
    @media screen and (max-width: 1200px) {
      margin-right: 0;
      height: auto;
    }
    @media screen and (max-width: 600px) {
      padding-top: 120px;
    }
  }
}

.calendar-dialog {
  position: relative;
  width: 335px;
  height: 392px;
  background: #FFFFFF;
  border-radius: 16px;

  .content-section {
    padding-bottom: 0;
    .calendar-dialog-header {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 64px;
      background: #9690E4;
      border-radius: 16px 16px 0px 0px;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: #FFFFFF;
    }
    .month-row {
      margin: 64px 0 0;

      .month-item {
        width: 89px;
        height: 48px;
        background: #F6F9FF;
        border-radius: 10px;
        margin: 6px 5px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        color: #434765;
        cursor: pointer;

        &.selected{
          background: #FFB74D;
          color: #FFFFFF;
        }
      }
    }
  }

  .action-section {
    padding: 12px 24px 2px;
    display: flex;
    justify-content: flex-end;

    .submit-btn {
      width: 96px;
      height: 40px;
      background: #9690E4;
      border-radius: 8px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.03em;
      color: #FFFFFF;
    }
    .cancel-btn {
      width: 96px;
      height: 40px;
      background: #F6F9FF;
      border-radius: 10px;
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      color: #6D708B;
    }
  }
}
</style>
