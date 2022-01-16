<template>
  <div>
    <entity-index
      title="لیست آزمون ها"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :create-route-name="'Admin.Exam.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'actions'">
            <q-btn round flat dense size="md" color="info" icon="info" @click="showExam(inputData.props.row.id)">
              <q-tooltip anchor="top middle" self="bottom middle">
                مشاهده
              </q-tooltip>
            </q-btn>
            <q-btn round flat dense size="md" color="purple" icon="edit">
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
                    @click="editExam(inputData.props.row.id)"
                  >
                    <q-item-section> ویرایش آزمون</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="editExamReport(inputData.props.row.id)"
                  >
                    <q-item-section>ویرایش کارنامه</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="generateJsonFile(inputData.props.row, false)"
                  >
                    <q-item-section>ساخت فایل سوالات</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="generateJsonFile(inputData.props.row, true)"
                  >
                    <q-item-section>ساخت فایل سوالات با جواب</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="uploadFile(inputData.props.row.id)"
                  >
                    <q-item-section>آپلود فایل سوالات و جواب ها</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="editCoefficient(inputData.props.row.id)"
                  >
                    <q-item-section>اصلاح ضرایب</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple:yellow
                    clickable
                    manual-focus
                    @click="showConfirmRemoveDialog(inputData.props.row, 'id', getRemoveMessage(inputData.props.row))"
                  >
                    <q-item-section>حذف آزمون</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-tooltip anchor="top middle" self="bottom middle">
                ویرایش
              </q-tooltip>
            </q-btn>
            <q-btn round flat dense size="md" color="indigo" icon="auto_stories"  @click="showLessonsList(inputData.props.row.id, inputData.props.row.title)">
              <q-tooltip anchor="top middle" self="bottom middle">
                مشاهده دروس
              </q-tooltip>
            </q-btn>
            <q-btn round flat dense size="md" color="blue" icon="assignment">
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
                  >
                    <q-item-section>کارنامه سرگروه</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-tooltip anchor="top middle" self="bottom middle">
                مشاهده نتایج
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
        pageKey: 'meta.current_page'
      }
    }
  },
  created () {
    if (this.tableKeys.currentPage) {
      this.api = API_ADDRESS.exam.base(this.tableKeys.currentPage)
    }
  },
  methods: {
    showExam (id) {
      this.$router.push({
        name: 'Admin.Exam.Show',
        params: {
          id: id
        }
      })
    },
    editExam (id) {
      this.$router.push({
        name: 'Admin.Exam.Edit',
        params: {
          id: id
        }
      })
    },
    editExamReport (id) {
      this.$router.push({
        name: 'edit-exam-report',
        params: {
          id: id
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
        name: 'coefficient.edit',
        params: {
          id: id
        }
      })
    },
    uploadFile (id) {
      this.$router.push({
        name: 'Admin.Exam.Upload',
        params: {
          id: id
        }
      })
    },
    getRemoveMessage (row) {
      const title = row.title
      return 'آیا از حذف ' + title + ' اطمینان دارید؟'
    },
    showLessonsList (id, title) {
      this.$router.push({
        name: 'onlineQuiz.exams.lessons',
        params: {
          quizId: id,
          quizTitle: title
        }
      })
    },
    goExamResult (id) {
      this.$router.push({
        name: 'exam.results',
        params: {
          id: id
        }
      })
    }
  }

}
</script>

<style scoped>

</style>
