<template>
  <div class="question-txtMode-navbar">
    <div class="fit row wrap justify-between">
      <div class="col-auto">
        <div
          v-if="mode === 'create'"
          class="question-type row items-center relative-position"
        >
          <div class="col">نوع سوال</div>
          <div>
            <q-tabs
              v-if="componentTabs.list[0] && !qTabLoading"
              v-model="questionTab"
              no-caps
              dense
              shrink
              :breakpoint="0"
              class="col question-type-tabs"
            >
              <q-route-tab
                v-for="(item, index) in componentTabs.list"
                :key="index"
                class="question-type-tab"
                :name="item.value"
                :label="item.tabName"
                :to="getCurrentRoute(item.componentName)"
              />
            </q-tabs>
            <q-skeleton
              v-if="qTabLoading"
              type="QToolbar"
              width="268px"
              height="30px"
              class="q-ml-md"
            />
          </div>
        </div>
        <div
          v-if="mode === 'show'"
        >
          <q-btn
            unelevated
            color="primary"
            label="ویرایش سوال"
            class="save-btn default-detail-btn"
            @click="redirectToEditPage"
          />
        </div>
      </div>
      <div class="col-auto">
        <div
          v-if="!(mode === 'create')"
          class="question-img-btn row"
        >
          <div
            v-ripple.early
            class="relative-position container bg-primary text-black flex flex-center question-pics"
            @click="panelClicked"
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
  </div>
</template>

<script>
import AdminActionOnQuestion from 'src/mixin/AdminActionOnQuestion'
import { Question } from 'src/models/Question'
import { TypeList } from 'src/models/QuestionType'

export default {
  name: 'Navbar',
  props: {
    mode: {
      type: String,
      default () {
        return 'create'
      }
    }
  },
  data () {
    return {
      question: new Question(),
      questionTab: '',
      componentTabs: new TypeList([
        {
          id: '6225f4828044517f52500c04',
          type: 'question_type',
          value: 'konkur',
          updated_at: '2022-03-07 15:33:14',
          created_at: '2022-03-07 15:33:14'
        },
        {
          id: '6225f4828044517f52500c05',
          type: 'question_type',
          value: 'psychometric',
          updated_at: '2022-03-07 15:33:14',
          created_at: '2022-03-07 15:33:14'
        },
        {
          id: '6225f4828044517f52500c06',
          type: 'question_type',
          value: 'descriptive',
          updated_at: '2022-03-07 15:33:14',
          created_at: '2022-03-07 15:33:14'
        }
      ]),
      qTabLoading: false
    }
  },
  mixins: [
    AdminActionOnQuestion
  ],
  created () {
    this.qTabLoading = true
  },
  mounted () {
    this.$nextTick(() => {
      this.qTabLoading = false
    })
  },
  computed: {
    doesHaveImage () {
      // return !!()
      return null
    }
  },
  methods: {
    panelClicked () {
      this.$emit('panelClicked')
    },
    getCurrentRoute (componentName) {
      const currentQuestionMode = this.getCurrentQuestionMode()
      if (currentQuestionMode === 'Text') {
        if (componentName === 'MultipleChoiceQ') {
          return { name: 'Admin.Question.Create.' + currentQuestionMode + '.MultipleChoice' }
        } else if (componentName === 'DescriptiveQ') {
          return { name: 'Admin.Question.Create.' + currentQuestionMode + '.Descriptive' }
        } else if (componentName === 'MBTIQ') {
          return { name: 'Admin.Question.Create.' + currentQuestionMode + '.MBTI' }
        }
      } else {
        if (componentName === 'MultipleChoiceQ') {
          return {
            name: 'Admin.Question.Create.' + currentQuestionMode,
            params: {
              questionType: 'multipleChoice'
            }
          }
        } else if (componentName === 'DescriptiveQ') {
          return {
            name: 'Admin.Question.Create.' + currentQuestionMode,
            params: {
              questionType: 'descriptive'
            }
          }
        } else if (componentName === 'MBTIQ') {
          return {
            name: 'Admin.Question.Create.' + currentQuestionMode,
            params: {
              questionType: 'mbti'
            }
          }
        }
      }
    }
  },
  watch: {}
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
  .default-detail-btn {
    width: 144px;
    height: 40px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
  .save-btn {
    background: #9690E4;
    font-weight: 500;
    color: #FFFFFF;
  }
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
