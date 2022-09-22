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
              <div class="calendar-date-label">
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
            </q-tab-panel>
            <q-tab-panel name="week">
              <div class="calendar-weekly-view">
                <div class="calendar-weekly-background">
                  <div v-for="day in 7"
                       :key="day"
                       class="day-col">
                    <div v-for="hour in 13"
                         :key="hour"
                         class="hour-line">
                      <div v-if="day === 1 "
                           class="hour">
                        {{ `${hour+8}:00` }}
                      </div>
                    </div>
                    <div v-for="event in chartWeek[day - 1].events"
                         :key="event.id"
                         class="weekly-event"
                         :style = "{ top: (parseInt(event.start_at.substring(11,13)) - baseHour) * baseHight + 'px', height: (parseInt(event.finish_at.substring(11,13)) - parseInt(event.start_at.substring(11,13))) * baseHight + 'px' }"
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
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import moment from 'moment-jalaali'
import API_ADDRESS from 'src/api/Addresses'
// import Time from 'src/plugins/time'

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
    const baseHour = ref(9)
    const chartWeek = ref([])
    const dayList = ref(['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'آدینه'])
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

    const loadCalendar = () => {
      // assign variables data
      let dayCounter = 1
      moment.loadPersian()
      calendarDate.value = moment(new Date())
      persianDate.value = new Intl.DateTimeFormat('fa-IR').format(calendarDate.value)
      startOfMonth.value = calendarDate.value.startOf('jMonth').format('dddd')
      startIndex.value = dayList.value.indexOf(startOfMonth.value)
      calendarMonth.value = moment(calendarDate.value.jMonth(), 'jM').format('jMMMM')
      calendarYear.value = calendarDate.value.jWeekYear()
      dayNum.value = moment.jDaysInMonth(calendarYear.value, calendarDate.value.jMonth())
      isLeapYear.value = moment.jIsLeapYear(calendarDate.value.jWeekYear())
      dayOfWeek.value = calendarDate.value.startOf('jMonth')
      startFrom.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${moment().startOf('jMonth').jDate()}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      startTill.value = moment(`${calendarYear.value}/${calendarDate.value.jMonth() + 1}/${dayNum.value}`, 'jYYYY/jM/jD').format('YYYY-M-D')

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
          if (month.value[w][col].date === calendarDate.value.format('YYYY/MM/DD')) {
            chartWeek.value = month.value[w]
          }
        }
      }
    }

    const setAttr = (event) => {
      console.log(document.getSelection(), event)
    }

    return {
      baseHight,
      baseHour,
      month,
      chartWeek,
      calendarMonth,
      calendarYear,
      startOfMonth,
      tab,
      dayNum,
      startFrom,
      startTill,
      loadCalendar,
      setAttr
    }
  },
  methods: {
    getEvents() {
      this.$axios.get(API_ADDRESS.exam.userExamList(this.startFrom, this.startTill)).then((res) => {
        const test = [
          {
            id: '630d9a4412040eafc0014699',
            title: 'آزمون 2 دهم - بهمن1401- علوم انسانی',
            holding_status: null,
            start_at: '2022-09-20 09:00:00',
            finish_at: '2022-09-20 11:00:00',
            photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
            delay_time: 3840,
            n_questions: 0,
            enable: false,
            updated_at: '2022-09-20 07:30:02',
            created_at: '2022-08-30 09:34:04',
            generate_questions_automatically: false,
            confirm: false,
            report_config: [],
            holding_config: {
              randomize_questions: false
            },
            alaa_product_link: null,
            type: {
              id: '6225f4828044517f52500c03',
              type: 'exam_type',
              value: 'psychometric',
              image: null,
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            user_exam_id: null,
            is_free: false,
            is_register_open: true,
            is_open: false
          },
          {
            id: '630d99c891dd2ef4f20b7d05',
            title: 'آزمون 2 دهم - بهمن1401- علوم تجربی',
            holding_status: null,
            start_at: '2023-01-24 08:00:00',
            finish_at: '2023-01-24 08:00:00',
            photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
            delay_time: 3840,
            n_questions: 0,
            enable: false,
            updated_at: '2022-09-20 07:30:02',
            created_at: '2022-08-30 09:32:00',
            generate_questions_automatically: false,
            confirm: false,
            report_config: [],
            holding_config: {
              randomize_questions: false
            },
            alaa_product_link: null,
            type: {
              id: '6225f4828044517f52500c02',
              type: 'exam_type',
              value: 'konkur',
              image: null,
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            user_exam_id: null,
            is_free: false,
            is_register_open: true,
            is_open: false
          },
          {
            id: '630cca7c998410a51006c77f',
            title: 'آزمون 2 دهم - بهمن1401- ریاضی و فیزیک',
            holding_status: null,
            start_at: '2023-01-24 08:00:00',
            finish_at: '2023-01-24 08:00:00',
            photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
            delay_time: 3840,
            n_questions: 0,
            enable: false,
            updated_at: '2022-09-20 07:30:02',
            created_at: '2022-08-29 18:47:32',
            generate_questions_automatically: false,
            confirm: false,
            report_config: [],
            holding_config: {
              randomize_questions: false
            },
            alaa_product_link: null,
            type: {
              id: '6225f4828044517f52500c02',
              type: 'exam_type',
              value: 'konkur',
              image: null,
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            user_exam_id: null,
            is_free: false,
            is_register_open: true,
            is_open: false
          },
          {
            id: '630380e6334f9c94bd0658fa',
            title: 'آزمون 1 دوازدهم - مهر1401 - علوم انسانی - پایه‌های 10 و 11',
            holding_status: null,
            start_at: '2022-09-27 08:00:00',
            finish_at: '2022-09-27 11:40:00',
            photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
            delay_time: 3840,
            n_questions: 35,
            enable: false,
            updated_at: '2022-09-20 07:30:02',
            created_at: '2022-08-22 17:43:10',
            generate_questions_automatically: false,
            confirm: false,
            report_config: [],
            holding_config: {
              randomize_questions: false
            },
            alaa_product_link: null,
            type: {
              id: '6225f4828044517f52500c03',
              type: 'exam_type',
              value: 'psychometric',
              image: null,
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            user_exam_id: null,
            is_free: false,
            is_register_open: true,
            is_open: false
          },
          {
            id: '630380a7334f9c94bd0658f3',
            title: 'آزمون 1 دوازدهم - مهر1401 - علوم انسانی - پایه 10',
            holding_status: null,
            start_at: '2022-09-27 08:00:00',
            finish_at: '2022-09-27 11:40:00',
            photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
            delay_time: 3840,
            n_questions: 93,
            enable: false,
            updated_at: '2022-09-20 07:30:02',
            created_at: '2022-08-22 17:42:07',
            generate_questions_automatically: false,
            confirm: false,
            report_config: [],
            holding_config: {
              randomize_questions: false
            },
            alaa_product_link: null,
            type: {
              id: '6225f4828044517f52500c03',
              type: 'exam_type',
              value: 'psychometric',
              image: null,
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            user_exam_id: null,
            is_free: false,
            is_register_open: true,
            is_open: false
          }
        ]
        for (let w = 0; w < 6; w++) {
          for (let col = 0; col < 7; col++) {
            for (let e = 0; e < test.length; e++) {
              if (test[e].start_at.substring(0, 10) === this.month[w][col].date.toString().split('/').join('-')) {
                this.month[w][col].events.push(test[e])
              }
            }
          }
        }
      })
    }
  },
  created() {
    this.loadCalendar()
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
        }

        .calendar-panel {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          padding: 16px 30px;

          .calendar-date {
            padding: 10px 20px;
            margin-right: 22px;
            background: #F2F5F9;
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;

            .calendar-date-label {
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              text-align: center;
              color: #434765;
              margin-left: 10px;
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
      }
    }
    @media screen and (max-width: 1439px) {
      margin-right: 24px;
      height: 394px;
    }
    @media screen and (max-width: 1023px) {
      margin-right: 0;
      height: 473px;
    }
    @media screen and (max-width: 1023px) {
      height: 498px;
    }
  }
}
</style>
