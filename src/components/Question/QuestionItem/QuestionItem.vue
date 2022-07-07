<script  defer>
import { Question } from 'src/models/Question'
import question from './Question'
// import VideoPlayer from 'components/VideoPlayer'

export default {
  name: 'QuestionItem',
  components: { question },
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
          editQuestion: false,
          switch: true
        }
      }
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    pageStrategy: {
      type: String,
      default: ''
    },
    finalApprovalMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ['checkSelect', 'changeOrder'],
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
    this.setQuestionLevel()
  },
  computed: {
    trueChoice () {
      return this.question.choices.getSelected()
    }
  },
  methods: {
    onResize () {
      this.$refs.questionComponent.setChoiceCol()
    },
    changeOrder (mode, question) {
      this.$emit('changeOrder', {
        question,
        mode
      })
    },
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
    selectQuestion () {
      this.$emit('checkSelect', this.question)
    },
    setQuestionLevel () {
      this.questionLevel = 1
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
      const baseConf = {
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
      const finalConf = {
        ...baseConf
      }
      if (this.pageStrategy === 'question-bank') {
        // return finalConf
      }
      if (this.pageStrategy === 'lesson-detail') {
        // return finalConf
      }
      return finalConf
    },
    applyListConfig () {
      let finalConf = {}
      if (this.finalApprovalMode) {
        finalConf = {
          ...this.listOptions,
          reportProblem: false,
          editQuestion: false,
          menu: {
            show: false,
            items: {
              copy: false,
              detachQuestion: true,
              deleteQuestionFromDb: true,
              confirmQuestion: true
            }
          }
        }
      }

      this.listConfig = Object.assign(this.listConfig, finalConf)
    },

    emitAdminActions (action, data) {
      this.$emit(action, data)
    }
  }
}
</script>
<template>
  <q-card class="custom-card" :class="{'selected':question.selected && !finalApprovalMode}">
    <q-resize-observer @resize="onResize"/>
    <q-card-section class="question-bank-content ">
      <div class="question-info-section row justify-between full-width">
        <div class="id-info-section ">
          <div v-if="listConfig.questionId">
            <q-skeleton v-if="question.loading" type="text" width="110px" class="q-ml-xs"/>
            <q-chip v-else class="id-chip q-mr-lg">
              سوال
              <span class="id-style q-pl-sm">{{ question.id }}</span>
            </q-chip>
          </div>
          <div v-if="listConfig.questionInfo" class="question-info">
            <div class="info-part" v-for="(item, index) in question.tags.list" :key="index">
              <q-skeleton v-if="question.loading" class="info-title" type="text" width="80px"/>
              <div v-else class="info-title">
                {{ item.title }}
              </div>
              <div class="info-circle-icon" :class="{'last-circle':index === info.length - 1}">
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
            <q-btn v-if="listConfig.menu.show" icon="mdi-dots-vertical no-padding"  flat dense rounded style="color: #65677F">
              <!--   ---------------------------------------------------------------------------------------------------------------------------------------------- -->
              <q-menu class="menu-content">
                <q-list style="min-width: 100px">
                  <q-item v-if="listConfig.menu.items.deleteQuestionFromDb" clickable class="list-item"
                          @click="emitAdminActions('deleteQuestion',question.id)">
                    <q-item-section>حذف از پایگاه داده</q-item-section>
                    <q-item-section side>
                      <q-icon
                        size="20px"
                        class="fi fi-rr-delete document"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="listConfig.menu.items.detachQuestion" clickable
                          @click="emitAdminActions('detachQuestion',question.id)">
                    <q-item-section>حذف سوال از آزمون</q-item-section>
                    <q-item-section side>
                      <q-icon
                        size="20px"
                        class="fi fi-rr-cross-small icon-style"
                      />
                    </q-item-section>
                  </q-item>
                  <q-item v-if="listConfig.menu.items.copy" clickable
                          @click="emitAdminActions('copyIdToClipboard',question.id)">
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
            <q-img :src="item.photo"/>
          </q-avatar>
          {{ item.first_name + ' ' + item.last_name }}
        </q-chip>
      </div>
      <div class="question-section">
        <div v-if="finalApprovalMode" class="add-btn question-index">
          <q-btn
            unelevated
            color="primary"
            class="btn-style"
          >{{question.order}}</q-btn>
        </div>
        <div :class="isLtrQuestion() ? 'question-icon order-last' : 'question-icon'"/>

        <div class="question">
          <question
            ref="questionComponent"
            :question="question"
          />

        </div>
      </div>
      <div class="choice-section row" :class="isLtrQuestion()? 'ltr-choice-section' : ''">

      </div>
      <div class="expansion-section">
        <q-expansion-item
          v-if="listConfig.descriptiveAnswer"
          v-model="descriptiveAnswerExpanded"
          header-class="hideExpansionHeader"
        >
          <div class="answer-section">
            <div class="answer-description" :class=" false ? 'normal-width' : 'full-width'">
              <q-card flat class="answer-description-card">
                <div class="question-answer-choice">
                  <span v-if="this.question.choices.getSelected()" class="question-answer-choice-title">
                     گزینه
                     {{ this.question.choices.getSelected().getNumberTitle() }}
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
                <!--                <video-player/>-->
              </div>
              <div class="title text-center">
                پاسخنامه ویدیویی - محمد امین نباخته
              </div>
            </div>
          </div>
        </q-expansion-item>
      </div>
      <template v-if="!question.loading">
        <div class="actions-section">
          <div class="edit-add">
            <div v-if="listConfig.selectQuestion" class="add-btn">
              <q-btn
                unelevated
                :outline="question.selected"
                color="primary"
                class="btn-style"
                @click="selectQuestion"
                :icon="question.selected ? 'isax:minus' : 'isax:add'"/>
            </div>
            <div v-if="finalApprovalMode" class="add-btn">
              <q-btn
                unelevated
                icon="isax:arrow-up-2"
                color="primary"
                class="btn-style"
                @click="changeOrder('up', question)"
                />
            </div>
            <div v-if="finalApprovalMode" class="add-btn">
              <q-btn
                unelevated
                icon="isax:arrow-down-1"
                color="primary"
                class="btn-style"
                @click="changeOrder('down', question)"
                />
            </div>
            <div v-if="listConfig.editQuestion" class="edit-btn">
              <q-btn
                unelevated
                color="primary"
                icon="isax:edit-2"
                class="btn-style"
                @click="redirectToEditPage"/>
            </div>
          </div>
          <div class="rate-report-comment-answer">
            <div class="rate-report-comment flex">
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
                  <span class="report-title">
                    گزارش خطا
                  </span>
                  <q-icon class="report-icon" name="isax:danger" size="16px" style="color: #65677F"/>
                </q-btn>
              </div>
            </div>
<!--            <div-->
<!--              class="show-descriptive"-->
<!--              v-if="listConfig.descriptiveAnswer"-->
<!--              @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded">-->
<!--              {{descriptiveAnswerExpanded?  'بستن پاسخ تشریحی' : 'نمایش پاسخ تشریحی'}}-->
<!--              <q-icon id="toggle-icon" name="isax:arrow-down-1" ></q-icon>-->
<!--            </div>-->
            <q-btn
              flat
              role="presentation"
              class="no-padding"
              v-if="listConfig.descriptiveAnswer"
              :icon-right="descriptiveAnswerExpanded? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
              @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded"
            >
              <template v-slot:default>
                <span class="q-pr-sm" v-if="descriptiveAnswerExpanded">
                 بستن پاسخ تشریحی
                </span>
                <div v-else class="q-pr-sm" >
                  <span class="xs-hide">نمایش </span>
                  <span> پاسخ تشریحی</span>
                </div>
              </template>
            </q-btn>
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
<style lang="scss" scoped>
.question-index {
  .q-btn {
    border-radius: 10px 0;
  }
}
#toggle-icon{
  animation: mymove 2s infinite;
}
@keyframes mymove {
  50% {transform: rotate(180deg);}
}
.test {
  background: #6ea5dc;
}

.test3 {
  background: #e1246c;
}

.test2 {
  background: #efe471;
}

.selected {
  background: #F4F5F6;
  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(112, 108, 161, 0.05), inset -8px 8px 20px rgba(112, 108, 161, 0.1), inset 8px -8px 20px rgba(112, 108, 161, 0.1), inset -8px -8px 10px rgba(255, 255, 255, 0.9), inset 8px 8px 13px rgba(112, 108, 161, 0.15) #{"/* rtl:ignore */"} !important;
  border-radius: 20px;
}

.custom-card {
  margin-bottom: 16px
}

.question-bank-content {
  padding: 24px 32px;

  .question-info-section {
    .id-info-section {
      display: flex;

      .question-info {
        display: flex;

        .info-part {
          display: flex;
          align-items: center;
          height: 22px;

          .info-title {
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

          .last-circle {
            display: none;
          }
        }
      }
    }

    .level-and-source {
      display: flex;

      .question-level {
        margin-right: 60px;
        display: flex;

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
        margin-top: -8px;

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
          .menu-toggle {
            margin-left: -10px
          }

          .list-item {
          }
        }
      }
    }
  }

  .question-section {
    display: flex;
    margin-top: 25px;

    .question-icon {
      margin: 7px 10px 0 10px;
      width: 10px;
      height: 10px;
      background: #9690E4;
      border-radius: 3px;
    }

    .question {
      width: 100%;
      font-size: 14px;
      line-height: 24px !important;
      color: #23263B;
    }
  }

  .choice-section.row.ltr-choice-section {
    direction: ltr #{"/* rtl:ignore */"} !important;
  }

  .choice-section {
    padding: 4px 0 0 10px;
    margin-bottom: 40px;

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

      .normal-width {
        width: calc(100% - 336px);
      }

      .full-width {
        width: 100%;
      }
    }

    .answer-description-video {
      .video {
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

  .actions-section {
    display: flex;
    justify-content: space-between;

    .edit-add {
      .btn-style {
        width: 40px;
        height: 40px;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 13px;
      }
      display: flex;

      .add-btn {
        margin-right: 16px;
      }
    }

    .rate-report-comment-answer {
      display: flex;
      .rate-report-comment{
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
          margin-right: 41px;

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
        .show-descriptive{

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
  .question-bank-content {
    .question-info-section {
      position: relative;

      .id-info-section {
        flex-direction: column;

        .id-chip {
          margin-bottom: 20px;
        }
      }

      .level-and-source {
        position: absolute;
        top: 0;
        right: 0;
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

        .normal-width {
          width: calc(100% - 260px);
        }

        .full-width {
          width: 100%;
        }
      }

      .answer-description-video {
        .video {
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

@media only screen and (max-width: 1023px) {
  .question-bank-content {
    padding: 20px 16px;

    .question-info-section {
      .id-info-section {
        .id-chip {
        }
      }

      .level-and-source {
        .question-level {
          margin-right: 16px;
        }
      }
    }
    .actions-section {
      .edit-add{
        .add-btn{
          margin-right: 12px;
        }
      }
      .rate-report-comment-answer {
        .rate-report-comment{
          .rating{
            margin-right: 16px;
          }
          .comments{
            margin-right: 17px;
          }
          .report{
            margin-right: 27px;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 599px) {
  .question-bank-content {
    .choice-section{
      margin-bottom: 18px;
    }
    .answer-section {
      padding: 24px 10px;
      display: flex;

      .answer-description {
        .answer-description-card {
          .question-answer-choice {
            margin-bottom: 10px;
          }
        }

        .normal-width {
          width: calc(100% - 286px);
        }

        .full-width {
          width: 100%;
        }
      }

      .answer-description-video {
        .video {
          margin: 0 0 0 20px;
          min-width: 286px;
          height: 161px;
        }

        .title {
          padding-top: 12px;
        }
      }
    }

    .question-info-section {
      .id-info-section {
        .id-chip {
          max-width: 109px;

          .id-style {
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }

        .question-info {
          flex-direction: column;

          .info-part {
            .info-title {
              order: 2;
            }

            .last-circle {
              display: block;
            }
          }
        }
      }

      .level-and-source {
        justify-content: flex-end;
        flex-wrap: wrap;
        .question-level {
          margin-right: 16px;
        }

        .question-source {
          margin-top:10px;
          order: 3;
          width: 100%;
          justify-content: flex-end;

          .source-name-date {
            margin-right: 4px;
          }
        }
        .more-option{
          margin-left: 0;
        }
      }
    }

    .actions-section {
      position: relative;
      .edit-add{
        position: absolute;
        bottom: 0;
        .add-btn{
          margin-right: 11px;
        }
      }
      .rate-report-comment-answer {
        width: 100%;
        justify-content: flex-end;
        flex-wrap: wrap;
        .rate-report-comment{
          justify-content: flex-end;
          width: 100%;
          margin-bottom: 6px;
          .report{
            margin-right: 1px;
          }
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
