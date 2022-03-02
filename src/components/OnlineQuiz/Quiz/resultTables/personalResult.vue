<template>
  <div
    class="personal-results"
  >
    <div
      class="row"
      v-if="report"
    >
      <div
        class="col col-12 col-md-7"
      >
        <div class="row proceeds-table default-resultTable-row">
          <div class="col lessons-proceeds default-resultTable-col">
            <br>
            <span class="tableTitle col-12">
                  جدول عملکرد دروس
            </span>
            <br>
            <br>
            <q-table
              :rows="report.sub_category"
              :columns="columns1"
              row-key="name"
              color="amber"
              hide-bottom
              flat
              :rows-per-page-options="[0]"
            ></q-table>
          </div>
        </div>
        <div class="row default-result-table default-resultTable-row">
          <div class="col default-resultTable-col">
            <q-table
              :rows="[report.exam_user]"
              :columns="columns3"
              row-key="name"
              color="amber"
              hide-bottom
              flat
              :rows-per-page-options="[0]"
            ></q-table>
          </div>
        </div>
      </div>
      <div
        class="col col-md-5 col-12"
      >
        <div class="row default-result-table default-resultTable-row">
          <div class="col default-resultTable-col">
            <br>
            <span class="tableTitle ">
                  نتیجه در زیر گروه ها
            </span>
            <br>
            <br>
            <q-table
              :rows="report.zirgorooh"
              :columns="columns2"
              row-key="name"
              color="amber"
              hide-bottom
              flat
              :rows-per-page-options="[0]"
            ></q-table>
          </div>
        </div>
        <div class="row default-resultTable-row">
          <div class="col card-col default-resultTable-col">
            <div class="card-parent elevation-1">
              <q-card class="default-result-card" >
                <q-card-section class="card-title-section">
                  <div class="row">
                    <div class="col text-center">
                      تعداد کل شرکت کنندگان
                    </div>
                    <div class="col text-center">
                      ماکزمیم تراز کل زیر گروه
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col text-center">
                      {{ report.n_normal_participants }}
                    </div>
                    <div class="col text-center">
                      {{ report.main.taraaz }}
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
        <div class="row default-resultTable-row">
          <div class="col card-col default-resultTable-col">
            <div class="card-parent elevation-1">
              <q-card
                class="mb-2 default-result-card"
              >
                <q-card-section class="card-title-section">
                  <div class="row">
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">
                      رتبه کل کشوری
                    </div>
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">
                      رتبه در استان
                    </div>
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">
                      رتبه در شهر
                    </div>
                    <div
                      class="col col-3 text-center"
                      v-if="report.main.rank_school"
                    >
                      رتبه در مدرسه
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <div class="row">
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">{{ report.main.rank_country }}</div>
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">{{ report.main.rank_province }}</div>
                    <div class="col text-center" :class="[(report.main.rank_school) ? 'col-3' : 'col-4']">{{ report.main.rank_city }}</div>
                    <div
                      class="col col-3 text-center"
                      v-if="report.main.rank_school"
                    >{{ report.main.rank_school }}</div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
export default {
  name: 'PersonalResult',
  props: ['report'],
  data () {
    return {

      columns1: [
        {
          name: 'index',
          align: 'center',
          label: 'ردیف',
          field: row => row.index,
          sortable: true
        },
        { name: 'sub_category', label: 'درس', field: row => row.sub_category, align: 'center', sortable: false },
        { name: 'total_answer', label: ' تعداد کل', field: row => row.total_answer, align: 'center', sortable: false },
        { name: 'right_answer', label: ' تعداد درست', field: row => row.right_answer, align: 'center', sortable: false },
        { name: 'wrong_answer', label: ' تعداد غلط', field: row => row.wrong_answer, align: 'center', sortable: false },
        { name: 'empty', label: ' تعداد نزده', field: row => row.empty, align: 'center', sortable: false },
        { name: 'percent', label: ' درصد', field: row => row.percent, align: 'center', sortable: true },
        { name: 'taraaz', label: ' تراز', field: row => row.taraaz, align: 'center', sortable: true }
      ],
      columns2: [
        {
          name: 'title',
          label: 'زیر گروه',
          align: 'center',
          sortable: true,
          field: row => row.title
        },
        { name: 'percent', label: 'درصد خام', field: row => row.percent, align: 'center', sortable: true },
        { name: 'taraaz', label: 'تراز', field: row => row.taraaz, align: 'center', sortable: true },
        { name: 'rank_city', label: ' رتبه شهر', field: row => row.rank_city, align: 'center', sortable: true },
        { name: 'rank_province', label: ' رتبه استان', field: row => row.rank_province, align: 'center', sortable: true },
        { name: 'rank_country', label: ' رتبه کشور', field: row => row.rank_country, align: 'center', sortable: true }
      ],
      columns3: [
        {
          name: 'created_at',
          align: 'center',
          label: 'زمان شروع آزمون',
          field: row => row.created_at,
          sortable: false
        },
        { name: 'accept_at', label: 'زمان مجاز آزمون', field: row => row.accept_at, align: 'center', sortable: false }
      ]
    }
  },
  created () {},
  computed: {
    shamsiDate () {
      return (date) => {
        return moment(date, 'YYYY/M/D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
      }
    }
  }
}
</script>

<style lang="scss">
.default-resultTable-row {
  padding: 12px;
}
.default-resultTable-col {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12) !important;
}
.default-result-card {
  border-radius: 20px;
  border: 1px solid #ececec;
  color: rgba(0,0,0,.87);
  font-size: 16px;
  box-shadow: none;
}
.card-title-section {
  background: rgba(255,193,7,.3);
  color: rgba(0,0,0,.6);
  font-size: 14px;
  font-weight: 700;
  padding: 8px;
}

    .personal-results {
      background-color: #f1f1f1;
      .proceeds-table ,  .default-result-table{
        .q-table__container {
          border-radius: 20px;
        }
        .q-table {
          border: 1px solid #ececec;
          thead tr {
            background-color: #ffecb4;
            border-radius: 20px;
            color: rgba(62, 57, 43, 0.96);
          }
          tbody tr:nth-of-type(2n) {
            background-color: rgba(0, 0, 0, 0.02);
          }
          tbody td {
            font-size: 0.875rem;
          }
        }
      }
    }

    .personal-results .tableTitle {
        margin-right: 15px #{"/* rtl:ignore */"};
        font-size: 16px;
    }
</style>
