<template>
  <div>
    <p class="logList-title" >
      سابقه
    </p>
    <q-card
      flat
      class="rounded-card"
    >
      <div class="logList">
        <div
          v-for="(item, index) in logs.list"
          :key="index"
        >
        </div>
        <log-item
          v-for="(item, index) in logs.list"
          :key="index"
          :log="item"
          @addComment="addComment"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import LogItem from 'src/components/QuestionBank/EditQuestion/Log/LogItem/LogItem'
import { LogList } from 'src/models/Log'

export default {
  name: 'LogList',
  components: {
    LogItem
  },
  props: {
    logs: {
      type: LogList,
      default () {
        return new LogList()
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    addComment (eventData) {
      this.$emit('addComment', eventData)
    }
  }
}

</script>

<style scoped>
.logList-title {
  font-size: 16px;
  margin-top: 20px;
}
.logList {
  width: 100%;
}
.rounded-card{
  border-radius: 10px;
  overflow-y: auto;
  max-height: 1600px;
}
</style>
