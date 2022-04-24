<template>
  <q-card class="question-Bank-ToolBar custom-card">
    <q-expansion-item
      expand-icon-toggle
      expand-icon="isax:arrow-down-1"
    >
      <template v-slot:header>
        <q-card-section class="toolbar-card q-pa-0">
          <div class="row toolbar-card-actions">
            <div class="col-xl-5 col-lg-6 col-md-6 col-sm-4 toolbar-btn">
              <q-btn
                class="delete-choices-btn"
                @click=deleteAllChoose()
                flat
              >
                حذف انتخاب ها
              </q-btn>
              <q-btn class="add-to-btn" flat>
                <q-icon name="isax:add">
                </q-icon>
                <span>
            افزودن به
          </span>
              </q-btn>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-3 col-sm-4 toolbar-checkbox">
              <q-checkbox
                class="choices-checkbox"
                label="انتخاب همه"
                v-bind:="checkBox"
                @click="selectAllQuestions">
              </q-checkbox>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-4 choices-number">
              {{ this.numberOfQuestions() }}
              <span class="choices-number-title">سوال انتخاب شده</span>
            </div>
          </div>
        </q-card-section>
      </template>
      <q-card-section class="q-pa-0 toolbar-detail">
        <div class="toolbar-detail-container row">
          <div class="chosen-questions col-xl-6 col-lg-6 col-md-6 col-sm-7 ">
            <div class="chosen-question-title">
              سوالات انتخاب شده:
            </div>
            <q-card-actions class="chosen-question-items">
              <q-chip
                v-for="item in countOfSelectedSubCategory"
                :key="item"
                class="filter-items"
                icon-remove="mdi-close"
                removable
                @remove="RemoveSelectedChoice(item)"
              >
                {{ item.title }}: {{ item.selectedQuestionsCount }}
              </q-chip>
            </q-card-actions>
          </div>
          <div class="question-level-chart col-xl-4 col-lg-4 col-md-4 col-sm-5  justify-center flex">
            <div class="row">
              <div class="col-4 q-pt-sm q-pl-xs">
                <div class="chart-titles">
                  <q-badge class="titles-icon hard" rounded/>
                  <div>سخت</div>
                </div>
                <div class="chart-titles">
                  <q-badge class="titles-icon medium" rounded></q-badge>
                  <div>متوسط</div>
                </div>
                <div class="chart-titles">
                  <q-badge class="titles-icon easy" rounded></q-badge>
                  <div>آسان</div>
                </div>
              </div>
              <div class="question-highchart col-8 ">
                <highcharts :options="chartOptions"/>
              </div>
            </div>
          </div>
          <div class="question-deActive col-xl col-md-2 col-sm-12">
            <div class=" delete-all">
              <q-btn
                @click=deleteAllChoose()
                rounded
                flat
              >
                حذف انتخاب ها
              </q-btn>
            </div>
            <div class="deactivate-all">
              <q-btn
                rounded
                flat>
                غیر فعال کردن همه
              </q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-expansion-item>
  </q-card>
  <q-page-sticky class="pageSticky lg-hide" position="bottom">
    <div class="shapes flex ">
      <div class="circle">
        <q-btn
          class="openDialouge"
          round
          :icon="this.dialougeExpanded? 'isax:arrow-down-1' : 'isax:arrow-up-2'"
          @click="this.dialougeExpanded = !this.dialougeExpanded"
        />
      </div>
      <div class="top-style">
        <div class="top-style-right">
          <div class="near-circle"></div>
          <div class="near-btn">
            <div class="near-btn-top"></div>
          </div>
        </div>
        <div class="top-style-left">
          <div class="near-btn">
            <div class="near-btn-top"></div>
          </div>
          <div class="near-circle">
          </div>
        </div>
      </div>
      <div class="stickyFeatures">
        <div class="toolbar-btn">
          <div class="delete-choices-btn-container">
            <q-btn
              class="delete-choices-btn"
              @click=deleteAllChoose()
              flat
            >
              حذف انتخاب ها
            </q-btn>
          </div>
          <div class="add-to-btn-container">
            <q-btn class="add-to-btn" flat>
              <q-icon name="isax:add">
              </q-icon>
              <span>
            افزودن به
          </span>
            </q-btn>
          </div>
        </div>
        <div class="toolbar-checkBox-number">
          <div class="toolbar-checkbox-container">
            <div class="toolbar-checkbox">
              <q-checkbox
                class="choices-checkbox"
                label="انتخاب همه"
                v-bind:="checkBox"
                @click="selectAllQuestions">
              </q-checkbox>
            </div>
          </div>
          <div class="choices-number-container">
            <div class="choices-number">
              {{ this.numberOfQuestions() }}
              <span class="choices-number-title">سوال انتخاب شده</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </q-page-sticky>
  <q-dialog class="dialogueCard" v-model="dialougeExpanded">
    <q-card class="dialogueCardContainer">
      <div class="dialogHeader">
        <div class="dialogTitle"> سوالات انتخاب شده:</div>
        <div class="dialogBtn">
          <q-btn
            rounded
            flat>
            غیر فعال کردن همه
          </q-btn>
        </div>
      </div>
      <div class="dialogChip">
        <q-chip
          class="filter-items"
          v-for="item in countOfSelectedSubCategory"
          :key="item"
          icon-remove="mdi-close"
          removable
          @remove="RemoveSelectedChoice(item)"
        >
          {{ item.title }}: {{ item.selectedQuestionsCount }}
        </q-chip>
      </div>
      <div class="dialogChart">
        <div class="dialogChartTitles">
          <div class="chart-titles">
            <q-badge class="titles-icon hard" rounded/>
            <div>سخت</div>
          </div>
          <div class="chart-titles">
            <q-badge class="titles-icon medium" rounded></q-badge>
            <div>متوسط</div>
          </div>
          <div class="chart-titles">
            <q-badge class="titles-icon easy" rounded></q-badge>
            <div>آسان</div>
          </div>
        </div>
        <div class="dialogHighchart">
          <highcharts :options="chartOptions"/>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { QuestionList } from 'src/models/Question'

export default {
  components: { highcharts: Chart },
  name: 'QuestionBankToolBar',
  props: {
    questions: {
      type: QuestionList,
      default: new QuestionList([
        {
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 1 $</span></div>',
              order: 1,
              answer: true
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 2 $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 3 $</span></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4$</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: "<div class=\"question\" dir=\"rtl\">اگر <span class=\"formula\">$\\displaystyle G' $</span> مکمل گراف <span class=\"formula\">$\\displaystyle G  $</span> از مرتبۀ <span class=\"formula\">$\\displaystyle 10  $</span> باشد و <span class=\"formula\">$\\displaystyle a  $</span> رأس دلخواهی از آن دو گراف باشد آن‌گاه <span class=\"formula\">$\\displaystyle  |N_{G}(a) \\cup N_{G'}(a)|$</span> چه تعداد از اعداد <span class=\"formula\">$\\displaystyle 10  $</span> ، <span class=\"formula\">$\\displaystyle 9  $</span> ، <span class=\"formula\">$\\displaystyle 8  $</span> و <span class=\"formula\">$\\displaystyle 7  $</span> می‌تواند باشد؟</div>",
          answer: "<div class=\"answer\" dir=\"rtl\">فقط <span class=\"formula\">$\\displaystyle 9  $</span> می‌تواند باشد چون رأس <span class=\"formula\">$\\displaystyle a  $</span> یا در گراف <span class=\"formula\">$\\displaystyle G  $</span> با رأس دلخواه <span class=\"formula\">$\\displaystyle i  $</span> مجاور است و یا در گراف <span class=\"formula\">$\\displaystyle G' $</span></div>",
          source_data: {
            resultText: 'Done',
            correctCounts: 36,
            choiceId3: '1240540',
            discriminationIndex: 0.19,
            choiceId2: '1240539',
            choiceId1: '1240538',
            overallQuestionCount: '15149',
            choiceId4: '1240541',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 2 $</span></div>',
            createdAt: '1587903787200',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 1 $</span></div>',
            choice3selectedCounts: 6,
            id: '533233',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4$</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 3 $</span></div>',
            like: false,
            entryDate: '1592471696663',
            authorInfo: '{"personInfoList":[{"id":676108,"imageId":391096,"name":"رسول حاجی زاده"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '10',
            choice2selectedCounts: 5,
            totalUsageCount: 70,
            answerId: '1240538',
            rowNo: 13236,
            choice1selectedCounts: 36,
            hasHint: false,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 157,
            incorrectCounts: 13,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 163,
                  publisherBookId: 3,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,3,jpg',
                  publisherBookName: 'ریاضیات گسسته پایه دوازدهم',
                  questionOrder: 80,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            mediaRequestCount: 0,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: "<div class=\"question\" dir=\"rtl\">اگر <span class=\"formula\">$\\displaystyle G' $</span> مکمل گراف <span class=\"formula\">$\\displaystyle G  $</span> از مرتبۀ <span class=\"formula\">$\\displaystyle 10  $</span> باشد و <span class=\"formula\">$\\displaystyle a  $</span> رأس دلخواهی از آن دو گراف باشد آن‌گاه <span class=\"formula\">$\\displaystyle  |N_{G}(a) \\cup N_{G'}(a)|$</span> چه تعداد از اعداد <span class=\"formula\">$\\displaystyle 10  $</span> ، <span class=\"formula\">$\\displaystyle 9  $</span> ، <span class=\"formula\">$\\displaystyle 8  $</span> و <span class=\"formula\">$\\displaystyle 7  $</span> می‌تواند باشد؟</div>",
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23948}]}',
            cnt: '15149',
            authorId: '676108',
            choice4selectedCounts: 2,
            answer: "<div class=\"answer\" dir=\"rtl\">فقط <span class=\"formula\">$\\displaystyle 9  $</span> می‌تواند باشد چون رأس <span class=\"formula\">$\\displaystyle a  $</span> یا در گراف <span class=\"formula\">$\\displaystyle G  $</span> با رأس دلخواه <span class=\"formula\">$\\displaystyle i  $</span> مجاور است و یا در گراف <span class=\"formula\">$\\displaystyle G' $</span></div>",
            disable: false,
            bookmarkCount: 0,
            creatorsLastUsageDate: '1601830929000',
            topicList: [
              {
                id: 23948,
                name: 'گراف کامل، منتظم و مکمل',
                deph: 0,
                moduleId: 418,
                parentTopicId: 23944,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23944,
                  name: 'درس 1: معرفی گراف',
                  deph: 0,
                  moduleId: 418,
                  parentTopicId: 23943,
                  order: 115,
                  isDisabled: false,
                  parentTopic: {
                    id: 23943,
                    name: 'فصل دوم: گراف و مدل سازی',
                    deph: 0,
                    moduleId: 418,
                    order: 110,
                    isDisabled: false
                  }
                },
                module: {
                  id: 418,
                  name: 'ریاضیات گسسته',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 10,
              value: 2,
              name: 'آسان'
            }
          },
          sub_category: {
            id: '60b7875428f350277f04c5e9',
            title: 'فیزیک',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d523',
          level: 2,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 48 $</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 54 $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 72 $</span></div>',
              order: 3,
              answer: true
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 84 $</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: '<div class="question" dir="rtl">گراف کامل <span class="formula">$\\displaystyle  k_{p}$</span> از گراف کامل <span class="formula">$\\displaystyle  k_{p-4}$</span> به تعداد <span class="formula">$\\displaystyle 42 $</span> یال بیشتر دارد. مقدار <span class="formula">$\\displaystyle 2\\Delta + 4\\delta $</span> در گراف  <span class="formula">$\\displaystyle  k_{p}$</span> کدام است؟<br></div>',
          answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle  \\begin{matrix} \\left( \\begin{matrix}<br>p \\\\<br>2 \\\\<br>\\end{matrix} \\right) \\end{matrix} = \\begin{matrix} \\left( \\begin{matrix}<br>p-4 \\\\<br>2 \\\\<br>\\end{matrix} \\right) \\end{matrix} + 42$</span><br><span class="formula">$\\displaystyle  \\Rightarrow \\frac{p(p-1)}{2} = \\frac{(p-4)(p-5)}{2}+42$</span><br><div class="formula-pack"><span class="formula">$\\displaystyle \\Rightarrow p^2-p=p^2-9p+20+84 $</span><span class="formula">$\\displaystyle \\Rightarrow 8p=104 \\Rightarrow p=13$</span></div><br><span class="formula">$\\displaystyle  \\Rightarrow ?= 2\\Delta_{p}+4\\delta_{p}=6\\times12=72$</span></div></div>',
          source_data: {
            resultText: 'Done',
            correctCounts: 24,
            choiceId3: '1240471',
            discriminationIndex: 0.25,
            choiceId2: '1240470',
            choiceId1: '1240469',
            overallQuestionCount: '15149',
            choiceId4: '1240472',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 54 $</span></div>',
            createdAt: '1587899389070',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 48 $</span></div>',
            choice3selectedCounts: 24,
            id: '533215',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 84 $</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 72 $</span></div>',
            like: false,
            entryDate: '1592471696663',
            authorInfo: '{"personInfoList":[{"id":676108,"imageId":391096,"name":"رسول حاجی زاده"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '30',
            choice2selectedCounts: 1,
            totalUsageCount: 105,
            answerId: '1240471',
            rowNo: 13235,
            choice1selectedCounts: 0,
            hasHint: false,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 129,
            incorrectCounts: 2,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 152,
                  publisherBookId: 3,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,3,jpg',
                  publisherBookName: 'ریاضیات گسسته پایه دوازدهم',
                  questionOrder: 38,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            mediaRequestCount: 0,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">گراف کامل <span class="formula">$\\displaystyle  k_{p}$</span> از گراف کامل <span class="formula">$\\displaystyle  k_{p-4}$</span> به تعداد <span class="formula">$\\displaystyle 42 $</span> یال بیشتر دارد. مقدار <span class="formula">$\\displaystyle 2\\Delta + 4\\delta $</span> در گراف  <span class="formula">$\\displaystyle  k_{p}$</span> کدام است؟<br></div>',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23948}]}',
            cnt: '15149',
            authorId: '676108',
            choice4selectedCounts: 1,
            answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle  \\begin{matrix} \\left( \\begin{matrix}<br>p \\\\<br>2 \\\\<br>\\end{matrix} \\right) \\end{matrix} = \\begin{matrix} \\left( \\begin{matrix}<br>p-4 \\\\<br>2 \\\\<br>\\end{matrix} \\right) \\end{matrix} + 42$</span><br><span class="formula">$\\displaystyle  \\Rightarrow \\frac{p(p-1)}{2} = \\frac{(p-4)(p-5)}{2}+42$</span><br><div class="formula-pack"><span class="formula">$\\displaystyle \\Rightarrow p^2-p=p^2-9p+20+84 $</span><span class="formula">$\\displaystyle \\Rightarrow 8p=104 \\Rightarrow p=13$</span></div><br><span class="formula">$\\displaystyle  \\Rightarrow ?= 2\\Delta_{p}+4\\delta_{p}=6\\times12=72$</span></div></div>',
            disable: false,
            bookmarkCount: 0,
            creatorsLastUsageDate: '1601813416000',
            topicList: [
              {
                id: 23948,
                name: 'گراف کامل، منتظم و مکمل',
                deph: 0,
                moduleId: 418,
                parentTopicId: 23944,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23944,
                  name: 'درس 1: معرفی گراف',
                  deph: 0,
                  moduleId: 418,
                  parentTopicId: 23943,
                  order: 115,
                  isDisabled: false,
                  parentTopic: {
                    id: 23943,
                    name: 'فصل دوم: گراف و مدل سازی',
                    deph: 0,
                    moduleId: 418,
                    order: 110,
                    isDisabled: false
                  }
                },
                module: {
                  id: 418,
                  name: 'ریاضیات گسسته',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 30,
              value: 4,
              name: 'سخت'
            }
          },
          sub_category: {
            id: '60b7875428f350277f04c5e9',
            title: 'فیزیک',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d524',
          level: 3,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7885428f350277f04c5ec',
            title: 'هندسه',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 18 $</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 21 $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  24$</span></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 28 $</span></div>',
              order: 4,
              answer: true
            }
          ],
          statement: '<div class="question" dir="rtl">هر رأس گرافی <span class="formula">$\\displaystyle -2 $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 12  $</span> را به تمامی رئوس یک گراف <span class="formula">$\\displaystyle -6  $</span> منتظم وصل کرده‌ایم و گراف حاصل خود منتظم گردیده است، مرتبۀ گراف حاصل کدام است؟<br></div>',
          answer: '<div class="answer" dir="rtl">فرض می‌کنیم مرتبۀ گراف <span class="formula">$\\displaystyle -6 $</span> منتظم <span class="formula">$\\displaystyle p  $</span> باشد پس از هر رأس گراف <span class="formula">$\\displaystyle  -2  $</span> منتظم، <span class="formula">$\\displaystyle p  $</span> یال دیگر خارج شده است و درجۀ هر رأس آن <span class="formula">$\\displaystyle p+2  $</span> شده است، و در ضمن تعداد یال‌های متصل بین دو گراف، <span class="formula">$\\displaystyle 12p $</span> است:<br><div align="left">‌<span class="formula">$\\displaystyle  \\frac{(p+2)(p+12)}{2}=\\frac{2 \\times 12}{2}+\\frac{6p}{2}+12p$</span><br><div class="formula-pack"><span class="formula">$\\displaystyle \\Rightarrow p^2+14p+24 = 24+6p+24p $</span><span class="formula">$\\displaystyle \\Rightarrow p^2-16p=0  \\Rightarrow p=16$</span></div></div></div>',
          source_data: {
            resultText: 'Done',
            correctCounts: 14,
            choiceId3: '1240792',
            discriminationIndex: 0.06,
            choiceId2: '1240791',
            choiceId1: '1240790',
            overallQuestionCount: '15149',
            choiceId4: '1240793',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 21 $</span></div>',
            createdAt: '1587964510320',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 18 $</span></div>',
            choice3selectedCounts: 10,
            id: '533299',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 28 $</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  24$</span></div>',
            like: false,
            entryDate: '1592471696663',
            authorInfo: '{"personInfoList":[{"id":676108,"imageId":391096,"name":"رسول حاجی زاده"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '30',
            choice2selectedCounts: 7,
            totalUsageCount: 88,
            answerId: '1240793',
            rowNo: 13238,
            choice1selectedCounts: 2,
            hasHint: false,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 142,
            incorrectCounts: 19,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 175,
                  publisherBookId: 3,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,3,jpg',
                  publisherBookName: 'ریاضیات گسسته پایه دوازدهم',
                  questionOrder: 178,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            mediaRequestCount: 3,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">هر رأس گرافی <span class="formula">$\\displaystyle -2 $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 12  $</span> را به تمامی رئوس یک گراف <span class="formula">$\\displaystyle -6  $</span> منتظم وصل کرده‌ایم و گراف حاصل خود منتظم گردیده است، مرتبۀ گراف حاصل کدام است؟<br></div>',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23948}]}',
            cnt: '15149',
            authorId: '676108',
            choice4selectedCounts: 14,
            answer: '<div class="answer" dir="rtl">فرض می‌کنیم مرتبۀ گراف <span class="formula">$\\displaystyle -6 $</span> منتظم <span class="formula">$\\displaystyle p  $</span> باشد پس از هر رأس گراف <span class="formula">$\\displaystyle  -2  $</span> منتظم، <span class="formula">$\\displaystyle p  $</span> یال دیگر خارج شده است و درجۀ هر رأس آن <span class="formula">$\\displaystyle p+2  $</span> شده است، و در ضمن تعداد یال‌های متصل بین دو گراف، <span class="formula">$\\displaystyle 12p $</span> است:<br><div align="left">‌<span class="formula">$\\displaystyle  \\frac{(p+2)(p+12)}{2}=\\frac{2 \\times 12}{2}+\\frac{6p}{2}+12p$</span><br><div class="formula-pack"><span class="formula">$\\displaystyle \\Rightarrow p^2+14p+24 = 24+6p+24p $</span><span class="formula">$\\displaystyle \\Rightarrow p^2-16p=0  \\Rightarrow p=16$</span></div></div></div>',
            disable: false,
            bookmarkCount: 0,
            creatorsLastUsageDate: '1597489597000',
            topicList: [
              {
                id: 23948,
                name: 'گراف کامل، منتظم و مکمل',
                deph: 0,
                moduleId: 418,
                parentTopicId: 23944,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23944,
                  name: 'درس 1: معرفی گراف',
                  deph: 0,
                  moduleId: 418,
                  parentTopicId: 23943,
                  order: 115,
                  isDisabled: false,
                  parentTopic: {
                    id: 23943,
                    name: 'فصل دوم: گراف و مدل سازی',
                    deph: 0,
                    moduleId: 418,
                    order: 110,
                    isDisabled: false
                  }
                },
                module: {
                  id: 418,
                  name: 'ریاضیات گسسته',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 30,
              value: 4,
              name: 'سخت'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d525',
          level: 3,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ec',
            title: 'هندسه',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4$</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 5 $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  6$</span></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  7$</span></div>',
              order: 4,
              answer: true
            }
          ],
          statement: '<div class="question" dir="rtl">چند نوع گراف منتظم وجود دارد که اندازه‌اش <span class="formula">$\\displaystyle 9  $</span> باشد؟<br></div>',
          answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle q=9&nbsp; \\Rightarrow \\sum=18 \\Rightarrow&nbsp; rp=18 $</span><br><div align="right">‌اگر <span class="formula">$\\displaystyle r=1  $</span> آن‌گاه <span class="formula">$\\displaystyle p=18 $</span> و گراف <span class="formula">$\\displaystyle -1 $</span> منتظم از مرتبه <span class="formula">$\\displaystyle 18  $</span> منحصربه‌فرد است. <br>اگر <span class="formula">$\\displaystyle r=2 $</span> آن‌گاه <span class="formula">$\\displaystyle p=9 $</span> و گراف <span class="formula">$\\displaystyle  -2 $</span> منتظم از مرتبه <span class="formula">$\\displaystyle 9  $</span> به تعداد چهار نوع است (یک <span class="formula">$\\displaystyle 9  $</span> ضلعی، یک <span class="formula">$\\displaystyle 6  $</span> ضلعی و یک <span class="formula">$\\displaystyle 3  $</span> ضلعی، یک <span class="formula">$\\displaystyle 5  $</span> ضلعی و یک <span class="formula">$\\displaystyle 4  $</span> ضلعی، سه تا <span class="formula">$\\displaystyle 3 $</span> ضلعی)<br>اگر <span class="formula">$\\displaystyle r=3  $</span> آن‌گاه <span class="formula">$\\displaystyle p=6 $</span> و گراف <span class="formula">$\\displaystyle  -3 $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 6  $</span> به تعداد دو نوع وجود دارد (چون مکمل آن یعنی <span class="formula">$\\displaystyle -2  $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 6  $</span> دو نوع است.)</div></div></div>',
          source_data: {
            resultText: 'Done',
            correctCounts: 23,
            choiceId3: '1240756',
            discriminationIndex: 0.14,
            choiceId2: '1240755',
            choiceId1: '1240754',
            overallQuestionCount: '15149',
            choiceId4: '1240757',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 5 $</span></div>',
            createdAt: '1587962002190',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4$</span></div>',
            choice3selectedCounts: 3,
            id: '533290',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  7$</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  6$</span></div>',
            like: false,
            entryDate: '1592471696663',
            authorInfo: '{"personInfoList":[{"id":676108,"imageId":391096,"name":"رسول حاجی زاده"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '30',
            choice2selectedCounts: 0,
            totalUsageCount: 95,
            answerId: '1240757',
            rowNo: 13237,
            choice1selectedCounts: 6,
            hasHint: false,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 62,
            incorrectCounts: 9,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 173,
                  publisherBookId: 3,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,3,jpg',
                  publisherBookName: 'ریاضیات گسسته پایه دوازدهم',
                  questionOrder: 164,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            mediaRequestCount: 0,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">چند نوع گراف منتظم وجود دارد که اندازه‌اش <span class="formula">$\\displaystyle 9  $</span> باشد؟<br></div>',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23948}]}',
            cnt: '15149',
            authorId: '676108',
            choice4selectedCounts: 23,
            answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle q=9&nbsp; \\Rightarrow \\sum=18 \\Rightarrow&nbsp; rp=18 $</span><br><div align="right">‌اگر <span class="formula">$\\displaystyle r=1  $</span> آن‌گاه <span class="formula">$\\displaystyle p=18 $</span> و گراف <span class="formula">$\\displaystyle -1 $</span> منتظم از مرتبه <span class="formula">$\\displaystyle 18  $</span> منحصربه‌فرد است. <br>اگر <span class="formula">$\\displaystyle r=2 $</span> آن‌گاه <span class="formula">$\\displaystyle p=9 $</span> و گراف <span class="formula">$\\displaystyle  -2 $</span> منتظم از مرتبه <span class="formula">$\\displaystyle 9  $</span> به تعداد چهار نوع است (یک <span class="formula">$\\displaystyle 9  $</span> ضلعی، یک <span class="formula">$\\displaystyle 6  $</span> ضلعی و یک <span class="formula">$\\displaystyle 3  $</span> ضلعی، یک <span class="formula">$\\displaystyle 5  $</span> ضلعی و یک <span class="formula">$\\displaystyle 4  $</span> ضلعی، سه تا <span class="formula">$\\displaystyle 3 $</span> ضلعی)<br>اگر <span class="formula">$\\displaystyle r=3  $</span> آن‌گاه <span class="formula">$\\displaystyle p=6 $</span> و گراف <span class="formula">$\\displaystyle  -3 $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 6  $</span> به تعداد دو نوع وجود دارد (چون مکمل آن یعنی <span class="formula">$\\displaystyle -2  $</span> منتظم از مرتبۀ <span class="formula">$\\displaystyle 6  $</span> دو نوع است.)</div></div></div>',
            disable: false,
            bookmarkCount: 0,
            creatorsLastUsageDate: '1600886902000',
            topicList: [
              {
                id: 23948,
                name: 'گراف کامل، منتظم و مکمل',
                deph: 0,
                moduleId: 418,
                parentTopicId: 23944,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23944,
                  name: 'درس 1: معرفی گراف',
                  deph: 0,
                  moduleId: 418,
                  parentTopicId: 23943,
                  order: 115,
                  isDisabled: false,
                  parentTopic: {
                    id: 23943,
                    name: 'فصل دوم: گراف و مدل سازی',
                    deph: 0,
                    moduleId: 418,
                    order: 110,
                    isDisabled: false
                  }
                },
                module: {
                  id: 418,
                  name: 'ریاضیات گسسته',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 30,
              value: 4,
              name: 'سخت'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d526',
          level: 3,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ec',
            title: 'هندسه',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2 $</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{2} $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\frac{\\sqrt{13}}{3}$</span></div>',
              order: 3,
              answer: true
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 2\\sqrt{13} $</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: '<div class="question" dir="rtl">فاصلۀ نقطۀ <span class="formula">$\\displaystyle A(2\\ ,\\ 3\\ ,\\ -1)$</span> از محور <span class="formula">$\\displaystyle z $</span> ها چند برابر فاصلۀ آن از صفحۀ <span class="formula">$\\displaystyle xz $</span> می‌باشد؟</div>',
          answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle  \\left.\\begin{array}{ll} \\begin{matrix}\\text{ها}\\end{matrix} z&nbsp; \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} = \\sqrt{2^{2}+3^{2}} = \\sqrt{13} \\\\ xz&nbsp; \\begin{matrix}\\text{از صفحۀ}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} = 3 \\end{array}\\right. $</span></div>‌بنابراین جواب <span class="formula">$\\displaystyle  \\frac{\\sqrt{13}}{3} $</span> است.<br></div>',
          source_data: {
            resultText: 'Done',
            totalUsageCount: 41,
            answerId: '1232754',
            rowNo: 13232,
            choice1selectedCounts: 1,
            correctCounts: 89,
            choiceId3: '1232754',
            hasHint: false,
            discriminationIndex: 0.36,
            choiceId2: '1232753',
            choiceId1: '1232752',
            resultCode: 1,
            overallQuestionCount: '15149',
            choiceId4: '1232755',
            questionTypeId: '10',
            noAnswerCounts: 72,
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{2} $</span></div>',
            createdAt: '1586955959140',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2 $</span></div>',
            incorrectCounts: 4,
            choice3selectedCounts: 89,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 275,
                  publisherBookId: 2,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,2,jpg',
                  publisherBookName: 'هندسه (3)، پایۀ دوازدهم',
                  questionOrder: 26,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            id: '531208',
            mediaRequestCount: 0,
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle 2\\sqrt{13} $</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\frac{\\sqrt{13}}{3}$</span></div>',
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">فاصلۀ نقطۀ <span class="formula">$\\displaystyle A(2\\ ,\\ 3\\ ,\\ -1)$</span> از محور <span class="formula">$\\displaystyle z $</span> ها چند برابر فاصلۀ آن از صفحۀ <span class="formula">$\\displaystyle xz $</span> می‌باشد؟</div>',
            like: false,
            entryDate: '1592463426947',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23787}]}',
            cnt: '15149',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            choice4selectedCounts: 1,
            answer: '<div class="answer" dir="rtl"><div align="left"><span class="formula">$\\displaystyle  \\left.\\begin{array}{ll} \\begin{matrix}\\text{ها}\\end{matrix} z&nbsp; \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} = \\sqrt{2^{2}+3^{2}} = \\sqrt{13} \\\\ xz&nbsp; \\begin{matrix}\\text{از صفحۀ}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} = 3 \\end{array}\\right. $</span></div>‌بنابراین جواب <span class="formula">$\\displaystyle  \\frac{\\sqrt{13}}{3} $</span> است.<br></div>',
            countQuestionTypeId: '15074',
            disable: false,
            bookmarkCount: 0,
            difficultyLevelId: '20',
            choice2selectedCounts: 2,
            creatorsLastUsageDate: '1597818983000',
            topicList: [
              {
                id: 23787,
                name: 'محاسبه تصویر، قرینه و فاصله نقطه از محورها و صفحات مختصات',
                deph: 0,
                moduleId: 417,
                parentTopicId: 23765,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23765,
                  name: 'فصل سوم : بردارها',
                  deph: 0,
                  moduleId: 417,
                  order: 120,
                  isDisabled: false
                },
                module: {
                  id: 417,
                  name: 'هندسه 3',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 20,
              value: 3,
              name: 'متوسط'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d527',
          level: 2,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ec',
            title: 'هندسه',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl">صفر <br></div>',
              order: 1,
              answer: true
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl">یک <br></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl">دو <br></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl">بی‌شمار <br></div>',
              order: 4,
              answer: false
            }
          ],
          statement: '<div class="question" dir="rtl">به ازای چند مقدار <span class="formula">$\\displaystyle m $</span> فاصلۀ نقطۀ <span class="formula">$\\displaystyle A(2\\ ,\\ m\\ ,\\ 3)$</span> از محور <span class="formula">$\\displaystyle y $</span> ها سه برابر فاصلۀ <span class="formula">$\\displaystyle A $</span> از محور <span class="formula">$\\displaystyle x $</span> ها است؟<br></div>',
          answer: '<div class="answer" dir="rtl"><div align="left"><div class="formula-pack"><span class="formula">$\\displaystyle \\left. \\begin{array}{ll} \\begin{matrix}\\text{ها}\\end{matrix}y \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix}=\\sqrt{{{2}^{2}}+{{3}^{2}}}=\\sqrt{13} \\\\ \\begin{matrix}\\text{ها}\\end{matrix}x \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} =\\sqrt{{{m}^{2}}+9} \\\\ \\end{array} \\right\\}$</span> <span class="formula">$\\displaystyle \\Rightarrow \\sqrt{13}=3\\sqrt{{{m}^{2}}+9}$</span></div></div><div align="left"><div class="formula-pack">‌<span class="formula">$\\displaystyle \\Rightarrow 13=9({{m}^{2}}+9) $</span> <span class="formula">$\\displaystyle \\Rightarrow {{m}^{2}}+9=\\frac{13}{9}$</span> <span class="formula">$\\displaystyle \\Rightarrow {{m}^{2}}=\\frac{13}{9}-9&lt;0$</span></div></div>‌پس برای <span class="formula">$\\displaystyle m $</span> مقداری پيدا نمی‌شود.</div>',
          source_data: {
            resultText: 'Done',
            totalUsageCount: 41,
            answerId: '1232748',
            rowNo: 13231,
            choice1selectedCounts: 78,
            correctCounts: 78,
            choiceId3: '1232750',
            hasHint: false,
            discriminationIndex: 0.4,
            choiceId2: '1232749',
            choiceId1: '1232748',
            resultCode: 1,
            overallQuestionCount: '15149',
            choiceId4: '1232751',
            questionTypeId: '10',
            noAnswerCounts: 66,
            choiceDescription2: '<div class="choice" dir="rtl">یک <br></div>',
            createdAt: '1586955771943',
            choiceDescription1: '<div class="choice" dir="rtl">صفر <br></div>',
            incorrectCounts: 40,
            choice3selectedCounts: 33,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 275,
                  publisherBookId: 2,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,2,jpg',
                  publisherBookName: 'هندسه (3)، پایۀ دوازدهم',
                  questionOrder: 23,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            id: '531207',
            mediaRequestCount: 0,
            choiceDescription4: '<div class="choice" dir="rtl">بی‌شمار <br></div>',
            choiceDescription3: '<div class="choice" dir="rtl">دو <br></div>',
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">به ازای چند مقدار <span class="formula">$\\displaystyle m $</span> فاصلۀ نقطۀ <span class="formula">$\\displaystyle A(2\\ ,\\ m\\ ,\\ 3)$</span> از محور <span class="formula">$\\displaystyle y $</span> ها سه برابر فاصلۀ <span class="formula">$\\displaystyle A $</span> از محور <span class="formula">$\\displaystyle x $</span> ها است؟<br></div>',
            like: false,
            entryDate: '1592463426947',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23787}]}',
            cnt: '15149',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            choice4selectedCounts: 0,
            answer: '<div class="answer" dir="rtl"><div align="left"><div class="formula-pack"><span class="formula">$\\displaystyle \\left. \\begin{array}{ll} \\begin{matrix}\\text{ها}\\end{matrix}y \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix}=\\sqrt{{{2}^{2}}+{{3}^{2}}}=\\sqrt{13} \\\\ \\begin{matrix}\\text{ها}\\end{matrix}x \\begin{matrix}\\text{از محور}\\end{matrix} A \\begin{matrix}\\text{فاصلۀ}\\end{matrix} =\\sqrt{{{m}^{2}}+9} \\\\ \\end{array} \\right\\}$</span> <span class="formula">$\\displaystyle \\Rightarrow \\sqrt{13}=3\\sqrt{{{m}^{2}}+9}$</span></div></div><div align="left"><div class="formula-pack">‌<span class="formula">$\\displaystyle \\Rightarrow 13=9({{m}^{2}}+9) $</span> <span class="formula">$\\displaystyle \\Rightarrow {{m}^{2}}+9=\\frac{13}{9}$</span> <span class="formula">$\\displaystyle \\Rightarrow {{m}^{2}}=\\frac{13}{9}-9&lt;0$</span></div></div>‌پس برای <span class="formula">$\\displaystyle m $</span> مقداری پيدا نمی‌شود.</div>',
            countQuestionTypeId: '15074',
            disable: false,
            bookmarkCount: 0,
            difficultyLevelId: '20',
            choice2selectedCounts: 7,
            creatorsLastUsageDate: '1601324970000',
            topicList: [
              {
                id: 23787,
                name: 'محاسبه تصویر، قرینه و فاصله نقطه از محورها و صفحات مختصات',
                deph: 0,
                moduleId: 417,
                parentTopicId: 23765,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23765,
                  name: 'فصل سوم : بردارها',
                  deph: 0,
                  moduleId: 417,
                  order: 120,
                  isDisabled: false
                },
                module: {
                  id: 417,
                  name: 'هندسه 3',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 20,
              value: 3,
              name: 'متوسط'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d528',
          level: 2,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ed',
            title: 'گسسته',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{21}$</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{14}$</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{33}$</span></div>',
              order: 3,
              answer: true
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{6}$</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: "<div class=\"question\" dir=\"rtl\">اگر <span class=\"formula\">$\\displaystyle A^{'}$</span> تصویر نقطۀ <span class=\"formula\">$\\displaystyle  A(1,2,-1)$</span> روی صفحۀ <span class=\"formula\">$\\displaystyle xz $</span>، <span class=\"formula\">$\\displaystyle B^{'}$</span> قرینۀ نقطۀ <span class=\"formula\">$\\displaystyle B(3,0,3)$</span> نسبت به صفحۀ <span class=\"formula\">$\\displaystyle yz  $</span> و  <span class=\"formula\">$\\displaystyle C^{'}$</span> قرینۀ نقطۀ <span class=\"formula\">$\\displaystyle C(-1,-2,1)$</span> نسبت به محور <span class=\"formula\">$\\displaystyle Oy  $</span> باشد، آن‌گاه طول میانۀ وارد بر ضلع <span class=\"formula\">$\\displaystyle A^{'}C^{'}  $</span> در مثلث <span class=\"formula\">$\\displaystyle A^{'}B^{'}C^{'}  $</span> چقدر است؟<br></div>",
          answer: "<div class=\"answer\" dir=\"rtl\"><div align=\"left\">‌<span class=\"formula\">$\\displaystyle  A=(1, 2, -1) \\xrightarrow [xz]{\\text{تصویر روی}}A^{'}=(1, 0, -1)$</span></div><div align=\"left\"><span class=\"formula\">$\\displaystyle B=(3, 0, 3 ) \\xrightarrow [yz]{\\text{قرینه نسبت به}}B^{'}=(-3, 0, 3)$</span><br><span class=\"formula\">$\\displaystyle C=(-1, -2, 1 ) \\xrightarrow [oy]{\\text{قرینه نسبت به}}C^{'}=(1, -2, -1) $</span><br><div align=\"right\">ابتدا وسط ضلع <span class=\"formula\">$\\displaystyle A^{'}C^{'} $</span> را مشخص می‌کنیم:<br></div></div><table class=\"layoutdualColumn\"><tbody><tr><td class=\"dualColumnFirstCell\"><div align=\"right\">‌<img src=\"https://www.monta.ir/render?id=300054\">‌</div></td><td class=\"dualColumnSecondCell\"><div align=\"left\"><span class=\"formula\">$\\displaystyle M=(\\frac{1+1}{2}, \\frac{0-2}{2}, \\frac{-1-1}{2}) = (1, -1, -1) $</span></div></td></tr></tbody></table>‌بنابراین:<br><div align=\"left\">‌<span class=\"formula\">$\\displaystyle |B^{'}M|=\\sqrt{4^2+1^2+4^2}=\\sqrt{33} $</span></div></div>",
          source_data: {
            resultText: 'Done',
            totalUsageCount: 52,
            answerId: '1238266',
            rowNo: 13234,
            choice1selectedCounts: 3,
            correctCounts: 16,
            choiceId3: '1238266',
            hasHint: false,
            discriminationIndex: 0.1,
            choiceId2: '1238265',
            choiceId1: '1238264',
            resultCode: 1,
            overallQuestionCount: '15149',
            choiceId4: '1238267',
            questionTypeId: '10',
            noAnswerCounts: 51,
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{14}$</span></div>',
            createdAt: '1587562384693',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{21}$</span></div>',
            incorrectCounts: 15,
            choice3selectedCounts: 16,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 277,
                  publisherBookId: 2,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,2,jpg',
                  publisherBookName: 'هندسه (3)، پایۀ دوازدهم',
                  questionOrder: 55,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            id: '532609',
            mediaRequestCount: 0,
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{6}$</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{33}$</span></div>',
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: "<div class=\"question\" dir=\"rtl\">اگر <span class=\"formula\">$\\displaystyle A^{'}$</span> تصویر نقطۀ <span class=\"formula\">$\\displaystyle  A(1,2,-1)$</span> روی صفحۀ <span class=\"formula\">$\\displaystyle xz $</span>، <span class=\"formula\">$\\displaystyle B^{'}$</span> قرینۀ نقطۀ <span class=\"formula\">$\\displaystyle B(3,0,3)$</span> نسبت به صفحۀ <span class=\"formula\">$\\displaystyle yz  $</span> و  <span class=\"formula\">$\\displaystyle C^{'}$</span> قرینۀ نقطۀ <span class=\"formula\">$\\displaystyle C(-1,-2,1)$</span> نسبت به محور <span class=\"formula\">$\\displaystyle Oy  $</span> باشد، آن‌گاه طول میانۀ وارد بر ضلع <span class=\"formula\">$\\displaystyle A^{'}C^{'}  $</span> در مثلث <span class=\"formula\">$\\displaystyle A^{'}B^{'}C^{'}  $</span> چقدر است؟<br></div>",
            like: false,
            entryDate: '1592463426947',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23787}]}',
            cnt: '15149',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            choice4selectedCounts: 7,
            answer: "<div class=\"answer\" dir=\"rtl\"><div align=\"left\">‌<span class=\"formula\">$\\displaystyle  A=(1, 2, -1) \\xrightarrow [xz]{\\text{تصویر روی}}A^{'}=(1, 0, -1)$</span></div><div align=\"left\"><span class=\"formula\">$\\displaystyle B=(3, 0, 3 ) \\xrightarrow [yz]{\\text{قرینه نسبت به}}B^{'}=(-3, 0, 3)$</span><br><span class=\"formula\">$\\displaystyle C=(-1, -2, 1 ) \\xrightarrow [oy]{\\text{قرینه نسبت به}}C^{'}=(1, -2, -1) $</span><br><div align=\"right\">ابتدا وسط ضلع <span class=\"formula\">$\\displaystyle A^{'}C^{'} $</span> را مشخص می‌کنیم:<br></div></div><table class=\"layoutdualColumn\"><tbody><tr><td class=\"dualColumnFirstCell\"><div align=\"right\">‌<img src=\"https://www.monta.ir/render?id=300054\">‌</div></td><td class=\"dualColumnSecondCell\"><div align=\"left\"><span class=\"formula\">$\\displaystyle M=(\\frac{1+1}{2}, \\frac{0-2}{2}, \\frac{-1-1}{2}) = (1, -1, -1) $</span></div></td></tr></tbody></table>‌بنابراین:<br><div align=\"left\">‌<span class=\"formula\">$\\displaystyle |B^{'}M|=\\sqrt{4^2+1^2+4^2}=\\sqrt{33} $</span></div></div>",
            countQuestionTypeId: '15074',
            disable: false,
            bookmarkCount: 0,
            difficultyLevelId: '20',
            choice2selectedCounts: 5,
            creatorsLastUsageDate: '1597818983000',
            topicList: [
              {
                id: 23787,
                name: 'محاسبه تصویر، قرینه و فاصله نقطه از محورها و صفحات مختصات',
                deph: 0,
                moduleId: 417,
                parentTopicId: 23765,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23765,
                  name: 'فصل سوم : بردارها',
                  deph: 0,
                  moduleId: 417,
                  order: 120,
                  isDisabled: false
                },
                module: {
                  id: 417,
                  name: 'هندسه 3',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 20,
              value: 3,
              name: 'متوسط'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d529',
          level: 2,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ed',
            title: 'گسسته',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4 $</span></div>',
              order: 1,
              answer: true
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2 $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2\\sqrt{2} $</span></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{2} $</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: "<div class=\"question\" dir=\"rtl\">اگر نقطۀ <span class=\"formula\">$\\displaystyle {A}'$</span> قرينۀ نقطۀ <span class=\"formula\">$\\displaystyle A(-1\\ ,\\ 2\\ ,\\ -2)$</span> نسبت به صفحۀ <span class=\"formula\">$\\displaystyle xz $</span> و <span class=\"formula\">$\\displaystyle A'' $</span> قرينۀ نقطۀ <span class=\"formula\">$\\displaystyle A $</span> نسبت به محور <span class=\"formula\">$\\displaystyle x $</span> ها باشد، آن‌گاه اندازۀ <span class=\"formula\">$\\displaystyle \\overrightarrow{{A}'{A}''}$</span> كدام است؟</div>",
          answer: "<div class=\"answer\" dir=\"rtl\"><div align=\"left\"><span class=\"formula\">$\\displaystyle  \\left\\{ \\begin{array}{ll} A=(-1,2,-2)\\xrightarrow[xz \\begin{matrix} \\text{صفحۀ} \\end{matrix}]{ \\text{قرینه نسبت به} } A'=(-1,-2,-2)\\\\ A=(-1,2,-2)\\xrightarrow[\\begin{matrix} \\text{ها} \\end{matrix} x \\begin{matrix} \\text{محور} \\end{matrix}]{ \\text{قرینه نسبت به}}A''=(-1,-2,2)\\end{array}\\right.$</span><br><div align=\"right\">‌پس <span class=\"formula\">$\\displaystyle  \\overrightarrow{A'A''}=(0,0,4)$</span> درنتیجه <span class=\"formula\">$\\displaystyle | \\overrightarrow{A'A''}|=4 $</span>.</div></div></div>",
          source_data: {
            resultText: 'Done',
            totalUsageCount: 33,
            answerId: '1232768',
            rowNo: 13233,
            choice1selectedCounts: 8,
            correctCounts: 8,
            choiceId3: '1232770',
            hasHint: false,
            discriminationIndex: 0.47,
            choiceId2: '1232769',
            choiceId1: '1232768',
            resultCode: 1,
            overallQuestionCount: '15149',
            choiceId4: '1232771',
            questionTypeId: '10',
            noAnswerCounts: 23,
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2 $</span></div>',
            createdAt: '1586956961390',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  4 $</span></div>',
            incorrectCounts: 3,
            choice3selectedCounts: 0,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 160,
                  publishYear: {
                    id: 20,
                    name: '1398',
                    title: '98 - 97'
                  },
                  examNo: null,
                  majorId: 60,
                  pageNo: 277,
                  publisherBookId: 2,
                  imageExtension: 'jpg',
                  publisherBookImage: '871581,2,jpg',
                  publisherBookName: 'هندسه (3)، پایۀ دوازدهم',
                  questionOrder: 50,
                  origin: {
                    id: 160,
                    name: 'خوشخوان',
                    pic: 'https://www.monta.ir/client_resources/images/img/source-khoshkhan-color.svg'
                  }
                }
              ]
            },
            id: '531212',
            mediaRequestCount: 0,
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  \\sqrt{2} $</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  2\\sqrt{2} $</span></div>',
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: "<div class=\"question\" dir=\"rtl\">اگر نقطۀ <span class=\"formula\">$\\displaystyle {A}'$</span> قرينۀ نقطۀ <span class=\"formula\">$\\displaystyle A(-1\\ ,\\ 2\\ ,\\ -2)$</span> نسبت به صفحۀ <span class=\"formula\">$\\displaystyle xz $</span> و <span class=\"formula\">$\\displaystyle A'' $</span> قرينۀ نقطۀ <span class=\"formula\">$\\displaystyle A $</span> نسبت به محور <span class=\"formula\">$\\displaystyle x $</span> ها باشد، آن‌گاه اندازۀ <span class=\"formula\">$\\displaystyle \\overrightarrow{{A}'{A}''}$</span> كدام است؟</div>",
            like: false,
            entryDate: '1592463426947',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23787}]}',
            cnt: '15149',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 4,
            numberOfChildren: 0,
            choice4selectedCounts: 0,
            answer: "<div class=\"answer\" dir=\"rtl\"><div align=\"left\"><span class=\"formula\">$\\displaystyle  \\left\\{ \\begin{array}{ll} A=(-1,2,-2)\\xrightarrow[xz \\begin{matrix} \\text{صفحۀ} \\end{matrix}]{ \\text{قرینه نسبت به} } A'=(-1,-2,-2)\\\\ A=(-1,2,-2)\\xrightarrow[\\begin{matrix} \\text{ها} \\end{matrix} x \\begin{matrix} \\text{محور} \\end{matrix}]{ \\text{قرینه نسبت به}}A''=(-1,-2,2)\\end{array}\\right.$</span><br><div align=\"right\">‌پس <span class=\"formula\">$\\displaystyle  \\overrightarrow{A'A''}=(0,0,4)$</span> درنتیجه <span class=\"formula\">$\\displaystyle | \\overrightarrow{A'A''}|=4 $</span>.</div></div></div>",
            countQuestionTypeId: '15074',
            disable: false,
            bookmarkCount: 0,
            difficultyLevelId: '20',
            choice2selectedCounts: 3,
            creatorsLastUsageDate: '1601324970000',
            topicList: [
              {
                id: 23787,
                name: 'محاسبه تصویر، قرینه و فاصله نقطه از محورها و صفحات مختصات',
                deph: 0,
                moduleId: 417,
                parentTopicId: 23765,
                order: 135,
                isDisabled: false,
                parentTopic: {
                  id: 23765,
                  name: 'فصل سوم : بردارها',
                  deph: 0,
                  moduleId: 417,
                  order: 120,
                  isDisabled: false
                },
                module: {
                  id: 417,
                  name: 'هندسه 3',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 20,
              value: 3,
              name: 'متوسط'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d52a',
          level: 1,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ed',
            title: 'گسسته',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{\\pi}$</span></div>',
              order: 1,
              answer: false
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{{2}}{\\pi}$</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{2\\sqrt{2}}{\\pi}$</span></div>',
              order: 3,
              answer: true
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{2\\pi}$</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: '<div class="question" dir="rtl">قسمتی از نمودار تابع <span class="formula">$\\displaystyle f(x)=\\sin x+\\cos x $</span> در شکل مقابل رسم شده است. شیب خط گذرنده از نقاط <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> کدام است؟<br><div class="floatLeft"><img src="https://node1.alaatv.com/aaa/montaFile/render_id_571650" width="100" height="100"></div>&nbsp;</div>',
          answer: '<div class="answer" dir="rtl">ابتدا توجه کنید که:<br><div align="left"><span class="formula">$\\displaystyle f(x)=\\sin x+\\cos x=\\sqrt{2}\\sin (x+\\frac{\\pi }{4})$</span></div>‌بنابراین اگر نمودار تابع <span class="formula">$\\displaystyle y=\\sin x $</span> را <span class="formula">$\\displaystyle  \\frac{\\pi}{4}$</span> واحد به چپ ببریم و عرض نقاط آن‌را <span class="formula">$\\displaystyle  \\sqrt{2}$</span> برابر کنیم نمودار تابع <span class="formula">$\\displaystyle f $</span> به‌دست می‌آید. پس نقطۀ <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> روی نمودار تابع <span class="formula">$\\displaystyle f $</span> متناظر نقاط <span class="formula">$\\displaystyle  (\\frac{\\pi}{2},1)$</span> و <span class="formula">$\\displaystyle  (\\frac{3\\pi}{2},-1)$</span> روی نمودار تابع <span class="formula">$\\displaystyle y=\\sin x $</span> هستند بنابراین:<br><div align="left"><span class="formula">$\\displaystyle A=(\\frac{\\pi }{4},\\sqrt{2})\\,\\,\\,\\,\\,,\\,\\,\\,\\,\\,\\,B=(\\frac{5\\pi }{4},-\\sqrt{2}) $</span></div>‌پس شیب خط گذرنده از نقاط <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> برابر است با:<br><div align="left">‌<span class="formula">$\\displaystyle {{m}_{AB}}=\\frac{{{y}_{A}}-{{y}_{B}}}{{{x}_{A}}-{{x}_{B}}}=\\frac{\\sqrt{2}-(-\\sqrt{2})}{\\dfrac{\\pi }{4}-(\\dfrac{5\\pi }{4})}=\\frac{2\\sqrt{2}}{-\\pi }$</span></div></div>',
          source_data: {
            resultText: 'Done',
            correctCounts: 0,
            choiceId3: '1437398',
            discriminationIndex: 0,
            choiceId2: '1437397',
            choiceId1: '1437396',
            overallQuestionCount: '15149',
            choiceId4: '1437399',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{{2}}{\\pi}$</span></div>',
            createdAt: '1618456703430',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{\\pi}$</span></div>',
            choice3selectedCounts: 0,
            id: '615900',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{2\\pi}$</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{2\\sqrt{2}}{\\pi}$</span></div>',
            like: false,
            entryDate: '1619865555477',
            authorInfo: '{"personInfoList":[{"id":1616148,"imageId":551612,"name":"کاظم اجلالی"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 2,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '20',
            choice2selectedCounts: 0,
            totalUsageCount: 2,
            answerId: '1437398',
            rowNo: 13230,
            choice1selectedCounts: 0,
            hasHint: true,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 1,
            incorrectCounts: 0,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 169,
                  examNo: 20,
                  majorId: 60,
                  pageNo: null,
                  publisherBookId: null,
                  imageExtension: null,
                  publisherBookImage: null,
                  publisherBookName: null,
                  questionOrder: 113,
                  origin: {
                    id: 169,
                    name: 'حامد مقدس زاده',
                    pic: 'https://www.monta.ir/render?id=556173'
                  }
                }
              ]
            },
            mediaRequestCount: 0,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">قسمتی از نمودار تابع <span class="formula">$\\displaystyle f(x)=\\sin x+\\cos x $</span> در شکل مقابل رسم شده است. شیب خط گذرنده از نقاط <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> کدام است؟<br><div class="floatLeft"><img src="https://www.monta.ir/render?id=571650"></div>&nbsp;</div>',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23508}]}',
            cnt: '15149',
            authorId: '1616148',
            choice4selectedCounts: 0,
            answer: '<div class="answer" dir="rtl">ابتدا توجه کنید که:<br><div align="left"><span class="formula">$\\displaystyle f(x)=\\sin x+\\cos x=\\sqrt{2}\\sin (x+\\frac{\\pi }{4})$</span></div>‌بنابراین اگر نمودار تابع <span class="formula">$\\displaystyle y=\\sin x $</span> را <span class="formula">$\\displaystyle  \\frac{\\pi}{4}$</span> واحد به چپ ببریم و عرض نقاط آن‌را <span class="formula">$\\displaystyle  \\sqrt{2}$</span> برابر کنیم نمودار تابع <span class="formula">$\\displaystyle f $</span> به‌دست می‌آید. پس نقطۀ <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> روی نمودار تابع <span class="formula">$\\displaystyle f $</span> متناظر نقاط <span class="formula">$\\displaystyle  (\\frac{\\pi}{2},1)$</span> و <span class="formula">$\\displaystyle  (\\frac{3\\pi}{2},-1)$</span> روی نمودار تابع <span class="formula">$\\displaystyle y=\\sin x $</span> هستند بنابراین:<br><div align="left"><span class="formula">$\\displaystyle A=(\\frac{\\pi }{4},\\sqrt{2})\\,\\,\\,\\,\\,,\\,\\,\\,\\,\\,\\,B=(\\frac{5\\pi }{4},-\\sqrt{2}) $</span></div>‌پس شیب خط گذرنده از نقاط <span class="formula">$\\displaystyle A $</span> و <span class="formula">$\\displaystyle B $</span> برابر است با:<br><div align="left">‌<span class="formula">$\\displaystyle {{m}_{AB}}=\\frac{{{y}_{A}}-{{y}_{B}}}{{{x}_{A}}-{{x}_{B}}}=\\frac{\\sqrt{2}-(-\\sqrt{2})}{\\dfrac{\\pi }{4}-(\\dfrac{5\\pi }{4})}=\\frac{2\\sqrt{2}}{-\\pi }$</span></div></div>',
            disable: false,
            bookmarkCount: 0,
            topicList: [
              {
                id: 23508,
                name: 'تناوب و تانژانت و نمودارهای مثلثاتی',
                deph: 0,
                moduleId: 409,
                parentTopicId: 23262,
                order: 130,
                isDisabled: false,
                parentTopic: {
                  id: 23262,
                  name: 'روابط مثلثاتی',
                  deph: 0,
                  moduleId: 409,
                  parentTopicId: 23221,
                  order: 110,
                  isDisabled: false,
                  parentTopic: {
                    id: 23221,
                    name: 'مثلثات',
                    deph: 0,
                    moduleId: 409,
                    order: 85,
                    isDisabled: false
                  }
                },
                module: {
                  id: 409,
                  name: 'حسابان 2 و کنکور پایه',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 20,
              value: 3,
              name: 'متوسط'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d52b',
          level: 1,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        },
        {
          sub_category: {
            id: '60b7875428f350277f04c5ed',
            title: 'گسسته',
            category_id: '60b7858d743940688b23c7f4',
            updated_at: '2021-06-02 17:57:48'
          },
          choices: [
            {
              id: 1,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -1 $</span></div>',
              order: 1,
              answer: true
            },
            {
              id: 2,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{1}{2} $</span></div>',
              order: 2,
              answer: false
            },
            {
              id: 3,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\sqrt{2} $</span></div>',
              order: 3,
              answer: false
            },
            {
              id: 4,
              title: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{2} $</span></div>',
              order: 4,
              answer: false
            }
          ],
          statement: '<div class="question" dir="rtl">قسمتی از نمودار تابع <span class="formula">$\\displaystyle f(x)=a\\cos(\\pi - bx) $</span> در شکل مقابل رسم شده است. مقدار <span class="formula">$\\displaystyle f(\\frac{5}{3}) $</span> کدام است؟ <br><div class="floatLeft"><img src="https://node1.alaatv.com/aaa/montaFile/render_id_555930" width="100" height="100">&nbsp;</div>&nbsp;</div>',
          answer: '<div class="answer" dir="rtl">می‌دانیم برد تابع <span class="formula">$\\displaystyle  a\\cos(kx) $</span> برابر با <span class="formula">$\\displaystyle [-|a| , |a|] $</span> است. برد نمودار رسم شده <span class="formula">$\\displaystyle  [-2,2] $</span> است پس <span class="formula">$\\displaystyle  |a|=2 $</span> و داریم <span class="formula">$\\displaystyle  a=\\pm 2 $</span>. <br>اگر قرار دهیم <span class="formula">$\\displaystyle a=-2 $</span> به ازای <span class="formula">$\\displaystyle  x=0 $</span> داریم <span class="formula">$\\displaystyle f_{(0)}=-2\\cos(\\pi)=2 $</span> درحالی‌که از نمودار می‌دانیم این چنین نیست پس: <span class="formula">$\\displaystyle  a=2 $</span>.<br>از نمودار می‌بینیم که در بازۀ <span class="formula">$\\displaystyle  x=-7.5 $</span> تا <span class="formula">$\\displaystyle  x=17.5 $</span> به اندازۀ <span class="formula">$\\displaystyle  2.5 $</span> دورۀ داریم پس:<br><div align="left"><div class="formula-pack"><span class="formula">$\\displaystyle 2.5T=17.5-(-7.5)=25 $</span><span class="formula">$\\displaystyle \\Rightarrow T=\\frac{25}{2.5}=10 $</span></div></div> می‌دانیم <span class="formula">$\\displaystyle  \\cos(\\pi-bx) $</span> برابر با <span class="formula">$\\displaystyle -\\cos(bx) $</span> است و در نتیجه دوره تناوبش برابر با <span class="formula">$\\displaystyle \\frac{2\\pi}{|b|} $</span> می‌شود:<br><div align="left"><div class="formula-pack">‌<span class="formula">$\\displaystyle \\frac{2\\pi}{|b|}=10 $</span> <span class="formula">$\\displaystyle \\Rightarrow b=\\pm\\frac{2\\pi}{10}=\\pm\\frac{\\pi}{5} $</span></div></div>‌چون که نمودار نسبت به محور <span class="formula">$\\displaystyle  y $</span> متقارن است فرقی ندارد کدام <span class="formula">$\\displaystyle  b $</span> را انتخاب کنیم. <span class="formula">$\\displaystyle  b=\\frac{\\pi}{5} $</span> را انتخاب می‌کنیم:<br><div align="left">‌<span class="formula">$\\displaystyle f(\\frac{5}{3})=2\\cos(\\pi-\\frac{\\pi}{5}\\times \\frac{5}{3}) = 2\\cos(\\frac{2\\pi}{3})=2\\times -\\frac{1}{2}=-1&nbsp; $</span></div></div>',
          source_data: {
            resultText: 'Done',
            correctCounts: 9,
            choiceId3: '1418830',
            discriminationIndex: 0.25,
            choiceId2: '1418829',
            choiceId1: '1418828',
            overallQuestionCount: '15149',
            choiceId4: '1418831',
            choiceDescription2: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{1}{2} $</span></div>',
            createdAt: '1614516038900',
            choiceDescription1: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -1 $</span></div>',
            choice3selectedCounts: 1,
            id: '609937',
            choiceDescription4: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\frac{\\sqrt{2}}{2} $</span></div>',
            choiceDescription3: '<div class="choice" dir="rtl"><span class="formula">$\\displaystyle  -\\sqrt{2} $</span></div>',
            like: false,
            entryDate: '1615272665930',
            authorInfo: '{"personInfoList":[{"id":1616148,"imageId":551612,"name":"کاظم اجلالی"}]}',
            hasNote: false,
            bookmark: false,
            choicesColumnNo: 2,
            numberOfChildren: 0,
            countQuestionTypeId: '15074',
            difficultyLevelId: '30',
            choice2selectedCounts: 1,
            totalUsageCount: 74,
            answerId: '1418828',
            rowNo: 13229,
            choice1selectedCounts: 9,
            hasHint: true,
            resultCode: 1,
            questionTypeId: '10',
            noAnswerCounts: 47,
            incorrectCounts: 3,
            unVerifiedCommentNo: 0,
            popularity: 0,
            origins: {
              questionOriginList: [
                {
                  originId: 169,
                  examNo: 5,
                  majorId: 1,
                  pageNo: null,
                  publisherBookId: null,
                  imageExtension: null,
                  publisherBookImage: null,
                  publisherBookName: null,
                  questionOrder: 83,
                  origin: {
                    id: 169,
                    name: 'حامد مقدس زاده',
                    pic: 'https://www.monta.ir/render?id=556173'
                  }
                }
              ]
            },
            mediaRequestCount: 0,
            answerAuthorInfo: '{"personInfoList":[{"id":-4,"imageId":533239,"name":"منتا"}]}',
            commentNo: 0,
            question: '<div class="question" dir="rtl">قسمتی از نمودار تابع <span class="formula">$\\displaystyle f(x)=a\\cos(\\pi - bx) $</span> در شکل مقابل رسم شده است. مقدار <span class="formula">$\\displaystyle f(\\frac{5}{3}) $</span> کدام است؟ <br><div class="floatLeft"><img src="https://www.monta.ir/render?id=555930">&nbsp;</div>&nbsp;</div>',
            mediaHasRequested: false,
            topics: '{"idList":[{"id":23508}]}',
            cnt: '15149',
            authorId: '1616148',
            choice4selectedCounts: 1,
            answer: '<div class="answer" dir="rtl">می‌دانیم برد تابع <span class="formula">$\\displaystyle  a\\cos(kx) $</span> برابر با <span class="formula">$\\displaystyle [-|a| , |a|] $</span> است. برد نمودار رسم شده <span class="formula">$\\displaystyle  [-2,2] $</span> است پس <span class="formula">$\\displaystyle  |a|=2 $</span> و داریم <span class="formula">$\\displaystyle  a=\\pm 2 $</span>. <br>اگر قرار دهیم <span class="formula">$\\displaystyle a=-2 $</span> به ازای <span class="formula">$\\displaystyle  x=0 $</span> داریم <span class="formula">$\\displaystyle f_{(0)}=-2\\cos(\\pi)=2 $</span> درحالی‌که از نمودار می‌دانیم این چنین نیست پس: <span class="formula">$\\displaystyle  a=2 $</span>.<br>از نمودار می‌بینیم که در بازۀ <span class="formula">$\\displaystyle  x=-7.5 $</span> تا <span class="formula">$\\displaystyle  x=17.5 $</span> به اندازۀ <span class="formula">$\\displaystyle  2.5 $</span> دورۀ داریم پس:<br><div align="left"><div class="formula-pack"><span class="formula">$\\displaystyle 2.5T=17.5-(-7.5)=25 $</span><span class="formula">$\\displaystyle \\Rightarrow T=\\frac{25}{2.5}=10 $</span></div></div> می‌دانیم <span class="formula">$\\displaystyle  \\cos(\\pi-bx) $</span> برابر با <span class="formula">$\\displaystyle -\\cos(bx) $</span> است و در نتیجه دوره تناوبش برابر با <span class="formula">$\\displaystyle \\frac{2\\pi}{|b|} $</span> می‌شود:<br><div align="left"><div class="formula-pack">‌<span class="formula">$\\displaystyle \\frac{2\\pi}{|b|}=10 $</span> <span class="formula">$\\displaystyle \\Rightarrow b=\\pm\\frac{2\\pi}{10}=\\pm\\frac{\\pi}{5} $</span></div></div>‌چون که نمودار نسبت به محور <span class="formula">$\\displaystyle  y $</span> متقارن است فرقی ندارد کدام <span class="formula">$\\displaystyle  b $</span> را انتخاب کنیم. <span class="formula">$\\displaystyle  b=\\frac{\\pi}{5} $</span> را انتخاب می‌کنیم:<br><div align="left">‌<span class="formula">$\\displaystyle f(\\frac{5}{3})=2\\cos(\\pi-\\frac{\\pi}{5}\\times \\frac{5}{3}) = 2\\cos(\\frac{2\\pi}{3})=2\\times -\\frac{1}{2}=-1&nbsp; $</span></div></div>',
            disable: false,
            bookmarkCount: 0,
            topicList: [
              {
                id: 23508,
                name: 'تناوب و تانژانت و نمودارهای مثلثاتی',
                deph: 0,
                moduleId: 409,
                parentTopicId: 23262,
                order: 130,
                isDisabled: false,
                parentTopic: {
                  id: 23262,
                  name: 'روابط مثلثاتی',
                  deph: 0,
                  moduleId: 409,
                  parentTopicId: 23221,
                  order: 110,
                  isDisabled: false,
                  parentTopic: {
                    id: 23221,
                    name: 'مثلثات',
                    deph: 0,
                    moduleId: 409,
                    order: 85,
                    isDisabled: false
                  }
                },
                module: {
                  id: 409,
                  name: 'حسابان 2 و کنکور پایه',
                  moduleGroupId: 6,
                  isCommon: false,
                  isDisabled: false,
                  hasOnlineContents: true,
                  moduleGroup: {
                    id: 6,
                    name: 'ریاضیات'
                  },
                  majors: [
                    {
                      id: 60,
                      name: 'رياضي'
                    }
                  ],
                  grade: {
                    id: 12,
                    name: 'دوازدهم',
                    levelId: 60,
                    level: {
                      id: 60,
                      name: 'دبیرستان دوره دوم'
                    }
                  }
                }
              }
            ],
            difficultyLevel: {
              id: 30,
              value: 4,
              name: 'سخت'
            }
          },
          source_name: 'monta',
          created_at: '1970-01-01 03:30:02',
          updated_at: '1970-01-01 03:30:02',
          _v: 2,
          descriptive_answer: null,
          type: 'konkur',
          id: '60a5fa09f55154475e62d52c',
          level: 1,
          photos: [],
          authors: [],
          confirmers: [],
          has_confirmed: null,
          status: '60c7102418e65826bc7da373'
        }
      ])
    },
    checkBox: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      dialougeExpanded: false,
      chartOptions: {
        chart: {
          height: '95',
          width: '110',
          type: 'pie',
          plotShadow: false
        },
        credits: {
          enabled: false
        },
        tooltip: {
          formatter: function () {
            const point = this.point
            console.log(point)
            return '<b>' + point.name + ':' + '&nbsp' + '<b>' + point.y + '&nbsp' + 'عدد'
          }
        },
        plotOptions: {
          pie: {
            innerSize: '98%',
            startAngle: -250,
            endAngle: 360,
            borderWidth: 13,
            center: ['50%', '52%'],
            size: '112%',
            borderColor: null,
            slicedOffset: 0,
            dataLabels: {
              connectorWidth: 0
            }
          }
        },
        title: {
          y: 26,
          style: {
            useHTML: true
          },
          verticalAlign: 'middle',
          floating: true,
          text: ''
        },
        series: [{
          id: 'idData',
          data: []
        }]
      }
    }
  },
  watch: {
    'questions.list.length': function () {
      this.setDifficultyLevelsChart()
      this.numberOfQuestions()
      this.replaceTitle()
    }
  },
  computed: {
    countOfSelectedSubCategory () {
      const subCategories = this.questions.list.filter((v, i, a) => a.findIndex(question => question.sub_category.id === v.sub_category.id) === i).map(question => question.sub_category)
      subCategories.forEach(subCategory => {
        subCategory.selectedQuestionsCount = this.questions.list.filter(question => question.sub_category.id === subCategory.id).length
      })

      return subCategories
    },
    questionLvl () {
      return {
        hard: this.questions.list.filter(question => question.level === 1).length,
        medium: this.questions.list.filter(question => question.level === 2).length,
        easy: this.questions.list.filter(question => question.level === 3).length
      }
    }
  },
  created () {
    this.setDifficultyLevelsChart()
    this.replaceTitle()
  },
  methods: {
    selectAllQuestions () {
      this.$emit('selectAllQuestions')
    },
    replaceTitle () {
      this.chartOptions.title.text = '<span class="title-1"> ' + this.numberOfQuestions() + '<br>' + '<br>' + '</span>' + '<span dy="-8" class="title-2">سوال</span>'
    },
    setDifficultyLevelsChart () {
      this.chartOptions.series[0].data = [
        { name: 'متوسط', y: this.questionLvl.medium, color: '#FFCA28' },
        { name: 'آسان', y: this.questionLvl.easy, color: '#8ED6FF' },
        { name: 'سخت', y: this.questionLvl.hard, color: '#DA5F5C' }
      ]
    },
    deleteFilter (id) {
      this.countOfSelectedSubCategory = this.countOfSelectedSubCategory.filter(e => e.id !== id)
    },
    deleteAllChoose (id) {
      this.$emit('deleteAllQuestions')
    },
    numberOfQuestions () {
      const x = this.questionLvl.hard + this.questionLvl.medium + this.questionLvl.easy
      return x
    },
    RemoveSelectedChoice (event) {
      this.$emit('RemoveChoice', event.category_id)
    }
  }
}
</script>

<style lang="scss" scoped>
.question-Bank-ToolBar {
  .toolbar-card {
    display: flex;
    min-width: 85%;
    justify-content: space-between;
    padding: 0px 0px 0px 0px;

    .toolbar-card-actions {
      width: 100%;
      display: flex;

      .toolbar-btn {
        align-items: center;
        display: flex;

        .delete-choices-btn {
          background-color: var(--3a-Neutral2);
          width: 144px;
          height: 40px;
        }

        .add-to-btn {
          background-color: var(--3a-Primary);
          color: #FFFFFF;
          width: 144px;
          height: 40px;
          margin-left: 20px;
        }
      }

      .toolbar-checkbox {
        align-items: center;
        display: flex;
        margin-left: 12.6%;
      }

      .choices-number {
        margin-left: 4%;
        align-items: center;
        display: flex;
        font-style: normal;
        font-weight: 700;
        font-size: 30px;
        line-height: 52px;
        color: #23263B;

        .choices-number-title {
          margin-left: 10px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }
      }
    }

  }

  .toolbar-detail {
    .toolbar-detail-container {
      .chosen-questions {
        .chosen-question-title {
          padding-left: 4px;
          padding-bottom: 16px;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
        }

        .chosen-question-items {
          padding: 0;

          .filter-items {
            margin-right: 8px;
            margin-bottom: 8px;
            display: flex;
          }
        }
      }

      .question-level-chart {
        .chart-titles {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
          display: flex;
          align-items: center;

          .titles-icon {
            width: 13px;
            height: 13px;
            margin-right: 4px;
          }

          .hard {
            background-color: #DA5F5C;
          }

          .medium {
            background-color: #FFCA28;
          }

          .easy {
            background-color: #8ED6FF;
          }
        }
        .question-highchart{
          padding-left: 13px;
        }
      }

      .question-deActive {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        .deactivate-all {
          padding: 0;
          color: #9690E4;
        }

        .delete-all {
          display: none;
          padding: 0;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 24px;
          color: #9690E4;
        }
      }
    }
  }
}

.dialogueCard {
  .dialogueCardContainer {
    bottom: 20px;
    width: 318px;
    background: #FFFFFF;
    border-radius: 25px;

    .dialogHeader {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      padding: 16px 4px 20px 20px;

      .dialogTitle {
        display: flex;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        color: #23263B;
      }

      .dialogBtn {
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 21px;
        color: #9690E4;
      }
    }

    .dialogChip {
      padding: 0 16px 12px 16px;

      .filter-items {
        margin-right: 2px;
        margin-bottom: 8px;
      }
    }

    .dialogChart {
      padding-bottom: 20px;
      display: flex;
      justify-content: center;

      .dialogChartTitles {
        padding-top: 8px;
        padding-right: 15px;

        .chart-titles {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 24px;
          color: #23263B;
          display: flex;
          align-items: center;

          .titles-icon {
            width: 13px;
            height: 13px;
            margin-right: 4px;
          }

          .hard {
            background-color: #DA5F5C;
          }

          .medium {
            background-color: #FFCA28;
          }

          .easy {
            background-color: #8ED6FF;
          }
        }
      }

      .dialogHighchart {

      }
    }
  }
}

.pageSticky {
  display: none;
  z-index: 6001;

  .shapes {
    height: 122px;
    position: relative;
    width: 100vw;
    align-items: flex-end;
    display: flex;

    .circle {
      align-items: center;
      display: flex;
      justify-content: center;
      position: absolute;
      top: -26px;
      box-sizing: border-box;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      right: calc(50% - 18px);

      .openDialouge {
        min-width: 36px;
        min-height: 36px;
        border-radius: 50%;
        color: white;
        background-color: var(--3a-Primary);
        z-index: 10000;
      }
    }

    .top-style {
      display: flex;
      width: 100%;

      & > div {
        display: flex;
        width: 50%;
        height: 18px;

        &.top-style-left .near-circle {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: var(--3a-Primary);
          border-top-right-radius: 20px;
        }

        &.top-style-left .near-btn {
          position: relative;
          width: 37px;
          height: 100%;

          &:after {
            content: " ";
            position: absolute;
            width: 26px;
            height: 95px;
            background: transparent;
            top: -78px;
            box-shadow: -2px 30px 0px -3px var(--3a-Primary);
            border-radius: 0px 0 25px 0;
            left: -2px;
          }

          .near-btn-top {
            position: absolute;
            width: 28px;
            height: 27px;
            border-radius: 100%;
            top: 0px;
            background: var(--3a-Primary);
            left: 17px;
          }
        }

        &.top-style-right .near-circle {
          position: relative;
          width: 100%;
          height: 100%;
          background-color: var(--3a-Primary);
          border-top-left-radius: 20px;
        }

        &.top-style-right .near-btn {
          position: relative;
          width: 37px;
          height: 100%;

          &:after {
            content: " ";
            position: absolute;
            width: 26px;
            height: 95px;
            background: transparent;
            top: -78px;
            box-shadow: 2px 30px 0px -3px var(--3a-Primary);
            border-radius: 0px 0 0 25px;
            right: -2px;
          }

          .near-btn-top {
            position: absolute;
            width: 28px;
            height: 27px;
            border-radius: 100%;
            top: 0px;
            background: var(--3a-Primary);
            right: 17px;
          }
        }
      }
    }

    .stickyFeatures {
      min-width: 100%;
      height: 204px;
      background-color: var(--3a-Primary);
      padding: 14px 32px 16px 18px;

      .toolbar-btn {
        display: flex;
        justify-content: space-around;
        padding-bottom: 4px;

        .delete-choices-btn-container {
          .delete-choices-btn {
            border: 1px solid #E86562;
            background: #FFFFFF;
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: #E86562;
          }
        }

        .add-to-btn-container {
          .add-to-btn {
            background: #FFB74D;
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 24px;
            text-align: center;
            color: #FFFFFF;
          }
        }
      }

      .toolbar-checkBox-number {
        display: flex;
        justify-content: space-around;
        .toolbar-checkbox-container {
          padding-right: 30px;

          .toolbar-checkbox {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            text-align: right;
            color: #FFFFFF;
          }
        }

        .choices-number-container {
          transform: translate(6px,0px);
          display: flex;
          align-items: center;
          .choices-number{
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #FFFFFF;
            .choices-number-title {
              margin-left: 5px;
            }
          }
        }
      }
    }
  }

}

@media only screen and (max-width: 599px) {
  .question-Bank-ToolBar{
    display: none;
  }
  .pageSticky {
    display: block;
  }
}
</style>

<style lang="scss">
.question-Bank-ToolBar {
  .q-expansion-item {
    padding: 0;

    .q-item-type {
      justify-content: space-between;
      padding: 15px 43px 15px 40px;

      .q-item__section {
        padding-right: 0;
      }
    }

    .q-expansion-item__container {
      .q-expansion-item__content {
        .q-card__section {
          padding: 0px 40px 16px 40px;
        }
      }
    }
  }

  .q-expansion-item--collapsed {
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;

      &:before {
        content: 'بیشتر';
      }

      i {
        margin-top: 0;
        margin-left: 10px;
      }

      .q-expansion-item__toggle-focus {
        display: none;
      }
    }
  }

  .q-expansion-item--expanded {
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;

      &:before {
        content: 'بستن';
      }

      i {
        margin-top: 0;
        margin-left: 10px;
      }

      .q-expansion-item__toggle-focus {
        display: none;
      }
    }
  }

  .toolbar-detail {
    .toolbar-detail-container {
      .question-level-chart {
        .question-highchart {
          .title-1 {
            font-weight: 700;
            font-size: 24px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }

          .title-2 {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }
        }
      }

      .question-deActive {
        .deactivate-all {
          .q-btn {
            padding: 0;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1919px) {
  .question-Bank-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        .q-item-type {
          padding: 15px 27px 15px 24px;

          .toolbar-card {
            min-width: 90%;

            .toolbar-card-actions {
              .toolbar-btn {
                .add-to-btn {
                  margin-left: 20px;
                }
              }

              .toolbar-checkbox {
                margin-left: 0%;
                display: grid;
                justify-items: center;

                .choices-checkbox {
                  margin-right: 0;
                  padding-right: 15px;
                }
              }

              .choices-number {
                margin-left: 0;
                padding-left: 5px;
              }
            }
          }

          .q-item__section {
            min-width: 69px;
          }
        }

        .q-expansion-item__content {
          .q-card__section {
            padding: 0px 24px 16px 24px;

            .toolbar-detail-container {
              .chosen-questions {
                .chosen-question-items {
                  max-width: 400px;
                }
              }

              .question-level-chart {
                padding-left: 0px;
              }

              .question-deActive {
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1439px) {
  .question-Bank-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        .q-item-type {
          padding: 8px 23px 8px 20px;

          .toolbar-card {
            .toolbar-card-actions {
              .toolbar-btn {
                .add-to-btn {
                  margin-left: 16px;
                }
              }

              .toolbar-checkbox {
                margin-left: 0;

                .choices-checkbox {
                  padding-right: 6px;
                }
              }

              .choices-number {
                padding-left: 0;
                padding-right: 10px;

                .choices-number-title {
                  margin-left: 6px;
                }
              }
            }
          }

          .q-item__section {
            min-width: 77px;
          }
        }

        .q-expansion-item__content {
          .q-card__section {
            padding: 0px 24px 16px 20px;

            .toolbar-detail-container {
              .chosen-questions {
                .chosen-question-items {
                  max-width: 368px;
                }
              }

              .question-level-chart {
                padding-left: 6px;
                .question-highchart {
                  padding-left: 10px;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .question-Bank-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        .q-item-type {
          padding: 8px 19px 8px 0px;

          .toolbar-card {
            min-width: 87%;

            .toolbar-card-actions {
              .toolbar-btn {
                .add-to-btn {
                  margin-left: 16px;
                }

                .delete-choices-btn {
                  display: none;
                }
              }

              .toolbar-checkbox {
                .choices-checkbox {
                  margin-right: 0;
                }
              }

              .choices-number {
                .choices-number-title {
                  margin-left: 4px;
                }
              }
            }
          }

          .q-item__section {
            min-width: 69px;
          }
        }

        .q-expansion-item__content {
          .q-card__section {
            padding: 0px 0px 8px 16px;

            .toolbar-detail-container {
              .chosen-questions {
                .chosen-question-title {
                  padding-bottom: 12px;
                }

                .chosen-question-items {
                  max-width: 368px;
                }
              }

              .question-level-chart {
                padding-left: 0px;

                .question-highchart {
                  padding-left: 16px;
                }
              }

              .question-deActive {
                order: -1;
                justify-content: flex-start;

                .delete-all {
                  display: block;
                  padding-right: 24px;

                  .q-btn {
                    padding: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 599px) {
  .dialogueCard {
    .dialogueCardContainer {
      .dialogChart {
        .dialogHighchart {
          .title-1 {
            font-weight: 700;
            font-size: 24px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }

          .title-2 {
            font-weight: 400;
            font-size: 14px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }
        }
      }
    }
  }
  .pageSticky {
    .shapes {
      .stickyFeatures {
        .toolbar-checkBox-number {
          .toolbar-checkbox-container {
            .toolbar-checkbox {
              .choices-checkbox {
                .q-checkbox__inner--indet {
                  color: white;
                }
              }
            }
          }
        }
      }
    }

  }
}

</style>
