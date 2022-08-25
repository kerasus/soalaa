<template>
  <q-card class="question-card custom-card"
          :class="{ 'selected': question.selected && !finalApprovalMode }">
    <q-resize-observer @resize="onResize" />

    <q-card-section class="question-card-header">
      <div class="question-titles">
        <div v-if="listConfig.questionId"
             class="question-card-chip">
          <q-chip>
            سوال
            <q-skeleton v-if="question.loading"
                        class="chip-dynamic-text"
                        type="text"
                        width="110px" />
            <span class="chip-dynamic-text">{{ question.id }}</span>
          </q-chip>
        </div>

        <div v-if="listConfig.questionInfo"
             class="question-tags">
          <div v-for="(item, index) in question.tags.list"
               :key="index"
               class="tag">
            <q-skeleton v-if="question.loading"
                        class="info-title"
                        type="text"
                        width="80px" />
            <div v-else
                 class="tag-title">
              {{ item.title }}
            </div>
            <div class="tag-circle" />
          </div>
        </div>

      </div>

      <div class="question-details">
        <div v-if="listConfig.questionLevel"
             class="question-level">
          <div v-if="question.loading"
               class="level-skeleton">
            <div class="level-text">
              <q-skeleton type="text"
                          width="40px"
                          height="25px"
                          class="q-ml-xs" />
            </div>
            <q-skeleton v-for="item in 3"
                        :key="item"
                        class="level-circles"></q-skeleton>
          </div>
          <div v-else
               class="level-content">
            <div class="level-text">
              {{ questionLevelClasses[questionLevel].title }}
            </div>
            <div v-for="item in 3"
                 :key="item"
                 class="level-circles"
                 :class="item === questionLevelClasses[questionLevel].level ? questionLevelClasses[questionLevel].class : ''">
            </div>
          </div>
        </div>

        <div v-if="listConfig.questionSource"
             class="question-source">
          <div v-if="question.loading"
               class="source-skeleton">
            <div class="source-text">
              <q-skeleton type="text"
                          class="source-name"
                          width="90px"
                          height="30px" />
              <q-skeleton type="text"
                          class="source-date"
                          width="40px"
                          height="20px" />
            </div>
            <div class="source-avatar">
              <q-skeleton type="QAvatar"
                          size="36px" />
            </div>
          </div>
          <div v-else
               class="source-content">
            <div class="source-text">
              <div
                v-if="question.reference[0]"
                class="source-name"
              >{{ question.reference[0].value }}</div>
              <div
                v-if="question.years[0]"
                class="source-date"
              >{{ question.years[0].value }}</div>
            </div>
            <div
              v-if="question.reference[0]"
              class="source-avatar"
            >
              <!--              question.reference[0].photos-->
              <q-avatar
                v-if="!question.reference[0].photos"
                size="36px"
              >
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="72"
                     height="35"
                     viewBox="0 0 72 35"
                     fill="none">
                  <path d="M66.1532 11.2621C69.5366 11.6879 72.382 8.85486 71.9578 5.48268C71.6681 3.18533 69.8056 1.33441 67.4983 1.04252C64.1148 0.616705 61.2694 3.44975 61.6936 6.82193C61.9833 9.11927 63.8458 10.9702 66.1532 11.2621Z"
                        fill="#FFB74D" />
                  <path d="M32.5867 28.7181C36.3451 25.2249 38.4994 20.2902 38.4994 15.173C38.4994 12.7591 40.4722 10.7904 42.9042 10.7904H53.0956C55.6649 10.7904 57.7528 8.71601 57.7528 6.15045C57.7528 3.58489 55.6649 1.51045 53.0956 1.51045H42.9042C35.3427 1.51045 29.185 7.63702 29.185 15.173C29.185 17.7627 28.1374 20.1597 26.2333 21.9314L26.2329 21.9317C24.3345 23.7008 21.8498 24.5723 19.2301 24.3944C14.6275 24.0791 10.8422 20.2207 10.6247 15.628C10.5086 13.169 11.3486 10.819 12.9897 9.00181L12.9898 9.00171C14.7112 7.09505 14.5528 4.15956 12.6388 2.44653C10.7261 0.734792 7.78301 0.891513 6.06356 2.79608C2.77373 6.44009 1.09008 11.1547 1.32095 16.0636L1.32095 16.0638C1.76396 25.4461 9.19286 33.0069 18.5917 33.6528C19.0369 33.6843 19.4793 33.7 19.922 33.7H21.6157L21.5432 33.6278C25.662 33.275 29.5071 31.5811 32.5867 28.7181ZM32.5867 28.7181L32.1102 28.2053M32.5867 28.7181L32.1102 28.2053M32.1102 28.2053C35.7265 24.8442 37.7994 20.095 37.7994 15.173C37.7994 12.3696 40.0885 10.0904 42.9042 10.0904H53.0956C55.2812 10.0904 57.0528 8.32654 57.0528 6.15045C57.0528 3.97436 55.2812 2.21045 53.0956 2.21045H42.9042C35.7265 2.21045 29.885 8.02649 29.885 15.173C29.885 17.9583 28.7557 20.5405 26.7101 22.4439L20.885 32.9717C25.0747 32.7515 28.9969 31.0995 32.1102 28.2053Z"
                        fill="#9690E4"
                        stroke="#9690E4"
                        stroke-width="1.4" />
                </svg>
              </q-avatar>
            </div>
          </div>
        </div>

        <div v-if="!question.loading"
             class="more-option">
          <q-btn v-if="listConfig.menu.show"
                 icon="mdi-dots-vertical no-padding"
                 flat
                 dense
                 rounded>
            <!--   ---------------------------------------------------------------------------------------------------------------------------------------------- -->
            <q-menu class="menu-content">
              <q-list style="min-width: 100px">
                <q-item v-if="listConfig.menu.items.deleteQuestionFromDb"
                        clickable
                        class="list-item"
                        @click="emitAdminActions('deleteQuestion', question.id)">
                  <q-item-section>حذف از پایگاه داده</q-item-section>
                  <q-item-section side>
                    <q-icon size="20px"
                            class="fi fi-rr-delete document" />
                  </q-item-section>
                </q-item>
                <q-item v-if="listConfig.menu.items.detachQuestion"
                        clickable
                        @click="emitAdminActions('detachQuestion', question.id)">
                  <q-item-section>حذف سوال از آزمون</q-item-section>
                  <q-item-section side>
                    <q-icon size="20px"
                            class="fi fi-rr-cross-small icon-style" />
                  </q-item-section>
                </q-item>
                <q-item v-if="listConfig.menu.items.copy"
                        clickable
                        @click="emitAdminActions('copyIdToClipboard', question.id)">
                  <q-item-section>کپی شناسه سوال</q-item-section>
                  <q-item-section side>
                    <q-icon size="20px"
                            class="fi fi-rr-copy" />
                  </q-item-section>
                </q-item>
                <q-item tag="label">
                  <q-item-section>
                    <q-item-label>تایید سوال</q-item-label>
                  </q-item-section>
                  <q-circular-progress v-if="confirmLoading"
                                       indeterminate
                                       :thickness="0.3"
                                       size="20px"
                                       color="primary" />
                  <q-toggle v-else
                            v-model="confirmQuestion"
                            class="menu-toggle"
                            color="primary"
                            @update:model-value="emitAdminActions('confirmQuestion', question)" />
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section class="question-approved">
      <div v-if="question.confirmers.length"
           class="avatar-section grid-item">
        تایید شده توسط :
        <q-chip v-for="(item, index) in question.confirmers"
                :key="index"
                class="approved-section"
                color="grey-2">
          <q-avatar color="grey-5">
            <q-img :src="item.photo" />
          </q-avatar>
          {{ item.first_name + ' ' + item.last_name }}
        </q-chip>
      </div>
    </q-card-section>

    <q-card-section class="question-section">
      <div v-if="finalApprovalMode"
           class="add-btn question-index">
        <q-btn unelevated
               color="primary"
               class="question-item-button">{{ question.order }}</q-btn>
      </div>
      <div :class="isLtrQuestion() ? 'question-icon order-last' : 'question-icon'" />
      <div class="question">
        <question ref="questionComponent"
                  :question="question" />
      </div>
    </q-card-section>
    <q-card-section class="answer-section">
      <q-expansion-item v-model="descriptiveAnswerExpanded"
                        header-class="hideExpansionHeader">
        <div class="answer-content">
          <div class="answer-description"
               :class="false ? 'normal-width' : 'full-width'">
            <q-card flat
                    class="answer-description-card">
              <div class="question-answer-choice">
                <span v-if="this.question.choices.getSelected()"
                      class="question-answer-choice-title">
                  گزینه
                  {{ this.question.choices.getSelected().getNumberTitle() }}
                </span>
              </div>
              <div v-if="question.descriptive_answer"
                   class="question-answer-description">
                <!--                <vue-katex :input="question.descriptive_answer" />-->
                <vue-katex :input="question.descriptive_answer" />
              </div>
              <p v-else>
                پاسخ تشریحی ندارد.
              </p>
            </q-card>
          </div>
          <div v-if="true"
               class=" answer-description-video">
            <div class="video">
              <video-player />
            </div>
            <div class="title text-center">
              پاسخنامه ویدیویی - محمد امین نباخته
            </div>
          </div>
        </div>
      </q-expansion-item>
    </q-card-section>

    <q-card-section v-if="!question.loading"
                    class="question-footer-section">
      <div class="edit-add">
        <div v-if="listConfig.selectQuestion">
          <q-btn unelevated
                 :outline="question.selected"
                 color="primary"
                 class="question-item-button"
                 :icon="question.selected ? 'isax:minus' : 'isax:add'"
                 @click="selectQuestion" />
        </div>
        <div v-if="finalApprovalMode">
          <q-btn unelevated
                 icon="isax:arrow-up-2"
                 color="primary"
                 class="question-item-button"
                 @click="changeOrder('up', question)" />
        </div>
        <div v-if="finalApprovalMode">
          <q-btn unelevated
                 icon="isax:arrow-down-1"
                 color="primary"
                 class="question-item-button"
                 @click="changeOrder('down', question)" />
        </div>
        <div v-if="listConfig.editQuestion">
          <q-btn unelevated
                 color="primary"
                 icon="isax:edit-2"
                 class="question-item-button"
                 @click="redirectToEditPage" />
        </div>
      </div>
      <div class="rate-report-comment-answer">
        <div class="rate-report-comment flex">
          <div v-if="listConfig.questionRate"
               class="rating">
            <div class="voters-number">
              (90)
            </div>
            <div class="rate-number">
              4.5
            </div>
            <div class="star">
              <q-icon class="star-icon"
                      name="mdi-star"
                      size="16px" />
            </div>
          </div>
          <div v-if="listConfig.questionComment"
               class="comments">
            <q-btn flat
                   dense
                   rounded>
              <div class="comment-number">19</div>
              <q-icon class="comment-icon"
                      name="isax:message-text"
                      size="16px"
                      style="color: #65677F">
              </q-icon>
            </q-btn>
          </div>
          <div v-if="listConfig.reportProblem"
               class="report">
            <q-btn flat
                   dense
                   rounded
                   @click="reportProblemDialog.show = true">
              <span class="report-title">
                گزارش خطا
              </span>
              <q-icon class="report-icon"
                      name="isax:danger"
                      size="16px"
                      style="color: #65677F" />
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
        <q-btn v-if="listConfig.descriptiveAnswer"
               flat
               role="presentation"
               class="no-padding"
               :icon-right="descriptiveAnswerExpanded ? 'isax:arrow-up-2' : 'isax:arrow-down-1'"
               @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded">
          <template v-slot:default>
            <span v-if="descriptiveAnswerExpanded"
                  class="q-pr-sm">
              بستن پاسخ تشریحی
            </span>
            <div v-else
                 class="q-pr-sm">
              <span class="xs-hide">نمایش </span>
              <span> پاسخ تشریحی</span>
            </div>
          </template>
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
  <q-dialog v-model="reportProblemDialog.show">
    <q-card flat
            class="report-problem-dialog">
      <q-btn v-close-popup
             flat
             round
             dense
             icon="close"
             class="close-btn" />
      <div class="title-style text-center">گزارش خطا</div>
      <q-card-section class="problem-type no-padding">
        <div class="title-style">
          نوع خطا
        </div>
        <q-select v-model="reportProblemDialog.problemType"
                  filled
                  dense
                  dropdown-icon="isax:arrow-down-1"
                  :options="reportProblemDialog.problems"
                  label="پاسخ نادرست" />
      </q-card-section>
      <q-card-section class="problem-description no-padding">
        <div class="title-style">
          توضیحات
        </div>
        <q-input v-model="reportProblemDialog.description"
                 filled
                 solo
                 type="textarea" />
      </q-card-section>
      <q-card-actions class="action-box no-padding">
        <q-btn v-close-popup
               unelevated
               label="انصراف"
               class="cancel question-item-button" />
        <q-btn v-close-popup
               unelevated
               label="ثبت"
               color="primary"
               class="question-item-button" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { Question } from 'src/models/Question'
import question from './Question'
import VideoPlayer from 'components/VideoPlayer'
import VueKatex from 'components/VueKatex'

export default {
  name: 'QuestionItem',
  components: { VueKatex, question, VideoPlayer },
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
      questionLevel: 2,
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
          level: 1,
          class: 'easy',
          title: 'آسان'
        },
        // 2: {
        //   level: 3,
        //   class: 'easy',
        //   title: 'آسان'
        // },
        2: {
          level: 2,
          class: 'medium',
          title: 'متوسط'
        },
        // 3: {
        //   level: 2,
        //   class: 'medium',
        //   title: 'متوسط'
        // },
        3: {
          level: 3,
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
      this.questionLevel = this.question.level
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

<style lang="scss" scoped>
.question-card {
  padding: 24px;

  .question-card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .question-titles {
      display: flex;
      flex-direction: row;
      align-items: center;

      .question-card-chip {
        display: flex;

        .chip-dynamic-text {
          padding-left: 8px;
        }
      }

      .question-tags {
        display: flex;
        flex-direction: row;
        margin-left: 24px;

        .tag {
          display: flex;
          flex-direction: row;
          align-items: center;

          .tag-circle {
            border-radius: 50%;
            margin: 0 6px;
            width: 6px;
            height: 6px;
            background: #65677F;
            opacity: 0.3;
          }

          &:last-child {
            .tag-circle {
              display: none;
            }
          }

        }
      }
    }

    .question-details {
      display: flex;
      flex-direction: row;
      align-items: center;

      .question-level {
        display: flex;

        .level-content,
        .level-skeleton {
          display: flex;

          .level-text {
            margin-right: 10px;
          }

          .level-circles {
            display: flex;
            flex-direction: row;
            margin-right: 5px;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            background: #F4F5F6;

            &.easy {
              background: #8ED6FF;
            }

            &.medium {
              background: #FFCA28;
            }

            &.hard {
              background: #DA5F5C;
            }
          }
        }
      }

      .question-source {
        margin-left: 55px;

        .source-content,
        .source-skeleton {
          display: flex;

          .source-text {
            .source-date {
              text-align: end;
            }
          }

          .source-avatar {
            margin-left: 10px;
            display: flex;
            align-items: center;
          }
        }

      }

      .more-option {
        margin-left: 24px;

        &:deep(.q-btn .q-btn__content) {
          margin: 0;
          width: 28px;
        }
      }
    }

  }

  .question-approved {
    .approved-section {
      margin-right: 5px;
      height: 35px;
      padding: 0 20px;
    }
  }

  .answer-section {
    :deep(.hideExpansionHeader) {
      display: none;
    }
    .answer-content {
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

      &:deep(.q-item__section) {
        &:deep(.q-expansion-item__toggle-icon--rotated) {
          display: none !important;
        }
      }
    }

    &:deep(.q-focus-helper) {
      background: none !important;
    }

    &:deep(.q-item .q-item__section .q-icon) {
      display: none;
    }
  }

  .question-footer-section {
    display: flex;
    justify-content: space-between;

    .edit-add {
      display: flex;

      .question-item-button {
        width: 40px;
        height: 40px;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
        border-radius: 13px;
        margin-right: 10px;
      }
    }

    .rate-report-comment-answer {
      display: flex;

      .rate-report-comment {
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

      &:deep(.q-card__section) {
        padding: 0;
      }
    }

  }
}
</style>
<!--<template>-->
<!--  &lt;!&ndash;    <q-card-section class="question-bank-content">&ndash;&gt;-->
<!--  &lt;!&ndash;      <div class="question-info-section row justify-between full-width">&ndash;&gt;-->
<!--  &lt;!&ndash;        <div class="id-info-section ">&ndash;&gt;-->
<!--  &lt;!&ndash;          <div v-if="listConfig.questionId">&ndash;&gt;-->
<!--  &lt;!&ndash;            <q-skeleton v-if="question.loading" type="text" width="110px" class="q-ml-xs"/>&ndash;&gt;-->
<!--  &lt;!&ndash;            <q-chip v-else class="id-chip q-mr-lg">&ndash;&gt;-->
<!--  &lt;!&ndash;              سوال&ndash;&gt;-->
<!--  &lt;!&ndash;              <span class="id-style q-pl-sm">{{ question.id }}</span>&ndash;&gt;-->
<!--  &lt;!&ndash;            </q-chip>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          <div v-if="listConfig.questionInfo" class="question-info">&ndash;&gt;-->
<!--  &lt;!&ndash;            <div class="info-part" v-for="(item, index) in question.tags.list" :key="index">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-skeleton v-if="question.loading" class="info-title" type="text" width="80px"/>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div v-else class="info-title">&ndash;&gt;-->
<!--  &lt;!&ndash;                {{ item.title }}&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="info-circle-icon" :class="{'last-circle':index === info.length - 1}">&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        <div class="level-and-source">&ndash;&gt;-->
<!--  &lt;!&ndash;          <div v-if="listConfig.questionLevel" class="question-level">&ndash;&gt;-->
<!--  &lt;!&ndash;            <template v-if="question.loading">&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="level">&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-skeleton type="text" width="40px" height="25px" class="q-ml-xs"/>&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-skeleton v-for="item in 3" :key="item" class="level-circles"></q-skeleton>&ndash;&gt;-->
<!--  &lt;!&ndash;            </template>&ndash;&gt;-->
<!--  &lt;!&ndash;            <template v-else>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="level">&ndash;&gt;-->
<!--  &lt;!&ndash;                {{ questionLevelClasses[questionLevel].title }}&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div v-for="item in 3"&ndash;&gt;-->
<!--  &lt;!&ndash;                   :key="item"&ndash;&gt;-->
<!--  &lt;!&ndash;                   class="level-circles"&ndash;&gt;-->
<!--  &lt;!&ndash;                   :class="item === questionLevelClasses[questionLevel].level ?  questionLevelClasses[questionLevel].class : ''"&ndash;&gt;-->
<!--  &lt;!&ndash;              />&ndash;&gt;-->
<!--  &lt;!&ndash;            </template>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          <div v-if=" listConfig.questionSource" class="question-source">&ndash;&gt;-->
<!--  &lt;!&ndash;            <div class="source-name-date">&ndash;&gt;-->
<!--  &lt;!&ndash;              <template v-if="question.loading ">&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-skeleton type="text" class="source-name" width="90px" height="30px"/>&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-skeleton type="text" class="source-date float-right" width="40px" height="20px"/>&ndash;&gt;-->
<!--  &lt;!&ndash;              </template>&ndash;&gt;-->
<!--  &lt;!&ndash;              <template v-else>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="source-name">سازمان سنجش</div>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="source-date">99 - 1400</div>&ndash;&gt;-->
<!--  &lt;!&ndash;              </template>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            <template v-if="question.loading">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-skeleton class="source-avatar"/>&ndash;&gt;-->
<!--  &lt;!&ndash;            </template>&ndash;&gt;-->
<!--  &lt;!&ndash;            <template v-else>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="source-avatar"></div>&ndash;&gt;-->
<!--  &lt;!&ndash;            </template>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          <div v-if="!question.loading" class="more-option">&ndash;&gt;-->
<!--  &lt;!&ndash;            <q-btn v-if="listConfig.menu.show" icon="mdi-dots-vertical no-padding"  flat dense rounded style="color: #65677F">&ndash;&gt;-->
<!--  &lt;!&ndash;              &lt;!&ndash;   &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; &ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-menu class="menu-content">&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-list style="min-width: 100px">&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-item v-if="listConfig.menu.items.deleteQuestionFromDb" clickable class="list-item"&ndash;&gt;-->
<!--  &lt;!&ndash;                          @click="emitAdminActions('deleteQuestion',question.id)">&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section>حذف از پایگاه داده</q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section side>&ndash;&gt;-->
<!--  &lt;!&ndash;                      <q-icon&ndash;&gt;-->
<!--  &lt;!&ndash;                        size="20px"&ndash;&gt;-->
<!--  &lt;!&ndash;                        class="fi fi-rr-delete document"&ndash;&gt;-->
<!--  &lt;!&ndash;                      />&ndash;&gt;-->
<!--  &lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-item v-if="listConfig.menu.items.detachQuestion" clickable&ndash;&gt;-->
<!--  &lt;!&ndash;                          @click="emitAdminActions('detachQuestion',question.id)">&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section>حذف سوال از آزمون</q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section side>&ndash;&gt;-->
<!--  &lt;!&ndash;                      <q-icon&ndash;&gt;-->
<!--  &lt;!&ndash;                        size="20px"&ndash;&gt;-->
<!--  &lt;!&ndash;                        class="fi fi-rr-cross-small icon-style"&ndash;&gt;-->
<!--  &lt;!&ndash;                      />&ndash;&gt;-->
<!--  &lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-item v-if="listConfig.menu.items.copy" clickable&ndash;&gt;-->
<!--  &lt;!&ndash;                          @click="emitAdminActions('copyIdToClipboard',question.id)">&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section>کپی شناسه سوال</q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section side>&ndash;&gt;-->
<!--  &lt;!&ndash;                      <q-icon&ndash;&gt;-->
<!--  &lt;!&ndash;                        size="20px"&ndash;&gt;-->
<!--  &lt;!&ndash;                        class="fi fi-rr-copy"&ndash;&gt;-->
<!--  &lt;!&ndash;                      />&ndash;&gt;-->
<!--  &lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-item tag="label">&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                      <q-item-label>تایید سوال</q-item-label>&ndash;&gt;-->
<!--  &lt;!&ndash;                    </q-item-section>&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-circular-progress&ndash;&gt;-->
<!--  &lt;!&ndash;                      v-if="confirmLoading"&ndash;&gt;-->
<!--  &lt;!&ndash;                      indeterminate&ndash;&gt;-->
<!--  &lt;!&ndash;                      :thickness="0.3"&ndash;&gt;-->
<!--  &lt;!&ndash;                      size="20px"&ndash;&gt;-->
<!--  &lt;!&ndash;                      color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                    />&ndash;&gt;-->
<!--  &lt;!&ndash;                    <q-toggle&ndash;&gt;-->
<!--  &lt;!&ndash;                      v-else&ndash;&gt;-->
<!--  &lt;!&ndash;                      class="menu-toggle"&ndash;&gt;-->
<!--  &lt;!&ndash;                      v-model="confirmQuestion"&ndash;&gt;-->
<!--  &lt;!&ndash;                      @update:model-value="emitAdminActions('confirmQuestion',question)"&ndash;&gt;-->
<!--  &lt;!&ndash;                      color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                    />&ndash;&gt;-->
<!--  &lt;!&ndash;                  </q-item>&ndash;&gt;-->
<!--  &lt;!&ndash;                </q-list>&ndash;&gt;-->
<!--  &lt;!&ndash;              </q-menu>&ndash;&gt;-->
<!--  &lt;!&ndash;            </q-btn>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      <div&ndash;&gt;-->
<!--  &lt;!&ndash;        v-if="question.confirmers.length"&ndash;&gt;-->
<!--  &lt;!&ndash;        class="avatar-section grid-item">&ndash;&gt;-->
<!--  &lt;!&ndash;        تایید شده توسط :&ndash;&gt;-->
<!--  &lt;!&ndash;        <q-chip&ndash;&gt;-->
<!--  &lt;!&ndash;          v-for="(item, index) in question.confirmers"&ndash;&gt;-->
<!--  &lt;!&ndash;          :key="index"&ndash;&gt;-->
<!--  &lt;!&ndash;          color="grey-2">&ndash;&gt;-->
<!--  &lt;!&ndash;          <q-avatar color="grey-5">&ndash;&gt;-->
<!--  &lt;!&ndash;            <q-img :src="item.photo"/>&ndash;&gt;-->
<!--  &lt;!&ndash;          </q-avatar>&ndash;&gt;-->
<!--  &lt;!&ndash;          {{ item.first_name + ' ' + item.last_name }}&ndash;&gt;-->
<!--  &lt;!&ndash;        </q-chip>&ndash;&gt;-->
<!--  &lt;!&ndash;      </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      <div class="question-section">&ndash;&gt;-->
<!--  &lt;!&ndash;        <div v-if="finalApprovalMode" class="add-btn question-index">&ndash;&gt;-->
<!--  &lt;!&ndash;          <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;            unelevated&ndash;&gt;-->
<!--  &lt;!&ndash;            color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;            class="btn-style"&ndash;&gt;-->
<!--  &lt;!&ndash;          >{{question.order}}</q-btn>&ndash;&gt;-->
<!--  &lt;!&ndash;        </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        <div :class="isLtrQuestion() ? 'question-icon order-last' : 'question-icon'"/>&ndash;&gt;-->

<!--  &lt;!&ndash;        <div class="question">&ndash;&gt;-->
<!--  &lt;!&ndash;          <question&ndash;&gt;-->
<!--  &lt;!&ndash;            ref="questionComponent"&ndash;&gt;-->
<!--  &lt;!&ndash;            :question="question"&ndash;&gt;-->
<!--  &lt;!&ndash;          />&ndash;&gt;-->

<!--  &lt;!&ndash;        </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      <div class="choice-section row" :class="isLtrQuestion()? 'ltr-choice-section' : ''">&ndash;&gt;-->

<!--  &lt;!&ndash;      </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      <div class="expansion-section">&ndash;&gt;-->
<!--  &lt;!&ndash;        <q-expansion-item&ndash;&gt;-->
<!--  &lt;!&ndash;          v-if="listConfig.descriptiveAnswer"&ndash;&gt;-->
<!--  &lt;!&ndash;          v-model="descriptiveAnswerExpanded"&ndash;&gt;-->
<!--  &lt;!&ndash;          header-class="hideExpansionHeader"&ndash;&gt;-->
<!--  &lt;!&ndash;        >&ndash;&gt;-->
<!--  &lt;!&ndash;          <div class="answer-section">&ndash;&gt;-->
<!--  &lt;!&ndash;            <div class="answer-description" :class=" false ? 'normal-width' : 'full-width'">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-card flat class="answer-description-card">&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="question-answer-choice">&ndash;&gt;-->
<!--  &lt;!&ndash;                  <span v-if="this.question.choices.getSelected()" class="question-answer-choice-title">&ndash;&gt;-->
<!--  &lt;!&ndash;                     گزینه&ndash;&gt;-->
<!--  &lt;!&ndash;                     {{ this.question.choices.getSelected().getNumberTitle() }}&ndash;&gt;-->
<!--  &lt;!&ndash;                  </span>&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div v-if="question.descriptive_answer" class="question-answer-description">&ndash;&gt;-->
<!--  &lt;!&ndash;                  {{ question.descriptive_answer }}&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;                <p v-else>&ndash;&gt;-->
<!--  &lt;!&ndash;                  پاسخ تشریحی ندارد.&ndash;&gt;-->
<!--  &lt;!&ndash;                </p>&ndash;&gt;-->
<!--  &lt;!&ndash;              </q-card>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            <div v-if="true" class=" answer-description-video">&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="video">&ndash;&gt;-->
<!--  &lt;!&ndash;                &lt;!&ndash;                <video-player/>&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div class="title text-center">&ndash;&gt;-->
<!--  &lt;!&ndash;                پاسخنامه ویدیویی - محمد امین نباخته&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        </q-expansion-item>&ndash;&gt;-->
<!--  &lt;!&ndash;      </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      <template v-if="!question.loading">&ndash;&gt;-->
<!--  &lt;!&ndash;        <div class="actions-section">&ndash;&gt;-->
<!--  &lt;!&ndash;          <div class="edit-add">&ndash;&gt;-->
<!--  &lt;!&ndash;            <div v-if="listConfig.selectQuestion" class="add-btn">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;                unelevated&ndash;&gt;-->
<!--  &lt;!&ndash;                :outline="question.selected"&ndash;&gt;-->
<!--  &lt;!&ndash;                color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                class="btn-style"&ndash;&gt;-->
<!--  &lt;!&ndash;                @click="selectQuestion"&ndash;&gt;-->
<!--  &lt;!&ndash;                :icon="question.selected ? 'isax:minus' : 'isax:add'"/>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            <div v-if="finalApprovalMode" class="add-btn">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;                unelevated&ndash;&gt;-->
<!--  &lt;!&ndash;                icon="isax:arrow-up-2"&ndash;&gt;-->
<!--  &lt;!&ndash;                color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                class="btn-style"&ndash;&gt;-->
<!--  &lt;!&ndash;                @click="changeOrder('up', question)"&ndash;&gt;-->
<!--  &lt;!&ndash;              />&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            <div v-if="finalApprovalMode" class="add-btn">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;                unelevated&ndash;&gt;-->
<!--  &lt;!&ndash;                icon="isax:arrow-down-1"&ndash;&gt;-->
<!--  &lt;!&ndash;                color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                class="btn-style"&ndash;&gt;-->
<!--  &lt;!&ndash;                @click="changeOrder('down', question)"&ndash;&gt;-->
<!--  &lt;!&ndash;              />&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            <div v-if="listConfig.editQuestion" class="edit-btn">&ndash;&gt;-->
<!--  &lt;!&ndash;              <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;                unelevated&ndash;&gt;-->
<!--  &lt;!&ndash;                color="primary"&ndash;&gt;-->
<!--  &lt;!&ndash;                icon="isax:edit-2"&ndash;&gt;-->
<!--  &lt;!&ndash;                class="btn-style"&ndash;&gt;-->
<!--  &lt;!&ndash;                @click="redirectToEditPage"/>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;          <div class="rate-report-comment-answer">&ndash;&gt;-->
<!--  &lt;!&ndash;            <div class="rate-report-comment flex">&ndash;&gt;-->
<!--  &lt;!&ndash;              <div v-if="listConfig.questionRate" class="rating">&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="voters-number">&ndash;&gt;-->
<!--  &lt;!&ndash;                  (90)&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="rate-number">&ndash;&gt;-->
<!--  &lt;!&ndash;                  4.5&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div class="star">&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-icon class="star-icon" name="mdi-star" size="16px"/>&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div v-if="listConfig.questionComment" class="comments">&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-btn flat dense rounded>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <div class="comment-number">19</div>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-icon class="comment-icon" name="isax:message-text" size="16px" style="color: #65677F">&ndash;&gt;-->
<!--  &lt;!&ndash;                  </q-icon>&ndash;&gt;-->
<!--  &lt;!&ndash;                </q-btn>&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              <div v-if="listConfig.reportProblem" class="report">&ndash;&gt;-->
<!--  &lt;!&ndash;                <q-btn flat dense rounded @click="reportProblemDialog.show = true">&ndash;&gt;-->
<!--  &lt;!&ndash;                  <span class="report-title">&ndash;&gt;-->
<!--  &lt;!&ndash;                    گزارش خطا&ndash;&gt;-->
<!--  &lt;!&ndash;                  </span>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <q-icon class="report-icon" name="isax:danger" size="16px" style="color: #65677F"/>&ndash;&gt;-->
<!--  &lt;!&ndash;                </q-btn>&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            </div>&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;            <div&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;              class="show-descriptive"&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;              v-if="listConfig.descriptiveAnswer"&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;              @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded">&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;              {{descriptiveAnswerExpanded?  'بستن پاسخ تشریحی' : 'نمایش پاسخ تشریحی'}}&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;              <q-icon id="toggle-icon" name="isax:arrow-down-1" ></q-icon>&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            &lt;!&ndash;            </div>&ndash;&gt;&ndash;&gt;-->
<!--  &lt;!&ndash;            <q-btn&ndash;&gt;-->
<!--  &lt;!&ndash;              flat&ndash;&gt;-->
<!--  &lt;!&ndash;              role="presentation"&ndash;&gt;-->
<!--  &lt;!&ndash;              class="no-padding"&ndash;&gt;-->
<!--  &lt;!&ndash;              v-if="listConfig.descriptiveAnswer"&ndash;&gt;-->
<!--  &lt;!&ndash;              :icon-right="descriptiveAnswerExpanded? 'isax:arrow-up-2' : 'isax:arrow-down-1'"&ndash;&gt;-->
<!--  &lt;!&ndash;              @click="descriptiveAnswerExpanded = !descriptiveAnswerExpanded"&ndash;&gt;-->
<!--  &lt;!&ndash;            >&ndash;&gt;-->
<!--  &lt;!&ndash;              <template v-slot:default>&ndash;&gt;-->
<!--  &lt;!&ndash;                <span class="q-pr-sm" v-if="descriptiveAnswerExpanded">&ndash;&gt;-->
<!--  &lt;!&ndash;                 بستن پاسخ تشریحی&ndash;&gt;-->
<!--  &lt;!&ndash;                </span>&ndash;&gt;-->
<!--  &lt;!&ndash;                <div v-else class="q-pr-sm" >&ndash;&gt;-->
<!--  &lt;!&ndash;                  <span class="xs-hide">نمایش </span>&ndash;&gt;-->
<!--  &lt;!&ndash;                  <span> پاسخ تشریحی</span>&ndash;&gt;-->
<!--  &lt;!&ndash;                </div>&ndash;&gt;-->
<!--  &lt;!&ndash;              </template>&ndash;&gt;-->
<!--  &lt;!&ndash;            </q-btn>&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--  &lt;!&ndash;        </div>&ndash;&gt;-->
<!--  &lt;!&ndash;      </template>&ndash;&gt;-->
<!--  &lt;!&ndash;    </q-card-section>&ndash;&gt;-->
<!--</template>-->

<!--<style lang="scss" scoped>-->
<!--.question-index {-->
<!--  .q-btn {-->
<!--    border-radius: 10px 0;-->
<!--  }-->
<!--}-->
<!--#toggle-icon{-->
<!--  animation: mymove 2s infinite;-->
<!--}-->
<!--@keyframes mymove {-->
<!--  50% {transform: rotate(180deg);}-->
<!--}-->
<!--.test {-->
<!--  background: #6ea5dc;-->
<!--}-->

<!--.test3 {-->
<!--  background: #e1246c;-->
<!--}-->

<!--.test2 {-->
<!--  background: #efe471;-->
<!--}-->

<!--.selected {-->
<!--  background: #F4F5F6;-->
<!--  box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.3), -1px -1px 2px rgba(112, 108, 161, 0.05), inset -8px 8px 20px rgba(112, 108, 161, 0.1), inset 8px -8px 20px rgba(112, 108, 161, 0.1), inset -8px -8px 10px rgba(255, 255, 255, 0.9), inset 8px 8px 13px rgba(112, 108, 161, 0.15) #{"/* rtl:ignore */"} !important;-->
<!--  border-radius: 20px;-->
<!--}-->

<!--.custom-card {-->
<!--  margin-bottom: 16px-->
<!--}-->

<!--.question-bank-content {-->
<!--  padding: 24px 32px;-->

<!--  .question-info-section {-->
<!--    .id-info-section {-->
<!--      display: flex;-->

<!--      .question-info {-->
<!--        display: flex;-->

<!--        .info-part {-->
<!--          display: flex;-->
<!--          align-items: center;-->
<!--          height: 22px;-->

<!--          .info-title {-->
<!--            font-weight: 400;-->
<!--            font-size: 12px;-->
<!--            line-height: 21px;-->
<!--            color: #23263B;-->
<!--          }-->

<!--          .info-circle-icon {-->
<!--            border-radius: 50%;-->
<!--            margin: 0 6px;-->
<!--            width: 6px;-->
<!--            height: 6px;-->
<!--            background: #65677F;-->
<!--            opacity: 0.3;-->
<!--          }-->

<!--          .last-circle {-->
<!--            display: none;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    .level-and-source {-->
<!--      display: flex;-->

<!--      .question-level {-->
<!--        margin-right: 60px;-->
<!--        display: flex;-->

<!--        .level {-->
<!--          margin-right: 10px;-->
<!--          font-style: normal;-->
<!--          font-weight: 400;-->
<!--          font-size: 12px;-->
<!--          line-height: 21px;-->
<!--          text-align: right;-->
<!--          color: #23263B;-->
<!--        }-->

<!--        .level-circles {-->
<!--          margin-right: 5px;-->
<!--          border-radius: 50%;-->
<!--          width: 20px;-->
<!--          height: 20px;-->
<!--          background: #F4F5F6;-->
<!--        }-->

<!--        .easy {-->
<!--          background: #8ED6FF;-->
<!--        }-->

<!--        .medium {-->
<!--          background: #FFCA28;-->
<!--        }-->

<!--        .hard {-->
<!--          background: #DA5F5C;-->
<!--        }-->
<!--      }-->

<!--      .question-source {-->
<!--        display: flex;-->
<!--        align-items: center;-->
<!--        margin-top: -8px;-->

<!--        .source-name-date {-->
<!--          margin-right: 10px;-->
<!--          text-align: end;-->
<!--          font-style: normal;-->
<!--          font-weight: 400;-->
<!--          font-size: 12px;-->
<!--          line-height: 21px;-->
<!--          color: #23263B;-->
<!--        }-->

<!--        .source-avatar {-->
<!--          width: 36px;-->
<!--          height: 36px;-->
<!--          border-radius: 50%;-->
<!--          background-color: #9690E4;-->
<!--        }-->
<!--      }-->

<!--      .more-option {-->
<!--        margin-left: 19px;-->

<!--        .menu-content {-->
<!--          .menu-toggle {-->
<!--            margin-left: -10px-->
<!--          }-->

<!--          .list-item {-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .question-section {-->
<!--    display: flex;-->
<!--    margin-top: 25px;-->

<!--    .question-icon {-->
<!--      margin: 7px 10px 0 10px;-->
<!--      width: 10px;-->
<!--      height: 10px;-->
<!--      background: #9690E4;-->
<!--      border-radius: 3px;-->
<!--    }-->

<!--    .question {-->
<!--      width: 100%;-->
<!--      font-size: 14px;-->
<!--      line-height: 24px !important;-->
<!--      color: #23263B;-->
<!--    }-->
<!--  }-->

<!--  .choice-section.row.ltr-choice-section {-->
<!--    direction: ltr #{"/* rtl:ignore */"} !important;-->
<!--  }-->

<!--  .choice-section {-->
<!--    padding: 4px 0 0 10px;-->
<!--    margin-bottom: 40px;-->

<!--    .choice-column {-->
<!--      display: flex;-->
<!--      align-items: center;-->

<!--      .answer-text {-->
<!--        align-items: center;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .answer-section {-->
<!--    padding: 24px 10px;-->
<!--    display: flex;-->

<!--    .answer-description {-->
<!--      .answer-description-card {-->
<!--        padding: 24px;-->
<!--        font-style: normal;-->
<!--        font-weight: 400;-->
<!--        font-size: 14px;-->
<!--        line-height: 24px;-->
<!--        color: #23263B;-->
<!--        background: #F4F5F6;-->
<!--        border-radius: 20px;-->

<!--        .question-answer-choice {-->
<!--          margin-bottom: 10px;-->

<!--          .question-answer-choice-title {-->
<!--            padding: 0 10px;-->
<!--            font-style: normal;-->
<!--            font-weight: 400;-->
<!--            font-size: 14px;-->
<!--            line-height: 24px;-->
<!--            color: #FFFFFF;-->
<!--            background: #4CAF50;-->
<!--            border-radius: 12px;-->
<!--          }-->
<!--        }-->

<!--      }-->

<!--      .normal-width {-->
<!--        width: calc(100% - 336px);-->
<!--      }-->

<!--      .full-width {-->
<!--        width: 100%;-->
<!--      }-->
<!--    }-->

<!--    .answer-description-video {-->
<!--      .video {-->
<!--        margin: 0 0 0 16px;-->
<!--        min-width: 320px;-->
<!--        height: 180px;-->
<!--        background: #F4F5F6;-->
<!--        border-radius: 20px;-->
<!--      }-->

<!--      .title {-->
<!--        padding-top: 8px;-->
<!--        padding-left: 10px;-->
<!--        font-style: normal;-->
<!--        font-weight: 400;-->
<!--        font-size: 14px;-->
<!--        line-height: 24px;-->
<!--        color: #23263B;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .actions-section {-->
<!--    display: flex;-->
<!--    justify-content: space-between;-->

<!--    .edit-add {-->
<!--      .btn-style {-->
<!--        width: 40px;-->
<!--        height: 40px;-->
<!--        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);-->
<!--        border-radius: 13px;-->
<!--      }-->
<!--      display: flex;-->

<!--      .add-btn {-->
<!--        margin-right: 16px;-->
<!--      }-->
<!--    }-->

<!--    .rate-report-comment-answer {-->
<!--      display: flex;-->
<!--      .rate-report-comment{-->
<!--        display: flex;-->
<!--        .rating {-->
<!--          display: flex;-->
<!--          align-items: center;-->
<!--          margin-right: 24px;-->

<!--          .voters-number {-->
<!--            margin-top: 1px;-->
<!--            font-style: normal;-->
<!--            font-weight: 400;-->
<!--            font-size: 10px;-->
<!--            line-height: 17px;-->
<!--            color: #65677F;-->
<!--            opacity: 0.5;-->
<!--          }-->

<!--          .rate-number {-->
<!--            margin: 1px 0 0 2px;-->
<!--            font-style: normal;-->
<!--            font-weight: 400;-->
<!--            font-size: 12px;-->
<!--            line-height: 21px;-->
<!--            text-align: center;-->
<!--            color: #65677F;-->
<!--          }-->

<!--          .star {-->
<!--            .star-icon {-->
<!--              margin: 0 0 4px 6px;-->
<!--              color: #FFCA28;-->
<!--            }-->
<!--          }-->
<!--        }-->

<!--        .comments {-->
<!--          display: flex;-->
<!--          align-items: center;-->
<!--          margin-right: 24px;-->

<!--          .comment-number {-->
<!--            font-size: 12px;-->
<!--            color: #65677F;-->
<!--          }-->

<!--          .comment-icon {-->
<!--            margin: 0 0 2px 5px;-->
<!--          }-->
<!--        }-->

<!--        .report {-->
<!--          display: flex;-->
<!--          align-items: center;-->
<!--          margin-right: 41px;-->

<!--          .report-title {-->
<!--            font-style: normal;-->
<!--            font-weight: 400;-->
<!--            font-size: 12px;-->
<!--            line-height: 21px;-->
<!--            color: #65677F;-->
<!--          }-->

<!--          .report-icon {-->
<!--            margin: 0 0 3px 7px;-->
<!--          }-->
<!--        }-->
<!--        .show-descriptive{-->

<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.report-problem-dialog {-->
<!--  position: relative;-->

<!--  .close-btn {-->
<!--    position: absolute;-->
<!--    top: 12px;-->
<!--    left: 12px;-->
<!--    z-index: 1000000;-->
<!--  }-->

<!--  border-radius: 15px;-->
<!--  padding: 24px;-->

<!--  .title-style {-->
<!--    font-weight: 500;-->
<!--    font-size: 16px;-->
<!--    line-height: 28px;-->
<!--    color: #23263B;-->
<!--    margin-bottom: 8px;-->
<!--  }-->

<!--  .problem-type {-->
<!--    margin-top: 10px;-->
<!--    width: 300px;-->
<!--  }-->

<!--  .problem-description {-->
<!--    margin-top: 16px;-->
<!--  }-->

<!--  .action-box {-->
<!--    margin-top: 20px;-->

<!--    .btn-style {-->
<!--      border-radius: 10px;-->
<!--      color: #23263B;-->
<!--      width: 96px;-->
<!--      height: 40px;-->
<!--    }-->

<!--    .cancel {-->
<!--      background-color: #F4F5F6;-->
<!--    }-->
<!--  }-->
<!--}-->

<!--@media only screen and (max-width: 1919px) {-->
<!--  .question-bank-content {-->
<!--    .question-info-section {-->
<!--      position: relative;-->

<!--      .id-info-section {-->
<!--        flex-direction: column;-->

<!--        .id-chip {-->
<!--          margin-bottom: 20px;-->
<!--        }-->
<!--      }-->

<!--      .level-and-source {-->
<!--        position: absolute;-->
<!--        top: 0;-->
<!--        right: 0;-->
<!--      }-->
<!--    }-->

<!--    .answer-section {-->
<!--      padding: 24px 10px;-->
<!--      display: flex;-->

<!--      .answer-description {-->
<!--        .answer-description-card {-->
<!--          padding: 24px;-->
<!--          font-style: normal;-->
<!--          font-weight: 400;-->
<!--          font-size: 14px;-->
<!--          line-height: 24px;-->
<!--          color: #23263B;-->
<!--          background: #F4F5F6;-->
<!--          border-radius: 20px;-->

<!--          .question-answer-choice {-->
<!--            margin-bottom: 10px;-->

<!--            .question-answer-choice-title {-->
<!--              padding: 0 10px;-->
<!--              font-style: normal;-->
<!--              font-weight: 400;-->
<!--              font-size: 14px;-->
<!--              line-height: 24px;-->
<!--              color: #FFFFFF;-->
<!--              background: #4CAF50;-->
<!--              border-radius: 12px;-->
<!--            }-->
<!--          }-->

<!--        }-->

<!--        .normal-width {-->
<!--          width: calc(100% - 260px);-->
<!--        }-->

<!--        .full-width {-->
<!--          width: 100%;-->
<!--        }-->
<!--      }-->

<!--      .answer-description-video {-->
<!--        .video {-->
<!--          margin: 0 0 0 20px;-->
<!--          min-width: 240px;-->
<!--          height: 135px;-->
<!--        }-->

<!--        .title {-->
<!--          padding-top: 10px;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--@media only screen and (max-width: 1920px) {-->

<!--}-->

<!--@media only screen and (max-width: 1023px) {-->
<!--  .question-bank-content {-->
<!--    padding: 20px 16px;-->

<!--    .question-info-section {-->
<!--      .id-info-section {-->
<!--        .id-chip {-->
<!--        }-->
<!--      }-->

<!--      .level-and-source {-->
<!--        .question-level {-->
<!--          margin-right: 16px;-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--    .actions-section {-->
<!--      .edit-add{-->
<!--        .add-btn{-->
<!--          margin-right: 12px;-->
<!--        }-->
<!--      }-->
<!--      .rate-report-comment-answer {-->
<!--        .rate-report-comment{-->
<!--          .rating{-->
<!--            margin-right: 16px;-->
<!--          }-->
<!--          .comments{-->
<!--            margin-right: 17px;-->
<!--          }-->
<!--          .report{-->
<!--            margin-right: 27px;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--@media only screen and (max-width: 599px) {-->
<!--  .question-bank-content {-->
<!--    .choice-section{-->
<!--      margin-bottom: 18px;-->
<!--    }-->
<!--    .answer-section {-->
<!--      padding: 24px 10px;-->
<!--      display: flex;-->

<!--      .answer-description {-->
<!--        .answer-description-card {-->
<!--          .question-answer-choice {-->
<!--            margin-bottom: 10px;-->
<!--          }-->
<!--        }-->

<!--        .normal-width {-->
<!--          width: calc(100% - 286px);-->
<!--        }-->

<!--        .full-width {-->
<!--          width: 100%;-->
<!--        }-->
<!--      }-->

<!--      .answer-description-video {-->
<!--        .video {-->
<!--          margin: 0 0 0 20px;-->
<!--          min-width: 286px;-->
<!--          height: 161px;-->
<!--        }-->

<!--        .title {-->
<!--          padding-top: 12px;-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    .question-info-section {-->
<!--      .id-info-section {-->
<!--        .id-chip {-->
<!--          max-width: 109px;-->

<!--          .id-style {-->
<!--            overflow: hidden;-->
<!--            text-overflow: ellipsis;-->
<!--          }-->
<!--        }-->

<!--        .question-info {-->
<!--          flex-direction: column;-->

<!--          .info-part {-->
<!--            .info-title {-->
<!--              order: 2;-->
<!--            }-->

<!--            .last-circle {-->
<!--              display: block;-->
<!--            }-->
<!--          }-->
<!--        }-->
<!--      }-->

<!--      .level-and-source {-->
<!--        justify-content: flex-end;-->
<!--        flex-wrap: wrap;-->
<!--        .question-level {-->
<!--          margin-right: 16px;-->
<!--        }-->

<!--        .question-source {-->
<!--          margin-top:10px;-->
<!--          order: 3;-->
<!--          width: 100%;-->
<!--          justify-content: flex-end;-->

<!--          .source-name-date {-->
<!--            margin-right: 4px;-->
<!--          }-->
<!--        }-->
<!--        .more-option{-->
<!--          margin-left: 0;-->
<!--        }-->
<!--      }-->
<!--    }-->

<!--    .actions-section {-->
<!--      position: relative;-->
<!--      .edit-add{-->
<!--        position: absolute;-->
<!--        bottom: 0;-->
<!--        .add-btn{-->
<!--          margin-right: 11px;-->
<!--        }-->
<!--      }-->
<!--      .rate-report-comment-answer {-->
<!--        width: 100%;-->
<!--        justify-content: flex-end;-->
<!--        flex-wrap: wrap;-->
<!--        .rate-report-comment{-->
<!--          justify-content: flex-end;-->
<!--          width: 100%;-->
<!--          margin-bottom: 6px;-->
<!--          .report{-->
<!--            margin-right: 1px;-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--</style>-->

<!--<style lang="scss">-->
<!--.expansion-section {-->
<!--  .q-item.q-item-type.row.no-wrap.q-item&#45;&#45;clickable.q-link.cursor-pointer.q-focusable.q-hoverable.hideExpansionHeader {-->
<!--    display: none;-->
<!--  }-->
<!--}-->
<!--</style>-->
