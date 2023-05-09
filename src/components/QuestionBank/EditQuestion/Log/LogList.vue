<template>
  <div class="log-list">
    <template v-if="loading">
      ...
    </template>
    <template v-else>
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
          <q-tab name="comments"
                 label="نظرات کاربران" />
        </q-tabs>
        <q-btn class="icon-type report-btn"
               size="12px"
               icon-right="isax:danger4"
               label="گزارش خطا"
               flat />
      </q-toolbar>
      <q-separator class="separator-tabs" />
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel name="history">
          <q-card class="log-list-tap-panel custom-card">
            <template v-if="!logs.loading">
              <q-scroll-area
                class="scroll-bar"
                tabindex="0"
                :style="windowSize.x > 991 ? {height: '440px'}: {height: '497px'}"
                visible
              >
                <div class="log-list-card">
                  <log-item
                    v-for="(item, index) in logs.list"
                    :key="index"
                    :log="item"
                    :mode="mode"
                    @restoreQuestion="restoreQuestion"
                  />
                </div>
              </q-scroll-area>
            </template>
            <div>
              ...
            </div>
          </q-card>
        </q-tab-panel>
        <q-tab-panel class="flex"
                     name="comments">
          <q-card
            class="log-list-tap-panel full-width flex bg-transparent"
            flat
          >
            <div class="coming-soon">حالا حالاها خبری از این بخش نیست :)</div>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </template>
  </div>
</template>

<script>
import { LogList } from 'src/models/Log.js'
import LogItem from 'src/components/QuestionBank/EditQuestion/Log/LogItem/LogItem.vue'

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
    },
    loading: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      tab: 'history'
    }
  },
  computed: {
    windowSize () {
      return this.$store.getters['AppLayout/windowSize']
    }
  },
  methods: {
    addComment (eventData) {
      this.$emit('addComment', eventData)
    },
    restoreQuestion(eventData) {
      this.$emit('restoreQuestion', eventData)
    }
  }
}

</script>

<style lang="scss" scoped>
.log-list {
  margin-top: 70px;
  margin-bottom: 50px;

  .scroll-bar {
    &:deep(.q-scrollarea__thumb){
      margin: 0 20px;
      width: 6px;
      background-color: var(--3a-Primary);
      opacity: 1;
      border-radius: 4px;
      @media screen and (max-width: 991px) {
        margin: 0 10px;
        width: 4px;
      }
      @media screen and (max-width: 599px) {
        display: none;
      }
    }
    &:deep(.q-scrollarea__bar){
      width: 6px;
      border-radius: 4px;
      margin: 0 20px;
      background-color: var(--3a-Neutral2);
      opacity: 1;
      @media screen and (max-width: 991px) {
        margin: 0 10px;
      }
      @media screen and (max-width: 599px) {
        display: none;
      }
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
    padding: 20px 0;
    box-sizing: border-box;
    .coming-soon {
      color: var(--3a-TextSecondary);
      font-size: 16px;
      margin: auto;
    }
  }

  .report-btn {
    color: var(--3a-TextSecondary);
  }
}
</style>
