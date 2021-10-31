<template>
  <div class="exam-info-body">
    <q-input
      v-model="examInfo.title"
      label-color="grey-8"
      label="عنوان"
    />
    <br>
    <q-select
      v-model="examType"
      :options="examTypes"
      emit-value
      map-options
      label-color="grey-8"
      label="انتخاب نوع آزمون"
    />
    <br>
    <div>
      <p>زمان شروع</p>
      <q-input
        filled
        v-model="examInfo.start_at"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="examInfo.start_at">
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
    </div>
    <br>
    <div>
      <p>زمان پایان</p>
      <q-input
        filled
        v-model="examInfo.finish_at"
        mask="date"
        :rules="['date']"
      >
        <template v-slot:append>
          <q-icon
            name="event"
            class="cursor-pointer"
          >
            <q-popup-proxy
              ref="qDateProxy"
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="examInfo.finish_at">
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
    </div>
    <br>
    <q-input
      v-model="examInfo.delay_time"
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
<!--    <div v-if="!examInfo.id">-->
    <div>
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
            v-model="item.id"
            :options="categoryTitles"
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
export default {
  name: 'ExamInfo',
  data () {
    return {
      examId: null,
      examList: new ExamList(),
      examInfo: new Exam(),
      examTypes: [],
      selectedCategory: null,
      categoryList: new QuestCategoryList(),
      categoryTitles: [],
      selectedCategoryTime: 0,
      selectedCategoryOrder: 0
    }
  },
  created () {
    this.getData()
    this.getOptions()
    this.getCategories()
  },
  computed: {
    examType () {
      if (this.examInfo.type) {
        return this.examInfo.type.value
      } else return ''
    }
  },
  methods: {
    getData () {
      this.examId = this.$route.params.examId
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          console.log(' getData res:', response)
          this.examList = response.data.data
          console.log('getData examList:', this.examList)
          console.log(this.examInfo)
          this.examInfo = new Exam(this.examList.find(exam => exam.id === this.examId))
          // this.examInfo.start_at = this.examInfo.shamsiDate('start_at').dateTime
          // this.examInfo.finish_at = this.examInfo.shamsiDate('finish_at').dateTime
          console.log('getData: examInfo', this.examInfo)
        })
    },
    getOptions () {
      this.$axios.get(API_ADDRESS.option.base)
        .then((response) => {
          const options = response.data.data.filter(data => data.type === 'exam_type')
          options.forEach(option => {
            this.examTypes.push(option.value)
          })
        })
    },
    getCategories () {
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          this.categoryList = new QuestCategoryList(response.data.data)
          this.categoryList.list.forEach(category => {
            this.categoryTitles.push(category.title)
          })
        })
        .catch(() => {})
    },
    addCategory () {
      this.examInfo.categories.list.push(new QuestCategory({
        id: this.selectedCategory,
        time: this.selectedCategoryTime,
        order: this.selectedCategoryOrder
      }))
    },
    deleteCategory (id) {
      this.examInfo.categories.list = this.exam.categories.list.filter(item => item.id !== id)
    },
    createExam () {
      this.examInfo.photo = 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719'
      if (this.examInfo.id) {
        this.examInfo.update(API_ADDRESS.exam.editExam + '/' + this.examInfo.id)
          .then((res) => {
            console.log('update res:', res)
          })
          .catch((err) => {
            console.log('update err:', err)
          })
      } else {
        this.examInfo.create()
          .then((res) => {
            console.log('create res:', res)
          })
      }
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
