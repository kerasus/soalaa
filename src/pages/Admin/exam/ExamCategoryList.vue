<template>
  <div class="exam-category-list">
    <div class="tableSize">
      <div>
        <template v-if="!categoryList.loading">
          {{ examTitle }}
        </template>
        <template v-else>
          <q-skeleton type="text"
                      width="150px" />
        </template>
      </div>
      <q-btn round
             dark-percentage
             color="primary"
             icon="isax:arrow-left-2"
             @click="goToExamList">
        <q-tooltip anchor="top middle"
                   self="bottom middle"
                   :offset="[10, 10]">
          <span class="smallFontSize">بازگشت به لیست آزمون</span>
        </q-tooltip>
      </q-btn>
    </div>
    <q-markup-table class="tableSize">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              عنوان دفترچه
            </th>
            <th class="text-center">
              عملیات
            </th>
          </tr>
        </thead>
        <tbody>
          <template v-if="!categoryList.loading">
            <template v-if="categoryList.list.length > 0">
              <tr v-for="category in categoryList.list"
                  :key="category.id">
                <td>{{ category.title }}</td>
                <td class="actionsColumn">
                  <div class="row q-pt-sm justify-center">
                    <div class="col-auto">
                      <q-btn round
                             dark-percentage
                             color="primary"
                             icon="isax:arrow-left-2"
                             @click="goToSubCategoryList(category.id)">
                        <q-tooltip anchor="top middle"
                                   self="bottom middle"
                                   :offset="[10, 10]">
                          <span class="smallFontSize">رفتن به صفحه {{ category.title }}</span>
                        </q-tooltip>
                      </q-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-else>
              <div class="row justify-center q-pa-md">
                دفترچه ای برای این آزمون وجود ندارد
              </div>
            </template>
          </template>
          <template v-else>
            <tr v-for="counter in [1, 2, 3, 4, 5]"
                :key="counter">
              <td>
                <q-skeleton type="text" />
              </td>
              <td class="actionsColumn">
                <div class="row q-pt-sm justify-center">
                  <div class="col-auto">
                    <q-skeleton type="QBtn" />
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </template>
    </q-markup-table>
    <!--    <category-list />-->
    <!--    <exam-sub-category-list :exam="exam" />-->
  </div>
</template>

<script>
// import ExamSubCategoryList from 'src/pages/Admin/exam/ExamSubCategoryList'
import { Exam } from 'src/models/Exam.js'
import { mixinGetQuizData } from 'src/mixin/Mixins.js'
import { QuestCategoryList } from 'src/models/QuestCategory.js'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory.js'
// import CategoryList from 'src/components/Category/categoryList'

export default {
  name: 'ExamCategoryList',
  components: {
    // CategoryList,
    // ExamSubCategoryList
  },
  mixins: [mixinGetQuizData],
  data() {
    return {
      examTitle: '',
      exam: new Exam(),
      subcategoryList: new QuestSubcategoryList(),
      categoryList: new QuestCategoryList()
    }
  },
  computed: {
    examId () {
      return this.$route.params.exam_id
    }
  },
  created () {
    this.setExam()
    this.loadLessons()
  },
  methods: {
    goToExamList () {
      this.$router.push({
        name: 'Admin.Exam.Index'
      })
    },
    async setExam () {
      const exam = await this.getExamData(this.examId)
      if (exam) {
        this.exam = exam
        this.examTitle = exam.title
      }
    },
    async loadLessons () {
      this.categoryList.loading = true
      try {
        const categoryList = await this.getLessons()
        this.categoryList.loading = false
        this.categoryList = categoryList
      } catch (e) {
        this.categoryList.loading = false
        this.categoryList = new QuestCategoryList()
      }
    },
    getLessons () {
      return this.$apiGateway.exam.getSubCategoriesWithPermissions(this.examId)
    },
    goToSubCategoryList (id) {
      this.$router.push({
        name: 'Admin.Exam.Categories.SubCategories',
        params: {
          exam_id: this.examId,
          category_id: id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.exam-category-list {
  width: 60%;
  margin: auto;
}
.actionsColumn {
  width: 50%;
}

.tableSize {
  width: 100%;
  margin: auto auto 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
