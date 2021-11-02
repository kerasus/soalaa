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
      @row-click="rowClick"
      rows-per-page-label="تعداد ردیف در هر صفحه"
      :rows-per-page-options="[15,15]"
      :loading="$store.getters['loading/loading']"
      loading-label="لطفا منتظر بمانید..."
      :no-data-label="$store.getters['loading/loading'] ? '' : 'متاسفم:( موردی وجود ندارد...'"
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
                  @click="sendExamInfo(tableRow.id)"
                >
                  <q-item-section> ویرایش آزمون</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  @click="sendExamReportInfo"
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
                  @click="generateJsonFile(tableRow, false)"
                >
                  <q-item-section>ساخت فایل سوالات</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  @click="generateJsonFile(tableRow, true)"
                >
                  <q-item-section>ساخت فایل سوالات با جواب</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  @click="upload(tableRow.id)"
                >
                  <q-item-section>آپلود فایل سوالات و جواب ها</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  :to="{ name: 'coefficient.edit', params: { exam_id: tableRow.id } }"
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
            :to="{ name: 'onlineQuiz.exams.lessons', params: { quizId: tableRow.id , quizTitle: tableRow.title}}"
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
      <template v-slot:pagination>
        <div>{{'صفحه ' + pagination.page + ' از ' + this.lastPage }}</div>
        <q-btn
          icon="chevron_right"
          color="grey-8"
          round
          dense
          flat
          :disable="pagination.page === 1 "
          @click="prevPage"
        />
        <q-btn
          icon="chevron_left"
          color="grey-8"
          round
          dense
          flat
          :disable="pagination.page === lastPage "
          @click="nextPage"
        />
      </template>
    </q-table>
    <div class="text-center">
      <q-btn
        elevation="2"
        :to="{ name: 'create'}"
      >
        ثبت آزمون جدید
      </q-btn>
    </div>
  </div>
</template>

<script>
import { Exam, ExamList } from 'src/models/Exam'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ExamList',
  data () {
    return {
      filesMaxSize: null,
      filesPng: null,
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
      index: null,
      tableRow: new Exam(),
      pagination: {
        page: 1,
        rowsPerPage: 15,
        rowsNumber: 0
      },
      lastPage: 0,
      delay: null
    }
  },
  created () {
    this.getExams()
  },
  methods: {
    getExams () {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.get(API_ADDRESS.exam.base(this.pagination.page))
        .then((response) => {
          this.$store.dispatch('loading/linearLoading', false)
          this.pagination.rowsNumber = response.data.meta.total
          this.lastPage = Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)
          this.examList = new ExamList(response.data.data, { meta: response.data.meta, links: response.data.links })
          this.rows = this.examList.list
          for (const index in this.rows) {
            this.rows[index].delay_time += ' دقیقه'
            this.rows[index].start_at = this.rows[index].shamsiDate('start_at').dateTime
            this.rows[index].start_at = this.convertToEnglish(this.rows[index].start_at)
            this.rows[index].finish_at = this.rows[index].shamsiDate('finish_at').dateTime
            this.rows[index].finish_at = this.convertToEnglish(this.rows[index].finish_at)
          }
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
          this.examList = new ExamList()
        })
    },
    convertToEnglish (digit) {
      const p2e = s => s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
      digit = p2e(digit)
      return digit
    },
    nextPage () {
      if (this.pagination.page !== this.lastPage && this.pagination.page < this.lastPage) {
        this.pagination.page++
        this.getExams()
      }
    },
    prevPage () {
      if (this.pagination.page !== 1 && this.pagination.page <= this.lastPage) {
        this.pagination.page--
        this.getExams()
      }
    },
    rowClick (evt, row, index) {
      this.index = index
      this.tableRow = row
      console.log('row:', this.tableRow)
    },
    sendExamInfo (id) {
      this.$router.push({
        name: 'edit',
        params: {
          examId: id
        }
      })
    },
    sendExamReportInfo () {
      this.$router.push({
        name: 'edit-exam-report',
        params: {
          examId: this.tableRow.id
        }
      })
    },
    generateJsonFile (exams, withAnswer) {
      this.$store.dispatch('loading/linearLoading', true)
      this.$axios.post(API_ADDRESS.exam.generateExamFile(exams.id, withAnswer))
        .then(() => {
          this.$q.notify({
            type: 'positive',
            message: 'ساخت فایل ' + exams.title + ' با موفقیت انجام شد',
            position: 'top'
          })
          this.$store.dispatch('loading/linearLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('loading/linearLoading', false)
        })
    },
    upload (Id) {
      this.$emit('upload', Id)
    },
    deleteItem () {
      this.dialogDelete = true
    },
    dontDelete () {
      this.dialogDelete = false
    },
    confirmDelete () {
      this.dontDelete()
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
  .q-table {
    thead {
      tr {
        opacity: 0.6;
      }
    }
  }
  .q-table--horizontal-separator thead th, .q-table--horizontal-separator tbody td, .q-table--cell-separator thead th, .q-table--cell-separator tbody td {
    text-align: left !important;
  }
}

.q-menu {
  &.options-menu {
    border-radius: 24px 0 24px 24px !important;
    text-align: center;
    padding: 10px;

    .q-item {
      .q-item__section--main {
        opacity: 0.6;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
