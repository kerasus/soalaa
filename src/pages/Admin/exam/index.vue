<template>
  <div class="exam-index">
    <entity-index
      v-model:value="inputs"
      title="لیست آزمون ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.Exam.Create'"
    >
      <!--            :show-search-button="false"
-->
      <template #entity-index-table-cell="{inputData, showConfirmRemoveDialog}">
        <template v-if="inputData.col.name === 'photo'">
          <q-img :src="inputData.props.row.photo"
                 width="50px" />
        </template>
        <template v-else-if="inputData.col.name === 'actions'">
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="isax:eye"
                 :to="{name:'Admin.Exam.Show', params: {id: inputData.props.row.id}}"
          >
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              مشاهده
            </q-tooltip>
          </q-btn>
          <!--            <q-btn round flat dense size="md" color="purple" icon="edit" :to="{name:'Admin.Exam.Edit', params: {id: props.row.id}}">-->
          <!--              <q-tooltip anchor="top middle" self="bottom middle">-->
          <!--                ویرایش-->
          <!--              </q-tooltip>-->
          <!--            </q-btn>-->
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="indigo"
                 icon="auto_stories"
                 :to="{name:'Admin.Exam.Categories', params: {exam_id: inputData.props.row.id , examTitle: inputData.props.row.title}}"
          >
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              مشاهده دروس
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="blue"
                 icon="assignment">
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
                  :to="{name:'Admin.Exam.AllResults', params: {id: inputData.props.row.id}}"
                >
                  <q-item-section>نتایج تمام شرکت کنندگان</q-item-section>
                </q-item>
                <q-item
                  v-ripple:yellow
                  clickable
                  manual-focus
                  :to="{name:'Admin.Exam.Lessons.List', params: {quizId: inputData.props.row.id, quizTitle: inputData.props.row.title}}"
                >
                  <q-item-section>کارنامه سرگروه</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              مشاهده نتایج
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="info"
                 icon="info"
                 :to="{name:'Admin.Exam.MoreActions', params: {id: inputData.props.row.id}}">
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              عملیات بیشتر
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="red"
                 icon="delete"
                 @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))">
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              حذف آزمون
            </q-tooltip>
          </q-btn>
          <q-btn round
                 flat
                 dense
                 size="md"
                 color="black"
                 icon="isax:book-1"
                 :loading="attendExamBtnLoading"
                 @click="attendExam(inputData.props.row.id)"
          >
            <q-tooltip anchor="top middle"
                       self="bottom middle">
              شرکت در آزمون
            </q-tooltip>
          </q-btn>
        </template>
        <template v-else>
          {{ inputData.col.value }}
        </template>
      </template>
    </entity-index>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses.js'
export default {
  name: 'Admin.Exam.Index',
  components: { EntityIndex },
  data () {
    return {
      expanded: true,
      attendExamBtnLoading: false,
      table: {
        columns: [
          {
            name: 'photo',
            required: true,
            label: 'تصویر',
            align: 'left',
            field: row => row.photo
          },
          {
            name: 'title',
            required: true,
            label: 'عنوان',
            align: 'left',
            field: row => row.title
          },
          {
            name: 'start_at',
            required: true,
            label: 'شروع',
            align: 'left',
            field: row => moment(row.start_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          },
          {
            name: 'finish_at',
            required: true,
            label: 'پایان',
            align: 'left',
            field: row => moment(row.finish_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          },
          {
            name: 'delay_time',
            required: true,
            label: 'میزان تاخیر',
            align: 'left',
            field: row => row.delay_time
          },
          {
            name: 'delay_time',
            required: true,
            label: 'تعداد سوالات',
            align: 'left',
            field: row => row.n_questions
          },
          {
            name: 'actions',
            required: true,
            label: 'عملیات',
            align: 'left',
            field: row => row.actions
          }
        ],
        data: []
      },
      api: API_ADDRESS.exam.base(),
      tableKeys: {
        data: 'data',
        total: 'meta.total',
        currentPage: 'meta.current_page',
        perPage: 'meta.per_page',
        pageKey: 'page'
      },
      inputs: [
        { type: 'input', name: 'statement', col: 'col-md-4', placeholder: ' ', label: 'عنوان' },
        { type: 'date', name: 'start_at_from', calendarIcon: ' ', col: 'col-md-4', placeholder: 'تاریخ شروع از' },
        { type: 'date', name: 'start_at_till', calendarIcon: ' ', col: 'col-md-4', placeholder: 'تاریخ شروع تا' }
      ]
    }
  },
  created () {
    // if (this.tableKeys.currentPage) {
    //   this.api = API_ADDRESS.exam.base(this.tableKeys.currentPage)
    // }
  },
  computed: {},
  methods: {
    registerExam (examId) {
      return this.$axios.post(API_ADDRESS.exam.registerExam, { exam_id: examId })
    },
    attendExam (examId) {
      this.attendExamBtnLoading = true
      this.registerExam(examId)
        .then((response) => {
          this.$q.notify({
            type: 'positive',
            message: 'ثبت نام در آزمون با موفقیت انجام شد',
            position: 'top'
          })
          this.attendExamBtnLoading = false
          this.$router.push({
            name: 'onlineQuiz.alaaView',
            params: { quizId: examId, questNumber: 1 }
          })
        })
        .catch(() => {
          this.attendExamBtnLoading = false
        })
    },
    showExam (id) {
      this.$router.push({
        name: 'Admin.Exam.Show',
        params: {
          id
        }
      })
    },
    editExam (id) {
      this.$router.push({
        name: 'Admin.Exam.Edit',
        params: {
          id
        }
      })
    },
    editExamReport (id) {
      this.$router.push({
        name: 'Admin.Exam.Report.Edit',
        params: {
          id
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
    editCoefficient (id) {
      this.$router.push({
        name: 'Admin.Exam.Coefficient.Edit',
        params: {
          id
        }
      })
    },
    uploadFile (id) {
      this.$router.push({
        name: 'Admin.Exam.Upload',
        params: {
          id
        }
      })
    },
    getRemoveMessage (row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    }

  }

}
</script>

<style scoped lang="scss">
.exam-index {
  :deep(.q-card__section) {
    background: #f4f6f9;
  }
}
</style>
