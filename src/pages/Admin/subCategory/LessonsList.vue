<template>
  <v-container class="subcategory-editor">
    <q-card
     width="800px"
      class="mx-auto"
    >
      <q-card-section class="bg-light-blue-6 text-white row justify-between">
        <div> لیست دروس</div>
        <div style="max-width: 200px" class="row">
          <q-input rounded outlined dark dense type="search" :model-value="searchValue" color="white">
            <template v-slot:append>
              <q-icon name="search" color="white"/>
            </template>
          </q-input>
          <q-btn flat color="white" round icon="add"/>
        </div>
      </q-card-section>
      <q-separator/>
      <q-list class="q-mb-lg">
        <q-item
          v-for="(item, index) in filteredItems"
          :key="index">
          <q-item-section side>
            <q-avatar
              round
              text-color="white"
              :color="iconPicker(item.title).color"
              :icon="iconPicker(item.title).icon"
            />
          </q-item-section>
          <q-item-section class="row">

            <q-item-label
              v-if="!item.editable && !item.editMode"
            >
              {{item.title}}
            </q-item-label>
            <q-input
              v-else-if="!item.editable && item.editMode"
              v-model="item.title_buffer"
              rounded
              style="max-width: 300px"
              outlined  :model-value="item.title_buffer"/>
          </q-item-section>
          <q-item-section side>
            <q-card>
              {{ categoryList.list }}
            </q-card>
            <q-chip
              color="blue-9"
              dark
              v-if="!item.editMode && !item.editable"
            >
              {{ getCategoryById(item.category_id).title }}

            </q-chip>
            <q-select
              v-else-if="!item.editMode && item.editable"
              rounded
              outlined
              v-model="item.category_id"
              option-value="title"
              option-label="title"
              :options="categoryList.list"
              label="Rounded outlined"  model-value=""/>
            <q-select
              v-else-if="item.editMode && !item.editable"
              v-model="item.category_id_buffer"
              rounded
              outlined
              :options="categoryList.list"
              label="Rounded outlined"  model-value=""/>
          </q-item-section>
          <q-item-section side>
            <q-btn
              v-if="!item.editable && !item.editMode"
              round
              color="blue-9"
              size="xs"
              outline
              icon="edit"
              @click="editMode(item)"
            />
           <div
             v-else-if="!item.editable && item.editMode"
             class="row">
             <q-btn
               round
               color="green"
               size="xs"
               dark
               icon="check"
               @click="create(item)"
             />
             <q-btn
               round
               class="q-mx-md"
               color="red"
               size="xs"
               icon="close"
               @click="deleteItem(item)"
             />
           </div>
          </q-item-section>
        </q-item>
      </q-list>
      <v-list
        subheader
        two-line
      >
                <v-subheader inset>Folders</v-subheader>

        <v-list-item
          v-for="(item, index) in filteredItems"
          :key="index"
        >

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
    </q-card>
  </v-container>
</template>

<script>
import { QuestSubcategory, QuestSubcategoryList } from 'src/models/QuestSubcategory'
import { QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'LessonsList',
  data: () => ({
    subCategoriesList: new QuestSubcategoryList(),
    categoryList: new QuestCategoryList(),
    loading: false,
    searchValue: ''
  }),
  computed: {
    filteredItems () {
      const that = this
      console.log('computed :', this.subCategoriesList.list.filter(item => item.title.includes(this.searchValue) || (!item.editable && that.getCategoryById(item.category_id).title.includes(this.searchValue))))
      console.log('searchValue: ', this.searchValue)

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
        } else {
          return {
            icon: 'mdi-card-text',
            color: 'grey'
          }
        }
      }
    }
  },
  created () {
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
      this.$axios.put(API_ADDRESS.questionSubcategory.update(item.id), item)
        .then(response => {
          item = new QuestSubcategory(response.data.data)
        })
    },
    create (item) {
      item.editable = false
      item.title = item.title.trim()
      this.$axios.post(API_ADDRESS.questionSubcategory.base, item)
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
      console.log('edit mode run', item)
      item.editMode = true
      item.buffer()
    },
    getCategoryById (categoryId) {
      return this.categoryList.list.find(item => item.id === categoryId)
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
      const that = this
      return new Promise(function (resolve, reject) {
        that.subCategoriesList.fetch()
          .then((response) => {
            that.subCategoriesList = new QuestSubcategoryList(response.data.data)
            console.log('loadCategories :', response)
            console.log('model :', new QuestSubcategoryList())
            console.log('loadSubcategories :', that.subCategoriesList)
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    loadCategories () {
      const that = this
      return new Promise(function (resolve, reject) {
        that.$axios.get(API_ADDRESS.questionCategory.base)
          .then((response) => {
            console.log('loadCategories res:', response.data.data)
            that.categoryList = new QuestCategoryList(response.data.data)
            console.log('loadCategories :', that.categoryList)
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
