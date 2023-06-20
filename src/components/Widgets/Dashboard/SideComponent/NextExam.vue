<template>
  <div v-if="countDown !== 0"
       className="next-exam">
    <div className="title">
      <div className="base-title">تا آزمون بعدی</div>
      <div className="exam ellipsis">{{ exam[0].title }}</div>
    </div>
    <div className="time-section">
      <div className="time">
        {{ Math.floor(countDown / 3600) + ':' + Math.floor((countDown % 3600) / 60) + ':' + (countDown % 3600) % 60 }}
      </div>
      <div className="remaining">
        <span className="hidden">روز</span>
        مانده
      </div>
    </div>
  </div>
  <div v-else
       className="next-exam">
    <div className="title">
      <div className="base-title">
        در حال حاضر آزمونی وجود ندارد
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'NextExam',
  data() {
    return {
      exam: '',
      calendarDate: null,
      calendarYear: null,
      dayNum: null,
      startFrom: null,
      startTill: null,
      lastExam: null,
      countDown: 0
    }
  },
  methods: {
    getExams() {
      this.calendarDate = moment(new Date())
      this.calendarYear = this.calendarDate.jWeekYear()
      this.dayNum = moment.jDaysInMonth(this.calendarYear, this.calendarDate.jMonth())
      this.startFrom = moment(`${this.calendarYear}/${this.calendarDate.jMonth() + 1}/${moment().startOf('jMonth').jDate()}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      this.startTill = moment(`${this.calendarYear}/${this.calendarDate.jMonth() + 1}/${this.dayNum}`, 'jYYYY/jM/jD').format('YYYY-M-D')
      this.$axios.get(API_ADDRESS.exam.userExamList.base(), {
        params: {
          start_at_from: this.startFrom,
          start_at_till: this.startTill
        }
      }).then((res) => {
        this.exam = res.data.data
        this.exam.forEach(element => {
          if (element.start_at.substring(0, 10) === moment().format('YYYY-MM-DD')) {
            const timeToExam = moment(element.start_at, 'YYYY-MM-DD HH:mm:ss').diff(moment(new Date()))
            if (timeToExam > 0) {
              this.lastExam = element.start_at
              this.countDown = timeToExam / 1000
            } else {
              this.countDown = 0
            }
          }
        })
      })
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1
          this.countDownTimer()
        }, 1000)
      }
    }
  },
  created() {
    this.getExams()
    this.countDownTimer()
  }
}
</script>

<style scoped lang="scss">
.next-exam {
  width: 100%;
  background: #FFB74D;
  border-radius: 16px;
  margin-top: 30px;
  padding: 20px 40px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 1439px) {
    padding: 20px 30px;
  }
  @media screen and (max-width: 1023px) {
    margin-top: 20px;
    padding: 30px;
  }
  @media screen and (max-width: 599px) {
    padding: 10px 16px;
    flex-direction: column;
    align-items: initial;
    min-height: 70px;
    justify-content: center;
  }

  .title {
    display: flex;
    align-items: center;

    .base-title {
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      margin-right: 4px;
      @media screen and (max-width: 1439px) {
        font-size: 18px;
        line-height: 28px;
      }
      @media screen and (max-width: 1023px) {
        font-size: 16px;
        line-height: 25px;
      }
      @media screen and (max-width: 599px) {
        font-size: 14px;
        line-height: 22px;
        justify-content: center;
      }
    }

    .exam {
      @media screen and (max-width: 1439px) {
        font-size: 14px;
        line-height: 22px;
      }
      @media screen and (max-width: 1023px) {
      }
      @media screen and (max-width: 599px) {
        font-size: 12px;
        line-height: 19px;
      }
    }
  }

  .time-section {
    display: flex;
    align-items: center;
    @media screen and (max-width: 599px) {
      align-self: flex-end;
    }

    .time {
      margin-right: 4px;
      font-weight: 700;
      font-size: 24px;
      line-height: 37px;
      @media screen and (max-width: 1439px) {
        font-size: 20px;
        line-height: 31px;
      }
      @media screen and (max-width: 599px) {
        font-size: 16px;
        line-height: 25px;
      }
    }

    .remaining {
      font-size: 18px;
      line-height: 28px;
      @media screen and (max-width: 1439px) {
        font-size: 16px;
        line-height: 25px;
      }
      @media screen and (max-width: 599px) {
        font-size: 12px;
        line-height: 19px;
      }
    }
  }
}
</style>
