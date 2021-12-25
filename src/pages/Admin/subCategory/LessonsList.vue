<template>
<q-page>
  <div class="q-mx-auto q-ma-xl" style="width: 900px">
    <q-card
    >
      <q-card-section class="bg-light-blue-6 text-white row justify-between">
        <div class="text-h5"> لیست دروس</div>
        <div  class="row">
          <q-input
            rounded
            outlined
            dark
            dense
            type="search"
            v-model="searchValue"
            :model-value="searchValue"
            color="white">
            <template v-slot:append>
              <q-icon name="search" color="white"/>
            </template>
          </q-input>
          <q-btn flat color="white" round icon="add" class="q-ml-md"  @click="addSubcategory"/>
        </div>
      </q-card-section>
      <q-linear-progress v-if="loading" indeterminate color="warning" class="q-mt-sm" />
      <q-separator/>
       <q-list class="q-mb-lg">
         <q-item
           v-for="(item, index) in filteredItems"
           class="q-mt-md"
           :key="index">
           <q-item-section side>
             <q-avatar
               round
               text-color="white"
               :color="iconPicker(item.title).color"
               :icon="iconPicker(item.title).icon"
             />
           </q-item-section>
           <q-item-section >
             <q-item-label
               v-if="!item.editable && !item.editMode"
               class="text-subtitle1"
             >
               {{item.title}}
             </q-item-label>
             <q-input
               v-else-if="!item.editable && item.editMode"
               v-model="item.title_buffer"
               rounded
               dense
               color="light-blue-6"
               style="max-width: 200px"
               outlined
               :model-value="item.title_buffer"/>
             <q-input
               v-else-if="item.editable && !item.editMode"
               v-model="item.title"
               rounded
               color="light-blue-6"
               dense
               label="عنوان درس"
               style="max-width: 200px"
               outlined />
           </q-item-section>
           <q-item-section>
             <div  v-if="!item.editMode && !item.editable" class="row justify-end">
               <q-chip
                 color="blue-9"
                 dark
                 class="text-subtitle1"
               >
                 {{ (getCategoryById(item.category_id)) ? getCategoryById(item.category_id).title : ''}}
               </q-chip>
             </div>
             <q-select
               v-else-if="!item.editMode && item.editable"
               v-model="item.category_id"
               :options="categoryList.list"
               option-label="title"
               option-value="id"
               map-options
               rounded
               outlined
               emit-value
               color="light-blue-6"
               label="انتخاب کنید"
               dense
              />
             <q-select
               v-else-if="item.editMode && !item.editable"
               v-model="item.category_id_buffer"
               :options="categoryList.list"
               option-label="title"
               option-value="id"
               map-options
               rounded
               dense
               emit-value
               color="light-blue-6"
               outlined
               />
           </q-item-section>
           <q-item-section side >
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
                 @click="update(item)"
               />
               <q-btn
                 round
                 class="q-ml-md"
                 color="red"
                 size="xs"
                 icon="close"
                 @click="cancelEdit(item)"
               />
             </div>
             <div
               v-else-if="item.editable && !item.editMode"
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
                 class="q-ml-md"
                 color="red"
                 size="xs"
                 icon="close"
                 @click="deleteItem(item)"
               />
             </div>
           </q-item-section>
         </q-item>
       </q-list>
    </q-card>
  </div>
</q-page>

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
            resolve()
          })
          .catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          })
      })
    },
    loadCategories () {
      const that = this
      return new Promise(function (resolve, reject) {
        that.$axios.get(API_ADDRESS.questionCategory.base)
          .then((response) => {
            that.categoryList = new QuestCategoryList(response.data.data)
            resolve()
          })
          .catch(() => {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject()
          })
      })
    }
  }
}
</script>

<style scoped>

</style>
