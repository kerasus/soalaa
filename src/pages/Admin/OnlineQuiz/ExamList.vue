<template>
  <upload-answers/>
  <div class="admin-exam-list q-pa-md">
    <q-table
      :columns="headers"
      :rows="rows"
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
                  @click="generateJsonFile(rows[0], false)"
                >
                  <q-item-section>ساخت فایل سوالات</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  @click="generateJsonFile(rows[0], true)"
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
import { Exam, ExamList } from 'src/models/Exam'
import API_ADDRESS from 'src/api/Addresses'
import { useQuasar } from 'quasar'
const $q = useQuasar()
import UploadAnswers from 'src/components/OnlineQuiz/Quiz/uploadAnswers'

export default {
  name: 'ExamList',
  components: { UploadAnswers },
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      selectedExam: null,
      headers: [
        { name: 'title', field: 'title', label: 'عنوان' },
        { name: 'start_at', field: 'start_at', label: 'شروع' },
        { name: 'finish_at', field: 'finish_at', label: 'پایان' },
        { name: 'delay_time', field: 'delay_time', label: 'میزان تاخیر' },
        { name: 'options', field: 'options', label: 'عملیات' }
      ],
      examList: new ExamList(),
      examItem: new Exam(),
      rows: [],
      options: {
        itemsPerPage: 15,
        page: 1
      },
      totalRows: 0,
      delay: null
    }
  },
  // watch: {
  //   options: {
  //     handler () {
  //       this.getExams()
  //     }
  //   }
  // },
  created () {
    this.getExams()
  },
  methods: {
    getExams () {
      this.examList.loading = true
      console.log('list:', this.examList)
      this.$axios.get(API_ADDRESS.exam.base(this.options.page))
        .then((response) => {
          console.log('response: ', response)
          this.examList.loading = false
          // this.totalRows = response.data.meta.total
          this.examList = new ExamList(response.data.data, { meta: response.data.meta, links: response.data.links })
          this.rows = this.examList.list
        })
        .catch((err) => {
          console.log(err)
          this.examList.loading = false
          this.examList = new ExamList()
          console.log('catch list:', this.examList)
        })
    },
    generateJsonFile (exam, withAnswer) {
      this.examList.loading = true
      this.$axios.post(API_ADDRESS.exam.generateExamFile(exam.id, withAnswer))
        .then((res) => {
          console.log('res: ', res)
          $q.notify({
            massage: 'ساخت فایل ' + exam.title + ' با موفقیت انجام شد',
            color: 'positive',
            position: 'top'
          })
          this.examList.loading = false
        })
        .catch(() => {
          this.examList.loading = false
        })
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
