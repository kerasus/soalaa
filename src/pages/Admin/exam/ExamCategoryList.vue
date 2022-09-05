<template>
  <div class="exam-category-list">
    <div class="tableSize">
      <div>{{ examTitle }}</div>
      <q-btn
        round
        dark-percentage
        color="primary"
        icon="isax:arrow-left-2"
        @click="goToExamList"
      >
        <q-tooltip anchor="top middle"
                   self="bottom middle"
                   :offset="[10, 10]">
          <span class="smallFontSize">بازگشت به لیست آزمون</span>
        </q-tooltip>
      </q-btn>
    </div>
    <q-markup-table
      v-if="!categoryList.loading"
      class="tableSize"
    >
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
          <tr
            v-for="category in categoryList.list"
            :key="category.id"
          >
            <td>{{ category.title }}</td>
            <td class="actionsColumn">
              <div class="row q-pt-sm justify-center">
                <div class="col-auto">
                  <q-btn
                    round
                    dark-percentage
                    color="primary"
                    icon="isax:arrow-left-2"
                    @click="goToSubCategoryList(category.id)"
                  >
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
        </tbody>
      </template>
    </q-markup-table>
    <!--    <category-list />-->
    <!--    <exam-sub-category-list :exam="exam" />-->
  </div>
</template>

<script>
// import ExamSubCategoryList from 'pages/Admin/exam/ExamSubCategoryList'
import { mixinGetQuizData } from 'src/mixin/Mixins'
import { Exam } from 'src/models/Exam'
import { QuestCategoryList } from 'src/models/QuestCategory'
import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
// import CategoryList from 'components/Category/categoryList'
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
  created () {
    this.setExam()
    this.loadLessons()
  },
  computed: {
    examId () {
      return this.$route.params.exam_id
    }
  },
  methods: {
    goToExamList () {
      this.$router.push({
        name: 'Admin.Exam.Index'
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
      this.categoryList.loading = true
      try {
        const response = await this.getLessons()
        this.categoryList.loading = false
        this.categoryList = new QuestCategoryList(response.data.data, {
          meta: response.data.meta,
          links: response.data.links
        })
      } catch (e) {
        this.categoryList.loading = false
        this.categoryList = new QuestCategoryList()
      }
    },
    getLessons () {
      return axios.get(API_ADDRESS.exam.getSubCategoriesWithPermissions(this.examId))
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
