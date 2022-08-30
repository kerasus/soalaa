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
import VueKatex from 'src/components/VueKatex'
import question from './Question'
import VideoPlayer from 'src/components/VideoPlayer'
import { Question } from 'src/models/Question'

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
