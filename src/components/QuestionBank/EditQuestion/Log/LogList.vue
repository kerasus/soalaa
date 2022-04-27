<template>
   <div class="log-list">
     <q-toolbar class="justify-between">
       <q-tabs
         v-model="tab"
         dense
         class="taps-group text-grey"
         active-color="dark"
         indicator-color="secondary"
         align="left"
         narrow-indicator
       >
         <q-tab
           name="history"
           label="سابقه"
         />
         <q-tab name="comments" label="نظرات کاربران"/>
       </q-tabs>
       <q-btn class="icon-type report-btn" size="12px" icon-right="isax:danger4" label="گزارش خطا" flat />
     </q-toolbar>
     <q-separator class="separator-tabs"/>
     <q-tab-panels v-model="tab" animated>
       <q-tab-panel name="history">
         <q-card class="log-list-tap-panel custom-card">
           <q-scroll-area
             class="scroll-bar"
             tabindex="0"
             style="height: 480px;"
             visible
           >
             <div class="logList">
               <log-item
                 v-for="(item, index) in logs.list"
                 :key="index"
                 :log="item"
               />
             </div>
           </q-scroll-area>
         </q-card>
       </q-tab-panel>
       <q-tab-panel class="flex" name="comments">
         <q-card class="log-list-tap-panel custom-card full-width flex">
           <div class="coming-soon text-h6">حالا حالاها خبری از این بخش نیست :)</div>
         </q-card>
       </q-tab-panel>
     </q-tab-panels>
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
    return {
      tab: 'history'
    }
  },
  methods: {
    addComment (eventData) {
      this.$emit('addComment', eventData)
    }
  }
}

</script>

<style lang="scss" scoped>
.log-list {
  margin-top: 70px;
  margin-bottom: 485px;

  .scroll-bar {
    &:deep(.q-scrollarea__thumb){
      margin: 60px 20px;
      width: 6px;
      background-color: var(--3a-Primary);
      opacity: 1;
      border-radius: 4px;
    }
    &:deep(.q-scrollarea__bar){
      height: 360px;
      width: 6px;
      border-radius: 4px;
      margin: 60px 20px 0 20px;
      background-color: var(--3a-Neutral2);
      opacity: 1;
    }
    &:deep(.absolute-right){
      left: 0;
    }
  }

  .taps-group {
    &:deep(.q-tab) {
      color: var(--3a-TextSecondary);
      padding: 0;
    }

    &:deep(.q-tab__content) {
      padding: 0 24px;
    }

    &:deep(.q-tab__label) {
      font-size: 16px;
    }

    &:deep(.q-tab__indicator) {
      width: 100%;
      height: 6px;
      border-radius: 6px 6px 0 0;
    }

    &.absolute-bottom {
      left: -15px;
    }

  }

  .separator-tabs {
    margin-bottom: 40px;
    margin-left: 10px;
    margin-top: -7px;
  }

  &:deep(.q-tab-panels) {
    background: transparent;
  }

  .log-list-tap-panel {
    min-height: 200px;
    .coming-soon {
      margin: auto;
    }
  }

  .report-btn {
    color: var(--3a-TextSecondary);
  }
}

</style>
<style scoped>
.logList-title {
  font-size: 16px;
  margin-top: 20px;
}

.logList {
  width: 100%;
}

.rounded-card {
  border-radius: 10px;
  overflow-y: auto;
  max-height: 1600px;
}
</style>
