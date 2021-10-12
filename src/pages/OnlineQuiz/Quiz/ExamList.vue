<template>
  <div class="admin-exam-list q-pa-md">
    <div>{{rowsList.title}}</div>
    <q-table
      :columns="headers"
      :rows="rowsList"
      row-key="name"
      rows-per-page-label="تعداد ردیف در هر صفحه"
    >
      <template v-slot:header="props">
        <q-tr :props="props" >
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
export default {
  name: 'ExamList',
  data () {
    return {
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
      ]
    }
  },
  methods: {
    selectExam (item) {
      this.$emit('update-exam-id', item)
    }
  }
}
</script>

<style lang="scss">
.admin-exam-list{
  .q-table--horizontal-separator thead th, .q-table--horizontal-separator tbody td, .q-table--cell-separator thead th, .q-table--cell-separator tbody td {
    text-align: left !important;
  }
}
</style>
