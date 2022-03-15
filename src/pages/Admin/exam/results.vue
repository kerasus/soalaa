<template>
  <div class="row justify-center">
    <div class="col-9">
      <div class="back-btn-container">
        <q-btn
          round
          color="primary"
          unelevated
          @click= this.$router.go(-1)
        >
          <i class="fi-rr-angle-left row" />
        </q-btn>
      </div>
    </div>
    <div class="col-9 ">
      <div class="row q-mb-xl justify-center ">
        <div class="col-12 col-md-3 col-sm-3  q-pr-md">
          <div class=" ">
            <q-select
              v-model="selectedGender"
              :options="genders"
              label="جنسیت"
              color="blue-8"
              option-label="title"
              emit-value
              option-value="title"
            />
          </div>
        </div>
        <div class="col-12 col-md-3 col-sm-3  q-px-md">
          <q-select
            v-model="selectedProvince"
            label="استان"
            color="blue-8"
            :options="provinces"
            option-label="title"
            emit-value
            option-value="title"
            no-data-text="داده ای یافت نشد"
          />
        </div>
        <div class="col-12 col-md-3 col-sm-3  q-px-md">
          <q-select
            v-model="selectedCity"
            label="شهر"
            color="blue-8"
            :options="citiesForSelectedProvince"
            option-label="title"
            emit-value
            option-value="title"
            no-data-text="داده ای یافت نشد"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  داده ای یافت نشد
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>
      <div class="row q-mb-lg">
        <div class="col-12 col-md-3 col-sm-3 filter-btn  q-px-md">
          <q-btn
            rounded
            color="indigo-11"
            @click="DoFilter"
            style="width: 150px"
          >
            اعمال فیلتر
          </q-btn>
        </div>
        <div class="col-12 col-md-3 col-sm-3 filter-btn  q-px-md">
          <q-btn
            rounded
            color="amber-6"
            :loading="fileLoading"
            @click="getExcel"
            style="width: 150px"
          >
            تولید Excel
          </q-btn>
        </div>
        <div class="col-12 col-md-3 col-sm-3 filter-btn q-px-md">
          <q-btn
            rounded
            :color="file_url ? 'light-green-6':'grey'"
            :text-color="file_url ? 'grey-14':'white'"
            type="a"
            :href="file_url"
            :disable="!file_url"
             style="width: 150px"
          >
            دانلود Excel
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <!--   -------------------------------------- -------------------------------------------------------------->
  <div class="row justify-center">
    <div class="col-9">
      <q-card
        flat
      >
        <q-tabs
          v-model="tabs"
          class="bg-primary text-white shadow-2"
          content-class="tabs-content"
        >
          <q-tab name="rank">
            کارنامه رتبه محور
          </q-tab>
          <q-tab name="lesson">
            کارنامه درس محور
          </q-tab>
        </q-tabs>
        <q-separator></q-separator>
        <q-tab-panels v-model="tabs">
          <q-tab-panel name="rank">
              <q-markup-table
                class="my-sticky-header-table tabs-content"
                id="scroll-target-id"
                dense
              >
                <q-infinite-scroll
                  @load="loadRankData"
                  :offset="250"
                  scroll-target="#scroll-target-id"
                >
                  <thead
                    v-if="results[0]"
                    class="mitra"
                  >
                  <tr>
                    <th colspan="5">
                    </th>
                    <th
                      v-for="(item, index) in results[0].sub_category"
                      :key="'headTitle_'+item.sub_category_order+'_'+index"
                      colspan="3"
                    >
                      {{ item.sub_category }}
                    </th>
                  </tr>
                  <tr>
                    <th>
                      رتبه کشوری
                    </th>
                    <th>
                      نام و نام خانوادگی
                    </th>
                    <th>
                      استان
                    </th>
                    <th>
                      شهر
                    </th>
                    <th>
                      مشاهده کارنامه
                    </th>
                    <template
                      v-for="(item, index) in results[0].sub_category"
                      :key="'headColumns_percent_'+item.sub_category_order + '-' + index"
                    >
                      <th
                        class="bordered-left"
                      >
                        درصد
                      </th>
                      <th>
                        تراز
                      </th>
                      <th
                      >
                        رتبه
                      </th>
                    </template>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    v-for="item in results"
                    :key="item.name"
                    class="text-center"
                  >
                    <td>{{ item.main.rank_country }}</td>
                    <td>
                  <span v-if="item.user">
                    {{ item.user.first_name }} {{ item.user.last_name }}
                  </span>
                      <span v-else> - </span>
                    </td>
                    <td>{{ item.location.province }}</td>
                    <td>{{ item.location.city }}</td>
                    <td>
                      <q-btn
                        icon="mdi-eye-circle-outline"
                        color="cyan"
                        flat
                        :to="{name: 'user.exam.results', params: {exam_id: item.exam_id, user_exam_id: item.exam_user_id}}"
                        round
                      />
                      <q-tooltip top>
                        <span>مشاهده کارنامه</span>
                      </q-tooltip>
                    </td>
                    <template
                      v-for="(sub_categoryItem, sub_categoryIndex) in item.sub_category"
                      :key="'bodyColumns_percent_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id"
                    >
                      <td
                        class="bordered-left"
                      >
                        {{ sub_categoryItem.percent }}
                      </td>
                      <td>
                        {{ sub_categoryItem.taraaz }}
                      </td>
                      <td
                      >
                        {{ sub_categoryItem.rank_country }}
                      </td>
                    </template>
                  </tr>
                  </tbody>
                  <div v-if="noData"
                  class="text-subtitle1 text-weight-medium text-center full-width"
                  >
                    no more data
                  </div>
                </q-infinite-scroll>
              </q-markup-table>
          </q-tab-panel>
          <q-tab-panel name="lesson">
            <q-table
              :rows="lessonsResults"
              :columns="lessonsResultsHeaders"
              row-key="value"
              class="lesson-table"
              hide-bottom
             :rows-per-page-options="[0]"
            >
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>

</template>

<script>
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'results',
  components: {
  },
  data: () => {
    return {
      selectedProvince: null,
      selectedCity: null,
      selectedGender: null,
      provinces: [],
      genders: [],
      cities: [],
      results: [],
      lessonsResults: [],
      lessonsResultsHeaders: [
        { label: 'نام درس', field: row => row.sub_category, align: 'left', sortable: true },
        { label: 'میانگین درصد', field: 'mean', align: 'left', sortable: true },
        { label: 'میانگین درصد نفرات برتر', field: 'top_sub_category_participants_mean', align: 'left', sortable: true },
        { label: 'بالاترین درصد', field: 'best_percent', align: 'left', sortable: true },
        { label: 'کمترین درصد در میان نفرات برتر', field: 'worst_percent', align: 'left', sortable: true }
        // { text: 'میانگین تراز', value: ''},
      ],
      nextPage: '',
      tabs: 'rank',
      fileLoading: false,
      file_url: '',
      noData: false
    }
  },
  computed: {
    citiesForSelectedProvince () {
      if (this.selectedProvince) {
        return this.cities.filter(item => item.province.title === this.selectedProvince)
      }
      return []
    }
  },
  mounted () {
    this.getUserFormData()
    this.getLessonResultData()
  },

  methods: {
    getUserFormData () {
      this.showLoading()
      this.$axios.get(API_ADDRESS.user.formData)
        .then((resp) => {
          // console.log('getUserFormData res :', resp)
          this.genders = resp.data.data.genders
          this.provinces = resp.data.data.provinces
          this.cities = resp.data.data.cities
          this.hideLoading()
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید.',
            position: 'center'
          })
          this.hideLoading()
        }
        )
    },
    async loadRankData (index, done) {
      this.showLoading()
      try {
        const response = await this.getRankData()
        // console.log('response :', response)
        this.hideLoading()
        if (response.data.data) {
          this.results = this.results.concat(response.data.data)
        }
        if (typeof response.data.links === 'undefined' || response.data.links.next === null) {
          this.nextPage = ''
          done(true)
          this.noData = true
          return
        }
        this.nextPage = response.data.links.next.replace(response.data.meta.path, '')
        done()
      } catch (error) {
        this.hideLoading()
      }
    },

    getRankData () {
      const params = this.getParams()
      return this.$axios.get(API_ADDRESS.exam.examReportIndex('participants') + this.nextPage, { params })
    },

    getLessonResultData () {
      if (!this.lessonsResults.length) {
        this.$axios.get(API_ADDRESS.exam.examReportIndex('lessons'), {
          params: {
            exam_id: this.$route.params.id
          }
        })
          .then((response) => {
            if (response.data.data) {
              this.lessonsResults = response.data.data
            }
          })
      }
    },

    DoFilter () {
      this.results = []
      this.nextPage = ''
      this.noData = false
      this.loadRankData()
    },

    showLoading () {
      this.$store.dispatch('loading/overlayLoading', true)
    },

    hideLoading () {
      this.$store.dispatch('loading/overlayLoading', false)
    },
    getExcel () {
      const that = this
      this.fileLoading = true
      const params = this.getParams()
      params.excel_export = 1
      this.$q.notify({
        type: 'positive',
        message: 'فایل Excel در حال تولید است.',
        position: 'center'
      })
      this.$axios.get(API_ADDRESS.exam.examReportIndex('participants'), {
        params: params
      })
        .then(response => {
          that.file_url = response.data.data.export_file_url
          that.fileLoading = false
        })
    },

    getParams () {
      const params = {
        ...(this.selectedCity && { city: [this.selectedCity] }),
        ...(this.selectedProvince && { province: [this.selectedProvince] }),
        ...(this.selectedGender && { gender: [this.selectedGender] }),
        exam_id: this.$route.params.id
      }
      return params
    }
  }
}
</script>
<style lang="scss" scoped>
.back-btn-container{
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.bordered-right {
  border-right: solid 1px #d7d7d7;
}
.bordered-left {
  border-left: solid 1px #d7d7d7;
}
.filter-btn{
  margin: auto;
}
.my-sticky-header-table{
  height: 310px;
  position: sticky;
}
.tabs-content{
  width: 100%;
  height: calc(100vh - 300px);
  overflow:auto;
}
</style>
<style lang="scss">
.lesson-table{
  .q-table{
    tbody tr td{
     //background-color: #9C27B0;
    }
  }
}
.my-sticky-header-table {
  thead tr th {
     background-color: #fdfdfd;
     position: sticky;
     z-index: 1;
   }
  thead tr:first-child th {
    top: 0;
  }
  thead tr:nth-child(2) th {
    top: 28px;
  }
  &.q-table--loading thead tr:last-child th {
    top: 48px;
  }
}
</style>
