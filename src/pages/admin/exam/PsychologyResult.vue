<template>
  <v-container>
    <v-row>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              فیلترها
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row class="filters">
                <v-col
                  md="1"
                  class="mbti"
                >
                  <v-row>
                    <v-col>
                      MBTI
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="mbti.i"
                        label="I"
                        
                        @click="checkMbtiDuplicate('e')"
                      />
                      <v-checkbox
                        v-model="mbti.e"
                        label="E"
                        
                        @click="checkMbtiDuplicate('i')"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="mbti.n"
                        label="N"
                        
                        @click="checkMbtiDuplicate('s')"
                      />
                      <v-checkbox
                        v-model="mbti.s"
                        label="S"
                        
                        @click="checkMbtiDuplicate('n')"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="mbti.t"
                        label="T"
                        
                        @click="checkMbtiDuplicate('f')"
                      />
                      <v-checkbox
                        v-model="mbti.f"
                        label="F"
                        
                        @click="checkMbtiDuplicate('t')"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="mbti.j"
                        label="J"
                        
                        @click="checkMbtiDuplicate('p')"
                      />
                      <v-checkbox
                        v-model="mbti.p"
                        label="P"
                        
                        @click="checkMbtiDuplicate('j')"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="1"
                  class="bartle"
                >
                  <v-row>
                    <v-col>
                      بارتل
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-model="bartle.k"
                        label="K"
                      />
                      <v-checkbox
                        v-model="bartle.e"
                        label="E"
                      />
                      <v-checkbox
                        v-model="bartle.a"
                        label="A"
                      />
                      <v-checkbox
                        v-model="bartle.s"
                        label="S"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="2"
                  class="ostan"
                >
                  <v-row>
                    <v-col>
                      استان
                    </v-col>
                  </v-row>
                  <v-row :style="{ maxHeight: '600px', overflow: 'auto' }">
                    <v-col>
                      <v-checkbox
                        v-for="(province, pIndex) in provinces"
                        :key="pIndex"
                        v-model="selectedProvinces"
                        :label="province.title"
                        :value="province.title"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="2"
                  class="shahr"
                >
                  <v-row>
                    <v-col>
                      شهر
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="citySearch"
                        outlined
                        label="جست و جو"
                      />
                    </v-col>
                  </v-row>
                  <v-row :style="{ maxHeight: '500px', overflow: 'auto' }">
                    <v-col>
                      <v-checkbox
                        v-for="(city) in filteredCities"
                        :key="city.title"
                        v-model="selectedCities"
                        :label="city.title"
                        :value="city.title"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="2"
                  class="grade"
                >
                  <v-row>
                    <v-col>
                      پایه
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-for="(grade, index) in grades"
                        :key="index"
                        v-model="selectedGrades"
                        :label="grade.title"
                        :value="grade.title"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="1"
                  class="gender"
                >
                  <v-row>
                    <v-col>
                      جنسیت
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-for="(gender, index) in genders"
                        :key="index"
                        v-model="selectedGender"
                        :label="gender.title"
                        :value="gender.title"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="1"
                  class="reshte"
                >
                  <v-row>
                    <v-col>
                      رشته
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-checkbox
                        v-for="(major, index) in majors"
                        :key="index"
                        v-model="selectedMajor"
                        :label="major.title"
                        :value="major.title"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  md="2"
                  class="date"
                >
                  <v-row>
                    <v-col>
                      تاریخ آزمون
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <date-picker
                        v-model="dateRange"
                        range
                        
                        input-format="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                        display-format="jYYYY/jMM/jDD"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-btn
          color="primary"
          block
          class="my-5"
          @click="sendRequests"
        >
          فیلتر
        </v-btn>
        <v-btn
          color="orange"
          dark
          block
          class="my-5"
          :loading="fileLoading"
          @click="getExcel"
        >
          تولید Excel
        </v-btn>
        <v-btn
          color="yellow"
          block
          class="my-5"
          :disabled="!file_url"
        >
          <a
            :href="file_url"
            :style="{ 'text-decoration': 'none', color: '#000', width: '100%' }"
            target="_blank"
            :disabled="!file_url"
          >
            دانلود Excel
          </a>
        </v-btn>
        <v-simple-table
          dense
          fixed-header
          height="calc( 100vh - 300px )"
        >
          <template v-slot:default>
            <thead v-if="results[0]">
              <tr>
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
                  جنسیت
                </th>
                <th>
                  رشته
                </th>
                <th>
                  پایه
                </th>
                <th
                  v-for="(sub, index) in results[0].sub_category"
                  :key="index"
                >
                  {{ sub.sub_category + ' ' + sub.function }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in results"
                :key="item.name"
              >
                <td>
                  <span v-if="item.first_name || item.last_name">{{ item.first_name + ' ' + item.last_name }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="item.province">{{ item.province }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="item.city">{{ item.city }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="item.gender">{{ item.gender }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="item.major">{{ item.major }}</span>
                  <span v-else>-</span>
                </td>
                <td>
                  <span v-if="item.grade">{{ item.grade }}</span>
                  <span v-else>-</span>
                </td>
                <th
                  v-for="(sub, index) in item.sub_category"
                  :key="index"
                >
                  {{ sub.percent.toFixed(0) }}
                </th>
                <!--                <td>-->
                <!--                  <v-tooltip top>-->
                <!--                    <template v-slot:activator="{ on, attrs }">-->
                <!--                      <v-btn-->
                <!--                        icon-->
                <!--                        :to="{name: 'user.exam.results', params: {exam_id: item.exam_id, user_exam_id: item.exam_user_id}}"-->
                <!--                        color="cyan"-->
                <!--                        v-bind="attrs"-->
                <!--                        v-on="on"-->
                <!--                      >-->
                <!--                        <v-icon>mdi-eye-circle-outline</v-icon>-->
                <!--                      </v-btn>-->
                <!--                    </template>-->
                <!--                    <span>مشاهده کارنامه</span>-->
                <!--                  </v-tooltip>-->
                <!--                </td>-->
                <!--                <template-->
                <!--                  v-for="(sub_categoryItem, sub_categoryIndex) in item.sub_category"-->
                <!--                >-->
                <!--                  <td-->
                <!--                    :key="'bodyColumns_percent_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id"-->
                <!--                    class="bordered-right"-->
                <!--                  >-->
                <!--                    {{ sub_categoryItem.percent }}-->
                <!--                  </td>-->
                <!--                  <td :key="'bodyColumns_taraz_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id">-->
                <!--                    {{ sub_categoryItem.taraaz }}-->
                <!--                  </td>-->
                <!--                  <td-->
                <!--                    :key="'bodyColumns_rank_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id"-->
                <!--                    class="bordered-left"-->
                <!--                  >-->
                <!--                    {{ sub_categoryItem.rank_country }}-->
                <!--                  </td>-->
                <!--                </template>-->
              </tr>
            </tbody>
            <infinite-loading
              v-if="sendRequest"
              :key="lastLoadTime"
              @infinite="getData"
            />
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import axios from "axios";
    import API_ADDRESS from "@/api/Addresses";
    import VuePersianDatetimePicker from 'vue-persian-datetime-picker'
    import Vue from 'vue'
    import InfiniteLoading from "vue-infinite-loading";
    Vue.use(VuePersianDatetimePicker, {
        name: 'date-picker',
        props: {
            inputFormat: 'jYYYY-jMM-jDD',
            format: 'jYYYY-jMM-jDD',
        }
    });

    export default {
        name: "PsychologyResult",
        components: {
            InfiniteLoading,
        },
        data () {
            return {
                lastLoadTime: Date.now(),
                lessonsResults: [],
                nextPage: '',
                results: [],
                genders: null,
                grades: null,
                majors: null,
                provinces: null,
                cities: null,
                mbti: {
                    i: false,
                    e: false,
                    n: false,
                    s: false,
                    t: false,
                    f: false,
                    j: false,
                    p: false,
                },
                bartle: {
                    k: false,
                    e: false,
                    a: false,
                    s: false
                },
                selectedProvinces: [],
                selectedCities: [],
                selectedGrades: [],
                selectedGender: [],
                selectedMajor: [],
                dateRange: [],
                citySearch: '',
                sendRequest: false,
                resetState: false,
                file_url: '',
                fileLoading: false
            }
        },
        computed: {
          filteredCities () {
              if (!this.cities) {
                  return []
              }
              return this.cities.filter(city => {
                  let returnValue = false
                  this.selectedProvinces.forEach(province => {
                      if (province === city.province.title && city.title.includes(this.citySearch)) {
                          returnValue = true
                          return
                      }
                  })
                  return returnValue
              })
          }
        },
        watch: {
          selectedCities () {
              if (this.selectedCities === null) {
                  this.selectedCities = []
              }
          }
        },
        created() {
            this.$store.commit('AppLayout/updateDrawer', false)

            axios.get(API_ADDRESS.user.formData)
                .then((resp) => {
                    this.genders = resp.data.data.genders
                    this.grades = resp.data.data.grades
                    this.majors = resp.data.data.majors
                    this.provinces = resp.data.data.provinces
                    this.cities = resp.data.data.cities
                })
                .catch(()=> {
                    this.$notify({
                        group: 'notifs',
                        title: 'توجه!',
                        text: 'مشکلی در گرفتن اطلاعات رخ داده است. لطفا دوباره امتحان کنید.',
                        type: 'error'
                    })}
                )
        },
        methods: {
            sendRequests () {

              this.sendRequest = true
              this.results = []
              this.lastLoadTime = Date.now()
              this.resetState = true
            },
            getParams () {
              let params = {}
              if (this.dateRange[0]) {
                params.exam_user_started_at = this.dateRange[0] + ' 00:00:00'
              }
              if (this.dateRange[1]) {
                params.exam_user_finished_at = this.dateRange[1] + ' 00:00:00'
              }
              if (this.selectedCities.length > 0) {
                params.city = this.selectedCities
              }
              if (this.selectedProvinces.length > 0) {
                params.province = this.selectedProvinces
              }
              if (this.selectedMajor.length > 0) {
                params.major = this.selectedMajor
              }
              if (this.selectedMajor.length > 0) {
                params.major = this.selectedMajor
              }
              if (this.selectedGrades.length > 0) {
                params.grade = this.selectedGrades
              }
              if (this.selectedGender.length > 0) {
                params.gender = this.selectedGender
              }
              if (this.mbti.i) {
                params.mind_function = "I"
              }
              if (this.mbti.e) {
                params.mind_function = "E"
              }
              if (this.mbti.s) {
                params.energy_function = "S"
              }
              if (this.mbti.n) {
                params.energy_function = "N"
              }
              if (this.mbti.t) {
                params.nature_function = "T"
              }
              if (this.mbti.f) {
                params.nature_function = "F"
              }
              if (this.mbti.p) {
                params.tactics_function = "P"
              }
              if (this.mbti.j) {
                params.tactics_function = "J"
              }
              if (this.bartle.a || this.bartle.e || this.bartle.k || this.bartle.s) {
                params.bartle = []
                Object.keys(this.bartle).forEach(key => {
                  if (this.bartle[key]) {
                    params.bartle.push(key.toString().toUpperCase())
                  }
                })
              }
              params.exam_id = this.$route.params.examId
              return params
            },
            getData ($state) {
                if (this.resetState) {
                  $state.reset()
                  this.nextPage = ''
                  this.resetState = false
                  return
                }
                if (this.sendRequest) {

                    this.showLoading()
                    let that = this
                    let params = this.getParams()

                    axios.get(API_ADDRESS.exam.examReportIndex('participants' + that.nextPage), {
                        params: params
                    })
                        .then( response => {
                            that.hideLoading()
                            that.results = that.results.concat(response.data.data)
                            if(typeof response.data.links === 'undefined' || response.data.links.next === null) {
                                that.nextPage = ''
                                $state.complete()
                                return
                            }
                            that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
                            $state.loaded()
                            that.lastLoadTime = Date.now()
                        })
                        .catch( error => {
                            // that.$state.complete()
                            that.lastLoadTime = Date.now()
                            this.hideLoading()
                            console.log('error', error)
                            this.sendRequest = false
                        })
                }
            },
            getExcel () {
              let that = this
              this.fileLoading = true
              let params = this.getParams()
              params.excel_export = 1
              this.$notify({
                group: 'notifs',
                title: 'توجه!',
                text: 'فایل Excel در حال تولید است.',
                type: 'success'
              })
              axios.get(API_ADDRESS.exam.examReportIndex('participants'), {
                params: params
              })
                .then( response => {
                  that.file_url = response.data.data.export_file_url
                  that.fileLoading = false
                })
            },
            showLoading () {
                this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: ''})
            },
            hideLoading () {
                this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: ''})
            },
            checkMbtiDuplicate (key) {
                if (this.mbti.i && this.mbti.e && (key === 'i' || key === 'e')) {
                    this.mbti[key] = false
                } else if (this.mbti.n && this.mbti.s && (key === 'n' || key === 's')) {
                    this.mbti[key] = false
                } else if (this.mbti.t && this.mbti.f && (key === 't' || key === 'f')) {
                    this.mbti[key] = false
                } else if (this.mbti.j && this.mbti.p && (key === 'j' || key === 'p')) {
                    this.mbti[key] = false
                }
            }
        }
    }
</script>

<style scoped>

</style>

<style>
    .filters .col {
        border: 1px solid #a5a5a5;
    }

    .v-messages.theme--light {
        display: none;
    }
</style>