<template>
  <q-card class="custom-card" :class="{isSelected :'selected'}">
    <q-resize-observer @resize="setChoiceCol"/>
    <q-card-section class="question-bank-content">
      <div class="question-info-section">
        <div class="number-and-info">
          <div v-if="listConfig.questionId" class="question-number">
            <div class="question-number-title">
              سوال
              <template v-if="question.loading">
                <q-skeleton type="text" width="40px" class="q-ml-xs"/>
              </template>
              <template v-else>
                {{ question.id }}
              </template>
            </div>
          </div>
          <div v-if="listConfig.questionInfo" class="question-info">
            <div class="info-part" v-for="(item, index) in info" :key="index">
              <template v-if="question.loading">
                <q-skeleton class="info-title" type="text" width="80px"/>
              </template>
              <template v-else>
                <div class="info-title">
                  {{ item.name }}
                </div>
              </template>
              <div class="info-circle-icon" v-if="index !== info.length - 1">
              </div>
            </div>
          </div>
        </div>
        <div class="level-and-source">
          <div v-if="listConfig.questionLevel" class="question-level">
            <template v-if="question.loading">
              <div class="level">
                <q-skeleton type="text" width="40px" height="25px" class="q-ml-xs"/>
              </div>
              <q-skeleton v-for="item in 3" :key="item" class="level-circles"></q-skeleton>
            </template>
            <template v-else>
              <div class="level">
                {{ questionLevelClasses[questionLevel].title }}
              </div>
              <div v-for="item in 3"
                   :key="item"
                   class="level-circles"
                   :class="item === questionLevelClasses[questionLevel].lvl ?  questionLevelClasses[questionLevel].class : ''"
              />
            </template>
          </div>
          <div v-if=" listConfig.questionSource" class="question-source">
            <div class="source-name-date">
              <template v-if="question.loading ">
                <q-skeleton type="text" class="source-name" width="90px" height="30px"/>
                <q-skeleton type="text" class="source-date float-right" width="40px" height="20px"/>
              </template>
              <template v-else>
                <div class="source-name">سازمان سنجش</div>
                <div class="source-date">99 - 1400</div>
              </template>
            </div>
            <template v-if="question.loading">
              <q-skeleton class="source-avatar"/>
            </template>
            <template v-else>
              <div class="source-avatar"></div>
            </template>
          </div>
          <div v-if="!question.loading" class="more-option">
            <q-btn v-if="listConfig.menu.show" flat dense rounded style="color: #65677F">
              <q-icon name="mdi-dots-vertical"></q-icon>
<!--            ---------------------------------------------------------------------------------------------------------------------------------------------- -->
              <q-menu class="menu-content">
                <q-list style="min-width: 100px">
                  <q-item v-if="listConfig.menu.items.deleteQuestionFromDb" clickable  class="list-item"  @click="emitAdminActions('deleteQuestion',question.id)">
                    <q-item-section>حذف از پایگاه داده</q-item-section>
                    <q-item-section side>
                      <q-icon
                        size="20px"
                        class="fi fi-rr-delete document"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="listConfig.menu.items.detachQuestion" clickable @click="emitAdminActions('detachQuestion',question.id)">
                    <q-item-section>حذف سوال از آزمون</q-item-section>
                    <q-item-section side>
                      <q-icon
                        size="20px"
                        class="fi fi-rr-cross-small icon-style"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="listConfig.menu.items.copy" clickable  @click="emitAdminActions('copyIdToClipboard',question.id)">
                    <q-item-section>کپی شناسه سوال</q-item-section>
                    <q-item-section side>
                      <q-icon
                        size="20px"
                        class="fi fi-rr-copy"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item tag="label">
                    <q-item-section>
                      <q-item-label>تایید سوال</q-item-label>
                    </q-item-section>
                      <q-circular-progress
                        v-if="confirmLoading"
                        indeterminate
                        :thickness="0.3"
                        size="20px"
                        color="primary"
                      />
                      <q-toggle
                        v-else
                        class="menu-toggle"
                        v-model="confirmQuestion"
                        @update:model-value="emitAdminActions('confirmQuestion',question)"
                        color="primary"
                     />
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
      </div>
        <div
          v-if="question.confirmers.length"
          class="avatar-section grid-item">
          تایید شده توسط :
          <q-chip
            v-for="(item, index) in question.confirmers"
            :key="index"
            color="grey-2">
            <q-avatar color="grey-5">
              <q-img :src="item.photo" />
            </q-avatar>
            {{ item.first_name + ' ' + item.last_name }}
          </q-chip>
        </div>
      <div class="question-section">
        <div :class="isLtrQuestion() ? 'question-icon order-last' : 'question-icon'"/>
        <div class="question">
          <template v-if="question.loading">
            <q-skeleton type="text" width="99%" height="30px"/>
            <q-skeleton type="text" width="99%" height="30px"/>
            <q-skeleton type="text" width="50%" height="30px"/>
            <q-skeleton width="30%" height="200px" style="border-radius: 10px"/>
          </template>
          <template v-else>
            <vue-katex :input="question.statement"/>
          </template>
        </div>
      </div>
      <div class="choice-section row" :class="isLtrQuestion()? 'ltr-choice-section' : ''">
        <template v-if="question.loading">
          <div class="choice-column col-3" v-for="item in 4" :key="item">
            <div class="question-choice false" style="margin-bottom: 2px">
              {{ item }}
            </div>
            <q-skeleton type="text" width="100px" height="25px"/>
          </div>
        </template>
        <template v-else
        >
          <QuestionChoice
            ref="questionChoice"
            class=" col-lg-3 col-md-3 col-sm-12"
            :class="questionCol"
            :dir="isLtrQuestion()? 'ltr':''"
            v-for="(item , index) in this.question.choices.list"
            :questionData="item" :key="index">
          </QuestionChoice>
        </template>
      </div>
      <div class="expansion-section">
        <q-expansion-item
          v-if="listConfig.descriptiveAnswer"
          v-model="descriptiveAnswerExpanded"
          header-class="hideExpansionHeader"
        >
          <div  class="answer-section">
            <div class="answer-description" :class=" false ? 'normal-width' : 'full-width'">
              <q-card flat class="answer-description-card" >
                <div class="question-answer-choice">
                  <span v-if="this.question.choices.getSelected()" class="question-answer-choice-title">
                     گزینه
                     {{this.question.choices.getSelected().order}}
                  </span>
                </div>
                <div v-if="question.descriptive_answer" class="question-answer-description">
                  {{ question.descriptive_answer }}
                </div>
                <p v-else>
                 پاسخ تشریحی ندارد.
                </p>
              </q-card>
            </div>
            <div v-if="true" class=" answer-description-video">
              <div class="video">
              </div>
              <div class="title text-center">
                پاسخنامه ویدیویی - محمد امین نباخته
              </div>
            </div>
          </div>
        </q-expansion-item>
      </div>
      <template v-if="!question.loading">
        <div class="question-actions-container">
          <div class="question-actions">
            <div class="edit-and-add">
              <div v-if="listConfig.selectQuestion" class="add-btn">
                <q-btn
                  unelevated
                  :outline="isSelected"
                  color="primary"
                  class="edit-and-add-btn"
                  @clic="selectQuestion(!isSelected)"
                  :icon="isSelected ? 'isax:minus' : 'isax:add'" />
              </div>
              <div v-if="listConfig.editQuestion" class="edit-btn">
                <q-btn
                  unelevated
                  color="primary"
                  icon="isax:edit-2"
                  class="edit-and-add-btn"
                  @click="redirectToEditPage"/>
              </div>
            </div>
            <div class="question-actions-content">
              <div class="question-actions-btn">
                <div v-if="listConfig.questionRate" class="rating">
                  <div class="voters-number">
                    (90)
                  </div>
                  <div class="rate-number">
                    4.5
                  </div>
                  <div class="star">
                    <q-icon class="star-icon" name="mdi-star" size="16px"/>
                  </div>
                </div>
                <div v-if="listConfig.questionComment" class="comments">
                  <q-btn flat dense rounded>
                    <div class="comment-number">19</div>
                    <q-icon class="comment-icon" name="isax:message-text" size="16px" style="color: #65677F">
                    </q-icon>
                  </q-btn>
                </div>
                <div v-if="listConfig.reportProblem" class="report">
                  <q-btn flat dense rounded @click="reportProblemDialog.show = true">
                    <div class="report-title">
                      گزارش خطا
                    </div>
                    <q-icon class="report-icon" name="isax:danger" size="16px" style="color: #65677F"/>
                  </q-btn>
                </div>
                <q-btn
                  flat
                  v-if="listConfig.descriptiveAnswer"
                  :icon-right="descriptiveAnswerExpanded? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
                  :label="descriptiveAnswerExpanded?  '  بستن پاسخ تشریحی' : 'نمایش پاسخ تشریحی'"
                  @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded"
                />
              </div>
            </div>
          </div>
        </div>
      </template>
    </q-card-section>
  </q-card>
  <q-dialog v-model="reportProblemDialog.show">
    <q-card flat class="report-problem-dialog">
      <q-btn flat v-close-popup round dense icon="close" class="close-btn"/>
      <div class="title-style text-center">گزارش خطا</div>
      <q-card-section class="problem-type no-padding">
        <div class="title-style">
          نوع خطا
        </div>
        <q-select
          filled
          dense
          dropdown-icon="isax:arrow-down-1"
          bg-color="alaa3A"
          v-model="reportProblemDialog.problemType"
          :options="reportProblemDialog.problems"
          label="پاسخ نادرست"/>
      </q-card-section>
      <q-card-section class="problem-description no-padding">
        <div class="title-style">
          توضیحات
        </div>
        <q-input
          v-model="reportProblemDialog.description"
          filled
          solo
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="right" class="action-box no-padding">
        <q-btn unelevated label="انصراف" class="cancel btn-style" v-close-popup/>
        <q-btn unelevated label="ثبت" color="primary" class="btn-style" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import VueKatex from 'components/VueKatex'
import { Question } from 'src/models/Question'
import QuestionChoice from 'components/Question/QuestionItem/QuestionChoice'

export default {
  name: 'QuestionItem',
  components: { VueKatex, QuestionChoice },
  props: {
    question: {
      type: Question,
      default: new Question()
    },
    listOptions: {
      type: Object,
      default () {
        return {
          copy: true,
          detachQuestion: true,
          deleteQuestionFromDb: true,
          editQuestion: true,
          switch: true
        }
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    pageStrategy: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      questionChoiceList: [],
      confirmQuestion: false,
      descriptiveAnswerExpanded: false,
      questionLevel: 1,
      listConfig: {
        questionId: false,
        questionLevel: false,
        questionSource: false,
        questionInfo: false,
        editQuestion: true,
        switch: false,
        selectQuestion: true,
        reportProblem: true,
        questionRate: true,
        questionComment: true,
        descriptiveAnswer: true,
        menu: {
          show: true,
          items: {
            copy: true,
            detachQuestion: true,
            deleteQuestionFromDb: true
          }
        }
      },
      questionCol: '',
      questionLevelClasses: {
        1: {
          lvl: 3,
          class: 'easy',
          title: 'آسان'
        },
        2: {
          lvl: 3,
          class: 'easy',
          title: 'آسان'
        },
        3: {
          lvl: 2,
          class: 'medium',
          title: 'متوسط'
        },
        4: {
          lvl: 2,
          class: 'medium',
          title: 'متوسط'
        },
        5: {
          lvl: 1,
          class: 'hard',
          title: 'سخت'
        }
      },
      info: [
        {
          name: 'شیمی دهم'
        },
        {
          name: 'فصل اول با عنوان لورم ایپسوم'
        },
        {
          name: 'ساختار اتم'
        }
      ],
      reportProblemDialog: {
        show: false,
        problemType: '',
        problems: [],
        description: ''
      }
    }
  },
  created () {
    this.setPageConfig()
  },
  mounted () {
    this.setChoiceCol()
    this.setQuestionLevel()
  },
  computed: {
    trueChoice () {
      return this.question.choices.getSelected()
    }
  },
  methods: {
    isLtrQuestion () {
      const string = this.question.statement
      if (!string) {
        return false
      }
      const persianRegex = /[\u0600-\u06FF]/
      return !string.match(persianRegex)
    },
    redirectToEditPage () {
      this.$router.push({
        name: 'Admin.Question.Edit',
        params: {
          question_id: this.question.id
        }
      })
    },
    selectQuestion (data) {
      this.$emit('selectQuestion', data, this.question)
    },
    setQuestionLevel () {
      this.questionLevel = 5
    },
    setPageConfig () {
      this.applyPageStrategy()
      this.applyListConfig()
    },
    applyPageStrategy () {
      if (!this.pageStrategy) return
      let source = {}
      source = this.pageMode()
      this.listConfig = Object.assign(this.listConfig, source)
    },
    pageMode () {
      if (this.pageStrategy === 'question-bank') {
        return {
          questionId: true,
          questionLevel: true,
          questionSource: true,
          questionInfo: true,
          editQuestion: true,
          selectQuestion: true,
          reportProblem: true,
          questionRate: true,
          questionComment: true,
          descriptiveAnswer: true,
          menu: {
            show: true,
            items: {
              copy: true,
              detachQuestion: true,
              deleteQuestionFromDb: true,
              confirmQuestion: true
            }
          }
        }
      }
      if (this.pageStrategy === 'lesson-detail') {
        return {
          questionId: true,
          questionLevel: true,
          questionSource: true,
          questionInfo: true,
          editQuestion: true,
          selectQuestion: true,
          reportProblem: true,
          questionRate: true,
          questionComment: true,
          descriptiveAnswer: true,
          menu: {
            show: true,
            items: {
              copy: false,
              detachQuestion: true,
              deleteQuestionFromDb: true,
              confirmQuestion: true
            }
          }
        }
      }
    },
    applyListConfig () {
      this.listConfig = Object.assign(this.listConfig, this.listOptions)
    },
    setChoiceCol () {
      const el = this.$refs.questionChoice
      if (!el) {
        return
      }
      el.forEach(choice => {
        if (window.innerWidth < 1024) {
          return null
        }
        if (!this.isSingleLine(choice.$el)) {
          this.questionCol = 'col-lg-6 col-sm-6'
          this.$nextTick(() => {
            this.checkLines(choice.$el)
          })
        }
      })
    },
    checkLines (el) {
      if (!this.isSingleLine(el)) {
        this.questionCol = 'col-lg-12 col-sm-12'
      }
    },

    isSingleLine (choiceBoxElement) {
      const height = this.getElementHeight(choiceBoxElement)
      const choiceContentLineHeight = 40
      return height <= choiceContentLineHeight
    },
    getElementHeight (choiceBoxElement) {
      const choiceContentElement = choiceBoxElement.childNodes[1]
      const computed = getComputedStyle(choiceContentElement)
      const padding = parseInt(computed.paddingTop) + parseInt(computed.paddingBottom)
      return choiceBoxElement.clientHeight - padding
    },
    emitAdminActions (action, data) {
      this.$emit(action, data)
    }
  }
}
</script>

<style lang="scss" scoped>
.test{
  background: #6ea5dc;
}
.test3{
  background: #e1246c;
}
.test2{
  background: #efe471;
}
.selected{
  background: #F4F5F6;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(112, 108, 161, 0.05), inset -8px 8px 20px rgba(112, 108, 161, 0.1), inset 8px -8px 20px rgba(112, 108, 161, 0.1), inset -8px -8px 10px rgba(255, 255, 255, 0.9), inset 8px 8px 13px rgba(112, 108, 161, 0.15) #{"/* rtl:ignore */"} !important;
  border-radius: 20px;
}
.custom-card{
  margin-bottom:16px
}
.question-bank-content {
  .question-info-section {
    display: flex;
    justify-content: space-between;

    .number-and-info {
      display: flex;
      align-items: center;
      width: 50%;

      .question-number {
        height: 21px;
        margin-right: 2.35%;
        background: #F4F5F6;
        border-radius: 12px;

        .question-number-title {
          display: flex;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 21px;
          color: #23263B;
          padding: 0 8px;
        }
      }

      .question-info {
        display: flex;

        .info-part {
          display: flex;
          align-items: center;

          .info-title {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 21px;
            color: #23263B;
          }

          .info-circle-icon {
            border-radius: 50%;
            margin: 0 6px;
            width: 6px;
            height: 6px;
            background: #65677F;
            opacity: 0.3;
          }
        }
      }
    }

    .level-and-source {
      display: flex;
      align-items: center;

      .question-level {
        margin-right: 60px;
        display: flex;
        align-items: center;

        .level {
          margin-right: 10px;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 21px;
          text-align: right;
          color: #23263B;
        }

        .level-circles {
          margin-right: 5px;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          background: #F4F5F6;
        }

        .easy {
          background: #8ED6FF;
        }

        .medium {
          background: #FFCA28;
        }

        .hard {
          background: #DA5F5C;
        }
      }

      .question-source {
        display: flex;
        align-items: center;

        .source-name-date {
          margin-right: 10px;
          text-align: end;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 21px;
          color: #23263B;
        }

        .source-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #9690E4;
        }
      }

      .more-option {
        margin-left: 19px;

        .menu-content {
          .menu-toggle{
            margin-left:-10px
          }
          .list-item {
          }
        }
      }
    }
  }
  .question-section {
    display: flex;
    margin-top: 33px;

    .question-icon {
      margin: 7px 10px 0 10px;
      width: 10px;
      height: 10px;
      background: #9690E4;
      border-radius: 3px;
    }

    .question {
      width: 100%;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      color: #23263B;
    }
  }
  .choice-section.row.ltr-choice-section {
    direction: ltr #{"/* rtl:ignore */"} !important;
  }
  .choice-section {
    padding: 20px 0 0 20px;
    margin-bottom: 45px;

    .choice-column {
      display: flex;
      align-items: center;

      .answer-text {
        align-items: center;
      }
    }
  }
  .answer-section {
    padding: 24px 10px;
    display: flex;
    .answer-description {
      .answer-description-card {
        padding: 24px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #23263B;
        background: #F4F5F6;
        border-radius: 20px;
          .question-answer-choice {
            margin-bottom: 10px;
            .question-answer-choice-title {
              padding: 0 10px;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              color: #FFFFFF;
              background: #4CAF50;
              border-radius: 12px;
            }
          }

      }
      .normal-width{
        width: calc(100% - 336px);
      }
      .full-width{
        width: 100%;
      }
    }
    .answer-description-video {
      .video{
        margin: 0 0 0 16px;
        min-width: 320px;
        height: 180px;
        background: #F4F5F6;
        border-radius: 20px;
      }
      .title {
        padding-top: 8px;
        padding-left: 10px;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #23263B;
      }
    }
  }
  .question-actions-container {
    .q-item-type {
      justify-content: space-between;
    }

    .question-actions {
      display: flex;
      justify-content: space-between;
      .edit-and-add {
        display: flex;

        .add-btn {
          margin-right: 16px;
        }
      }
      .question-actions-content {
        .question-actions-btn {
          display: flex;
          .rating {
            display: flex;
            align-items: center;
            margin-right: 24px;

            .voters-number {
              margin-top: 1px;
              font-style: normal;
              font-weight: 400;
              font-size: 10px;
              line-height: 17px;
              color: #65677F;
              opacity: 0.5;
            }

            .rate-number {
              margin: 1px 0 0 2px;
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 21px;
              text-align: center;
              color: #65677F;
            }

            .star {
              .star-icon {
                margin: 0 0 4px 6px;
                color: #FFCA28;
              }
            }
          }

          .comments {
            display: flex;
            align-items: center;
            margin-right: 24px;

            .comment-number {
              font-size: 12px;
              color: #65677F;
            }

            .comment-icon {
              margin: 0 0 2px 5px;
            }
          }

          .report {
            display: flex;
            align-items: center;
            margin-right: 24px;
            .report-title {
              font-style: normal;
              font-weight: 400;
              font-size: 12px;
              line-height: 21px;
              color: #65677F;
            }

            .report-icon {
              margin: 0 0 3px 7px;
            }
          }
        }

      }
    }

  }
}
.report-problem-dialog {
  position: relative;

  .close-btn {
    position: absolute;
    top: 12px;
    left: 12px;
    z-index: 1000000;
  }

  border-radius: 15px;
  padding: 24px;

  .title-style {
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #23263B;
    margin-bottom: 8px;
  }

  .problem-type {
    margin-top: 10px;
    width: 300px;
  }

  .problem-description {
    margin-top: 16px;
  }

  .action-box {
    margin-top: 20px;

    .btn-style {
      border-radius: 10px;
      color: #23263B;
      width: 96px;
      height: 40px;
    }

    .cancel {
      background-color: #F4F5F6;
    }
  }
}
@media only screen and (max-width: 1919px) {
  .question-bank-content{
    .answer-section {
      padding: 24px 10px;
      display: flex;
      .answer-description {
        .answer-description-card {
          padding: 24px;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
          background: #F4F5F6;
          border-radius: 20px;
          .question-answer-choice {
            margin-bottom: 10px;
            .question-answer-choice-title {
              padding: 0 10px;
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              color: #FFFFFF;
              background: #4CAF50;
              border-radius: 12px;
            }
          }

        }
        .normal-width{
          width: calc(100% - 260px);
        }
        .full-width{
          width: 100%;
        }
      }
      .answer-description-video {
        .video{
          margin: 0 0 0 20px;
          min-width: 240px;
          height: 135px;
        }
        .title {
          padding-top: 10px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1920px) {

}
@media only screen and (max-width: 600px) {
  .question-bank-content{
    .answer-section {
      padding: 24px 10px;
      display: flex;
      .answer-description {
        .answer-description-card {
          .question-answer-choice {
            margin-bottom: 10px;
          }
        }
        .normal-width{
          width: calc(100% - 286px);
        }
        .full-width{
          width: 100%;
        }
      }
      .answer-description-video {
        .video{
          margin: 0 0 0 20px;
          min-width: 286px;
          height: 161px;
        }
        .title {
          padding-top: 12px;
        }
      }
    }
  }
}

</style>
<style lang="scss">
.expansion-section {
  .q-item.q-item-type.row.no-wrap.q-item--clickable.q-link.cursor-pointer.q-focusable.q-hoverable.hideExpansionHeader {
    display: none;
  }
}
</style>
<style scoped>
.edit-and-add-btn {
  width: 40px;
  height: 40px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 13px;
}
</style>
