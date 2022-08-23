<template>
  <div>
    <entity-index
      v-model:value="inputs"
      title="لیست آزمون ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :show-search-button="false"
      :create-route-name="'Admin.Exam.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round
                   flat
                   dense
                   size="md"
                   color="info"
                   icon="isax:eye"
                   @click="showExam(inputData.props.row.id)">
              <q-tooltip anchor="top middle"
                         self="bottom middle">
                مشاهده
              </q-tooltip>
            </q-btn>
            <!--            <q-btn round flat dense size="md" color="purple" icon="edit" :to="{name:'Admin.Exam.Edit', params: {id: inputData.props.row.id}}">-->
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
                   @click="showLessonsList(inputData.props.row.id, inputData.props.row.title)">
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
                    @click="goExamResult(inputData.props.row.id)"
                  >
                    <q-item-section>نتایج تمام شرکت کنندگان</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="showLessonsChartList(inputData.props.row.id, inputData.props.row.title)"
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
                   color="info"
                   icon="info"
                   :to="{name:'Admin.Exam.MoreActions', params: {id: inputData.props.row.id}}">
              <q-tooltip anchor="top middle"
                         self="bottom middle">
                عملیات بیشتر
              </q-tooltip>
            </q-btn>
          </template>
          <template v-else>
            {{ inputData.props.value }}
          </template>
        </q-td>
      </template>
    </entity-index>
  </div>
</template>

<script>
import { EntityIndex } from 'quasar-crud'
import API_ADDRESS from 'src/api/Addresses'
import moment from 'moment-jalaali'
export default {
  name: 'index',
  components: { EntityIndex },
  data () {
    return {
      expanded: true,
      table: {
        columns: [
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
        { type: 'input', name: 'title', label: 'عنوان', responseKey: 'data.title', col: 'col-md-3', placeholder: ' ', filled: true },
        // { type: 'input', name: 'type', label: 'نوع', responseKey: 'data.type', col: 'col-md-3', placeholder: ' ', filled: true },
        { type: 'date', name: 'updated_at', label: '', responseKey: 'data.updated_at', col: 'col-md-3', placeholder: 'تاریخ شروع از' },
        { type: 'date', name: 'created_at', label: '', responseKey: 'data.created_at', col: 'col-md-3', placeholder: 'تاریخ شروع تا' }
      ]
    }
  },
  created () {
    // if (this.tableKeys.currentPage) {
    //   this.api = API_ADDRESS.exam.base(this.tableKeys.currentPage)
    // }
  },
  methods: {
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
    },
    showLessonsList (id, title) {
      this.$router.push({
        name: 'Admin.Exam.Lessons',
        params: {
          quizId: id,
          quizTitle: title
        }
      })
    },
    showLessonsChartList (id, title) {
      this.$router.push({
        name: 'Admin.Exam.Lessons.List',
        params: {
          quizId: id,
          quizTitle: title
        }
      })
    },
    goExamResult (id) {
      this.$router.push({
        name: 'Admin.Exam.AllResults',
        params: {
          id
        }
      })
    }

  }

}
</script>

<style scoped>

</style>
