<template>
  <h5>THIS COMPONENT IS JUST FOR TEST</h5>
  <div class="text-center flex justify-center items-center">

    <!--    <div class="video-player-container ">-->
    <!--      <video-player-->
    <!--        :sources="videosSrc"-->
    <!--        poster="https://nodes.alaatv.com/upload/vast/videos/3A_LANDING/video%20tubmail.jpg" />-->
    <!--    </div>-->

  </div>
</template>

<script>
// import VideoPlayer from 'components/VideoPlayer'
// import { PlayerSourceList } from 'src/models/PlayerSource'
import QuestionHandler from 'src/questionRepairer/QuestionHandler'

export default {
  name: 'Test',
  // components: { VideoPlayer },
  mixins: [],
  data () {
    return {
      // videosSrc: new PlayerSourceList([
      //   { link: 'https://nodes.alaatv.com/media/968/HD_720p/968102dftr.mp4', ext: 'mp4', size: null, caption: 'کیفیت بالا', res: '480p' }
      // ]),
      testValue: '',
      testValue1: ''
    }
  },
  props: {
    testProp: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    run () {
      this.$axios.get('allquestions.json')
        .then((res) => {
          // const a = new QuestionHandler(res.data, this.$axios)
          const a = new QuestionHandler([{
            id: '6288a0038d2697d26d0607bb',
            statement: '<p dir="auto" style="text-align: right">در مثلث ABC، نیمساز داخلی زاویۀ A ضلع<span data-katex="true">$\\overline {BC}$</span>را در نقطۀ D قطع می‌کند. کدام نامساوی همواره صحیح است؟</p>',
            choices: [
              {
                id: 1,
                title: '<p dir="auto" style="text-align: right"><span data-katex="true">$BA&amp;gt;BD$</span></p>',
                answer: true,
                order: 0
              },
              {
                id: 2,
                title: '<p dir="auto" style="text-align: right"><span data-katex="true">$DA&amp;gt;DB$</span></p>',
                answer: false,
                order: 1
              },
              {
                id: 3,
                title: '<p dir="auto" style="text-align: right"><span data-katex="true">$AB&amp;gt;AD$</span></p>',
                answer: false,
                order: 2
              },
              {
                id: 4,
                title: '<p dir="auto" style="text-align: right"><span data-katex="true">$DB&amp;gt;DA$</span></p>',
                answer: false,
                order: 3
              }
            ],
            exams: [
              {
                sub_category: {
                  id: '60b7875428f350277f04c5ec',
                  title: 'هندسه',
                  category_id: '60b7858d743940688b23c7f4'
                },
                category_title: 'دفترچه سؤالات اختصاصی',
                exam_id: '627f2c8043bf55650e044228',
                order: 69,
                in_subcategory_order: 69,
                exam: {
                  id: '627f2c8043bf55650e044228',
                  title: 'پاور تست هندسۀ دهم',
                  holding_status: null,
                  start_at: '2022-04-21 08:42:00',
                  finish_at: '2022-07-16 08:42:00',
                  photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
                  delay_time: 100,
                  n_questions: 137,
                  enable: false,
                  updated_at: '2022-05-21 14:01:40',
                  created_at: '2022-05-14 08:43:52',
                  generate_questions_automatically: false,
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
                  is_free: false,
                  is_register_open: false,
                  is_open: false
                }
              }
            ],
            level: '3',
            photos: [
              'https://nodes.alaatv.com/aaa/questionPhotos/Screenshot-2022-11-12-032524-4437527.png'
            ],
            confirmers: [],
            confirmed: false,
            descriptive_answer: '<p dir="auto"><span data-katex="true">$\\overline {AD}$</span>نیم ساز <span data-katex="true">$\\mathop A\\limits^ \\wedge\\]است.\n\\[\\begin{array}{l}\nm({\\mathop A\\limits^ \\wedge  _1}) = m({\\mathop A\\limits^ \\wedge  _2})\\\\\nm({\\mathop D\\limits^ \\wedge  _2}) = m({\\mathop A\\limits^ \\wedge  _1}) + m(\\mathop B\\limits^ \\wedge  )\\\\\nm({\\mathop D\\limits^ \\wedge  _1}) = m({\\mathop A\\limits^ \\wedge  _2}) + m(\\mathop C\\limits^ \\wedge  )\n\\end{array}$</span></p><p dir="auto">در<span data-katex="true">$m({\\mathop A\\limits^ \\wedge  _1}) &amp;lt; m(A\\mathop D\\limits^ \\wedge  B),B\\mathop A\\limits^\\Delta  D$</span> ، زیرا <span data-katex="true">$m(A\\mathop D\\limits^ \\wedge  B) = m({\\mathop A\\limits^ \\wedge  _2}) + C$</span>. پس: <span data-katex="true">$BD &amp;lt; AB$</span></p><p dir="auto"><img src="https://nodes.alaatv.com/aaa/questionPhotos/Screenshot-2022-11-12-032524-4437527.png" width="324" height="204" data-vertical="-1" style="vertical-align: 1px"></p><p dir="auto"></p>',
            statement_photo: [
              'https://nodes.alaatv.com/aaa/questionStatements/6288a0038d2697d26d0607bb/163-7803056.png'
            ],
            answer_photos: [
              'https://nodes.alaatv.com/aaa/questionStatements/6288a0038d2697d26d0607bb/163-5203436.png'
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
            tags: [
              {
                id: '62fb2c684dcdcce15d084f69',
                title: 'درس دوم: استدلال',
                parent: {
                  id: '62fb2b614dcdcce15d084f5d',
                  title: 'فصل اول: ترسیم های هندسی و استدلال'
                },
                ancestors: [
                  {
                    id: '6281fb9e2f1bafe99f050334',
                    title: 'درخت دانش'
                  },
                  {
                    id: '62947d2624d62d858d09a4d2',
                    title: 'پایه دهم'
                  },
                  {
                    id: '629dba2f8c4d7e26720cece2',
                    title: 'هندسه ۱'
                  },
                  {
                    id: '62fb2b614dcdcce15d084f5d',
                    title: 'فصل اول: ترسیم های هندسی و استدلال'
                  }
                ],
                order: '2',
                type: null,
                children: [],
                updated_at: '2022-08-16 10:04:32',
                created_at: '2022-08-16 10:04:32'
              }
            ],
            designers: [],
            reference: [
              {
                id: '62f384484123bae3fc0b5423',
                type: 'reference_type',
                value: 'برگزیده سوالات کتب کمک آموزشی',
                updated_at: '2022-09-01 11:40:09',
                created_at: '2022-08-10 14:41:20'
              }
            ],
            years: [],
            majors: [
              {
                id: '62f38507eaeeaf1f0c0d81b4',
                type: 'major_type',
                value: 'ریاضی',
                updated_at: '2022-08-10 14:44:31',
                created_at: '2022-08-10 14:44:31'
              }
            ],
            targets: [],
            updated_at: '2022-11-12 20:07:41',
            created_at: '2022-05-21 12:47:07'
          },
          {
            id: '61387c2095a00831094817a2',
            statement: '<p dir="auto">سطح حلقه‌های پیچه‌ای که دارای 500 دور است، عمود بر خطوط میدان مغناطیسی یکنواختی به بزرگی 3/0 تسلا قرار دارد. میدان مغناطیسی در مدت ms15 تغییر کرده و به همان بزرگی اولیه‌اش اما در خلاف جهت می‌رسد. اگر مساحت هر حلقه پیچه<span data-katex="true">$20\\,c{m^2}$</span>باشد، بزرگی نیرو محرکه القایی در پیچه چند ولت است؟</p>',
            choices: [
              {
                id: 1,
                title: '<p dir="auto" style="text-align: right">0/08</p>',
                answer: false,
                order: 1
              },
              {
                id: 2,
                title: '<p dir="auto" style="text-align: right">4</p>',
                answer: false,
                order: 2
              },
              {
                id: 3,
                title: '<p dir="auto" style="text-align: right">8</p>',
                answer: false,
                order: 3
              },
              {
                id: 4,
                title: '<p dir="auto" style="text-align: right">40</p>',
                answer: true,
                order: 4
              }
            ],
            exams: [
              {
                sub_category: {
                  id: '628b39b0218a1683130cff7f',
                  title: 'فیزیک',
                  category_id: '60b7858d743940688b23c7f4'
                },
                category_title: 'دفترچه سؤالات اختصاصی',
                exam_id: '6134aa6d567a60794c3c3d17',
                order: 21,
                in_subcategory_order: 21,
                exam: {
                  id: '6134aa6d567a60794c3c3d17',
                  title: 'آزمون شماره 1 | دوازدهم تجربی(جمعبندی یازدهم)',
                  holding_status: null,
                  start_at: '2021-09-14 08:00:00',
                  finish_at: '2021-09-14 11:35:00',
                  photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
                  delay_time: 3840,
                  n_questions: 235,
                  enable: false,
                  updated_at: '2022-01-10 00:35:32',
                  created_at: '2021-09-05 16:00:53',
                  generate_questions_automatically: false,
                  confirm: false,
                  report_config: {
                    include_abnormal: false,
                    include_unranked: false,
                    make_report_for_before_delay: false,
                    make_report_for_remaining_only: false,
                    temp_exams_in_exam_interval: false,
                    consider_negative_point: true,
                    populate_school_ranking: false,
                    maximum_question_answered: 1,
                    right_answer_weight: 3
                  },
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
                  is_free: true,
                  is_register_open: false,
                  is_open: false
                }
              },
              {
                sub_category: {
                  id: '628b39b0218a1683130cff7f',
                  title: 'فیزیک',
                  category_id: '60b7858d743940688b23c7f4'
                },
                category_title: 'دفترچه سؤالات اختصاصی',
                exam_id: '6135bddbe0db6947171ef98a',
                order: 29,
                in_subcategory_order: 29,
                exam: {
                  id: '6135bddbe0db6947171ef98a',
                  title: 'آزمون شماره 1 | دوازدهم ریاضی(جمعبندی یازدهم)',
                  holding_status: null,
                  start_at: '2021-09-14 08:00:00',
                  finish_at: '2021-09-14 11:33:00',
                  photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
                  delay_time: 3840,
                  n_questions: 205,
                  enable: false,
                  updated_at: '2022-01-10 10:14:12',
                  created_at: '2021-09-06 11:36:03',
                  generate_questions_automatically: false,
                  confirm: false,
                  report_config: {
                    include_abnormal: false,
                    include_unranked: false,
                    make_report_for_before_delay: false,
                    make_report_for_remaining_only: false,
                    temp_exams_in_exam_interval: false,
                    consider_negative_point: true,
                    populate_school_ranking: false,
                    maximum_question_answered: 1,
                    right_answer_weight: 3
                  },
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
                  is_free: true,
                  is_register_open: false,
                  is_open: false
                }
              }
            ],
            level: 1,
            photos: [],
            confirmers: [],
            confirmed: false,
            descriptive_answer: '<p dir="auto"><span data-katex="true">$\\varepsilon=N\\left|\\frac{\\Delta\\varphi}{\\Delta}\\right|\\varphi=BA\\cos \\theta\\Rightarrow y=\\begin{cases}\\varepsilon=\\left|^{}NAB\\frac{\\cos\\theta_2-\\cos\\theta_1}{\\Delta t}\\right| &amp;  \\\\ \\theta_2=180^{\\circ} &amp; \\theta_1=0^{\\circ}\\end{cases}\\left|\\right?$</span><span data-katex="true">$\\varepsilon=500\\times20\\times10^{-4}\\times{}0/3{\\times\\frac{2}{15\\times10^{-2}}=40v}$</span></p>',
            statement_photo: [],
            answer_photos: [],
            status: {
              id: '60c7102418e65826bc7da373',
              title: 'draft',
              display_title: 'پیش نویس',
              updated_at: '2021-06-14 12:45:32',
              created_at: '2021-06-14 12:45:32'
            },
            type: {
              id: '6225f4828044517f52500c04',
              type: 'question_type',
              value: 'konkur',
              updated_at: '2022-03-07 15:33:14',
              created_at: '2022-03-07 15:33:14'
            },
            tags: [
              {
                id: '6281fc0a2f1bafe99f050338',
                title: 'فیزیک ۳ (ریاضی)',
                parent: {
                  id: '6281fbeb2f1bafe99f050336',
                  title: 'پایه دوازدهم'
                },
                ancestors: [
                  {
                    id: '6281fb9e2f1bafe99f050334',
                    title: 'درخت دانش'
                  },
                  {
                    id: '6281fbeb2f1bafe99f050336',
                    title: 'پایه دوازدهم'
                  }
                ],
                order: '4',
                type: null,
                children: [
                  {
                    id: '6281fc222f1bafe99f05033b',
                    title: 'فصل اول: حرکت بر خط راست',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: 1,
                    type: null,
                    number_of_children: 4,
                    updated_at: '2022-08-15 13:42:00',
                    created_at: '2022-05-16 11:54:18'
                  },
                  {
                    id: '6281fc452f1bafe99f05033e',
                    title: 'فصل دوم: دینامیک و حرکت دایره ای',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: '2',
                    type: null,
                    number_of_children: 5,
                    updated_at: '2022-08-15 13:42:45',
                    created_at: '2022-05-16 11:54:53'
                  },
                  {
                    id: '6284e53b3fb4b25a970e2eb3',
                    title: 'فصل سوم: نوسان و موج',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: '3',
                    type: null,
                    number_of_children: 6,
                    updated_at: '2022-08-15 13:43:09',
                    created_at: '2022-05-18 16:53:23'
                  },
                  {
                    id: '62fa0e424dcdcce15d084ea0',
                    title: 'فصل چهارم: برهم کنش های موج',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: '4',
                    type: null,
                    number_of_children: 4,
                    updated_at: '2022-08-15 13:43:38',
                    created_at: '2022-08-15 13:43:38'
                  },
                  {
                    id: '62fa0e604dcdcce15d084ea1',
                    title: 'فصل پنجم: آشنایی با فیزیک اتمی',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: '5',
                    type: null,
                    number_of_children: 4,
                    updated_at: '2022-08-15 13:44:08',
                    created_at: '2022-08-15 13:44:08'
                  },
                  {
                    id: '62fa0e804dcdcce15d084ea2',
                    title: 'فصل ششم: آشنایی با فیزیک هسته ای',
                    parent: {
                      id: '6281fc0a2f1bafe99f050338',
                      title: 'فیزیک ۳ (ریاضی)'
                    },
                    ancestors: [
                      {
                        id: '6281fb9e2f1bafe99f050334',
                        title: 'درخت دانش'
                      },
                      {
                        id: '6281fbeb2f1bafe99f050336',
                        title: 'پایه دوازدهم'
                      },
                      {
                        id: '6281fc0a2f1bafe99f050338',
                        title: 'فیزیک ۳ (ریاضی)'
                      }
                    ],
                    order: '6',
                    type: null,
                    number_of_children: 4,
                    updated_at: '2022-08-15 13:44:40',
                    created_at: '2022-08-15 13:44:40'
                  }
                ],
                updated_at: '2022-06-06 13:10:49',
                created_at: '2022-05-16 11:53:54'
              }
            ],
            designers: [],
            reference: [
              {
                id: '6303555f245ea3169305e394',
                type: 'reference_type',
                value: 'سه آ',
                updated_at: '2022-08-22 14:37:27',
                created_at: '2022-08-22 14:37:27'
              }
            ],
            years: [],
            majors: [
              {
                id: '62f3851832c3202bc7015ca3',
                type: 'major_type',
                value: 'تجربی',
                updated_at: '2022-08-10 14:44:48',
                created_at: '2022-08-10 14:44:48'
              }
            ],
            targets: [],
            updated_at: '2022-11-12 14:36:02',
            created_at: '2021-09-08 13:32:24'
          }
          ], this.$axios)
          a.run()
          // console.log('res.data.length', res.data.length)
        })
    }
  },
  computed: {

  },
  beforeRouteEnter () {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave () {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate () {
    // console.log('debug beforeRouteUpdate')
  },
  activated () {
    // console.log('debug activated')
  },
  updated () {
    // console.log('debug updated')
  },
  created () {
    // console.log('debug created')
  },
  // mounted () {
  // const video = this.$refs.videoPlayer
  // if (video) {
  // console.log('hasta')
  // }
  // console.log('debug mounted')
  // },
  mounted() {
    this.run()
  },
  watch: {
    testValue: {
      handler () {},
      deep: true
    },
    testValue1 (oldVal, newVal) {}
  }
}
</script>

<style scoped lang="scss">
.video-player-container{
  width: 700px;
  height: auto;
  border-radius: 20px;
}
</style>
