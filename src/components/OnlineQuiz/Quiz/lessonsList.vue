<template>
  <v-row>
    <v-col cols="12 ">
      <div class="tableSize">
        <span>{{ $route.params.quizTitle }}</span>
        <v-btn
          class="mx-2 backBtnPosition"
          fab
          x-small
          color="white"
          @click="goBack"
        >
          <v-icon dark>
            mdi-chevron-left
          </v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col cols="12">
      <v-expansion-panels class="tableSize">
        <v-expansion-panel
          v-for="(category, index) in categoriesList.list"
          :key="index"
        >
          <v-expansion-panel-header>
            {{ category.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-right">
                      عنوان
                    </th>
                    <th class="text-right">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in category.sub_categories.list"
                    :key="item.id"
                  >
                    <td>{{ item.title }}</td>
                    <td class="actionsColumn">
                      <div>
                        <v-text-field
                          v-if="item.permissions.view"
                          v-model="item.order"
                          type="number"
                          :loading="item.loading"
                          :disabled="item.loading"
                          label="ترتیب درس"
                          hide-details="auto"
                          class="mb-2"
                        >
                          <v-icon
                            slot="append"
                            color="green"
                            @click="updateOrder(item)"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-text-field>
                      </div>
                      <div v-if="false">
                        <v-text-field
                          v-if="item.permissions.view"
                          v-model="item.time"
                          type="number"
                          :loading="item.loading"
                          :disabled="item.loading"
                          label="زمان درس (دقیقه)"
                          hide-details="auto"
                          class="mb-2"
                        >
                          <v-icon
                            slot="append"
                            color="green"
                            @click="updateTime(item)"
                          >
                            mdi-pencil
                          </v-icon>
                        </v-text-field>
                      </div>
                      <div class="text-center mb-2">
                        <div class="row">
                          <div class="col">
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-if="item.permissions.view"
                                  dark
                                  x-small
                                  block
                                  color="green"
                                  :to="{ name: 'onlineQuiz.exams.lessons.details', params: { quizId: $route.params.quizId, lessonId: item.id}}"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    small
                                  >
                                    mdi-notebook-outline
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>مشاهده سوالات درس</span>
                            </v-tooltip>
                          </div>
                          <div class="col">
                            <v-tooltip top>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  v-if="item.permissions.view"
                                  block
                                  dark
                                  x-small
                                  color="primary"
                                  :to="{ name: 'video.set', params: { exam_id: $route.params.quizId, subcategory_id: item.id, exam_title: $route.params.quizTitle}}"
                                  v-bind="attrs"
                                  v-on="on"
                                >
                                  <v-icon
                                    small
                                  >
                                    mdi-video
                                  </v-icon>
                                </v-btn>
                              </template>
                              <span>ثبت ویدئو تحلیل</span>
                            </v-tooltip>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import API_ADDRESS from "@/api/Addresses";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
import {QuestCategoryList} from "@/models/QuestCategory";

export default {
  name: 'LessonsList',
  data: () => ({
    lessonsList: new QuestSubcategoryList(),
    categoriesList: new QuestCategoryList(),
  }),
  created() {
    this.$store.commit('AppLayout/updateDrawer', true)
  },
  mounted() {
    this.getLessons()
  },
  methods: {
    goBack() {
      this.$router.push('/onlineQuiz/exams')
    },
    getLessons() {
      this.categoriesList.loading = true
      axios.get(API_ADDRESS.exam.getSubCategoriesWithPermissions(this.$route.params.quizId))
          .then((response) => {
            this.categoriesList.loading = false
            this.categoriesList = new QuestCategoryList(response.data.data, {
              meta: response.data.meta,
              links: response.data.links
            })
          })
          .catch(() => {
            this.categoriesList.loading = false
            this.categoriesList = new QuestCategoryList()
          })
    },
    updateOrder(subcategory) {
      if (subcategory.order === null) {
        return
      }
      subcategory.loading = true
      // setTimeout(() => {
      //   subcategory.loading = false
      //   console.log('subcategory', {
      //     order: subcategory.order,
      //     sub_category_id: subcategory.id,
      //     exams: [{ exam_id: this.$route.params.quizId }]
      //   })
      // }, 2000)


      axios.post(API_ADDRESS.questionSubcategory.updateOrder, {
        sub_category_id: subcategory.id,
        order: subcategory.order,
        exam_id: this.$route.params.quizId
      })
          .then(() => {
            subcategory.loading = false
          })
          .catch(() => {
            subcategory.loading = false
            subcategory.order = null
          })
    },
    updateTime(subcategory) {
      if (subcategory.time === null || isNaN(subcategory.time)) {
        return
      }
      subcategory.loading = true
      setTimeout(() => {
        subcategory.loading = false
        console.log('subcategory', {
          time: subcategory.time,
          sub_category_id: subcategory.id,
          exams: [{ exam_id: this.$route.params.quizId }]
        })
      }, 2000)


      // axios.post(API_ADDRESS.questionSubcategory.updateOrder, {
      //   sub_category_id: subcategory.id,
      //   time: subcategory.time,
      //   exam_id: this.$route.params.quizId
      // })
      //     .then((response) => {
      //       subcategory.loading = false
      //     })
      //     .catch(() => {
      //       subcategory.loading = false
      //       subcategory.order = null
      //     })
    }
  }
}
</script>

<style scoped>
.actionsColumn {
  width: 50%;
}

.tableSize {
  width: 40%;
  margin: auto
}

.backBtnPosition {
  float: left
}
</style>
