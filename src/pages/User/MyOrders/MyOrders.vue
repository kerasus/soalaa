<template>
  <div
    class="my-orders-list"
  >
    <entity-index
      class="orders-list-entity-index"
      title="سفارش های من"
      :api="api"
      :table="table"
      :table-keys="tableKeys"
      :default-layout="false"
      :create-route-name="'Admin.Exam.Create'"
    >
      <template #table-cell="{inputData, showConfirmRemoveDialog}">
        <q-td :props="inputData.props">
          <template v-if="inputData.props.col.name === 'start_at'">
            <div
              v-if="inputData.props.row.n_questions === 0"
              class="payment-okay"
            >
              پرداخت نشده
            </div>
            <div
              v-else-if="inputData.props.row.n_questions === 1"
              class="payment-not-okay"
            >
              پرداخت شده
            </div>
            <div
              v-else
              class="payment-installment"
            >
              پرداخت قسطی
            </div>
          </template>
          <template v-if="inputData.props.col.name === 'details'">
            <q-btn round
                   flat
                   dense
                   size="md"
                   @click="showExam(inputData.props.row.id)">
              <q-tooltip anchor="top middle"
                         self="bottom middle">
                مشاهده
              </q-tooltip>
              <svg width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <circle cx="12"
                        cy="6"
                        r="2"
                        fill="#6D708B" />
                <circle cx="12"
                        cy="12"
                        r="2"
                        fill="#6D708B" />
                <circle cx="12"
                        cy="18"
                        r="2"
                        fill="#6D708B" />
              </svg>
            </q-btn>
            <!--            <q-btn round flat dense size="md" color="purple" icon="edit" :to="{name:'Admin.Exam.Edit', params: {id: inputData.props.row.id}}">-->
            <!--              <q-tooltip anchor="top middle" self="bottom middle">-->
            <!--                ویرایش-->
            <!--              </q-tooltip>-->
            <!--            </q-btn>-->
            <!--            <q-btn round-->
            <!--                   flat-->
            <!--                   dense-->
            <!--                   size="md"-->
            <!--                   color="indigo"-->
            <!--                   icon="auto_stories"-->
            <!--                   @click="showLessonsList(inputData.props.row.id, inputData.props.row.title)">-->
            <!--              <q-tooltip anchor="top middle"-->
            <!--                         self="bottom middle">-->
            <!--                مشاهده دروس-->
            <!--              </q-tooltip>-->
            <!--            </q-btn>-->
            <!--            <q-btn round-->
            <!--                   flat-->
            <!--                   dense-->
            <!--                   size="md"-->
            <!--                   color="blue"-->
            <!--                   icon="assignment">-->
            <!--              <q-menu-->
            <!--                class="options-menu"-->
            <!--                transition-show="jump-down"-->
            <!--                transition-hide="jump-up"-->
            <!--                :offset="[150,5]"-->
            <!--              >-->
            <!--                <q-list style="min-width: 100px">-->
            <!--                  <q-item-->
            <!--                    v-ripple:yellow-->
            <!--                    clickable-->
            <!--                    manual-focus-->
            <!--                    @click="goExamResult(inputData.props.row.id)"-->
            <!--                  >-->
            <!--                    <q-item-section>نتایج تمام شرکت کنندگان</q-item-section>-->
            <!--                  </q-item>-->
            <!--                  <q-item-->
            <!--                    v-ripple:yellow-->
            <!--                    clickable-->
            <!--                    manual-focus-->
            <!--                    @click="showLessonsChartList(inputData.props.row.id, inputData.props.row.title)"-->
            <!--                  >-->
            <!--                    <q-item-section>کارنامه سرگروه</q-item-section>-->
            <!--                  </q-item>-->
            <!--                </q-list>-->
            <!--              </q-menu>-->
            <!--              <q-tooltip anchor="top middle"-->
            <!--                         self="bottom middle">-->
            <!--                مشاهده نتایج-->
            <!--              </q-tooltip>-->
            <!--            </q-btn>-->
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
            <!--            <q-btn round-->
            <!--                   flat-->
            <!--                   dense-->
            <!--                   size="md"-->
            <!--                   color="info"-->
            <!--                   icon="info"-->
            <!--                   :to="{name:'Admin.Exam.MoreActions', params: {id: inputData.props.row.id}}">-->
            <!--              <q-tooltip anchor="top middle"-->
            <!--                         self="bottom middle">-->
            <!--                عملیات بیشتر-->
            <!--              </q-tooltip>-->
            <!--            </q-btn>-->
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
  name: 'MyOrders',
  components: { EntityIndex },
  data () {
    return {
      properties: {
        layoutView: 'lHh Lpr lFf',
        layoutHeader: true,
        layoutHeaderVisible: true,
        layoutHeaderReveal: false,
        layoutHeaderElevated: false,
        layoutHeaderBordered: false,
        layoutLeftDrawer: true,
        layoutLeftDrawerVisible: false,
        layoutLeftDrawerOverlay: false,
        layoutLeftDrawerElevated: false,
        layoutLeftDrawerBordered: false,
        layoutLeftDrawerWidth: 325,
        layoutPageContainer: true,
        layoutRightDrawer: false,
        layoutFooter: false,
        layoutHeaderCustomClass: 'main-layout-header row',
        layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
        layoutPageContainerCustomClass: 'main-layout-container'
      },
      expanded: true,
      table: {
        columns: [
          {
            name: 'title',
            required: true,
            label: 'شماره سفارش',
            align: 'left',
            field: row => row.title
          },
          // {
          //   name: 'start_at',
          //   // name: 'payment_status',
          //   required: true,
          //   label: 'وضعیت ‌پرداخت',
          //   align: 'left',
          //   field: row => moment(row.start_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          // },
          {
            name: 'start_at',
            // name: 'payment_status',
            required: true,
            label: 'وضعیت ‌پرداخت',
            align: 'left'
            // field: row => row.n_questions
          },
          {
            name: 'finish_at',
            required: true,
            label: 'مبلغ',
            align: 'left',
            field: row => moment(row.finish_at, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
          },
          {
            name: 'delay_time',
            required: true,
            label: 'تاریخ سفارش',
            align: 'left',
            field: row => row.delay_time
          },
          {
            name: 'details',
            required: true,
            label: 'جزئیات',
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
      }
    }
  },
  created () {
    this.updateLayout()
  },
  methods: {
    updateLayout () {
      this.$store.dispatch('AppLayout/updateStore', this.properties)
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

<style scoped lang="scss">
.my-orders-list {
  .payment-okay {
    color: #4CAF50;
  }
  .payment-not-okay {
    color: #E86562;
  }
  .payment-installment {
    color: #8ED6FF;
  }
  :deep(.quasar-crud-index-table) {
    padding: 0 !important;
    .q-table__container {
      background: #FFFFFF;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 16px;
      .q-table__middle {
        //.q-table {
          table {
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
            letter-spacing: -0.03em;
            color: #6D708B;
            th {
              font-weight: 400;
              font-size: 16px;
              line-height: 25px;
              color: #6D708B;
            }
            tr {
              font-weight: 400;
              font-size: 14px;
              line-height: 22px;
              color: #434765;
              &:nth-child(2n) {
                background: #F6F9FF;
              }
              :not(:last-child) > td {
                border-bottom-width: 0 !important;
              }
            }
          }
        //}
      }
    }
    .q-pagination {
      //background: red;
      //.q-btn--flat {
      //  background: #FFFFFF;
      //  border-radius: 12px;
      //}
      :not(.justify-center) {
        button {
          &:last-child {
            background: #FFFFFF;
            border-radius: 12px;
          }
          &:first-child {
            background: #FFFFFF;
            border-radius: 12px;
          }
        }
      }

      .q-btn--actionable {
        //background: none;
      }
      //button &:last-child {
      //  background: #FFFFFF;
      //  border-radius: 12px;
      //}
      :nth-child(1):nth-last-child(1) {
        background: #FFFFFF;
        border-radius: 12px;
      }
      //:not(.q-btn--actionable)
      :first-child &button {
        background: #FFFFFF;
        border-radius: 12px;
      }
      :last-child &button {
        background: #FFFFFF;
        border-radius: 12px;
      }
      .q-btn {
        color: #6D708B !important;
        width: 40px;
        height: 40px;
        padding: 0 !important;
        :first-child {
          background: none;
          //border-radius: n;
        }

      }
    }
  }
}
</style>
