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
          }, {
            id: '6288a0038d2697d266565d0607bb',
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
          }], this.$axios)
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
