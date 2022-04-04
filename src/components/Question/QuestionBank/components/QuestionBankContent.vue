<template>
  <q-card class="theme-v1-box-shadow">
    <q-card-section class="question-bank-content">
      <div class="question-info-section">
        <div class="number-and-info">
          <div class="question-number">
            <div class="question-number-title">
              سوال 123456789
            </div>
          </div>
          <div class="question-info">
            <div class="info-part" v-for="(item, index) in info" :key="index">
              <div class="info-title">
                {{ item.name }}
              </div>
              <div class="info-circle-icon" v-if="index !== info.length - 1">
              </div>
            </div>
          </div>
        </div>
        <div class="level-and-source">
          <div class="question-level">
            <div class="level">
              آسان
            </div>
            <div class="level-circles" v-for="item in 3" :key="item">
            </div>
          </div>
          <div class="question-source">
            <div class="source-name-date">
              <div class="source-name">سازمان سنجش</div>
              <div class="source-date">99-1400</div>
            </div>
            <div class="source-avatar"></div>
          </div>
          <div class="more-option">
            <q-btn flat dense rounded style="color: #65677F">
              <q-icon name="mdi-dots-vertical"></q-icon>
            </q-btn>
          </div>
        </div>
      </div>
      <div class="question-section">
        <div class="question-icon"></div>
        <div class="question">
          <vue-katex :input="hh.data.statement" />
        </div>
      </div>
      <div class="choice-section row">
        <div class="choice-column col-3" v-for="(item, index) in hh.data.choices" :key="index">
          <div v-ripple="{background: '#4CAF50'}" :class="'choice choice-' + index+1 + ' relative-position'" :style="choiceClickedStyle" @click="choiceClicked">{{ index + 1 }}</div>
          <div class="answer-text">
            <vue-katex :input="item.title" />
          </div>
        </div>
      </div>
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
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
            commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
      </div>
    </q-card-section>
  </q-card>
  <div class=" question-bank-pagination q-pa-lg flex flex-center">
    <q-pagination
      active-color="primary"
      outline
      direction-links
      v-model="choiceClickedStyle"
      color="black"
      :max="10"
      :max-pages="6"
      boundary-numbers
    />
  </div>
</template>

<script>
import VueKatex from 'components/VueKatex'
export default {
  name: 'QuestionBankContent',
  components: { VueKatex },
  data () {
    return {
      choiceClickedStyle: null,
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
      question: '',
      hh: {
        data: {
          id: '621ef885b641336a1a63e827',
          statement: '<p dir="auto">با توجه به شکل مقابل، حاصل$(A-B)-(C\\cup B)$کدام است؟</p><p dir="auto"><span style="display: inline-block; height: 209px;"><img src="https://nodes.alaatv.com/aaa/questionPhotos/Screenshot%202022-03-02%20124323-4377851.jpg" width="238" height="209" style="margin-bottom: -1px;"></span></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto" style="text-align: right">${}{}{}{}{}\\lbrace1\\enspace,\\enspace2\\rbrace$</p>',
              answer: true,
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto" style="text-align: right">$\\lbrace1\\enspace,\\enspace2\\enspace,\\enspace5\\rbrace$</p>',
              answer: false,
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto" style="text-align: right">$\\lbrace1\\enspace,\\enspace2\\enspace,\\enspace4\\rbrace$</p>',
              answer: false,
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto" style="text-align: right">$\\lbrace1\\enspace,\\enspace2\\enspace,\\enspace3\\rbrace$</p>',
              answer: false,
              order: 4
            }
          ],
          exams: [
            {
              sub_category: {
                id: '60b7875428f350277f04c5f9',
                title: 'ریاضی',
                category_id: '60b7858d743940688b23c7f4'
              },
              exam_id: '621ef66118e75a12f147e6ad',
              order: 1,
              exam: {
                id: '621ef66118e75a12f147e6ad',
                title: 'پاورتست ریاضی دهم',
                holding_status: null,
                start_at: '2022-02-20 08:14:00',
                finish_at: '2022-05-21 08:14:00',
                photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
                delay_time: 50,
                n_questions: 352,
                enable: false,
                updated_at: '2022-03-02 14:48:39',
                created_at: '2022-03-02 08:15:21',
                generate_questions_automatically: null,
                confirm: false,
                report_config: [],
                holding_config: {
                  randomize_questions: false
                },
                alaa_product_link: null,
                type: {
                  id: '6225f4828044517f52500c02',
                  type: 'exam_type',
                  value: 'konkur',
                  updated_at: '2022-03-07 15:33:14',
                  created_at: '2022-03-07 15:33:14'
                },
                user_exam_id: null,
                is_free: null,
                is_register_open: false,
                is_open: false
              }
            }
          ],
          level: 1,
          photos: [
            'https://nodes.alaatv.com/test/questionPhotos/Screenshot%202022-03-02%20124323-4377851.jpg'
          ],
          author: [],
          confirmers: [],
          confirmed: false,
          descriptive_answer: '<p dir="auto">$C\\cup B=\\lbrace3\\enspace,\\enspace4\\enspace,\\enspace5\\enspace,\\enspace6\\enspace,\\enspace7\\enspace,\\enspace8\\enspace,\\enspace9\\rbrace\\enspace,\\enspace A-B=\\lbrace1\\enspace,\\enspace2\\enspace,\\enspace5\\rbrace$</p><p dir="auto">$\\Rightarrow(A-B)-(C\\cup B)=\\lbrace1\\enspace,\\enspace2\\enspace,\\enspace5\\rbrace-\\lbrace3\\enspace,\\enspace4\\enspace,\\enspace5\\enspace,\\enspace6\\enspace,\\enspace7\\enspace,\\enspace8\\enspace,\\enspace9\\rbrace=\\lbrace1\\enspace,\\enspace2\\rbrace$</p>',
          statement_photo: [
            'https://nodes.alaatv.com/test/questionStatements/621ef885b641336a1a63e827/4-9215387.png'
          ],
          answer_photos: [
            'https://nodes.alaatv.com/test/questionStatements/621ef885b641336a1a63e827/4-5219480.jpg'
          ],
          status: {
            id: '60c7102418e65826bc7da378',
            title: 'typed',
            display_title: 'تایپ شده',
            updated_at: '2021-06-14 12:45:32',
            created_at: '2021-06-14 12:45:32'
          },
          type: {
            value: 'konkur'
          },
          tags: null,
          updated_at: '2022-03-02 12:43:48',
          created_at: '2022-03-02 08:24:29'
        }
      }
    }
  },
  methods: {
    choiceClicked () {
      this.choiceClickedStyle = {
        background: '#4CAF50'
      }
    }
  },
  computed: {
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
        cursor: pointer;
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
      width: 775px;

      .edit-and-add {
        display: flex;

        .add-btn {
          margin-right: 16px;
        }
      }

      .question-actions-content {
        display: flex;
        margin-top: 9px;
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
