<template>
  <div class="d-flex justify-center">
    <v-progress-linear
      color="deep-purple accent-4"
      absolute
      top
      :active="examProp.loading"
      indeterminate
      rounded
      height="6"
    />
    <v-col cols="8">
      <v-row>
        <v-text-field
          v-model="examProp.title"
          label="عنوان"
          @change="updateExamProp"
        >
          {{ examProp.title }}
        </v-text-field>
      </v-row>
      <v-row>
        <v-select
          v-model="examProp.type_id"
          :items="items"
          item-value="id"
          item-text="value"
          label="انتخاب نوع آزمون"
          @change="updateExamProp"
        />
      </v-row>
      <v-row>
        <v-col cols="12">
          زمان شروع
        </v-col>
        <v-col cols="12">
          <date-picker
            v-model="examProp.start_at"
            type="datetime"
            :editable="true"
            format="YYYY-MM-DD HH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
            @change="updateExamProp"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          زمان پایان
        </v-col>
        <v-col cols="12">
          <date-picker
            v-model="examProp.finish_at"
            type="datetime"
            :editable="true"
            format="YYYY-MM-DD HH:mm:ss"
            display-format="dddd jDD jMMMM jYYYY ساعت HH:mm"
            @change="updateExamProp"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-text-field
          v-model="examProp.delay_time"
          label="زمان تاخیر (دقیقه)"
        />
      </v-row>
      <v-row>
        <v-col :cols="6">
          <v-checkbox
            v-model="examProp.enable"
            label="فعال"
            @change="updateExamProp"
          />
        </v-col>
        <v-col :cols="6">
          <v-checkbox
            v-model="examProp.is_free"
            label="رایگان"
            @change="updateExamProp"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="examProp.is_register_open"
            label="ثبت نام باز است"
            @change="updateExamProp"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="examProp.is_open"
            label="شرکت در آزمون باز است"
            @change="updateExamProp"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="examProp.confirm"
            label="تولید اتوماتیک کارنامه"
            @change="updateExamProp"
          />
        </v-col>
        <v-col :cols="12">
          <v-checkbox
            v-model="examProp.generate_questions_automatically"
            label="تولید اتوماتیک سوال"
            @change="updateExamProp"
          />
        </v-col>
      </v-row>
      <v-divider />
      <v-row>
        <v-col
          v-if="!examProp.id"
          :cols="6"
        >
          <v-select
            v-model="selectedCategory"
            :items="categoryList.list"
            item-text="title"
            item-value="id"
            label="category"
            @change="updateExamProp"
          />
        </v-col>
        <v-col
          v-if="!examProp.id"
          :cols="3"
        >
          <v-text-field
            v-model="selectedCategoryTime"
            type="number"
            label="زمان"
            @change="updateExamProp"
          />
        </v-col>
        <v-col
          v-if="!examProp.id"
          :cols="3"
        >
          <v-text-field
            v-model="selectedCategoryOrder"
            type="number"
            label="ترتیب"
            @change="updateExamProp"
          />
        </v-col>
        <v-col
          v-if="!examProp.id"
          :cols="6"
        >
          <v-btn @click="addCategory">
            اضافه کردن category
          </v-btn>
        </v-col>
      </v-row>
      <v-divider />
      <v-row
        v-for="item in examProp.categories.list"
        :key="item.id"
      >
        <v-col cols="5">
          <v-select
            v-model="item.id"
            :items="categoryList.list"
            item-value="id"
            item-text="title"
            @change="updateExamProp"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="item.time"
            label="زمان"
            type="number"
            @change="updateExamProp"
          />
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="item.order"
            label="ترتیب"
            type="number"
            @change="updateExamProp"
          />
        </v-col>
        <v-col cols="1">
          <v-btn
            dark
            color="red"
            icon
            @click="deleteCategory(item.id)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-center">
            <v-btn
              :disabled="examProp.loading"
              :loading="examProp.loading"
              elevation="2"
              @click="create"
            >
              ثبت
            </v-btn>
            <v-btn
              :disabled="examProp.loading"
              :loading="examProp.loading"
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
  props: ['value'],
  data: () => ({
    items: [],
    loading:true,
    examProp: new Exam(),
    examItem: new Exam(),
    categoryList: new QuestCategoryList(),
    selectedCategory: null,
    selectedCategoryTime: 0,
    selectedCategoryOrder: 0
  }),
  watch: {
    value (newValue) {
      this.examProp = newValue
    }
  },
  created() {
    this.examProp = this.value
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
    this.examItem = this.examProp
  },
  methods: {
    getCategoryById (id) {
      return this.categoryList.list.find(item => item.id === id)
    },
    deleteCategory (id) {
      this.examProp.categories.list = this.examProp.categories.list.filter(item => item.id !== id)
    },
    addCategory () {
      this.examProp.categories.list.push(new QuestCategory({ id: this.selectedCategory, time: this.selectedCategoryTime, order: this.selectedCategoryOrder }))
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
      this.examItem = this.examProp
      this.examItem.loading = true
      let that = this
      this.examItem.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
      if (this.examItem.id) {
        this.examItem.update(API_ADDRESS.exam.editExam + '/' +this.examItem.id)
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
              that.examItem.loading = false
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
              this.examItem.loading = false
              Assistant.handleAxiosError(this.$toasted, error)
              this.examItem = new Exam()
            })
      }

    },
    refreshExamList() {
      this.$emit('refresh-exam-list')
    },
    updateExamProp () {
      this.$emit('update', this.examProp)
      console.log('updateExamProp')
    }
  }
}
</script>

<style>
.vpd-input-group input {
  width: 100%;
}
</style>
