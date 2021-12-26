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
        <div class="row">
          <div class="col">
            <v-data-table
              hide-default-footer
              :headers="headers1"
              :header-props="{sortByText: 'ترتیب'}"
              :items="report.sub_category"
              :items-per-page="15"
              class="elevation-1"
            >
              <template v-slot:top>
                <br>
                <span class="tableTitle">
                  جدول عملکرد دروس
                </span>
                <br>
                <br>
              </template>
            </v-data-table>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <v-data-table
              hide-default-footer
              :headers="headers3"
              class="elevation-1 mb-2"
              :items="[report.exam_user]"
            >
<!--              <template v-slot:item.created_at="{ item }">-->
<!--                {{ shamsiDate(item.created_at) }}-->
<!--              </template>-->
<!--              <template v-slot:item.accept_at="{ item }">-->
<!--                {{ shamsiDate(item.accept_at) }}-->
<!--              </template>-->
            </v-data-table>
          </div>
        </div>
      </div>
      <div
        class="col col-md-5 col-12"
      >
        <div class="row">
          <div class="col">
            <v-data-table
              hide-default-footer
              :headers="headers2"
              :header-props="{sortByText: 'ترتیب'}"
              :items="report.zirgorooh"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:top>
                <br>
                <span class="tableTitle ">
                  نتیجه در زیر گروه ها
                </span>
                <br>
                <br>
              </template>
            </v-data-table>
          </div>
        </div>
        <div class="row">
          <div class="col card-col">
            <div class="card-parent elevation-1">
              <v-card :elevation="0">
                <v-card-title>
                  <div class="row">
                    <div class="col">
                      تعداد کل شرکت کنندگان
                    </div>
                    <div class="col">
                      ماکزمیم تراز کل زیر گروه
                    </div>
                  </div>
                </v-card-title>

                <span>
                  <div class="row">
                    <div class="col">
                      {{ report.n_normal_participants }}
                    </div>
                    <div class="col">
                      {{ report.main.taraaz }}
                    </div>
                  </div>
                </span>
              </v-card>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col card-col">
            <div class="card-parent elevation-1">
              <v-card
                class="mb-2"
                :elevation="0"
              >
                <v-card-title>
                  <div class="row">
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">
                      رتبه کل کشوری
                    </div>
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">
                      رتبه در استان
                    </div>
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">
                      رتبه در شهر
                    </div>
                    <div
                      class="col col-3"
                      v-if="report.main.rank_school"
                    >
                      رتبه در مدرسه
                    </div>
                  </div>
                </v-card-title>

                <span>
                  <div class="row">
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_country }}</div>
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_province }}</div>
                    <div class="col" :cols="(report.main.rank_school) ? 3 : 4">{{ report.main.rank_city }}</div>
                    <div
                      class="col col-3"
                      v-if="report.main.rank_school"
                    >{{ report.main.rank_school }}</div>
                  </div>
                </span>
              </v-card>
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
      headers1: [
        {
          text: 'ردیف',
          align: 'center',
          sortable: true,
          value: 'index'
        },
        { text: 'درس', value: 'sub_category', align: 'center', sortable: false },
        { text: ' تعداد کل', value: 'total_answer', align: 'center', sortable: false },
        { text: ' تعداد درست', value: 'right_answer', align: 'center', sortable: false },
        { text: ' تعداد غلط', value: 'wrong_answer', align: 'center', sortable: false },
        { text: ' تعداد نزده', value: 'empty', align: 'center', sortable: false },
        { text: ' درصد', value: 'percent', align: 'center', sortable: true },
        { text: ' تراز', value: 'taraaz', align: 'center', sortable: true }
      ],
      headers2: [
        {
          text: 'زیر گروه',
          align: 'center',
          sortable: true,
          value: 'title'
        },
        { text: 'درصد خام', value: 'percent', align: 'center', sortable: true },
        { text: 'تراز', value: 'taraaz', align: 'center', sortable: true },
        { text: ' رتبه شهر', value: 'rank_city', align: 'center', sortable: true },
        { text: ' رتبه استان', value: 'rank_province', align: 'center', sortable: true },
        { text: ' رتبه کشور', value: 'rank_country', align: 'center', sortable: true }
      ],
      headers3: [
        {
          text: 'زمان شروع آزمون',
          align: 'center',
          sortable: false,
          value: 'created_at'
        },
        { text: 'زمان مجاز آزمون', value: 'accept_at', align: 'center', sortable: false }
      ]
    }
  },
  computed: {
    shamsiDate () {
      return (date) => {
        return moment(date, 'YYYY/M/D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
      }
    }
  }
}
</script>

<style>
    .personal-results .v-data-table tbody tr:nth-of-type(2n) {
        background-color: rgba(0,0,0,.04);
    }

    .personal-results .v-data-table thead {
        background-color: rgba(255,193,7,.3);
    }

    .personal-results .v-data-table .v-data-table__wrapper {
        border-radius: 20px;
        border: 1px solid #ececec;
    }

    .personal-results .v-data-table {
        padding: 20px 20px;
    }

    .personal-results .tableTitle {
        margin-right: 15px;
    }

    .personal-results .card-parent {
        padding: 20px;
        background: #fff;
        border-radius: 4px;
    }

    .personal-results .v-card {
        border-radius: 20px;
        border: 1px solid #ececec;
    }

    .personal-results .v-card__title {
        background: rgba(255,193,7,.3);
        color: #00000099;
        font-size: 14px;
        font-weight: bold;
        padding: 8px;
    }

    .personal-results .v-card .col {
        text-align: center;
    }

    .personal-results .v-card span .row {
        height: 64px;
    }

    .personal-results .v-card span .col {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
