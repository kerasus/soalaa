<template>
  <div class="admin-exam-list full-width q-pa-md">
    <q-dialog
      v-model="dialogDelete"
      persisten
    >
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="primary" text-color="white" />
          <span class="q-ml-sm">از حذف آزمون اطمینان دارید؟</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="خیر"
            color="primary"
            @click="dontDelete"
          />
          <q-btn
            flat
            label="بله"
            color="primary"
            @click="confirmDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-table
      :columns="headers"
      :rows="rows"
      row-key="name"
      rows-per-page-label="تعداد ردیف در هر صفحه"
      :rows-per-page-options="[15 ,20,30]"
      :pagination-label="paginationLabel"
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
                  @click="edit(rows)"
                >
                  <q-item-section> ویرایش آزمون</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  @click="editExamReport(rows)"
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
                  @click="generateJsonFile(rows.value.id, false)"
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
                  @click="upload(rows)"
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
                  @click="deleteItem"
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
      >
        ثبت آزمون جدید
      </q-btn>
    </div>
  </div>
</template>

<script>
import { ExamList } from 'src/models/Exam'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ExamList',
  data () {
    return {
      dialogDelete: false,
      headers: [
        { name: 'title', field: 'title', label: 'عنوان' },
        { name: 'start_at', field: 'start_at', label: 'شروع' },
        { name: 'finish_at', field: 'finish_at', label: 'پایان' },
        { name: 'delay_time', field: 'delay_time', label: 'میزان تاخیر' },
        { name: 'options', field: 'options', label: 'عملیات' }
      ],
      examList: new ExamList(),
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
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.get(API_ADDRESS.exam.base(this.options.page))
        .then((response) => {
          this.$store.dispatch('loading/linearLoading', false)
          // this.totalRows = response.data.meta.total
          this.examList = new ExamList(response.data.data, { meta: response.data.meta, links: response.data.links })
          this.rows = this.examList.list
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
          this.examList = new ExamList()
        })
    },
    edit (examId) {
      this.$emit('update-exam', examId)
    },
    editExamReport (examId) {
      this.$emit('update-exam-report', examId)
    },
    generateJsonFile (exam, withAnswer) {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.post(API_ADDRESS.exam.generateExamFile(exam.id, withAnswer))
        .then((res) => {
          this.$q.notify({
            type: 'positive',
            message: 'ساخت فایل ' + exam.title + ' با موفقیت انجام شد',
            position: 'top'
          })
          this.$store.dispatch('loading/linearLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    upload (examId) {
      this.$emit('upload', examId)
    },
    deleteItem () {
      this.dialogDelete = true
    },
    dontDelete () {
      this.dialogDelete = false
    },
    confirmDelete () {
      this.dontDelete()
    },
    paginationLabel (currentPage, itemsPerPage, totalRowsNumber) {
      currentPage = this.options.page
      totalRowsNumber = this.totalRows
      const totalPage = Math.ceil(totalRowsNumber / totalRowsNumber)
      const label = 'صفحه ' + currentPage + ' از ' + totalPage
      return label
    }
  }
}
</script>
<style lang="scss" scoped>
.admin-exam-list{
  max-width: 1158px;
  margin: auto !important;
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
