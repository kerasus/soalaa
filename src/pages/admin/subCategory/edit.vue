<template>
  <v-container class="subcategory-editor">
    <v-card
      max-width="800px"
      class="mx-auto"
    >
      <v-overlay
        v-if="loading"
        absolute
      >
        <v-progress-circular indeterminate />
      </v-overlay>
      <v-toolbar
        color="light-blue px-2"
        dark
      >
        <v-toolbar-title>لیست دروس</v-toolbar-title>

        <v-spacer />

        <v-text-field
          v-model="searchValue"
          class="search mx-3"
          prepend-inner-icon="mdi-magnify"
          rounded
          outlined
          dense
          :style="{ 'max-width': '200px' }"
        />

        <v-btn
          icon
          @click="addSubcategory"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list
        subheader
        two-line
      >
        <!--        <v-subheader inset>Folders</v-subheader>-->

        <v-list-item
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          <v-list-item-avatar
            size="40"
            :color="iconPicker(item.title).color"
          >
            <v-icon
              size="30"
              class="lighten-1"
              dark
            >
              {{ iconPicker(item.title).icon }}
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              v-if="!item.editable && !item.editMode"
              v-text="item.title"
            />
            <v-text-field
              v-else-if="item.editable && !item.editMode"
              v-model="item.title"
              outlined
              rounded
              :style="{ 'max-width': '250px' }"
            />
            <v-text-field
              v-else-if="!item.editable && item.editMode"
              v-model="item.title_buffer"
              outlined
              rounded
              :style="{ 'max-width': '250px' }"
            />

            <!--            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>-->
          </v-list-item-content>

          <v-chip
            v-if="!item.editMode && !item.editable"
            class="ma-2 mx-5"
            color="primary"
          >
            {{ getCategoryById(item.category_id).title }}
          </v-chip>

          <v-select
            v-else-if="!item.editMode && item.editable"
            v-model="item.category_id"
            outlined
            rounded
            :items="categoryList.list"
            item-value="id"
            item-text="title"
            :style="{ 'max-width': '270px' }"
          />
          <v-select
            v-else-if="item.editMode && !item.editable"
            v-model="item.category_id_buffer"
            outlined
            rounded
            :items="categoryList.list"
            item-value="id"
            item-text="title"
            :style="{ 'max-width': '270px' }"
          />

          <v-list-item-action>
            <div v-if="!item.editable && !item.editMode">
              <v-btn
                icon
                @click="editMode(item)"
              >
                <v-icon color="blue">
                  mdi-pencil-circle-outline
                </v-icon>
              </v-btn>
              <!--              <v-btn icon>-->
              <!--                <v-icon color="red">mdi-delete-circle-outline</v-icon>-->
              <!--              </v-btn>-->
            </div>
            <div v-else-if="item.editable && !item.editMode">
              <v-btn
                icon
                @click="create(item)"
              >
                <v-icon color="green">
                  mdi-check-circle-outline
                </v-icon>
              </v-btn>
              <v-btn
                icon
                @click="deleteItem(item)"
              >
                <v-icon color="red">
                  mdi-close-circle-outline
                </v-icon>
              </v-btn>
            </div>
            <div v-else-if="!item.editable && item.editMode">
              <v-btn
                icon
                @click="update(item)"
              >
                <v-icon color="green">
                  mdi-check-circle-outline
                </v-icon>
              </v-btn>
              <v-btn
                icon
                @click="cancelEdit(item)"
              >
                <v-icon color="red">
                  mdi-close-circle-outline
                </v-icon>
              </v-btn>
            </div>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { QuestSubcategory, QuestSubcategoryList} from "@/models/QuestSubcategory";
import axios from "axios";
import {QuestCategory, QuestCategoryList} from "@/models/QuestCategory";
import API_ADDRESS from "@/api/Addresses";

export default {
  name: "EditSubcategory",
  data () {
    return {
      subCategoriesList: new QuestSubcategoryList(),
      categoryList: new QuestCategoryList(),
      loading: false,
      searchValue: '',
    }
  },
  computed: {
    filteredItems () {
      let that = this
      return this.subCategoriesList.list.filter(item => item.title.includes(this.searchValue) || (!item.editable && that.getCategoryById(item.category_id).title.includes(this.searchValue)))
    },
    iconPicker () {
      return (title) => {
        if (title.includes('ریاضی') || title.includes('ریاضیات')) {
          return {
            icon: 'mdi-sigma',
            color: 'deep-orange darken-3'
          }
        } else if (title.includes('هندسه')) {
          return {
            icon: 'mdi-math-compass',
            color: 'red'
          }
        } else if (title.includes('زمین')) {
          return {
            icon: 'mdi-earth',
            color: 'green'
          }
        } else if (title.includes('زبان') || title.includes('عربی') || title.includes('انگلیسی') || title.includes('فارسی') || title.includes('فارسی') || title.includes('ادبیات')) {
          return {
            icon: 'mdi-translate',
            color: 'purple lighten-2'
          }
        } else if (title.includes('فیزیک')) {
          return {
            icon: 'mdi-atom',
            color: 'blue-grey darken-1'
          }
        } else if (title.includes('شیمی')) {
          return {
            icon: 'mdi-bottle-tonic-skull',
            color: 'red darken-2'
          }
        } else if (title.includes('حساب') || title.includes('گسسته')) {
          return {
            icon: 'mdi-math-integral',
            color: 'orange accent-4'
          }
        } else if (title.includes('تاریخ')) {
          return {
            icon: 'mdi-history',
            color: 'light-blue accent-3'
          }
        } else if (title.includes('جغرافی')) {
          return {
            icon: 'mdi-map-marker',
            color: 'cyan lighten-1'
          }
        } else if (title.includes('نظرسنجی')) {
          return {
            icon: 'mdi-poll',
            color: 'black'
          }
        } else if (title.includes('زیست')) {
          return {
            icon: 'mdi-human',
            color: 'brown'
          }
        } else if (title.includes('روان')) {
          return {
            icon: 'mdi-head-snowflake',
            color: 'amber accent-4'
          }
        } else if (title.includes('اقتصاد')) {
          return {
            icon: 'mdi-finance',
            color: 'green accent-4'
          }
        } else if (title.includes('دین') || title.includes('آسمانی') || title.includes('عقاید') || title.includes('قرآن')) {
          return {
            icon: 'mdi-book-open-variant',
            color: 'indigo darken-3'
          }
        }
        else {
          return {
            icon: 'mdi-card-text',
            color: 'grey'
          }
        }
      }
    }
  },

  created() {
    this.loading = true
    const loadSubcategoriesPromise = this.loadSubcategories()
    const loadCategoriesPromise = this.loadCategories()
    Promise.all([loadSubcategoriesPromise, loadCategoriesPromise])
      .then(() => {
        this.loading = false
      })

  },
  methods: {
    update (item) {
      item.editMode = false
      item.title = item.title.trim()
      item.apply()
      axios.put(API_ADDRESS.questionSubcategory.update(item.id), item)
      .then(response => {
        item = new QuestSubcategory(response.data.data)
      })
    },
    create (item) {
      item.editable = false
      item.title = item.title.trim()
      axios.post(API_ADDRESS.questionSubcategory.base, item)
      .then(response => {
        item = new QuestSubcategory(response.data.data)
      })
      .catch(() => {
        this.deleteItem(item)
      })
    },
    cancelEdit (item) {
      item.editMode = false
      item.buffer()
    },
    editMode (item) {
      item.editMode = true
      item.buffer()
    },
    getCategoryById (category_id) {
      return this.categoryList.list.find(item => item.id === category_id)
    },
    deleteItem (subcategory) {
      this.subCategoriesList.list.forEach((item, index) => {
        if (item === subcategory) {
          this.subCategoriesList.list.splice(index, 1)
        }
      })
    },
    addSubcategory () {
      this.subCategoriesList.list.unshift(new QuestSubcategory({
        editable: true,
        title: ''
      }))
    },
    loadSubcategories () {
      let that = this
      return new Promise(function(resolve, reject) {
        that.subCategoriesList.fetch()
          .then((response) => {
            that.subCategoriesList = new QuestSubcategoryList(response.data.data)
            resolve()
          })
          .catch( () => {
            reject()
          })
      })
    },
    loadCategories () {
      let that = this
      return new Promise(function(resolve, reject) {
        axios.get(API_ADDRESS.questionCategory.base)
          .then((response) => {
            that.categoryList = new QuestCategoryList(response.data.data)
            resolve()
          })
          .catch( () => {
            reject()
          })
      })
    },
  }
}
</script>

<style scoped>

</style>

<style>
.subcategory-editor .v-text-field__details {
  display: none;
}

.subcategory-editor .v-input__slot {
  margin-bottom: 0 !important;
}
</style>
