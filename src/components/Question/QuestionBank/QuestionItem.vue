<template>
  <q-card class="theme-v1-box-shadow">
    <q-card-section class="question-bank-content">
      <div class="question-info-section">
        <div class="number-and-info">
          <div class="question-number">
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
          <div class="question-info">
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
          <div class="question-level">
            <template v-if="question.loading">
              <div class="level">
                <q-skeleton type="text" width="40px" height="25px" class="q-ml-xs"/>
              </div>
              <q-skeleton v-for="item in 3" :key="item" class="level-circles"></q-skeleton>
            </template>
            <template v-else>
              <div v-if="questionLvl === 1" class="level">
                آسان
              </div>
              <div v-if="questionLvl === 2" class="level">
                متوسط
              </div>
              <div v-if="questionLvl === 3" class="level">
                سخت
              </div>
              <div class="level-circles" :class="{'hard' : questionLvlHard}"></div>
              <div class="level-circles" :class="{'medium' : questionLvlMedium}"></div>
              <div class="level-circles" :class="{'easy' : questionLvlEasy}"></div>
            </template>
          </div>
          <div class="question-source">
            <div class="source-name-date">
              <template v-if="question.loading">
                <q-skeleton type="text" class="source-name" width="90px" height="30px"/>
                <q-skeleton type="text" class="source-date float-right" width="40px" height="20px"/>
              </template>
              <template v-else>
                <div class="source-name">سازمان سنجش</div>
                <div class="source-date">99-1400</div>
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
            <q-btn flat dense rounded style="color: #65677F">
              <q-icon name="mdi-dots-vertical"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="question-section">
        <div class="question-icon"></div>
        <div class="question">
          <template v-if="question.loading">
            <q-skeleton type="text" width="99%" height="30px"/>
            <q-skeleton type="text" width="99%" height="30px"/>
            <q-skeleton type="text" width="50%" height="30px"/>
            <q-skeleton width="30%" height="200px" style="border-radius: 10px"/>
          </template>
          <template v-else>
            <vue-katex :input="question.statement" />
          </template>
        </div>
      </div>
      <div class="choice-section row">
        <template v-if="question.loading">
          <div class="choice-column col-3" v-for="item in 4" :key="item">
            <div class="choice false" style="margin-bottom: 2px">
              {{ item }}
            </div>
            <q-skeleton type="text" width="100px" height="25px"/>
          </div>
        </template>
        <template v-else>
          <div class="choice-column col-3" v-for="(item , index) in question.choices.list" :key="index">
            <div
              v-if="item.answer === false"
              class="choice false"
            >
              {{ item.order }}
            </div>
            <div
              v-if="item.answer === true"
              class="choice true"
            >
              {{ item.order }}
            </div>
            <div class="answer-text">
              <vue-katex :input="item.title"/>
            </div>
          </div>
        </template>
      </div>
      <template v-if="!question.loading">
        <div class="question-actions-container">
          <q-expansion-item
            expand-icon-toggle
            expand-icon="isax:arrow-down-1"
          >
            <template v-slot:header>
              <div class="question-actions">
                <div class="edit-and-add">
                  <div class="add-btn">
                    <q-btn flat class="edit-and-add-btn">
                      <q-icon name="isax:add"></q-icon>
                    </q-btn>
                  </div>
                  <div class="edit-btn">
                    <q-btn flat class="edit-and-add-btn">
                      <q-icon name="isax:edit-2"></q-icon>
                    </q-btn>
                  </div>
                </div>
                <div class="question-actions-content">
                  <div class="question-actions-btn">
                    <div class="rating">
                      <div class="voters-number">
                        (90)
                      </div>
                      <div class="rate-number">
                        4.5
                      </div>
                      <div class="star">
                        <q-icon class="star-icon" name="mdi-star" size="16px"></q-icon>
                      </div>
                    </div>
                    <div class="comments">
                      <q-btn flat dense rounded>
                        <div class="comment-number">19</div>
                        <q-icon class="comment-icon" name="isax:message-text" size="16px" style="color: #65677F">
                        </q-icon>
                      </q-btn>
                    </div>
                    <div class="report">
                      <q-btn flat dense rounded>
                        <div class="report-title">
                          گزارش خطا
                        </div>
                        <q-icon class="report-icon" name="isax:danger" size="16px" style="color: #65677F"></q-icon>
                      </q-btn>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <q-card>
              <q-card-section class="answer-section">
                <div class="row">
                  <div class="answer-description col-8">
                    <q-card flat class="answer-description-card">
                      <q-card-section class="answer-description-content">
                        <div class="question-answer-choice">
                      <span v-if="trueChoice" class="question-answer-choice-title">
                        گزینه
                        {{ trueChoice.getOrderTitle() }}
                      </span>
                        </div>
                        <div class="question-answer-description">
                          {{ question.answer }}
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="answer-description-video col-4">
                    <div class="video"></div>
                    <div class="title">
                      پاسخنامه ویدیویی - محمد امین نباخته
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </template>
    </q-card-section>
  </q-card>
</template>

<script>
import VueKatex from 'components/VueKatex'
import { Question } from 'src/models/Question'

export default {
  name: 'QuestionItem',
  components: { VueKatex },
  props: {
    question: {
      type: Question,
      default: new Question()
    }
  },
  data () {
    return {
      questionLvlHard: false,
      questionLvlMedium: false,
      questionLvlEasy: false,
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
      ]
    }
  },
  created () {
    if (this.questionLvl === 1) {
      this.questionLvlEasy = true
    } else if (this.questionLvl === 2) {
      this.questionLvlMedium = true
    } else {
      this.questionLvlHard = true
    }
  },
  computed: {
    trueChoice () {
      return this.question.choices.getSelected()
    },
    questionLvl () {
      return this.question.inputData.level
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" >
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
          background: #FFCA28 ;
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
      }
    }
  }

  .question-section {
    display: flex;
    margin-top: 33px;

    .question-icon {
      margin-top: 7px;
      margin-right: 10px;
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

  .choice-section {
    padding: 20px 0 0 20px;
    margin-bottom: 45px;

    .choice-column {
      display: flex;
      align-items: center;
      .answer-text {
        align-items: center;
      }
      .choice {
        margin-bottom: 16px;
        margin-right: 10px;
        border-radius: 50%;
        text-align: center;
        color: #ffffff;
        width: 20px;
        height: 20px;
        background: #9690E4;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
      }
      .false {
        background: #9690E4;
      }

      .true {
        background: #4CAF50;
      }
    }
  }

  .answer-section {
    padding: 24px 10px;
    .answer-description {
      .answer-description-card {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 24px;
        color: #23263B;
        background: #F4F5F6;
        border-radius: 20px;
        .answer-description-content {
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
      }
    }
    .answer-description-video {
      padding: 0 0 0 16px;
      .video {
        width: 320px;
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

  .question-actions-container{
    .q-item-type{
      justify-content: space-between;
    }
    .q-expansion-item--collapsed{
      .q-item__section {
        display: flex;
        flex-direction: row;
        align-items: center;
        &:before{
          content: 'نمایش پاسخ تشریحی';
        }
        i{
          margin-top: 0;
          margin-left: 10px;
        }
        .q-expansion-item__toggle-focus{
          display: none;
        }
      }
    }
    .q-expansion-item--expanded {
      .q-item__section {
        display: flex;
        flex-direction: row;
        align-items: center;
        &:before{
          content: 'بستن پاسخ تشریحی';
        }
        i{
          margin-top: 0;
          margin-left: 10px;
        }
        .q-expansion-item__toggle-focus{
          display: none;
        }
      }
    }
    .question-actions {
      display: flex;
      justify-content: space-between;
      width: 870px;

      .edit-and-add {
        display: flex;

        .add-btn {
          margin-right: 16px;
        }
      }

      .question-actions-content {
        display: flex;
        margin-top: 5px;
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
            margin-right: 30px;

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
.question-bank-pagination{
  .q-btn--actionable{
    width: 35px;
    height: 35px;
    background: #FFFFFF;
    border-radius: 12px;
    margin-right: 3px;
  }
}
</style>

<style scoped>
.edit-and-add-btn {
  width: 40px;
  height: 40px;
  background: #9690E4;
  color: #ffffff;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 13px;
}
</style>
