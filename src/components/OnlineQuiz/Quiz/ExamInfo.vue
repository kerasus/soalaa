<template>
  <div class="exam-info-body">
    <q-input
      v-model="examInfo.title"
      label-color="grey-8"
      label="عنوان"
    />
    <br>
    <q-select
      v-model="typeValue"
      :options="types"
      emit-value
      map-options
      label-color="grey-8"
      label="انتخاب نوع آزمون"
    />
    <br>
    <div class="date-part">
      <p class="date-label">زمان شروع:</p>
      <q-input
        filled
        v-model="dateTime.startDate"
        mask="date"
      >
        <template v-slot:prepend>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="dateTime.startTime"
                mask="YYYY-MM-DD"
                calendar="persian"
                today-btn
                @update:model-value="changeDate"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        v-model="dateTime.startTime"
        mask="time"
      >
        <template v-slot:append>
          <q-icon
            name="access_time"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale"
            >
              <q-time
                v-model="dateTime.startTime"
                mask="HH:mm:ss"
                format24h
                @update:model-value="changeTime"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <br>
    <div class="date-part">
      <p class="date-label">زمان پایان:</p>
      <q-input
        filled
        v-model="dateTime.finishDate"
        mask="date"
      >
        <template v-slot:prepend>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                v-model="dateTime.finishDate"
                calendar="persian"
                mask="YYYY-MM-DD"
                @update:model-value="changeDate"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        filled
        v-model="dateTime.finishTime"
        mask="time"
      >
        <template v-slot:append>
          <q-icon
            name="access_time"
            class="cursor-pointer"
          >
            <q-popup-proxy
              transition-show="scale"
              transition-hide="scale">
              <q-time
                v-model="dateTime.finishTime"
                mask="HH:mm:ss"
                format24h
                @update:model-value="changeTime"
              >
                <div class="row items-center justify-end">
                  <q-btn
                    v-close-popup
                    label="Close"
                    color="primary"
                    flat
                  />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <br>
    <q-input
      v-model="examInfo.delay_time"
      type="number"
      label-color="grey-8"
      label="زمان تاخیر (دقیقه)"
    />
    <br>
    <div>
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.enable"
        label="فعال"
      />
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.is_free"
        label="رایگان"
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.is_register_open"
        label="ثبت نام باز است."
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.is_open"
        label="شرکت در آزمون باز است."
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.confirm"
        label="تولید خودکار کارنامه"
      />
      <br>
      <q-checkbox
        class="options-check-box"
        v-model="examInfo.generate_questions_automatically"
        label="تولید خودکار سوال"
      />
    </div>
    <br>
    <div  v-if="examInfo.id === null">
      <q-separator inset />
      <br>
      <div class="row">
        <div class="col-6">
          <q-select
            class="create-mode-category"
            v-model="selectedCategory"
            :options="categoryTitles"
            emit-value
            map-options
            label="category"
          />
        </div>
        <div class="col-6">
          <q-input
            class="create-mode-category"
            v-model="selectedCategoryTime"
            type="number"
            label-color="grey-8"
            label="زمان"
          />
        </div>
      </div>
      <br>
      <div class="row">
        <div class="col-6">
          <q-input
            class="create-mode-category"
            v-model="selectedCategoryOrder"
            type="number"
            label-color="grey-8"
            label="ترتیب"
          />
        </div>
        <div class="col-6 category-btn-parent">
          <q-btn
            class="category-btn"
            label="اضافه کردن category"
            @click="addCategory"
          />
        </div>
      </div>
      <br>
      <br>
      <br>
      <q-separator inset />
      <br>
      <div
        v-for="item in examInfo.categories.list"
        :key="item.id"
        class="row"
      >
        <div class="col-5">
          <q-select
            class="create-mode-category"
            v-model="item.title"
            :options="categoryTitles"
            label-color="grey-8"
            label="category"
          />
        </div>
        <div class="col-3">
          <q-input
            class="create-mode-category"
            v-model="item.time"
            type="number"
            label-color="grey-8"
            label="زمان"
          />
        </div>
        <div class="col">
          <q-input
            class="create-mode-category"
            v-model="item.order"
            type="number"
            label-color="grey-8"
            label="ترتیب"
          />
        </div>
        <div class="col">
          <q-btn
            flat
            color="red"
            icon="close"
            @click="deleteCategory(item.id)"/>
        </div>
      </div>
    </div>
    <br>
    <div class="bottom-btn">
      <q-btn
        label="حذف"
        @click="createExam"
      />
      <q-btn
        label="ثبت"
        @click="createExam"
      />
    </div>
  </div>

</template>

<script>
import { Exam, ExamList } from 'src/models/Exam'
import { QuestCategory, QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'
import { date } from 'quasar'
export default {
  name: 'ExamInfo',
  data () {
    return {
      examId: null,
      examList: new ExamList(),
      examInfo: new Exam(),
      typeValue: '',
      options: [],
      types: [],
      dateTime: {
        startDate: '',
        startTime: '',
        finishDate: '',
        finishTime: ''
      },
      selectedCategory: null,
      categoryList: [],
      categoryTitles: [],
      selectedCategoryTime: 0,
      selectedCategoryOrder: 0
    }
  },
  created () {
    this.examId = this.$route.params.examId
    this.getData()
    this.getOptions()
    this.getCategories()
  },
  watch: {
    typeValue () {
      const selectedType = this.options.find(option => option.value === this.typeValue)
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.examInfo.type_id = selectedType.id
      return this.examInfo.type_id
    }
  },
  methods: {
    getData () {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          this.$store.dispatch('loading/linearLoading', false)
          this.examList = new ExamList(response.data.data)
          this.examInfo = new Exam(this.examList.list.find(exam => exam.id === this.examId))
          console.log(this.examInfo)
          this.typeValue = this.examInfo.type.value
          console.log(this.examInfo.start_at)
          console.log(this.examInfo.finish_at)
          this.dateTime.startDate = this.dateFormat(this.examInfo.start_at, 'start_at')
          this.dateTime.startTime = this.timeFormat(this.examInfo.start_at, 'start_at')
          this.dateTime.finishDate = this.dateFormat(this.examInfo.start_at, 'finish_at')
          this.dateTime.finishTime = this.timeFormat(this.examInfo.start_at, 'finish_at')
          console.log(this.dateTime.startDate)
          console.log(this.dateTime.startTime)
          console.log(this.dateTime.finishDate)
          console.log(this.dateTime.finishTime)
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    changeTime (value, details) {
      console.log('time: ', value, '....', details)
    },
    changeDate (value, reason, details) {
      console.log('date ', value, '....', reason, '....', details)
      // this.examInfo.finish_at = this.dateFormat(this.examInfo.start_at, 'finish_at')
      // console.log(this.examInfo.finish_at)
    },
    convertToEnglish (digit) {
      const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      digit = p2e(digit)
      return digit
    },
    dateFormat (item, key) {
      item = this.examInfo.shamsiDate(key).date
      item = this.convertToEnglish(item)
      item = date.formatDate(item, 'YYYY-MM-DD')
      return item
    },
    timeFormat (item, key) {
      item = this.examInfo.shamsiDate(key).time
      item = this.convertToEnglish(item)
      return item
    },
    makeCompleteDate (shamsiDate, time) {
      console.log(shamsiDate)
      console.log(time)
      const moment = require('moment-jalaali')
      moment().format('jYYYY/jM/jD')
      const georgianDate = moment(shamsiDate, 'jYYYY/jMM/jDD').format('YYYY-MM-DD')
      const completeDate = georgianDate + ' ' + time
      console.log('convert', completeDate)
    },
    getOptions () {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          this.$store.dispatch('loading/linearLoading', false)
          this.options = response.data.data.filter(data => data.type === 'exam_type')
          this.options.forEach(option => {
            this.types.push(option.value)
          })
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    getCategories () {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          this.$store.dispatch('loading/linearLoading', false)
          this.categoryList = new QuestCategoryList(response.data.data)
          this.categoryList.list.forEach(category => {
            this.categoryTitles.push(category.title)
          })
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    addCategory () {
      const category = this.categoryList.list.find(item => item.title === this.selectedCategory)
      this.examInfo.categories.list.push(new QuestCategory({
        id: category.id,
        time: this.selectedCategoryTime,
        order: this.selectedCategoryOrder,
        title: this.selectedCategory
      }))
    },
    deleteCategory (id) {
      if (this.examInfo.categories.list) {
        this.examInfo.categories.list = this.examInfo.categories.list.filter(item => item.id !== id)
        // Added to Memories :)
        // this.examInfo.categories.list = this.exam.categories.list.filter(item => item.id !== id)
      }
    },
    createExam () {
      this.examInfo.start_at = this.dateFormat(this.examInfo.start_at, 'start_at')
      this.examInfo.finish_at = this.dateFormat(this.examInfo.start_at, 'finish_at')
      this.makeCompleteDate(this.dateTime.startDate, this.dateTime.startTime)
      this.$store.dispatch('loading/overlayLoading', true)
      this.examInfo.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
      if (this.examInfo.id) {
        this.examInfo.update(API_ADDRESS.exam.editExam + '/' + this.examInfo.id)
          .then((res) => {
            this.$store.dispatch('loading/overlayLoading', false)
            console.log('update res:', res)
            this.$q.notify({
              type: 'positive',
              message: 'تغییرات با موفقیت اعمال شد',
              position: 'top'
            })
          })
          .catch((err) => {
            this.$store.dispatch('loading/overlayLoading', false)
            console.log('update err:', err)
          })
      } else {
        this.examInfo.create()
          .then((res) => {
            console.log('create res:', res)
            this.$q.notify({
              type: 'positive',
              message: 'آزمون با موفقیت ایجاد شد',
              position: 'top'
            })
          })
          .catch((err) => {
            console.log('err', err)
          })
      }
      console.log('sabt', this.examInfo)
    }
  }
}
</script>

<style lang="scss" scoped>
.exam-info-body{
  width: 100%;
  max-width: 600px;
  margin: auto !important;
  padding: 50px 0 200px 0;
  .date-part{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .date-label{
      text-align: center;
    }
  }
  .options-check-box{
    margin-right: 150px;
  }
  .category-btn-parent{
    justify-content: center;
    align-items: center;
    display: flex;
    .category-btn{
      height: 40px ;
    }
  }
  .bottom-btn{
    justify-content: center;
    display: flex;
  }
  .create-mode-category{
    margin-right: 20px;
  }
}
</style>
