<template>
  <upload-answers/>
  <div class="admin-exam-list q-pa-md">
    <div>{{ rowsList.title }}</div>
    <q-table
      :columns="headers"
      :rows="rowsList"
      row-key="name"
      rows-per-page-label="تعداد ردیف در هر صفحه"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :field="col.field"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <!--      <template #body-cell-delay_time="props">-->
      <!--        <q-td-->
      <!--          :props="props"-->
      <!--        >-->
      <!--           {{  + 'دقیقه'}}-->
      <!--        </q-td>-->
      <!--      </template>-->
      <template #body-cell-options="props">
        <q-td
          :props="props"
        >
          <q-btn
            class="options-btn"
            round
            dark
            color="purple"
            icon="edit"
            size="11px"
          >
            <q-menu
              class="options-menu"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[170,5]"
            >
              <q-list style="min-width: 100px">
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section> ویرایش</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>ویرایش کارنامه</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>مشاهده تمام سوالات</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>ساخت فایل سوالات</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>ساخت فایل سوالات با جواب</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>آپلود فایل سوالات و جواب ها</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>اصلاح ضرایب</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>حذف آزمون</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip anchor="top middle" self="bottom middle">
              ویرایش
            </q-tooltip>
          </q-btn>
          <q-btn
            class="options-btn"
            round
            dark
            color="indigo"
            icon="auto_stories"
            size="11px"
          >
            <q-tooltip anchor="top middle" self="bottom middle">
              مشاهده دروس
            </q-tooltip>
          </q-btn>
          <q-btn
            class="options-btn"
            round
            dark
            color="blue"
            icon="assignment"
            size="11px"
          >
            <q-menu
              class="options-menu"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[150,5]"
            >
              <q-list style="min-width: 100px">
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>نتایج تمام شرکت کنندگان</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                >
                  <q-item-section>کارنامه سرگروه</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip anchor="top middle" self="bottom middle">
              مشاهده نتایج
            </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:pagination="scope">
        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isFirstPage"
          @click="scope.prevPage"
        />
        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="scope.isLastPage"
          @click="scope.nextPage"
        />
      </template>
    </q-table>
    <div class="text-center">
      <q-btn
        elevation="2"
        @click="selectExam(null)"
      >
        ثبت آزمون جدید
      </q-btn>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
import { Exam, ExamList } from 'src/models/Exam'
// import Toasted from 'vue-toasted'
import API_ADDRESS from 'src/api/Addresses'
// Vue.use(Toasted)
import Axios from 'axios'
import UploadAnswers from 'src/components/OnlineQuiz/Quiz/uploadAnswers'

export default {
  name: 'ExamList',
  components: { UploadAnswers },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      selectedExam: null,
      examList: new ExamList(),
      examItem: new Exam(),
      rows: [],
      options: {
        itemsPerPage: 15,
        page: 1
      },
      totalRows: 0,
      dialogUpload: false,
      // ------------------------------------------------
      headers: [
        { name: 'title', field: 'title', label: 'عنوان' },
        { name: 'start_at', field: 'start_at', label: 'شروع' },
        { name: 'finish_at', field: 'finish_at', label: 'پایان' },
        { name: 'delay_time', field: 'delay_time', label: 'میزان تاخیر' },
        { name: 'options', field: 'options', label: 'عملیات' }
      ],
      rowsList: [
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        },
        {
          id: '614c71a148377222e808ce3b',
          title: 'فرسنگ اول زیست شناسی | کنکورچه سوم',
          holding_status: null,
          start_at: '2021-10-04 15:50:00',
          finish_at: '2021-10-18 15:50:00',
          photo: 'https://cdn.alaatv.com/upload/images/slideShow/home-slide-yalda-festival_20201219075413.jpg?w=1843&h=719',
          delay_time: 30,
          n_questions: 0,
          enable: false,
          updated_at: '2021-09-23 15:52:57',
          created_at: '2021-09-23 15:52:57',
          generate_questions_automatically: null,
          confirm: false,
          report_config: [],
          holding_config: {
            randomize_questions: false
          },
          alaa_product_link: null,
          type: {
            id: '6141a799f044ab21205450b2',
            type: 'exam_type',
            value: 'konkur',
            updated_at: '2021-09-15 12:28:17',
            created_at: '2021-09-15 12:28:17'
          },
          user_exam_id: null,
          is_free: null,
          is_register_open: false,
          is_open: false
        }
      ],
      delay: null
    }
  },
  methods: {
    goToResult (exam) {
      if (exam.type.value === 'psychometric') {
        this.$router.push({ name: 'psychology.results', params: { examId: exam.id } })
        return
      }
      this.$router.push({ name: 'exam.results', params: { examId: exam.id } })
    },
    openUploadDialog (examId) {
      this.dialogUpload = true
      this.selectedExam = examId
    },
    generateJsonFile (exam, withAnswer) {
      this.examList.loading = true
      const that = this
      Axios.post(API_ADDRESS.exam.generateExamFile(exam.id, withAnswer))
        .then(() => {
          that.$notify({
            group: 'notifs',
            text: 'ساخت فایل ' + exam.title + ' با موفقیت انجام شد',
            type: 'success',
            duration: -1
          })
          this.examList.loading = false
        })
        .catch(() => {
          this.examList.loading = false
        })
    },
    editItem () {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem () {
      // this.editedIndex = this.desserts.indexOf(item)
      // this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      // this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    save () {
      this.close()
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem)
        // this.editedIndex = -1
      })
    },
    getExams () {
      this.examList.loading = true
      this.examList.fetch(null, API_ADDRESS.exam.base(this.options.page))
        .then((response) => {
          this.examList.loading = false
          this.totalRows = response.data.meta.total
          this.rows = new ExamList(response.data.data, { meta: response.data.meta, links: response.data.links })
          this.examList = new ExamList(response.data.data, { meta: response.data.meta, links: response.data.links })
        })
        .catch(() => {
          this.examList.loading = false
          this.examList = new ExamList()
        })
    },
    selectExam (item) {
      this.$emit('update-exam-id', item)
    },
    selectExamReport (item) {
      this.$emit('update-exam-report-id', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-exam-list{
  .options-btn{
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
.admin-exam-list {
  .q-table--horizontal-separator thead th, .q-table--horizontal-separator tbody td, .q-table--cell-separator thead th, .q-table--cell-separator tbody td {
    text-align: left !important;
  }
}
.q-menu{
  &.options-menu{
    border-radius: 24px 0 24px 24px !important;
    text-align: center;
    padding: 10px;
  }
}
</style>
