<template>
    <v-row>
        <v-col>
            <v-simple-table dense fixed-header height="calc( 100vh - 100px )">
                <template v-slot:default>
                    <thead v-if="results[0]">
                        <tr>
                            <th colspan="4"></th>
                            <th
                                colspan="3"
                                class="text-center"
                                v-for="(item, index) in results[0].sub_category"
                                :key="'headTitle_'+item.sub_category_order+'_'+index"
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
                            <th></th>
                            <template
                                    v-for="item in results[0].sub_category"
                            >
                                <th class="bordered-right" :key="'headColumns_percent_'+item.sub_category_order">
                                    درصد
                                </th>
                                <th :key="'headColumns_taraz_'+item.sub_category_order">
                                    تراز
                                </th>
                                <th class="bordered-left" :key="'headColumns_rank_'+item.sub_category_order">
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
                                <td class="bordered-right" :key="'bodyColumns_percent_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id">
                                    {{ sub_categoryItem.percent }}
                                </td>
                                <td :key="'bodyColumns_taraz_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id">
                                    {{ sub_categoryItem.taraaz }}
                                </td>
                                <td class="bordered-left" :key="'bodyColumns_rank_'+sub_categoryItem.sub_category_order+sub_categoryIndex+'_'+item.exam_user_id">
                                    {{ sub_categoryItem.rank_country }}
                                </td>
                            </template>
                        </tr>
                    </tbody>
                    <infinite-loading @infinite="getData" :key="lastLoadTime"></infinite-loading>
                </template>
            </v-simple-table>
        </v-col>
    </v-row>
</template>

<script>
  import axios from 'axios'
  import API_ADDRESS from '@/api/Addresses'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'results',
    data: () => {
      return {
        results: [],
        lastLoadTime: Date.now(),
        nextPage: '',
        paginate: {
          links: {
            "first": "http://192.168.4.3:500/api/v1/exam-report/index?page=1",
            "last": "http://192.168.4.3:500/api/v1/exam-report/index?page=57",
            "prev": null,
            "next": "http://192.168.4.3:500/api/v1/exam-report/index?page=2"
          },
          meta: {
            "current_page": 1,
            "from": 1,
            "last_page": 57,
            "links": [
              {
                "url": null,
                "label": "pagination.previous",
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=1",
                "label": 1,
                "active": true
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=2",
                "label": 2,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=3",
                "label": 3,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=4",
                "label": 4,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=5",
                "label": 5,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=6",
                "label": 6,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=7",
                "label": 7,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=8",
                "label": 8,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=9",
                "label": 9,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=10",
                "label": 10,
                "active": false
              },
              {
                "url": null,
                "label": "...",
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=56",
                "label": 56,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=57",
                "label": 57,
                "active": false
              },
              {
                "url": "http://192.168.4.3:500/api/v1/exam-report/index?page=2",
                "label": "pagination.next",
                "active": false
              }
            ],
            "path": "http://192.168.4.3:500/api/v1/exam-report/index",
            "per_page": 10,
            "to": 10,
            "total": 568
          }
        }
      }
    },
    components: {
      InfiniteLoading,
    },
    methods: {
      getData () {
        this.showLoading()
        let that = this
        axios.get(API_ADDRESS.exam.examReportIndex + that.nextPage, {
          params: {
            exam_id: that.$route.params.examId
          }
        })
        .then( response => {
          that.hideLoading()
          that.results = that.results.concat(response.data.data)
          if(typeof response.data.links === 'undefined' || response.data.links.next === null) {
            that.nextPage = ''
            that.$state.complete()
            return
          }
          that.nextPage = response.data.links.next.replace(response.data.meta.path, '')
          that.$state.loaded()
          that.lastLoadTime = Date.now()
        })
        .catch( error => {
          that.lastLoadTime = Date.now()
          this.hideLoading()
          console.log('error', error)
        })
      },
      showLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: true, loading: true, text: ''})
      },
      hideLoading () {
        this.$store.commit('AppLayout/updateOverlay', { show: false, loading: false, text: ''})
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
</style>
