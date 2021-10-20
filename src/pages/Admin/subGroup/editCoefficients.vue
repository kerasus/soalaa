<template>
  <div class="row ">
    <div class="col-md-6 q-pa-sm">
      <!--        ToDo change to using id-->
      <q-select
        v-model="selectedSubgroup"
        outlined
        dense
        :options="notExistingSubGroups"
        option-label="value"
        option-value="id"
        label="زیرگروه"
      />
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
                        <q-tooltip
                          anchor="top middle" self="bottom middle" :offset="[10, 10]"
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
                        </q-tooltip>
                        <q-tooltip
                          anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <q-btn
                              icon
                              color="red"
                              v-bind="attrs"
                              v-on="on"
                              @click="deleteSubcategory(subGroup, subCategory.sub_category_title)"
                            >
                              <q-icon>mdi-close</q-icon>
                            </q-btn>
                          </template>
                          <span>حذف درس</span>
                        </q-tooltip>
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

import axios from 'axios'
import API_ADDRESS from 'src/api/Addresses'
import { QuestCategoryList } from 'src/models/QuestCategory'
import { QuestSubcategoryList } from 'src/models/QuestSubcategory'

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
      allSubGroups: []
    }
  },
  computed: {
    notExistingSubGroups () {
      const that = this
      // ToDo change to using id
      return this.allSubGroups.filter(item => !that.subGroups.find(subGroup => subGroup.title === item.value))
    },
    notExistingSubcategories () {
      return (subGroup) => {
        const that = this
        return that.subCategoriesList.list.filter(subCategory => !subGroup.sub_category.find(item => item.sub_category_title === subCategory.title))
      }
    }
  },
  created () {
    const that = this
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
      console.log(this.allSubGroups)
      const selectedSubGroup = this.allSubGroups.find(item => item.id === this.selectedSubgroup)
      this.subGroups.push({ title: selectedSubGroup.value, sub_category: [], id: selectedSubGroup.id })
    },
    addSubcategory (subGroup) {
      const that = this
      const selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.selectedSubcategory)
      subGroup.sub_category.push({
        category_title: that.selectedCategory,
        category_zarib: 0,
        sub_category_id: selectedSubCategory.id,
        sub_category_title: selectedSubCategory.title,
        sub_category_zarib: 0
      })
    },
    deconsteSubcategory (subGroup, subcategoryTitle) {
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
