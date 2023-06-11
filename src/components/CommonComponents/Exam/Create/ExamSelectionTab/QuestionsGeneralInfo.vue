<template>
  <q-card :hidden="finalApprovalMode"
          class="questions-general-info-ToolBar custom-card">
    <q-expansion-item
      expand-icon-toggle
      expand-icon="isax:arrow-down-1"
    >
      <template v-slot:header>
        <q-card-section class="general-info-expansion-header">
          <div class="general-info-buttons">
            <div class="filter">
              <q-btn icon="isax:setting-4"
                     flat
                     label="فیلتر"
                     @click="showFiltersOnMobile()" />
            </div>
            <div class="row">
              <div
                class="general-info-button back-button"
                @click="goToLastStep"
              >
                بازگشت
              </div>
              <div
                class="general-info-button next-button"
                @click="goToNextStep"
              >
                مرحله بعد

                <q-icon
                  class="next-button-icon"
                  name="isax:arrow-left"
                />
              </div>
            </div>
          </div>

          <div class="chosen-questions-general-info">
            <div class="check-all">
              <q-checkbox
                v-model="checkBoxValue"
                class="check-all-checkbox"
                label="انتخاب همه"
                indeterminate-value="maybe"
                @click="selectAllQuestions">
              </q-checkbox>
            </div>

            <div class="chosen-questions">
              <span class="chosen-questions-number">{{ this.numberOfQuestions() }}</span>
              <span class="chosen-questions-number-title">سوال انتخاب شده</span>
            </div>
          </div>

        </q-card-section>
      </template>

      <q-card-section class="toolbar-detail">
        <div class="toolbar-detail-container row">
          <div class="chosen-questions">
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

          <div class="question-level-chart justify-center flex">
            <div class="row">
              <div class="col-4 q-pt-sm q-pl-xs">
                <div class="chart-titles">
                  <q-badge class="titles-icon hard"
                           rounded />
                  <div>سخت</div>
                </div>
                <div class="chart-titles">
                  <q-badge class="titles-icon medium"
                           rounded></q-badge>
                  <div>متوسط</div>
                </div>
                <div class="chart-titles">
                  <q-badge class="titles-icon easy"
                           rounded></q-badge>
                  <div>آسان</div>
                </div>
              </div>
              <div class="question-highchart col-8 ">
                <highcharts :options="chartOptions" />
              </div>
            </div>
          </div>

          <div v-if="false"
               class="question-deActive">
            <div class=" delete-all">
              <q-btn
                rounded
                flat
                @click=deleteAllChoose()
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

  <q-page-sticky
    class="pageSticky lg-hide"
    position="bottom"
  >
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

      <div class=" questions-general-info-sticky">
        <div class="general-info-buttons"
             :class="{'top-space': finalApprovalMode}"
        >
          <div
            class="general-info-button back-button"
            @click="goToLastStep"
          >
            <q-icon
              class="next-button-icon"
              name="isax:arrow-right-3"
            />
            بازگشت
          </div>
          <div
            class="general-info-button next-button"
            @click="goToNextStep"
          >
            {{finalApprovalMode ? 'تایید آزمون' : '   مرحله بعد'}}
            <q-icon
              class="next-button-icon"
              name="isax:arrow-left-2"
            />
          </div>
        </div>

        <div v-if="!finalApprovalMode"
             class="chosen-questions-general-info">
          <div class="check-all">
            <q-checkbox
              v-model="checkBoxValue"
              class="check-all-checkbox"
              label="انتخاب همه"
              :disable="loading"
              indeterminate-value="maybe"
              @click="selectAllQuestions">
            </q-checkbox>
          </div>

          <div class="chosen-questions">
            <span class="chosen-questions-number">{{ this.numberOfQuestions() }}</span>
            <span class="chosen-questions-number-title">سوال انتخاب شده</span>
          </div>
        </div>
      </div>
    </div>
  </q-page-sticky>

  <q-dialog
    v-model="ToolbarDialog"
    class="dialogueCard full-height"
  >
    <q-card class="dialogueCardContainer">
      <div v-if="!finalApprovalMode"
           class="dialogHeader">
        <div class="dialogTitle"> سوالات انتخاب شده:</div>

        <div class="dialogBtn">
          <q-btn
            rounded
            flat>
            غیر فعال کردن همه
          </q-btn>
        </div>
      </div>

      <div v-if="!finalApprovalMode"
           class="dialogChip">
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
      </div>

      <div v-if="finalApprovalMode">

        <q-skeleton v-if="loading"
                    width="330px"
                    height="400px"
                    class="q-ml-xs" />
        <div v-else
             class="exam-info">
          <div class="header ">
            <div class="header-title"> مشخصات آزمون </div>
            <div class="chip ellipsis">
              <span class="title">آزمون</span>
              {{examInformation.id}}
            </div>
          </div>
          <div class="info-item  ">
            <div class="field">نوع آزمون:</div>
            <div class="value">
              {{ examInformation.type }}
            </div>
          </div>
          <div class="info-item  ">
            <div class="field">عنوان آزمون: </div>
            <div class="value">
              {{ examInformation.title }}
            </div>
          </div>
          <div class="info-item  ">
            <div class="field">رشته تحصیلی:</div>
            <div class="value">
              {{ examInformation.major}}
            </div></div>
          <div class="info-item  ">
            <div class="field">
              پایه تحصیلی:
            </div>
            <div class="value">
              {{ examInformation.grade }}
            </div>
          </div>
        </div>

      </div>

      <div class="dialogChart">
        <div class="dialogChartTitles">
          <div class="chart-titles">
            <q-badge class="titles-icon hard"
                     rounded />
            <div>سخت</div>
          </div>
          <div class="chart-titles">
            <q-badge class="titles-icon medium"
                     rounded></q-badge>
            <div>متوسط</div>
          </div>
          <div class="chart-titles">
            <q-badge class="titles-icon easy"
                     rounded></q-badge>
            <div>آسان</div>
          </div>
        </div>

        <div class="dialogHighchart">
          <highcharts :options="chartOptions" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { QuestionList } from 'src/models/Question'

export default {
  name: 'QuestionsGeneralInfo',

  components: { highcharts: Chart },

  props: {
    showFilters: {
      type: Boolean,
      default: false
    },
    examInformation: {
      type: Object,
      default: () => {
        return {
          id: 0,
          type: '',
          title: '',
          major: '',
          grade: ''
        }
      }
    },
    finalApprovalMode: {
      type: Boolean,
      default: false
    },
    selectedQuestions: {
      type: [Array, QuestionList],
      default: new QuestionList()
    },
    loading: {
      type: Boolean,
      default: false
    },
    checkBox: {
      type: [Boolean, String],
      default () {
        return false
      }
    }
  },

  data () {
    return {
      checkBoxValue: false,
      selectAllCheckbox: false,
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
    'selectedQuestions.length': function () {
      this.setDifficultyLevelsChart()
      this.numberOfQuestions()
      this.replaceTitle()
    },
    checkBox (newVal) {
      this.checkBoxValue = newVal
    }
  },

  computed: {
    countOfSelectedSubCategory () {
      const lessons = this.selectedQuestions.filter((v, i, a) => a.findIndex(question => {
        const targetTag = question.tags.list.find(tag => tag.type === null)
        const valueTargetTag = v.tags.list.find(tag => tag.type === null)
        if (!targetTag || !valueTargetTag) {
          return false
        }
        return targetTag.title === valueTargetTag.title
      }) === i)
        .map(question => question.tags.list.find(tag => tag.type === null))
      lessons.forEach(lesson => {
        lesson.selectedQuestionsCount = this.selectedQuestions.filter(question => !!question.tags.list.find(tag => tag.type === null && tag.title === lesson.title)).length
      })
      return lessons
    },
    questionLvl () {
      if (!this.selectedQuestions) return
      return {
        hard: this.selectedQuestions.filter(question => question.level === '3' || question.level === 3).length,
        medium: this.selectedQuestions.filter(question => question.level === '2' || question.level === 2).length,
        easy: this.selectedQuestions.filter(question => question.level === '1' || question.level === 1).length,
        none: this.selectedQuestions.filter(question => question.level === '0' || question.level === 0).length
      }
    }
  },

  emits: [
    'selectAllQuestions',
    'deselectAllQuestions',
    'remove',
    'nextTab',
    'lastTab',
    'update:checkbox'
  ],

  created () {
    this.setDifficultyLevelsChart()
    this.replaceTitle()
  },

  mounted() {
    if (this.selectedQuestions.length > 0) {
      this.setDifficultyLevelsChart()
      this.numberOfQuestions()
      this.replaceTitle()
    }
  },

  methods: {
    showFiltersOnMobile() {
      this.$emit('update:showFilters', true)
    },
    goToLastStep () {
      this.$emit('lastTab')
    },

    goToNextStep () {
      this.$emit('nextTab')
    },

    selectAllQuestions () {
      if (this.checkBoxValue) {
        this.$emit('selectAllQuestions')
        return
      }
      this.$emit('deselectAllQuestions')
    },

    replaceTitle () {
      this.chartOptions.title.text = '<span class="title-1"> ' + this.numberOfQuestions() + '<br>' + '<br>' + '</span>' + '<span dy="-8" class="title-2">سوال</span>'
    },

    setDifficultyLevelsChart () {
      if (this.selectedQuestions) {
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
      this.$emit('deselectAllQuestions')
    },

    numberOfQuestions () {
      if (!this.selectedQuestions) return
      return this.selectedQuestions.length
    },

    RemoveSelectedChoice (selectedTap) {
      this.$emit('remove', selectedTap.title)
    }
  }
}
</script>

<style lang="scss" scoped>
.questions-general-info-ToolBar {
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 16px;

  @media only screen and (max-width: 1023px) {
    border-radius: 12px;
  }

  @media only screen and (max-width: 599px) {
      display: none;
    }

  .general-info-expansion-header {
    display: flex;
    justify-content: space-between;
    padding: 0;

    @media only screen and (max-width: 1023px) {
      flex-direction: column;
      width: 100%;
    }

    .general-info-buttons {
      display: flex;
      align-items: center;

      .filter {
        display: none;
      }
      @media only screen and (max-width: 1023px) {
        justify-content: space-between;
        margin-right: -68px;

        .filter {
          display: block;
        }
      }

      .general-info-button {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        height: 40px;
        width: 144px;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 22px;
        text-align: center;
        letter-spacing: -0.03em;
        cursor: pointer;

        @media only screen and (max-width: 1439px) {
          width: 128px;
        }
        @media screen and (max-width: 599px) {
          width: 104px;
          height: 36px;
        }

        &.back-button {
          background: #F2F5F9;
          color: #6D708B;
          margin-right: 30px;

          @media screen and (max-width: 1439px) {
            margin-right: 16px;
          }
        }

        &.next-button {
          background: #9690E4;
          color: #FFFFFF;

          .next-button-icon {
            margin-left: 8px;
          }
        }
      }
    }

    .chosen-questions-general-info {
      display: flex;

      .check-all {
        align-items: center;
        display: flex;
        margin-left: 40px;

        @media only screen and (max-width: 1439px) {
          margin-left: 30px;
        }

        @media only screen and (max-width: 1023px) {
          margin-left: 0;
        }

        .check-all-checkbox {
          &:deep(.q-checkbox__bg) {
              background: #FFFFFF;
              border: 1px solid #6D708B;
              border-radius: 5px;
          }

          &:deep(.q-checkbox__svg) {
            color: $secondary;
          }

          &:deep(.q-checkbox__label) {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #434765;
            letter-spacing: -0.03em;
          }
        }
      }

      .chosen-questions {
        display: flex;
        align-items: center;

        .chosen-questions-number {
          margin-left: 52px;
          align-items: center;
          display: flex;
          font-style: normal;
          font-weight: 700;
          font-size: 30px;
          line-height: 46px;
          letter-spacing: -0.03em;
          color: #434765;

          @media only screen and (max-width: 1439px) {
            margin-left: 30px;
          }

          @media only screen and (max-width: 1023px) {
            margin-left: 24px;
          }
        }

        .chosen-questions-number-title {
          margin-left: 10px;
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 22px;
          color: #434765;
          letter-spacing: -0.03em;
        }
      }

    }

  }

  &:deep(.q-expansion-item) {
    padding: 0;

    .q-item-type {
      justify-content: space-between;
      padding: 23px 30px;

      @media only screen and (max-width: 1439px) {
        padding: 16px 24px;
      }

      @media only screen and (max-width: 1023px) {
        padding: 20px 24px;
      }

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

  &:deep(.q-expansion-item--collapsed) {
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;

      @media only screen and (max-width: 1023px) {
        align-items: end;
      }

      &:before {
        content: 'بیشتر';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #434765;
      }

      i {
        margin-top: 0;
        margin-left: 10px;
        font-size: 14px;
        color: #6D708B;

        @media only screen and (max-width: 1023px) {
          margin-bottom: 5px;
        }
      }

      .q-expansion-item__toggle-focus {
        display: none;
      }
    }
  }

  &:deep(.q-expansion-item--expanded) {
    .q-item__section {
      display: flex;
      flex-direction: row;
      align-items: center;

      @media only screen and (max-width: 1023px) {
        align-items: end;
      }

      &:before {
        content: 'بستن';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #434765;
      }

      i {
        margin-top: 0;
        margin-left: 10px;
        font-size: 14px;
        color: #6D708B;

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
          &:deep( .myTooltip) {
            border-radius: 10px;
            direction: ltr;
            color: var(--3a-Neutral3);
            padding: 5px !important;
            width: 50px;
            white-space: normal !important;
            display: flex;
            justify-content: center;
          }

          &:deep( .title-1 ) {
            font-weight: 700;
            font-size: 24px;
            line-height: 20px;
            text-align: center;
            color: #23263B;
          }

          &:deep( .title-2) {
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

  .toolbar-detail {
    .toolbar-detail-container {
      justify-content: space-between;
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

        .question-highchart {
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

    .exam-info{
      padding: 23px 16px;
      .header{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .header-title{
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #434765;
        }
        .chip{
          background: #F2F5F9;
          border-radius: 10px 12px 12px 10px;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          color: #434765;
          max-width: 95px;
          padding: 2px 8px;
          .title{
            margin-right: 4px;
          }
        }
      }
      .info-item{
        display: flex;
        justify-content: space-between;
        margin-bottom: 6px;
        .field{
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #434765;
        }
        .value{
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #6D708B;
        }
      }

    }

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
      margin-bottom: -1px;

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

    .questions-general-info-sticky {
      min-width: 100%;
      height: 204px;
      background-color: var(--3a-Primary);
      padding: 12px 32px 16px 32px;

      .general-info-buttons {
        &.top-space{
          margin-top: 35px;
        }
        display: flex;
        align-items: center;
        justify-content: center;

        .general-info-button {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
          height: 40px;
          width: 135px;
          font-style: normal;
          font-weight: 600;
          font-size: 14px;
          line-height: 22px;
          text-align: center;
          letter-spacing: -0.03em;
          cursor: pointer;
          z-index: 2;

          &.back-button {
            background: #F4F5F6;
            color: #434765;
            margin-right: 30px;

            @media screen and (max-width: 1439px) {
              margin-right: 16px;
            }
          }

          &.next-button {
            background: #FFB74D;
            color: #FFFFFF;

            .next-button-icon {
              margin-left: 8px;
            }
          }
        }
      }

      .chosen-questions-general-info {
        display: flex;
        align-items: center;
        justify-content: center;

        .check-all {
          align-items: center;
          display: flex;
          margin-right: 50px;

          .check-all-checkbox {

            &:deep(.q-checkbox__inner--falsy) {
              .q-checkbox__bg{
                background: #FFFFFF;
                border: 1px solid #6D708B;
                border-radius: 5px;
              }
            }

            &:deep(.q-checkbox__label) {
              font-style: normal;
              font-weight: 400;
              font-size: 14px;
              line-height: 24px;
              color: #FFFFFF;
            }
          }
        }

        .chosen-questions {
          display: flex;
          align-items: center;

          .chosen-questions-number {
            margin-right: 5px;
            align-items: center;
            display: flex;
            font-style: normal;
            font-weight: 700;
            font-size: 18px;
            line-height: 31px;
            color: #FFFFFF;
          }

          .chosen-questions-number-title {
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 24px;
            color: #FFFFFF;
          }
        }

      }
    }

  }

}

@media only screen and (max-width: 599px) {
  .questions-general-info-ToolBar {
    display: none;
  }
  .pageSticky {
    display: block;
  }
}
</style>

<style lang="scss">

@media only screen and (max-width: 1919px) {
  .questions-general-info-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        //.q-item-type {
        //  padding: 15px 27px 15px 24px;

          .general-info-expansion-header {
            //min-width: 90%;

              //.check-all {
              //  margin-left: 0%;
              //  display: grid;
              //  justify-items: center;
              //
              //  .check-all-checkbox {
              //    margin-right: 0;
              //    padding-right: 15px;
              //  }
              //}

              //.chosen-questions-number {
              //  margin-left: 0;
              //  padding-left: 5px;
              //}

          }

          .q-item__section {
            min-width: 69px;
          }
        //}

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
                .deactivate-all {

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
  .questions-general-info-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        //.q-item-type {
        //  padding: 8px 23px 8px 20px;

          .general-info-expansion-header {

              //.check-all {
              //  margin-left: 0;
              //
              //  .check-all-checkbox {
              //    padding-right: 6px;
              //  }
              //}

              //.chosen-questions-number {
              //  padding-left: 0;
              //  padding-right: 5px;
              //
              //  .chosen-questions-number-title {
              //    margin-left: 6px;
              //  }
              //}
          }

          .q-item__section {
            min-width: 77px;
          }
        //}

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
  .questions-general-info-ToolBar {
    .q-expansion-item {
      .q-expansion-item__container {
        //.q-item-type {
        //  padding: 8px 19px 8px 0px;

          .general-info-expansion-header {
            //min-width: 87%;

              //.check-all {
              //  .check-all-checkbox {
              //    margin-right: 0;
              //  }
              //}

              //.chosen-questions-number {
              //  .chosen-questions-number-title {
              //    margin-left: 4px;
              //  }
              //}
          }

          .q-item__section {
            min-width: 69px;
          }
        //}

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
            color: var(--3a-Neutral3);
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
      .questions-general-info-sticky {
        .toolbar-checkBox-number {
          .toolbar-checkbox-container {
            .toolbar-checkbox {
              .check-all-checkbox {
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
