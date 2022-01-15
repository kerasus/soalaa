<template>
  <div class="row ">
    <div class="col-md-12 q-pa-sm">
      <p class="coefficient-title">
        {{examTitle}}
      </p>
      <p class="exam-date-part">
        <span class="date-title">
        شروع آزمون:
        </span>
        <span class="exam-date">
        {{startDate}}
        </span>
      </p>
      <p class="exam-date-part">
        <span class="date-title">
        پایان آزمون:
        </span>
        <span class="exam-date">
        {{finishDate}}
        </span>
      </p>
    </div>
    <div class="col-md-6 q-pa-sm">
      <q-select
        v-model="selectedSubgroup"
        outlined
        dense
        :options="notExistingSubGroups"
        option-label="value"
        option-value="id"
        label="زیرگروه"
        emit-value
        map-options
      >
        <template v-slot:no-option>
          <p class="no-data">
             متاسفانه گزینه ای برای انتخاب وجود ندارد!
          </p>
        </template>
      </q-select>
    </div>
    <div class="col-md-6 q-pa-sm">
      <q-btn
        class="full-width"
        block
        color="blue"
        @click="addSubgroup"
      >
        افزودن زیرگروه
      </q-btn>
    </div>
    <div class="col-md-12 q-pa-sm">
      <q-expansion-item
        class="bg-white rounded-borders q-mb-md"
        v-for="(subGroup, index) in subGroups"
        :key="index"
        :label='subGroup.title'
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-md-4 q-pa-sm">
                <q-select
                  v-model="selectedCategory"
                  label="دفترچه"
                  outlined
                  dense
                  :options="categoryList.list"
                  option-label="title"
                  option-value="title"
                  emit-value
                  map-options
                />
              </div>
              <div class="col-md-4 q-pa-sm">
                <q-select
                  v-model="selectedSubcategory"
                  label="درس"
                  outlined
                  dense
                  :options="notExistingSubcategories(subGroup)"
                  option-label="title"
                  option-value="id"
                  emit-value
                  map-options
                />
              </div>
              <div class="col-md-4 q-pa-sm">
                <q-btn
                  class="full-width"
                  dense
                  color="blue"
                  block
                  @click="addSubcategory(subGroup)"
                >
                  اضافه کردن درس
                </q-btn>
              </div>
              <div class="col-md-12 q-pa-sm">
                <q-markup-table
                  flat
                  dense
                >
                  <template v-slot:default>
                    <thead class="text-left">
                    <tr>
                      <th>اسم درس</th>
                      <th
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <div class="th-inline-style">
                          <div class="category-title-size">
                            <q-tooltip
                              anchor="top middle" self="top middle" :offset="[10, 35]"
                            >
                              <span>{{ subCategory.category_title }}</span>
                            </q-tooltip>
                            <p class="small-fontsize">
                              {{ subCategory.sub_category_title }}
                            </p>
                          </div>
                          <q-btn
                            size="12px"
                            flat
                            round
                            icon="mdi-close"
                            color="red"
                            @click="deleteSubcategory(subGroup, subCategory.sub_category_title)"
                          >
                            <q-tooltip
                              anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            >
                              <span>حذف درس</span>
                            </q-tooltip>
                          </q-btn>
                        </div>
                      </th>
                    </tr>
                    </thead>
                    <tbody class="text-left">
                    <tr>
                      <td width="130px">
                        ضریب درس
                      </td>
                      <td
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <q-input
                          v-model="subCategory.sub_category_zarib"
                          dense
                          type="number"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td width="130px">
                        ضریب دفترچه
                      </td>
                      <td
                        v-for="(subCategory,sIindex) in subGroup.sub_category"
                        :key="sIindex"
                      >
                        <q-input
                          v-model="subCategory.category_zarib"
                          dense
                          type="number"
                        />
                      </td>
                    </tr>
                    </tbody>
                  </template>
                </q-markup-table>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12 q-pa-sm">
      <q-btn
        class="full-width"
        color="green"
        dark
        block
        x-large
        @click="save"
      >
        ثبت
      </q-btn>
    </div>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { QuestCategoryList } from 'src/models/QuestCategory'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { Exam, ExamList } from 'src/models/Exam'

export default {
  name: 'EditCoefficients',
  data () {
    return {
      categoryList: new QuestCategoryList(),
      subCategoriesList: new QuestSubcategoryList(),
      subGroups: [],
      selectedSubgroup: null,
      selectedCategory: null,
      selectedSubcategory: null,
      allSubGroups: [],
      examTitle: '',
      startDate: '',
      finishDate: '',
      examId: null,
      loading: false
    }
  },
  computed: {
    notExistingSubGroups () {
      let options = []
      if (this.allSubGroups) {
        options = this.allSubGroups.filter(item => !this.subGroups.find(subGroup => subGroup.title === item.value))
      }
      return options
    },
    notExistingSubcategories () {
      return (subGroup) => {
        const that = this
        return that.subCategoriesList.list.filter(subCategory => !subGroup.sub_category.find(item => item.sub_category_title === subCategory.title))
      }
    }
  },
  created () {
    this.examId = this.$route.params.id
    this.getData()
  },
  watch: {
    loading () {
      const that = this
      if (that.loading) {
        that.$store.dispatch('loading/linearLoading', true)
      } else {
        that.$store.dispatch('loading/linearLoading', false)
      }
    }
  },
  methods: {
    getData () {
      this.getExamInfo()
      this.getCategories()
      this.getSubCategoryList()
      this.existedSubGroup()
      this.getAllSubGroup()
    },
    getExamInfo () {
      this.loading = true
      this.$axios.get(API_ADDRESS.exam.base())
        .then((response) => {
          const examList = new ExamList(response.data.data)
          const examInfo = new Exam(examList.list.find(exam => exam.id === this.examId))
          this.examTitle = examInfo.title
          this.startDate = examInfo.shamsiDate('start_at').dateTime
          this.finishDate = examInfo.shamsiDate('finish_at').dateTime
        })
    },
    getCategories () {
      this.$axios.get(API_ADDRESS.questionCategory.base)
        .then((response) => {
          this.categoryList = new QuestCategoryList(response.data.data)
        })
    },
    getSubCategoryList () {
      this.subCategoriesList.fetch()
        .then((response) => {
          this.subCategoriesList = new QuestSubcategoryList(response.data.data)
        })
    },
    existedSubGroup () {
      this.$axios.get(API_ADDRESS.subGroups.base(this.examId))
        .then((response) => {
          this.subGroups = response.data.data
        })
    },
    getAllSubGroup () {
      this.$axios.get(API_ADDRESS.subGroups.all())
        .then((response) => {
          this.allSubGroups = response.data.data
          this.loading = false
        })
    },
    addSubgroup () {
      this.selectedSubGroup = this.allSubGroups.find(item => item.id === this.selectedSubgroup)
      this.subGroups.push({
        title: this.selectedSubGroup.value,
        sub_category: [],
        id: this.selectedSubGroup.id
      })
    },
    addSubcategory (subGroup) {
      const that = this
      this.selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.selectedSubcategory)
      subGroup.sub_category.push({
        category_title: that.selectedCategory,
        category_zarib: 0,
        sub_category_id: this.selectedSubCategory.id,
        sub_category_title: this.selectedSubCategory.title,
        sub_category_zarib: 0
      })
    },
    deleteSubcategory (subGroup, subcategoryTitle) {
      subGroup.sub_category = subGroup.sub_category.filter(item => item.sub_category_title !== subcategoryTitle)
    },
    save () {
      const that = this
      this.subGroups.forEach(subGroup => {
        if (!subGroup.zirgorooh_id) {
          subGroup.zirgorooh_id = subGroup.id
        }
        subGroup.sub_category.forEach(subCategory => {
          subCategory.subcategory_id = subCategory.sub_category_id
        })
      })
      this.$axios.post(API_ADDRESS.subGroups.base(that.examId), {
        zirgorooh: this.subGroups
      })
        .then((response) => {
          that.subGroups = response.data.data
        })
    }
  }
}

</script>

<style scoped>
.no-data{
  text-align: center;
  margin: 20px;
}

.date-title{
  margin: 5px;
  font-weight: 500;
}
.exam-date-part{
  margin: 30px;
}

.coefficient-title{
  margin: 20px;
  font-weight: 500;
  font-size: 16px;
}

.small-fontsize {
  font-size: 14px;
}

.th-inline-style {
  display: inline flex;
}

.category-title-size {
  margin-right: 10px;
  position: relative;
  top: 8px;
}
</style>
