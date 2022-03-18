<template>
  <div class="question-txtMode-navbar">
    <div class="fit row wrap justify-between">
      <div class="col-auto">
        <div class="question-type row items-center relative-position">
          <div class="col">نوع سوال</div>
          <div>
            <q-tabs
              v-if="componentTabs.list[0]"
              v-model="questionTab"
              no-caps
              dense
              shrink
              :breakpoint="0"
              class="col question-type-tabs"
            >
              <q-tab
                v-for="(item, index) in componentTabs.list"
                :key="index"
                class="question-type-tab"
                :name="item.value"
                :label="item.tabName"
              />
            </q-tabs>
          </div>
          <q-inner-loading
            :showing="loading"
            color="primary"
            class="QComponents-inner-loading"
            label-style="font-size: 1.1em"
          />
        </div>
      </div>
      <div class="col-auto">
        <div
          v-ripple.early
          class="relative-position container bg-primary text-black flex flex-center question-pics"
        >
          <q-img
            src="/img/img-panel-btn.png"
            spinner-color="white"
            class="question-pics-img"
          />
          <div class="text-white text-center question-pics-txt">تصاویر سوال</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { Question } from 'src/models/Question'
import { QuestionType, TypeList } from 'src/models/QuestionType'

export default {
  name: 'Navbar',
  props: {
    componentTabs: {
      type: TypeList,
      default () {
        return new TypeList()
      }
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      questionTab: 'konkur'
    }
  },
  inject: {
    question: {
      from: 'question', // this is optional if using the same key for injection
      default: new Question()
    }
  },
  mixins: [
    AdminActionOnQuestion
  ],
  created () {},
  mounted () {},
  methods: {
    chooseComponent (item) {
      this.question.type = new QuestionType({
        value: item
      })
    }
  },
  watch: {
    componentTabs: function () {
      // this.chooseComponent(this.componentTabs.list[0])
    },
    questionTab: {
      handler (newValue, oldValue) {
        this.chooseComponent(newValue)
      },
      deep: true
    }
  }
}
</script>

<style scoped lang="scss">
.question-txtMode-navbar{
  .question-type {
    min-width: 315px;
    min-height: 30px;
    .question-type-tabs {
      height: 30px;
      background: #FFFFFF;
      border-radius: 15px;
      color: #23263B;
      margin-right: 12px #{"/* rtl:ignore */"};
      .question-type-tab {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 24px;
        text-align: center;
      }
    }
  }
  .question-pics {
    width: 140px;
    height: 30px;
    border-radius: 10px;
    cursor: pointer;
    .question-pics-img {
      height: 20px; max-width: 20px
    }
    .question-pics-txt {
      font-size: 14px;
      line-height: 1.715em;
      font-weight: 500;
      margin-right: 6px #{"/* rtl:ignore */"};
    }
  }
}
</style>
<style lang="scss">
.question-txtMode-navbar {
  .question-type {
    .question-type-tabs {
      .q-tab {
        height: 30px;
        border-radius: 15px 15px 21px 22px #{"/* rtl:ignore */"};
        .q-tab__indicator {
          display: none;
          top: 0;
        }
        &.q-tab--active , .q-focus-helper {
          border-radius: 15px 15px 21px 22px #{"/* rtl:ignore */"};
        }
      }
      .q-tab--active {
        color: #FFFFFF;
        background: #9690E4;
        //border-radius: 15px 15px 21px 22px #{"/* rtl:ignore */"};
      }
      .q-focus-helper {
        //border-radius: 15px 15px 21px 22px #{"/* rtl:ignore */"};
      }
      .question-type-tab {
        .q-tab__label {
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          text-align: center;
        }
      }
    }
  }
}
</style>
