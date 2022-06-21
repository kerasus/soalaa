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
                v-model="checkbox"
                indeterminate-value="maybe"
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
          <div class="chosen-questions col-xl-6 col-lg-6 col-md-5 col-sm-7 ">
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
          <div class="question-deActive col-xl col-lg-2 col-md-3 col-sm-12">
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
                style="width: 130px"
                rounded
                flat
              >
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
          :style="{'height': '36px' }"
          class="openDialouge"
          round
          :icon="this.ToolbarDialog? 'isax:arrow-down-1' : 'isax:arrow-up-2'"
          @click="this.ToolbarDialog = !this.ToolbarDialog"
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
                name="checkbox"
                @click="selectAllQuestions"/>
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
  <q-dialog class="dialogueCard" v-model="ToolbarDialog">
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
    selectedQuestions: {
      type: [Array, QuestionList],
      default: new QuestionList()
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
      checkbox: this.checkBox,
      questions: new QuestionList(),
      ToolbarDialog: false,
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
          shared: false,
          useHTML: true,
          borderWidth: 0,
          backgroundColor: 'rgba(255,255,255,0)',
          shadow: false,
          formatter: function () {
            const point = this.point
            return '<span class="myTooltip" style="background-color:' + point.color + ';">' + point.y + '&nbsp' + 'سوال' + '</span>'
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
  mounted () {
    this.questions = new QuestionList(this.selectedQuestions)
  },
  computed: {
    countOfSelectedSubCategory () {
      const lessons = this.questions.list.filter((v, i, a) => a.findIndex(question => {
        const targetTag = question.tags.list.find(tag => tag.type === 'lesson')
        const valueTargetTag = v.tags.list.find(tag => tag.type === 'lesson')
        if (!targetTag || !valueTargetTag) {
          return false
        }
        return targetTag.title === valueTargetTag.title
      }) === i)
        .map(question => question.tags.list.find(tag => tag.type === 'lesson'))
      lessons.forEach(lesson => {
        lesson.selectedQuestionsCount = this.questions.list.filter(question => !!question.tags.list.find(tag => tag.type === 'lesson' && tag.title === lesson.title)).length
      })
      return lessons
    },
    questionLvl () {
      if (!this.questions) return
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
      if (this.questions) {
        this.chartOptions.series[0].data = [
          { name: 'متوسط', y: this.questionLvl.medium, color: '#FFCA28' },
          { name: 'آسان', y: this.questionLvl.easy, color: '#8ED6FF' },
          { name: 'سخت', y: this.questionLvl.hard, color: '#DA5F5C' }
        ]
      }
    },
    deleteFilter (id) {
      this.countOfSelectedSubCategory = this.countOfSelectedSubCategory.filter(e => e.id !== id)
    },
    deleteAllChoose (id) {
      this.$emit('deleteAllQuestions')
    },
    numberOfQuestions () {
      if (!this.questions) return
      const x = this.questionLvl.hard + this.questionLvl.medium + this.questionLvl.easy
      return x
    },
    RemoveSelectedChoice (selectedTap) {
      this.$emit('remove', selectedTap.title)
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
      padding: 16px 12px 20px 20px;

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
  z-index: 2999;

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
      top: -24px;
      box-sizing: border-box;
      height: 36px;
      width: 36px;
      border-radius: 50%;
      right: calc(50% - 18px);

      .openDialouge {
        justify-content: center;
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
          .myTooltip {
            border-radius: 10px;
            direction: ltr;
            color: var( --3a-Neutral3);
            padding: 5px !important;
            width: 50px;
            white-space: normal !important;
            display: flex;
            justify-content: center;
          }
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
                .deactivate-all{

                }
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
                padding-right: 5px;

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
          .myTooltip {
            border-radius: 10px;
            direction: ltr;
            color: var( --3a-Neutral3);
            padding: 5px !important;
            width: 50px;
            white-space: normal !important;
            display: flex;
            justify-content: center;
          }
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
