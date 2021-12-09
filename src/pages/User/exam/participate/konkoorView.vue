<template>
  <div class="konkoor-view ">
    <div class="row">
      <div
        id="questions"
        ref="questionsColumn"
        :md="5"
        class="col-md-5 right-side"
        :style="{ height: windowSize.y }"
      >
        <q-virtual-scroll
          ref="scroller"
          :items="questions"
          virtual-scroll-slice-size="70"
        >
          <template v-slot="{ item, index }">
            <q-item
              class="question-field"
              :key="index"
              dense
            >
              <q-item-section>
                <Item
                  :source="item"
                  :questions-column="$refs.questionsColumn"
                  @inView="test"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </div>
      <div class="col-md-7">
        <div
          ref="leftSideList"
          class="row left-side"
        >
          <div class="col bubbleSheet-top">
            <q-btn
              icon="mdi-table-split-cell"
              color="grey"
              flat
              fab-mini
              @click="changeView('alaa')"
            />
            <q-btn-dropdown
              class="dropdown-button"
              icon="account_circle"
              :label="user.full_name "
              color="grey-14"
              dropdown-icon="false"
              flat
            >
              <top-menu/>
            </q-btn-dropdown>
          </div>
          <div class="col bubbleSheet-bottom">
            <BubbleSheet
              :info="{ type: 'pasokh-barg'}"
              :delay-time="0"
              @clickChoice="choiceClicked"
              @scrollTo="scrollTo"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="row timer-row"
    >
      <q-btn
        v-if="false"
        class="end-exam-btn"
        @click="getConfirmation"
      >
        ارسال پاسخنامه
      </q-btn>
      <div
        class="col"
        :class="{ 'high-z-index': timerIsOpen}"
      >
        <Timer
          :daftarche="'عمومی'"
          :quiz-started-at="1607963897"
          :daftarche-end-time="1607999897"
          :height="100"
          @timerOpen="timerOpen"
        />
      </div>
    </div>
  </div>
</template>

<script>
import 'src/assets/scss/markdownKatex.scss'
import Item from 'src/components/OnlineQuiz/Quiz/question/questionField'
import { mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize } from 'src/mixin/Mixins'
import Timer from 'src/components/OnlineQuiz/Quiz/timer/timer'
import BubbleSheet from 'src/components/OnlineQuiz/Quiz/bubbleSheet/bubbleSheet'
import { Exam } from 'src/models/Exam'
// import Assistant from 'src/plugins/assistant'
import TopMenu from 'src/components/Menu/topMenu/onlineQuizTopMenu'
export default {
  name: 'konkoorView',
  components: {
    Timer,
    TopMenu,
    BubbleSheet,
    Item
  },
  mixins: [mixinAuth, mixinQuiz, mixinUserActionOnQuestion, mixinWindowSize],
  data () {
    return {
      user: null,
      quizData: new Exam(),
      item: Item,
      lastTimeScrollRange: { start: 0, end: 29 },
      scrollState: 'not scrolling',
      timePassedSinceLastScroll: 0,
      setIntervalCallback: null,
      renderedQuestions: { startIndex: 0, endIndex: 0 },
      questions: [],
      inView: [],
      timerIsOpen: false
    }
  },
  watch: {
    // 'windowSize.y': function () {
    //   this.setHeights()
    // },
    // 'windowSize.x': function () {
    //   this.$store.commit('AppLayout/updateDrawer', false)
    // }
  },
  created () {
    this.getUser()
    this.questions = [
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      },
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      },
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      },
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      },
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      },
      {
        crud: {
          headers: {}
        },
        apiResource: {
          fields: [
            {
              key: 'statement'
            },
            {
              key: 'descriptive_answer'
            },
            {
              key: 'sub_category_id'
            },
            {
              key: 'exams'
            },
            {
              key: 'type_id'
            },
            {
              key: 'author'
            },
            {
              key: 'choices'
            },
            {
              key: 'recommended_time'
            },
            {
              key: 'level'
            }
          ]
        },
        inputData: {
          id: '61384dc56db5e10cc87251a7',
          statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
          choices: [
            {
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              order: 1
            },
            {
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              order: 2
            },
            {
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              order: 3
            },
            {
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              order: 4
            }
          ],
          exams: [
            '6135be32e0db6947171ef9a0',
            '6135be29e0db6947171ef99d',
            '6135be1ce0db6947171ef998'
          ],
          level: 1,
          photos: [],
          author: [],
          confirmers: [],
          sub_category: {
            id: '60b7875428f350277f04c5e3',
            title: 'ادبیات عمومی',
            category_id: '60b7858d743940688b23c7f3',
            updated_at: '2021-06-02 17:57:48'
          },
          order: 1,
          confirmed: false,
          updated_at: '2021-09-09 08:14:49',
          created_at: '2021-09-08 10:14:37'
        },
        warn: {
          mode: false,
          keys: []
        },
        editMode: false,
        loading: false,
        props: [
          {
            key: 'baseRoute',
            default: '/3a/api/v1/exam-question/attach'
          },
          {
            key: 'id'
          },
          {
            key: '_id'
          },
          {
            key: 'title'
          },
          {
            key: 'index'
          },
          {
            key: 'statement'
          },
          {
            key: 'statement_photo'
          },
          {
            key: 'rendered_statement'
          },
          {
            key: 'in_active_category'
          },
          {
            key: 'photo'
          },
          {
            key: 'order'
          },
          {
            key: 'exams'
          },
          {
            key: 'type_id'
          },
          {
            key: 'author',
            default: []
          },
          {
            key: 'type',
            default: {
              id: null,
              type: null,
              value: null
            }
          },
          {
            key: 'isInView',
            default: false
          },
          {
            key: 'sub_category'
          },
          {
            key: 'sub_category_id'
          },
          {
            key: 'checking_times'
          },
          {
            key: 'logs'
          },
          {
            key: 'answer'
          },
          {
            key: 'answer_photos',
            default: []
          },
          {
            key: 'descriptive_answer'
          },
          {
            key: 'rendered_descriptive_answer'
          },
          {
            key: 'selected_at'
          },
          {
            key: 'choices'
          },
          {
            key: 'status'
          },
          {
            key: 'state',
            default: ''
          },
          {
            key: 'ltr',
            default: false
          },
          {
            key: 'bookmarked',
            default: false
          },
          {
            key: 'lesson'
          },
          {
            key: 'seen',
            default: false
          },
          {
            key: 'recommendedTime',
            default: 0
          },
          {
            key: 'difficulty',
            default: 1
          },
          {
            key: 'creator',
            default: 1
          },
          {
            key: 'confirmed',
            default: false
          },
          {
            key: 'confirmers',
            default: []
          },
          {
            key: 'created_at'
          },
          {
            key: 'updated_at'
          }
        ],
        baseRoute: '/3a/api/v1/exam-question/attach',
        id: '61384dc56db5e10cc87251a7',
        _id: '61384dc56db5e10cc87251a7',
        title: null,
        index: 0,
        statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        statement_photo: null,
        rendered_statement: '<p dir="auto"><strong>در کدام گزینه «شاید» معنای متفاوتی دارد ؟</strong></p>',
        in_active_category: true,
        photo: null,
        order: 1,
        exams: [
          '6135be32e0db6947171ef9a0',
          '6135be29e0db6947171ef99d',
          '6135be1ce0db6947171ef998'
        ],
        type_id: null,
        author: [],
        type: {
          id: null,
          type: null,
          value: null
        },
        isInView: false,
        sub_category: {
          id: '60b7875428f350277f04c5e3',
          title: 'ادبیات عمومی',
          category_id: '60b7858d743940688b23c7f3',
          updated_at: '2021-06-02 17:57:48'
        },
        sub_category_id: null,
        checking_times: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        logs: {
          list: [],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: '/3a/api/v1/activity-log'
        },
        answer: null,
        answer_photos: [],
        descriptive_answer: null,
        rendered_descriptive_answer: null,
        selected_at: null,
        choices: {
          list: [
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 1,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
                order: 1
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 1,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">اگر به باده مشکین دلم کشد شاید</div><div class="mesra">که بوی خیر ز زهد ریا نمی‌آید</div></div></div>',
              active: false,
              answer: false,
              order: 1,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 2,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
                order: 2
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 2,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">2) گر در طلبت رنجی ما را برسد شاید</div><div class="mesra">چون عشق حرم باشد سهل است بیابان‌ها</div></div></div>',
              active: false,
              answer: false,
              order: 2,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 3,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
                order: 3
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 3,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">غمناک نباید بود از طعن حسود ای دل</div><div class="mesra">شاید که چو وابینی خیر تو در این باشد</div></div></div>',
              active: false,
              answer: false,
              order: 3,
              answered_at: null
            },
            {
              crud: {
                headers: {}
              },
              apiResource: null,
              inputData: {
                id: 4,
                title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
                order: 4
              },
              warn: {
                mode: false,
                keys: []
              },
              editMode: false,
              loading: false,
              props: [
                {
                  key: 'id'
                },
                {
                  key: 'title'
                },
                {
                  key: 'rendered_title'
                },
                {
                  key: 'active',
                  default: false
                },
                {
                  key: 'answer',
                  default: false
                },
                {
                  key: 'order'
                },
                {
                  key: 'answered_at'
                }
              ],
              id: 4,
              title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              rendered_title: '<p dir="auto"></p><div><div class="beit"><div class="mesra">حافظ ار میل به ابروی تو دارد شاید</div><div class="mesra">جای در گوشه محراب کنند اهل کلام</div></div></div>',
              active: false,
              answer: false,
              order: 4,
              answered_at: null
            }
          ],
          crud: {
            headers: {}
          },
          loading: false,
          baseRoute: null
        },
        status: {
          crud: {
            headers: {}
          },
          apiResource: null,
          inputData: {},
          warn: {
            mode: false,
            keys: []
          },
          editMode: false,
          loading: false,
          props: [
            {
              key: 'baseRoute',
              default: '/3a/api/v1/question/statuses'
            },
            {
              key: 'id'
            },
            {
              key: 'title'
            },
            {
              key: 'display_title'
            },
            {
              key: 'created_at'
            },
            {
              key: 'updated_at'
            }
          ],
          baseRoute: '/3a/api/v1/question/statuses',
          id: null,
          title: null,
          display_title: null,
          created_at: null,
          updated_at: null
        },
        state: '',
        ltr: true,
        bookmarked: false,
        lesson: null,
        seen: false,
        recommendedTime: 0,
        difficulty: 1,
        creator: 1,
        confirmed: false,
        confirmers: [],
        created_at: '2021-09-08 10:14:37',
        updated_at: '2021-09-09 08:14:49'
      }
    ]
    // const that = this
    // console.log(this.$route.params.quizId)
    // this.startExam(this.$route.params.quizId, 'KonkoorView')
    //   .then(() => {
    //     that.$store.dispatch('loading/overlayLoading', false)
    //   })
    //   .catch((error) => {
    //     Assistant.reportErrors(error)
    //     that.$q.notify({
    //       message: 'مشکلی در دریافت اطلاعات آژمون رخ داده است. لطفا دوباره امتحان کنید.',
    //       type: 'negative'
    //     })
    //   })
    // if (this.windowSize.x > 959) {
    //   this.changeAppBarAndDrawer(false)
    // } else {
    //   this.$router.push({
    //     name: 'onlineQuiz.alaaView',
    //     // TODO --> why 313 ?
    //     params: { quizId: 313, questNumber: this.$route.params.quizId }
    //   })
    // }
    // if (!this.questions.length) {
    //   this.questions = this.getCurrentExamQuestionsInArray()
    // }
    // console.log('qqqqq', this.questions)
  },
  mounted () {
    // this.setHeights()
    // if (this.currentQuestion.id === null) {
    //   this.loadFirstQuestion()
    // }
    // this.scrollTo(this.currentQuestion.id)
    // this.changeAppBarAndDrawer(false)
  },
  unmounted () {
    this.changeAppBarAndDrawer(true)
  },
  methods: {
    getUser () {
      this.user = this.$store.getters['Auth/user']
      return this.user
    },
    timerOpen (value) {
      this.timerIsOpen = value
    },
    getConfirmation () {
      const that = this
      // TODO --> conrim in store should be fix
      this.$store.commit('AppLayout/showConfirmDialog', {
        message: 'از ارسال پاسخ ها اطمینان دارید؟',
        button: {
          no: 'ادامه میدم',
          yes: 'ثبت میکنم'
        },
        callback: (confirm) => {
          if (!confirm) {
            return
          }
          that.sendAnswersAndFinishExam()
        }
      })
    },
    sendAnswersAndFinishExam () {
      const that = this
      this.quiz.sendAnswersAndFinishExam()
        .then(() => {
          that.$store.commit('quiz/clearExamData', that.quiz.id)
          that.$q.notify({
            message: 'اطلاعات آزمون شما ثبت شد.',
            type: 'positive'
          })
          that.$router.push({ name: 'user.exam.list' })
        })
        .catch(() => {
          that.$q.notify({
            title: 'توجه!',
            message: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
            type: 'warning',
            duration: 30000
          })
          that.$router.push({ name: 'user.exam.list' })
        })
    },
    test (payload) {
      if (payload.isInView) {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            return
          }
        }
        this.inView.push(payload.number)
      } else {
        for (let i = 0; i < this.inView.length; i++) {
          if (this.inView[i] === payload.number) {
            this.inView.splice(i, 1)
          }
        }
      }
    },
    changeAppBarAndDrawer (state) {
      this.$store.commit('AppLayout/updateAppBarAndDrawer', state)
    },
    changeCurrentQuestionIfScrollingIsDone () {
      if (this.timePassedSinceLastScroll >= 1000) {
        this.changeCurrentQuestionToFirstQuestionInView()
        this.timePassedSinceLastScroll = 0
        this.scrollState = 'not scrolling'
        clearInterval(this.setIntervalCallback)
        this.setIntervalCallback = null
      }
      this.timePassedSinceLastScroll += 250
    },
    updateLtr () {
      setTimeout(() => {
        document.querySelectorAll('.katex:not([dir="ltr"])').forEach(item => {
          item.setAttribute('dir', 'ltr')
        })
      }, 1000)
    },
    onScroll (startIndex, endIndex) {
      this.updateLtr()
      this.renderedQuestions = { startIndex, endIndex }
      if (this.scrollState === 'not scrolling') {
        this.setIntervalCallback = setInterval(() => {
          this.changeCurrentQuestionIfScrollingIsDone()
        }, 250)
        this.scrollState = 'scrolling'
      }
      this.timePassedSinceLastScroll = 0
    },
    changeCurrentQuestionToFirstQuestionInView () {
      const firstInViewQuestion = this.getFirstInViewQuestionNumber()
      if (firstInViewQuestion.id === this.currentQuestion.id) {
        return
      }
      this.changeQuestion(firstInViewQuestion.id, 'onlineQuiz.konkoorView')
    },
    scrollTo (questionId) {
      const questionIndex = this.getQuestionIndexById(questionId)
      this.$refs.scroller.scrollTo(questionIndex)
      for (let i = 1; i < 4; i++) {
        setTimeout(() => {
          this.$refs.scroller.scrollTo(questionIndex)
        },
        333 * i)
      }
    },
    getFirstInViewQuestionNumber () {
      let firstQuestionInView
      for (let i = this.renderedQuestions.startIndex; i <= this.renderedQuestions.endIndex; i++) {
        if (this.questions[i].isInView) {
          firstQuestionInView = this.questions[i]
          break
        }
      }
      if (firstQuestionInView && firstQuestionInView.id !== null) {
        return firstQuestionInView
      } else {
        return false
      }
    },
    choiceClicked (questionId) {
      this.scrollTo(questionId)
      this.changeQuestion(questionId)
    }
    // setHeights () {
    //   this.$refs.questionsColumn.style.height = this.windowSize.y + 'px'
    //   if (this.$refs.scroller.$el) {
    //     this.$refs.scroller.$el.style.height = this.windowSize.y + 'px'
    //   }
    //   this.$refs.leftSideList.style.height = (this.windowSize.y - 24) + 'px'
    // }
  }
}
</script>

<style lang="scss" scoped>
.konkoor-view{
  height: 100%;
  min-height: 100vh;
  background-color: rgb(244,244,244);
  .right-side{
    height: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    position: relative;
    padding: 0;
    .question-field{
      &.q-item{
        padding: 0;
      }
    }
  }
  .left-side{
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    .bubbleSheet-top{
      display: flex;
      justify-content: space-between;
      padding: 0 40px;
      .dropdown-button{
        padding: 0;
        direction: rtl;
      }
    }
    .bubbleSheet-bottom{
      padding: 12px;
    }
  }
  .timer-row {
    width: calc(58% - 150px);
    position: absolute;
    bottom: 0;
    right: 100px;
    .end-exam-btn {
      position: absolute;
      bottom: 0;
      background: rgb(76, 175, 80) !important;
      color: #fff;
      font-weight: bold;
      font-size: 16px;
      height: 103px !important;
      box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
      width: 200px;
      border-radius: 20px 20px 0 0;
    }
    .high-z-index {
      z-index: 3;
    }
  }
}
</style>
<style lang="scss">
.konkoor-view{
  .left-side{
    .bubbleSheet-top{
      .dropdown-button{
          .q-icon{
            font-size: 30px;
            &.on-left{
              margin: 0 0 0 8px;
            }
          }
      }
      .q-btn--fab-mini {
        padding: 0;
        height: 36px;
        width: 36px;
      }
    }
  }
}
</style>
