<template>
  <q-page-container fluid>
    <div class="row">
      <div class="col-md-6">
        <!--        ToDo change to using id-->
        <q-select
          v-model="selectedSubgroup"
          outlined
          dense
          :options="notExistingSubGroups"
          item-text="value"
          item-value="id"
          label="زیرگروه"
        />
      </div>
      <div class="col-md-6">
        <q-btn
          block
          color="primary"
          @click="addSubgroup"
        >
          افزودن زیرگروه
        </q-btn>
      </div>
      <div class="col-md-12">
        <div class="expantionPanels">
          <q-expansion-item
            v-for="(subGroup, index) in subGroups"
            :key="index"
          >
            <q-card>
            <q-card-section>{{ subGroup.title }}</q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-md-4">
                  <q-select
                    v-model="selectedCategory"
                    label="دفترچه"
                    outlined
                    dense
                    :options="categoryList.list"
                    item-text="title"
                    item-value="title"
                  />
                </div>

                <div class="col-md-4">
                  <q-select
                    v-model="selectedSubcategory"
                    label="درس"
                    outlined
                    dense
                    :options="notExistingSubcategories(subGroup)"
                    item-text="title"
                    item-value="id"
                  />
                </div>
                <div class="col-md-4">
                  <q-btn
                    dense
                    color="primary"
                    block
                    @click="addSubcategory(subGroup)"
                  >
                    اضافه کردن درس
                  </q-btn>
                </div>
                <div class="col-md-12">
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
                              <q-btn
                                icon
                                color="red"
                                v-bind="attrs"
                                v-on="on"
                                @click="deleteSubcategory(subGroup, subCategory.sub_category_title)"
                              >
                                <v-icon>mdi-close</v-icon>
                              </q-btn>
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
                </div>
              </div>
            </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-btn
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
  </q-page-container>
</template>
<!--<script>-->
<!--import axios from 'axios'-->
<!--import API_ADDRESS from "@/api/Addresses";-->
<!--import {QuestCategoryList} from "@/models/QuestCategory";-->
<!--import {QuestSubcategoryList} from "@/models/QuestSubcategory";-->
<!--export default {-->
<!--  name: "EditCoefficients",-->
<!--  data () {-->
<!--    return {-->
<!--      categoryList: new QuestCategoryList(),-->
<!--      subCategoriesList: new QuestSubcategoryList(),-->
<!--      subGroups: [],-->
<!--      selectedSubgroup: null,-->
<!--      selectedCategory: null,-->
<!--      selectedSubcategory: null,-->
<!--      allSubGroups: [],-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    notExistingSubGroups () {-->
<!--      let that = this-->
<!--      // ToDo change to using id-->
<!--      return this.allSubGroups.filter(item => !that.subGroups.find(subGroup => subGroup.title === item.value))-->
<!--    },-->
<!--    notExistingSubcategories () {-->
<!--      return (subGroup) => {-->
<!--        let that = this-->
<!--        return that.subCategoriesList.list.filter(subCategory => !subGroup.sub_category.find(item => item.sub_category_title === subCategory.title))-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    let that = this-->
<!--    axios.get(API_ADDRESS.questionCategory.base)-->
<!--      .then((response) => {-->
<!--        that.categoryList = new QuestCategoryList(response.data.data)-->
<!--        console.log(response)-->
<!--      })-->
<!--    this.subCategoriesList.fetch()-->
<!--      .then((response) => {-->
<!--        that.subCategoriesList = new QuestSubcategoryList(response.data.data)-->
<!--      })-->
<!--    axios.get(API_ADDRESS.subGroups.base(that.$route.params.exam_id))-->
<!--      .then((response) => {-->
<!--        that.subGroups = response.data.data-->
<!--      })-->
<!--    axios.get(API_ADDRESS.subGroups.all())-->
<!--      .then((response) => {-->
<!--        that.allSubGroups = response.data.data-->
<!--      })-->
<!--  },-->
<!--  methods: {-->
<!--    addSubgroup () {-->
<!--      let selectedSubGroup = this.allSubGroups.find(item => item.id === this.selectedSubgroup)-->
<!--      this.subGroups.push({ title: selectedSubGroup.value, sub_category: [], id: selectedSubGroup.id })-->
<!--    },-->
<!--    addSubcategory (subGroup) {-->
<!--      let that = this-->
<!--      let selectedSubCategory = this.subCategoriesList.list.find(item => item.id === this.selectedSubcategory)-->
<!--      subGroup.sub_category.push({-->
<!--        category_title: that.selectedCategory,-->
<!--        category_zarib: 0,-->
<!--        sub_category_id: selectedSubCategory.id,-->
<!--        sub_category_title: selectedSubCategory.title,-->
<!--        sub_category_zarib: 0-->
<!--      })-->
<!--    },-->
<!--    deleteSubcategory (subGroup, subcategoryTitle) {-->
<!--      subGroup.sub_category = subGroup.sub_category.filter(item => item.sub_category_title !== subcategoryTitle)-->
<!--    },-->
<!--    save () {-->
<!--      let that = this-->
<!--      this.subGroups.forEach(subGroup => {-->
<!--        if (!subGroup.zirgorooh_id) {-->
<!--          subGroup.zirgorooh_id = subGroup.id-->
<!--        }-->
<!--        subGroup.sub_category.forEach(subCategory => {-->
<!--          subCategory.subcategory_id = subCategory.sub_category_id-->
<!--        })-->
<!--      })-->
<!--      axios.post(API_ADDRESS.subGroups.base(that.$route.params.exam_id), {-->
<!--        zirgorooh: this.subGroups-->
<!--      })-->
<!--        .then((response) => {-->
<!--          that.subGroups = response.data.data-->
<!--        })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style scoped>

</style>
