<template>
  <div class="row">
    <div class="col-12">
      <div class="tableSize">
        <span>{{ examTitle }}</span>
        <q-btn
          class="q-mx-sm float-right"
          round
          dark-percentage
          color="primary"
          icon="isax:arrow-left-2"
          @click="goToCategoryList"
        >
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            <span class="smallFontSize">بازگشت به لیست دفترچه ها</span>
          </q-tooltip>
        </q-btn>
      </div>
    </div>
    <div
      v-if="!subcategoryList.loading"
      class="col-12"
    >
      <q-markup-table class="tableSize">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                عنوان درس
              </th>
              <th class="text-center">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            <template
              v-if="subcategoryList.length"
            >
              <tr
                v-for="subcategory in subcategoryList"
                :key="subcategory.id"
              >
                <td>{{ subcategory.title }}</td>
                <td class="actionsColumn">
                  <div>
                    <q-input
                      v-model="subcategory.order"
                      type="number"
                      :loading="subcategory.loading"
                      :disabled="subcategory.loading"
                      label="ترتیب درس"
                      hide-details="auto"
                      class="mb-2"
                    >
                      <q-btn
                        class="q-mx-sm float-right"
                        size="1px"
                        fab-mini
                        dark-percentage
                        color="primary"
                        flat
                        @click="updateOrder(subcategory)"
                      >
                        <q-icon
                          name="mdi-pencil"
                          size="sm"
                        />
                      </q-btn>
                    </q-input>
                  </div>
                  <div class="row q-pt-sm">
                    <div class="col-6">
                      <q-btn
                        :style="{ 'width':'90%' , 'height':'90%' }"
                        class="q-mx-sm"
                        size="12px"
                        dark-percentage
                        color="green"
                        @click="redirectToSubCategoryQuestions(subcategory.id)">
                        <q-icon
                          name="mdi-notebook-outline"
                          size="sm"
                        />
                        <q-tooltip anchor="top middle"
                                   self="bottom middle"
                                   :offset="[10, 10]">
                          <span class="smallFontSize">مشاهده سوالات دروس</span>
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col-6">
                      <q-btn

                        class="q-mx-sm"
                        size="12px"
                        :style="{ 'width':'90%' , 'height':'90%' }"
                        dark-percentage
                        color="blue"
                        @click="goVideoSet(subcategory.id)"
                      >
                        <q-icon
                          name="mdi-video"
                          size="sm"
                        />
                        <q-tooltip anchor="top middle"
                                   self="bottom middle"
                                   :offset="[10, 10]">
                          <span class="smallFontSize">ثبت ویدئو تحلیل</span>
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <div class="row justify-center q-pa-md">
                درسی برای این دفترچه وجود ندارد
              </div>
            </template>
          </tbody>
        </template>
      </q-markup-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { mixinAuth, mixinGetQuizData, mixinQuiz } from 'src/mixin/Mixins'
import { Exam } from 'src/models/Exam'
import { QuestCategoryList } from 'src/models/QuestCategory'

export default {
  name: 'ExamSubCategoryList',
  data: () => ({
    subcategoryList: new QuestSubcategoryList(),
    categoryList: new QuestCategoryList(),
    examTitle: '',
    exam: new Exam()
  }),
  mixins: [mixinAuth, mixinQuiz, mixinGetQuizData],
  created () {
    this.setExam()
    this.loadLessons()
  },
  computed: {
    examId () {
      return this.$route.params.exam_id
    },
    categoryId () {
      return this.$route.params.category_id
    }
  },
  methods: {
    goToCategoryList () {
      this.$router.push({
        name: 'Admin.Exam.Categories',
        params: {
          exam_id: this.examId
        }
      })
    },
    async setExam () {
      const res = await this.getExamData(this.examId)
      if (res.data.data) {
        this.exam = new Exam(res.data.data)
        this.examTitle = res.data.data.title
      }
    },
    async loadLessons () {
      this.subcategoryList.loading = true
      try {
        const response = await this.getLessons()
        this.subcategoryList.loading = false
        this.categoryList = new QuestCategoryList(response.data.data, {
          meta: response.data.meta,
          links: response.data.links
        })
        this.subcategoryList = this.categoryList.list.find(category => category.id === this.categoryId).sub_categories.list
      } catch (e) {
        this.subcategoryList.loading = false
      }
    },
    getLessons () {
      return axios.get(API_ADDRESS.exam.getSubCategoriesWithPermissions(this.examId))
    },
    redirect (link) {
    },
    goVideoSet (id) {
      this.$router.push({
        name: 'Admin.Exam.video.set',
        params: {
          subcategory_id: id,
          exam_id: this.examId,
          examTitle: this.$route.params.examTitle
        }
      })
    },
    redirectToSubCategoryQuestions (id) {
      const examId = this.examId
      this.$router.push({
        name: 'Admin.Exam.SubCategory.Questions',
        params: {
          exam_id: examId,
          subcategory_id: id
        }
      })
    },
    updateOrder (subcategory) {
      if (subcategory.order === null) {
        return
      }
      subcategory.loading = true
      axios.post(API_ADDRESS.questionSubcategory.updateOrder, {
        sub_category_id: subcategory.id,
        order: subcategory.order,
        exam_id: this.examId
      })
        .then((response) => {
          subcategory.loading = false
        })
        .catch(() => {
          subcategory.loading = false
          subcategory.order = null
        })
    }
  }
}

</script>

<style scoped>

.actionsColumn {
  width: 50%;
}

.tableSize {
  width: 60%;
  margin: auto;
}

.col-12 {
  padding: 12px;
}

.smallFontSize {
  font-size: 13px;
}

span {
  font-size: 16px;
}
</style>
