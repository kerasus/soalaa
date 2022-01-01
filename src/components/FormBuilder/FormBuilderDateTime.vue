<template>
  <div>
    <div class="form-date-time" v-if="canShowTime && canShowDate">
      <q-input class="form-calender" v-model="dateTime.date" :clearable="true" dir="ltr" :disable="disable" :label="label" mask="date" @clear="clearDate">
        <template #prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="inputData" :calendar="calendar" mask="YYYY-MM-DD" :range="range" :multiple="multiple" :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input class="form-time" v-model="dateTime.time" :clearable="true" dir="ltr" :disable="disable" mask="time" @clear="clearDate">
        <template #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="inputData" mask="HH:mm:00" format24h :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div v-else>
      <q-input v-model="outputText" :clearable="true" dir="ltr" :disable="disable" :label="label" @clear="clearDate">
        <template v-if="canShowDate" #prepend>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-date v-model="inputData" :calendar="calendar" :mask="mask" :range="range" :multiple="multiple" :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
        <template v-if="canShowTime" #append>
          <q-icon name="access_time" class="cursor-pointer">
            <q-popup-proxy transition-show="scale" transition-hide="scale">
              <q-time v-model="inputData" :mask="mask" format24h :disable="disable" @update:model-value="change($event)">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="بستن" color="primary" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import inputMixin from 'components/FormBuilder/inputMixin'
import { date } from 'quasar'

export default {
  name: 'FormBuilderDateTime',
  mixins: [inputMixin],
  props: {
    value: {
      default: '',
      type: [String, Array]
    },
    calendar: {
      default: 'persian',
      type: String
    }
  },
  emits: ['update:value'],
  data () {
    return {
      dateTime: {
        date: '',
        time: ''
      }
    }
  },
  computed: {
    canShowTime () {
      return (!this.range && !this.multiple) && this.time
    },
    canShowDate () {
      return this.date
    },
    mask () {
      if (this.canShowTime && !this.canShowDate) {
        return 'HH:mm:00'
      } else if (!this.canShowTime && this.canShowDate) {
        return 'YYYY-MM-DD'
      } else {
        return ''
      }
    },
    outputText () {
      if (!this.inputData) {
        return
      }
      if (Array.isArray(this.inputData)) {
        let ranges = this.inputData.map(item => {
          if (item.from) {
            return ('(' + item.from + '-' + item.to + ')')
          } else {
            return ('(' + item + ')')
          }
        })
        ranges = ranges.join(', ')
        return ranges
      } else if (this.inputData.from) {
        return ('(' + this.inputData.from + '-' + this.inputData.to + ')')
      }
      return this.inputData
    }
  },
  watch: {
    value (newValue) {
      console.log('1 ', this.inputData)
      if (!newValue) {
        this.inputData = newValue
        return
      }
      if (!newValue.from && this.calendar === 'persian' && this.canShowDate) {
        this.inputData = this.miladiToShamsiDate(newValue)
        console.log('2 ', this.inputData)
      } else if (newValue.from) {
        this.inputData.from = this.miladiToShamsiDate(newValue.from)
        this.inputData.to = this.miladiToShamsiDate(newValue.to)
      }
      console.log('3 ', this.inputData)
      this.dateTime.date = date.formatDate(this.inputData, 'YYYY-MM-DD')
      this.dateTime.time = date.formatDate(this.inputData, 'HH:mm:00')
      console.log('dateTime.date  ', this.dateTime.date)
      console.log('dateTime.time  ', this.dateTime.time)
    }
  },
  methods: {
    clearDate () {
      this.inputData = null
      this.change(null)
    },
    change (val) {
      let fullDate = val
      console.log('after change: ', fullDate)
      if (this.canShowTime && this.canShowDate) {
        this.dateTime.date = date.formatDate(this.dateTime.date, 'YYYY-MM-DD')
        console.log('after change date: ', this.dateTime.date)
        fullDate = this.dateTime.date + ' ' + this.dateTime.time
        console.log('full date 1 : ', fullDate)
      }
      if (fullDate && !fullDate.from && this.calendar === 'persian' && this.canShowDate) {
        fullDate = this.shamsiToMiladiDate(fullDate)
        console.log('full date 2', fullDate)
      }
      if (fullDate && fullDate.from) {
        fullDate.from = this.shamsiToMiladiDate(fullDate.from)
        fullDate.to = this.shamsiToMiladiDate(fullDate.to)
        console.log('full date 3  ', fullDate)
      }
      console.log('full date 5', fullDate)
      this.$emit('update:value', fullDate)
    },
    miladiToShamsiDate (date) {
      return moment(new Date(date)).format('jYYYY/jM/jD HH:mm:00')
    },
    shamsiToMiladiDate (date) {
      return moment(date, 'jYYYY/jMM/jDD').format('YYYY-MM-DD HH:mm:00')
    }
  }
}
</script>

<style lang="scss" scoped>
.form-date-time{
  display: flex;
  flex-direction: row;
  .form-calender{
  }
  .form-time{
  }
}
</style>
