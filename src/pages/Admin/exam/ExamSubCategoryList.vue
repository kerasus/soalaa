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
          @click="goBack"
        />
      </div>
    </div>
    <div class="col-12">
      <q-markup-table class="tableSize">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                عنوان دفترچه
              </th>
              <th class="text-left">
                عنوان درس
              </th>
              <th class="text-center">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-for="lesson in lessonsList.list">
              <tr
                v-for="subcategory in lesson.inputData.sub_categories"
                :key="subcategory.id"
              >
                <td>{{ lesson.title }}</td>
                <td>{{ subcategory.title }}</td>
                <td class="actionsColumn">
                  <div>
                    <q-input
                      v-if="subcategory.permissions.view"
                      v-model="lesson.order"
                      type="number"
                      :loading="lesson.loading"
                      :disabled="lesson.loading"
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
                        @click="updateOrder(lesson)"
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
                        v-if="subcategory.permissions.view"
                        :style="{ 'width':'90%' , 'height':'90%' }"
                        class="q-mx-sm"
                        size="12px"
                        dark-percentage
                        color="green"
                        @click="redirectTo(subcategory.id)">
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
                        v-if="subcategory.permissions.view"
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

export default {
  name: 'ExamSubCategoryList',
  data: () => ({
    lessonsList: new QuestSubcategoryList(),
    examTitle: ''
  }),
  mixins: [mixinAuth, mixinQuiz, mixinGetQuizData],
  created () {
    this.getExamTitle()
    this.loadLessons()
  },
  methods: {
    async getExamTitle () {
      const res = await this.getQuizData(this.$route.params.examId)
      if (res.data.data) {
        this.examTitle = res.data.data.title
      }
    },
    goBack () {
      this.$router.push({
        name: 'Admin.Exam.Index'
      })
    },
    async loadLessons () {
      this.lessonsList.loading = true
      try {
        const response = await this.getLessons()
        this.lessonsList.loading = false
        this.lessonsList = new QuestSubcategoryList(response.data.data, {
          meta: response.data.meta,
          links: response.data.links
        })
      } catch (e) {
        this.lessonsList.loading = false
        this.lessonsList = new QuestSubcategoryList()
      }
    },
    getLessons () {
      return axios.get(API_ADDRESS.exam.getSubCategoriesWithPermissions(this.$route.params.examId))
    },
    redirect (link) {
    },
    goVideoSet (id) {
      this.$router.push({
        name: 'Admin.Exam.video.set',
        params: {
          subcategory_id: id,
          examId: this.$route.params.examId,
          examTitle: this.$route.params.examTitle
        }
      })
    },
    redirectTo (id) {
      const examId = this.$route.params.examId
      this.$router.push({
        name: 'Admin.Exam.SubCategory.Questions',
        params: {
          examId,
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
        exam_id: this.$route.params.examId
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
