<template>
  <v-container fluid>
    <v-row>
      <v-col md="6">
        <!--        ToDo change to using id-->
        <v-select
          outlined
          dense
          :items="notExistingSubGroups"
          item-text="value"
        />
      </v-col>
      <v-col md="6">
        <v-btn
          block
          color="primary"
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
                <v-col md="6">
                  <v-select
                    outlined
                    dense
                    :items="notExistingCategories(subGroup)"
                    item-text="title"
                  />
                </v-col>
                <v-col md="6">
                  <v-btn
                    block
                    color="primary"
                  >
                    افزودن دفترچه
                  </v-btn>
                </v-col>
                  <v-col md="12">
                      <v-expansion-panels>
                          <v-expansion-panel v-for="(category, index) in subGroup.cate"></v-expansion-panel>
                      </v-expansion-panels>
                  </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
      selectedSubGroup: null,
      selectedCategory: null,
      allSubGroups: [],
    }
  },
  computed: {
    notExistingSubGroups () {
      let that = this
      // ToDo change to using id
      return this.allSubGroups.filter(item => that.subGroups.find(subGroup => subGroup.title !== item.value))
    },
      notExistingCategories () {
        return (subGroup) => {
            return this.categoryList.list
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
  }
}
</script>

<style scoped>

</style>
