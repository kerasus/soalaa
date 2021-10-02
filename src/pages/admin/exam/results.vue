<template>
  <v-container>
    <v-row>
      <v-col
        md="3"
        sm="3"
        cols="12"
      >
        <div class="form-group m-form__group ">
          <v-select
            v-model="selectedGender"
            :items="genders"
            label="جنسیت"
            item-text="title"
            item-value="title"
          />
        </div>
      </v-col>
      <v-col
        md="3"
        sm="3"
        cols="12"
      >
        <div class="form-group m-form__group ">
          <v-autocomplete
            v-model="selectedProvince"
            label="استان"
            :items="provinces"
            item-text="title"
            item-value="title"
            no-data-text="داده ای یافت نشد"
          />
        </div>
      </v-col>
      <v-col
        md="3"
        sm="3"
        cols="12"
      >
        <div class="form-group m-form__group">
          <v-autocomplete
            v-model="selectedCity"
            label="شهر"
            :items="citiesForSelectedProvince"
            item-text="title"
            item-value="title"
            no-data-text="داده ای یافت نشد"
          />
        </div>
      </v-col>
      <v-col
        md="3"
        sm="3"
        cols="12"
        class="filter-btn"
      >
        <v-btn
            rounded
            color="primary"
            width="120px"
            @click="getData"
        >
          اعمال فیلتر
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs
            v-model="tabs"
            background-color="deep-purple accent-4"
            centered
            dark
          >
            <v-tabs-slider />
            <v-tab href="#tab-1">
              کارنامه رتبه محور
            </v-tab>
            <v-tab href="#tab-2">
              کارنامه درس محور
            </v-tab>
            <v-tabs-items v-model="tabs">
              <v-tab-item value="tab-1">
                <v-col>
                  <v-simple-table
                    dense
                    fixed-header
                    height="calc( 100vh - 100px )"
                  >
                    <template v-slot:default>
                      <thead v-if="results[0]">
                        <tr>
                          <th colspan="4" />
                          <th
                            v-for="(item, index) in results[0].sub_category"
                            :key="'headTitle_'+item.sub_category_order+'_'+index"
                            colspan="3"
                            class="text-center"
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
                          <th />
                          <template
                            v-for="item in results[0].sub_category"
                          >
                            <th
                              :key="'headColumns_percent_'+item.sub_category_order"
                              class="bordered-right"
                            >
                              درصد
                            </th>
                            <th :key="'headColumns_taraz_'+item.sub_category_order">
                              تراز
                            </th>
                            <th
                              :key="'headColumns_rank_'+item.sub_category_order"
                              class="bordered-left"
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
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  :to="{name: 'user.exam.results', params: {exam_id: item.exam_id, user_exam_id: item.exam_user_id}}"
                                  color="cyan"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon>mdi-eye-circle-outline</v-icon>
                                </v-btn>
                              </template>
                              <span>مشاهده کارنامه</span>
                            </v-tooltip>
                          </td>
                          <template
                            v-for="(sub_categoryItem, sub_categoryIndex) in item.sub_category"
                          >
                            <td
                              :key="'bodyColumns_percent_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id"
                              class="bordered-right"
                            >
                              {{ sub_categoryItem.percent }}
                            </td>
                            <td :key="'bodyColumns_taraz_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id">
                              {{ sub_categoryItem.taraaz }}
                            </td>
                            <td
                              :key="'bodyColumns_rank_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id"
                              class="bordered-left"
                            >
                              {{ sub_categoryItem.rank_country }}
                            </td>
                          </template>
                        </tr>
                      </tbody>
<!--                      <infinite-loading-->
<!--                        :key="lastLoadTime"-->
<!--                        @infinite="getData"-->
<!--                      />-->
                    </template>
                  </v-simple-table>
                </v-col>
              </v-tab-item>
              <v-tab-item value="tab-2">
                <v-data-table
                  :headers="lessonsResultsHeaders"
                  :items="lessonsResults"
                  hide-default-footer
                />
              </v-tab-item>
            </v-tabs-items>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  import API_ADDRESS from '@/api/Addresses'
  // import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'Results',
    // components: {
    //   InfiniteLoading,
    // },
    data: () => {
      return {
        selectedProvince: null,
        selectedCity: null,
        selectedGender :null,
        provinces: [],
        genders: [],
        cities: [],
        results: [],
        lessonsResults: [],
        lessonsResultsHeaders: [
              { text: 'نام درس', value: 'sub_category'},
              { text: 'میانگین درصد', value: 'mean'},
              { text: 'میانگین درصد نفرات برتر', value: 'top_sub_category_participants_mean'},
              { text: 'بالاترین درصد', value: 'best_percent'},
              { text: 'کمترین درصد در میان نفرات برتر', value: 'worst_percent'},
              // { text: 'میانگین تراز', value: ''},
          ],
        lastLoadTime: Date.now(),
        nextPage: '',
        tabs: 'tab-1'
      }
    },
    computed:{
      citiesForSelectedProvince() {
        if (this.selectedProvince) {
          return this.cities.filter(item => item.province.title === this.selectedProvince)
        }
        return []
      }
    },
    mounted: function () {
      this.getData()
    },
    methods: {
      getFilterData() {
        this.showLoading()
        axios.get(API_ADDRESS.user.formData)
            .then((resp) => {
              this.genders = resp.data.data.genders
              this.provinces = resp.data.data.provinces
              this.cities = resp.data.data.cities
              this.hideLoading()
            })
            .catch(() => {
                  this.$notify({
                    group: 'notifs',
                    title: 'توجه!',
                    text: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید.',
                    type: 'error'
                  })
                  this.hideLoading()
                }
            )
      },
      getData () {
        this.getFilterData()
        this.showLoading()
        let that = this
        axios.get('/exam-report/index/participants' ,{
            "city": [this.selectedCity],
            "province": [this.selectedProvince],
            "gender": [this.selectedGender],
        })
        .then( response => {
          that.hideLoading()
          console.log('get',response)
          that.results = that.results.concat(response.data.data)
          if(typeof response.data.links === 'undefined' || response.data.links.next === null) {
            that.nextPage = ''
            return
          }
          that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
          that.lastLoadTime = Date.now()
        })
        .catch( error => {
          that.lastLoadTime = Date.now()
          this.hideLoading()
          console.log('error', error)
        })
          if (!this.lessonsResults.length) {
            axios.get('exam-report/index/participants' ,{
                "city": [this.selectedCity],
                "province": [this.selectedProvince],
                "gender": [this.selectedGender],
            })
                .then((response) => {
                  that.lessonsResults = response.data.data
                  })
          }
      },
      showLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: ''})
        console.log('true')
      },
      hideLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: ''})
        console.log('false')
      }
    }
  }
</script>

<style scoped>
.bordered-right {
    border-right: solid 1px #d7d7d7;
}
.bordered-left {
    border-left: solid 1px #d7d7d7;
}
.filter-btn{
  margin: auto;
}
</style>
