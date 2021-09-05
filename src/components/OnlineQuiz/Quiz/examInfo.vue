<template>
  <div class="d-flex justify-center">
    <v-progress-linear
      color="deep-purple accent-4"
      absolute
      top
      :active="exam.loading"
      indeterminate
      rounded
      height="6"
    />
    <v-col cols="8">
      <v-row>
        <v-text-field
          v-model="exam.title"
          label="عنوان"
        >
          {{ exam.title }}
        </v-text-field>
      </v-row>
      <v-row>
        <v-select
          v-model="exam.type_id"
          :items="items"
          item-value="id"
          item-text="value"
          label="انتخاب نوع آزمون"
        />
      </v-row>
      <v-row>
        <v-col cols="12">
          زمان شروع
        </v-col>
        <v-col cols="12">
          <date-picker
            v-model="exam.start_at"
            type="datetime"
            :editable="true"
            format="YYYY-MM-DD HH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          زمان پایان
        </v-col>
        <v-col cols="12">
          <date-picker
            v-model="exam.finish_at"
            type="datetime"
            :editable="true"
            format="YYYY-MM-DD HH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-text-field
          v-model="exam.delay_time"
          label="زمان تاخیر (دقیقه)"
        />
      </v-row>
      <v-row no-gutters>
        <v-col :cols="6">
          <v-checkbox
            v-model="exam.enable"
            label="فعال"
          />
        </v-col>
        <v-col :cols="6">
          <v-checkbox
            v-model="exam.is_free"
            label="رایگان"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.is_register_open"
            label="ثبت نام باز است"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.is_open"
            label="شرکت در آزمون باز است"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.generate_automatic_report"
            label="تولید اتوماتیک کارنامه"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="exam.generate_questions_automatically"
            label="تولید اتوماتیک سوال"
          />
        </v-col>
        <v-col
          v-if="exam.id"
          :cols="6"
        >
          <v-select
            v-model="selectedCategory"
            :items="categoryList.list"
            item-text="title"
            item-value="id"
            label="category"
          />
        </v-col>
        <v-col
          v-if="exam.id"
          :cols="6"
        >
          <v-text-field
            v-model="selectedCategoryTime"
            type="number"
            label="زمان"
          />
        </v-col>
        <v-col
          v-if="exam.id"
          :cols="6"
        >
          <v-text-field
            v-model="selectedCategoryOrder"
            type="number"
            label="ترتیب"
          />
        </v-col>
        <v-col
          v-if="exam.id"
          :cols="6"
        >
          <v-btn @click="addCategory">
            اضافه کردن category
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              :disabled="exam.loading"
              :loading="exam.loading"
              elevation="2"
              @click="create"
            >
              ثبت
            </v-btn>
            <v-btn
              :disabled="exam.loading"
              :loading="exam.loading"
              elevation="2"
            >
              حذف
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-overlay :value="loading">
      <v-progress-circular
        :size="70"
        :width="7"
        color="white"
        indeterminate
      />
    </v-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
import {Exam} from "@/models/Exam";
import Assistant from "@/plugins/assistant";
import axios from "axios";
import API_ADDRESS from "@/api/Addresses";
import {QuestCategory, QuestCategoryList} from "@/models/QuestCategory";

Vue.component('date-picker', VuePersianDatetimePicker)

export default {
  name: 'ExamInfo',
  props: ['exam'],
  data: () => ({
    items: [],
    loading:true,
    examItem: new Exam(),
    categoryList: new QuestCategoryList(),
    selectedCategory: null,
    selectedCategoryTime: 0,
    selectedCategoryOrder: 0
  }),
  created() {
    let that = this
    const loadCategoriesPromise = this.loadCategories()

    Promise.all([loadCategoriesPromise])
            .then(() => {
              this.loading = false
            })
    axios.get(API_ADDRESS.option.base)
        .then(function (response) {
          const optionQuestion = response.data.data.find(item => (item.value === 'psychometric' && item.type === 'exam_type'))
          if (!optionQuestion) {
            // beterek
            return this.$notify({
              group: 'notifs',
              text: ' API با مشکل مواجه شد!',
              type: 'error'
            })
          }

          that.optionQuestionId = optionQuestion.id
          const itemstype = response.data.data.filter(data => data.type === 'exam_type')
          that.items = itemstype
          that.loading = false
        })
    this.examItem = this.exam
  },
  methods: {
    addCategory () {
      this.exam.categories.list.push(new QuestCategory({ id: this.selectedCategory, time: this.selectedCategoryTime, order: this.selectedCategoryOrder }))
    },
    loadCategories () {
      let that = this
      return new Promise(function(resolve, reject) {
        axios.get(API_ADDRESS.questionCategory.base)
                .then((response) => {
                  that.categoryList = new QuestCategoryList(response.data.data)
                  resolve()
                })
                .catch( () => {
                  reject()
                })
      })
    },
    create() {
      this.examItem = this.exam
      this.examItem.loading = true
      this.examItem.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
      if (this.examItem.id) {
        this.examItem.update()
            .then(() => {
              this.examItem.loading = false
              this.$toasted.show('ثبت با موفقیت انجام شد', {
                theme: "toasted-primary",
                position: "top-right",
                duration: 2000
              })
              this.refreshExamList()
            })
            .catch((error) => {
              Assistant.handleAxiosError(this.$toasted, error)
              this.examItem.loading = false
              this.refreshExamList()
            })
      } else {
        this.examItem.create()
            .then(() => {
              this.examItem.loading = false
              this.$toasted.show('ثبت با موفقیت انجام شد', {
                theme: "toasted-primary",
                position: "top-right",
                duration: 2000
              })
              this.refreshExamList()
            })
            .catch((error) => {
              Assistant.handleAxiosError(this.$toasted, error)
              this.examItem.loading = false
              this.examItem = new Exam()
              this.refreshExamList()
            })
      }

    },
    refreshExamList() {
      this.$emit('refresh-exam-list')
    }
  }
}
</script>

<style>
.vpd-input-group input {
  width: 100%;
}
</style>
