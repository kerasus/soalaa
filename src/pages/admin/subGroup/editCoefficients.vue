<template>
  <v-container fluid>
    <v-row>
      <v-col md="6">
        <!--        ToDo change to using id-->
        <v-select
          v-model="selectedSubgroup"
          outlined
          dense
          :items="notExistingSubGroups"
          item-text="value"
          item-value="id"
          label="زیرگروه"
        />
      </v-col>
      <v-col md="6">
        <v-btn
          block
          color="primary"
          @click="addSubgroup"
        >
          افزودن زیرگروه
        </v-btn>
      </v-col>
      <v-col md="12">
        <v-expansion-panels>
          <v-expansion-panel
            v-for="(subGroup, index) in subGroups"
            :key="index"
          >
            <v-expansion-panel-header>{{ subGroup.title }}</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col md="4">
                  <v-select
                    v-model="selectedCategory"
                    label="دفترچه"
                    outlined
                    dense
                    :items="categoryList.list"
                    item-text="title"
                    item-value="title"
                  />
                </v-col>
                <v-col md="4">
                  <v-select
                    v-model="selectedSubcategory"
                    label="درس"
                    outlined
                    dense
                    :items="notExistingSubcategories(subGroup)"
                    item-text="title"
                    item-value="id"
                  />
                </v-col>
                <v-col md="4">
                  <v-btn
                    dense
                    color="primary"
                    block
                    @click="addSubcategory(subGroup)"
                  >
                    اضافه کردن درس
                  </v-btn>
                </v-col>
                <v-col md="12">
                  <v-simple-table
                    dense
                    fixed-header
                  >
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th>اسم درس</th>
                          <th
                            v-for="(subCategory,sIindex) in subGroup.sub_category"
                            :key="sIindex"
                          >
                            <v-tooltip
                              top
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <p
                                  v-bind="attrs"
                                  class="d-inline-block"
                                  v-on="on"
                                >
                                  {{ subCategory.sub_category_title }}
                                </p>
                              </template>
                              <span>{{ subCategory.category_title }}</span>
                            </v-tooltip>
                            <v-tooltip
                              top
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  icon
                                  color="red"
                                  v-bind="attrs"
                                  v-on="on"
                                  @click="deleteSubcategory(subGroup, subCategory.sub_category_title)"
                                >
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </template>
                              <span>حذف درس</span>
                            </v-tooltip>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td width="130px">
                            ضریب درس
                          </td>
                          <td
                            v-for="(subCategory,sIindex) in subGroup.sub_category"
                            :key="sIindex"
                          >
                            <v-text-field
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
                            <v-text-field
                              v-model="subCategory.category_zarib"
                              dense
                              type="number"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <v-btn
          color="green"
          dark
          block
          x-large
          @click="save"
        >
          ثبت
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from "@/api/Addresses";
import {QuestCategoryList} from "@/models/QuestCategory";
import {QuestSubcategoryList} from "@/models/QuestSubcategory";
export default {
  name: "EditCoefficients",
  data () {
    return {
      categoryList: new QuestCategoryList(),
      subCategoriesList: new QuestSubcategoryList(),
      subGroups: [],
      selectedSubgroup: null,
      selectedCategory: null,
      selectedSubcategory: null,
      allSubGroups: [],
    }
  },
  computed: {
    notExistingSubGroups () {
      let that = this
      // ToDo change to using id
      return this.allSubGroups.filter(item => !that.subGroups.find(subGroup => subGroup.title === item.value))
    },
    notExistingSubcategories () {
      return (subGroup) => {
        let that = this
        return that.subCategoriesList.list.filter(subCategory => !subGroup.sub_category.find(item => item.sub_category_title === subCategory.title))
      }
    }
  },
  created() {
    let that = this
    axios.get(API_ADDRESS.questionCategory.base)
      .then((response) => {
        that.categoryList = new QuestCategoryList(response.data.data)
        console.log(response)
      })
    this.subCategoriesList.fetch()
      .then((response) => {
        that.subCategoriesList = new QuestSubcategoryList(response.data.data)
      })
    axios.get(API_ADDRESS.subGroups.base(that.$route.params.exam_id))
      .then((response) => {
        that.subGroups = response.data.data
      })
    axios.get(API_ADDRESS.subGroups.all())
      .then((response) => {
        that.allSubGroups = response.data.data
      })
  },
  methods: {
    addSubgroup () {
      let selectedSubGroup = this.allSubGroups.find(item => item.id === this.selectedSubgroup)
      this.subGroups.push({ title: selectedSubGroup.value, sub_category: [], id: selectedSubGroup.id })
    },
    addSubcategory (subGroup) {
      let that = this
      let selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.selectedSubcategory)
      subGroup.sub_category.push({
        category_title: that.selectedCategory,
        category_zarib: 0,
        sub_category_id: selectedSubCategory.id,
        sub_category_title: selectedSubCategory.title,
        sub_category_zarib: 0
      })
    },
    deleteSubcategory (subGroup, subcategoryTitle) {
      subGroup.sub_category = subGroup.sub_category.filter(item => item.sub_category_title !== subcategoryTitle)
    },
    save () {
      let that = this
      this.subGroups.forEach(subGroup => {
        subGroup.zirgorooh_id = subGroup.id
        subGroup.sub_category.forEach(subCategory => {
          subCategory.subcategory_id = subCategory.sub_category_id
        })
      })
      axios.post(API_ADDRESS.subGroups.base(that.$route.params.exam_id), {
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

</style>
