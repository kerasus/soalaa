<template>
  <div v-for="item in logArray"
       :key="item"
       class="flex no-wrap">
    <div class="log-date"
         :style="{color : getMainColor(item), borderLeft: '3px ' + 'solid ' + getMainColor(item)}">
      {{ convertToShamsi(item.created_at, 'date') }}
    </div>
    <div class="log-info">
      <div>
        <div class="log-text">
          {{item.action}}
          <span v-if="item.before"
                class="flex q-my-xs"
          >
            <br>
            از
            {{item.before}}
          </span>
          <span v-if="item.after"
                class="flex q-my-xs">
            <br>
            به
            {{item.after}}
          </span>
        </div>
        <div class="log-time">
          {{ convertToShamsi(item.created_at, 'time') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinDateOptions } from 'src/mixin/Mixins'

export default {
  name: 'logList',
  mixins: [mixinDateOptions],
  props: {
    logArray: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      departmentStatus: [],
      statusColor: ''
    }
  },
  methods: {
    initStatusData() {
      this.departmentStatus = [
        {
          title: 'تغییر دپارتمان تیکت',
          color: '#ffb822'
        },
        {
          title: 'ثبت پیام برای تیکت',
          color: '#36a3f7'
        },
        {
          title: 'تغییر وضعیت تیکت',
          color: '#716aca'
        },
        {
          title: 'ثبت تیکت',
          color: '#34bfa3'
        }
      ]
    }
  },
  computed: {
    getMainColor () {
      return (obj) => {
        this.departmentStatus.forEach(item => {
          if (obj.action === item.title) {
            this.statusColor = item.color
          }
        })
        return this.statusColor
      }
    }
  },
  created() {
    this.initStatusData()
  }
}
</script>

<style lang="scss" scoped>
    .log-date {
      align-items: center;
      display: grid;
      padding: 0 20px;
      margin: 10px 0;
      width: 120px;
      font-size: 16px;
    }
    .log-info {
      padding-left: 20px;
      margin: 10px 0;
      align-items: center;
      display: grid;
    }
    .log-time{
      color: #6a6a6a;
    }
</style>
