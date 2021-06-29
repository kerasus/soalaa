<template>
  <v-container class="subcategory-editor">
    <v-card
        class="mx-auto"
    >
      <v-toolbar
          color="light-blue px-2"
          dark
      >

        <v-toolbar-title>لیست دروس</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
          class="search mx-3"
          v-model="searchValue"
          prepend-inner-icon="mdi-magnify"
          rounded
          outlined
          dense
          :style="{ 'max-width': '200px' }"
        />

        <v-btn icon @click="addSubcategory">
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
          <v-list-item-avatar :color="iconPicker(item.title).color">
            <v-icon
                class="lighten-1"
                dark
            >
              {{ iconPicker(item.title).icon }}
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="!item.editable" v-text="item.title"></v-list-item-title>
            <v-text-field
                v-else
                outlined
                rounded
                v-model="item.title"
                :style="{ 'max-width': '250px' }"
            />

<!--            <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>-->
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon v-if="!item.editable">
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
            <v-btn v-else icon>
              <v-icon color="green">mdi-check-circle-outline</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>

<!--        <v-divider inset></v-divider>-->

<!--        <v-subheader inset>Files</v-subheader>-->

<!--        <v-list-item-->
<!--            v-for="file in files"-->
<!--            :key="file.title"-->
<!--        >-->
<!--          <v-list-item-avatar>-->
<!--            <v-icon-->
<!--                :class="file.color"-->
<!--                dark-->
<!--                v-text="file.icon"-->
<!--            ></v-icon>-->
<!--          </v-list-item-avatar>-->

<!--          <v-list-item-content>-->
<!--            <v-list-item-title v-text="file.title"></v-list-item-title>-->

<!--            <v-list-item-subtitle v-text="file.subtitle"></v-list-item-subtitle>-->
<!--          </v-list-item-content>-->

<!--          <v-list-item-action>-->
<!--            <v-btn icon>-->
<!--              <v-icon color="grey lighten-1">mdi-information</v-icon>-->
<!--            </v-btn>-->
<!--          </v-list-item-action>-->
<!--        </v-list-item>-->


      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import {QuestSubcategory, QuestSubcategoryList} from "@/models/QuestSubcategory";

export default {
  name: "editSubcategory",
  data () {
    return {
      subCategoriesList: new QuestSubcategoryList(),
      loading: false,
      searchValue: '',
      folders: [
        {
          color: 'blue',
          icon: 'mdi-clipboard-text',
          subtitle: 'Jan 20, 2014',
          title: 'Vacation itinerary',
        },
        {
          color: 'amber',
          icon: 'mdi-gesture-tap-button',
          subtitle: 'Jan 10, 2014',
          title: 'Kitchen remodel',
        },
      ],
    }
  },
  computed: {
    filteredItems () {
      return this.subCategoriesList.list.filter(item => item.title.includes(this.searchValue))
    },
    iconPicker () {
      return (title) => {
        if (title.includes('ریاضی') || title.includes('ریاضیات')) {
          return {
            icon: 'mdi-sigma',
            color: 'orange'
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
        } else if (title.includes('زبان')) {
          return {
            icon: 'mdi-translate',
            color: 'purple lighten-2'
          }
        }
        else {
          return {
            icon: 'mdi-folder',
            color: 'grey'
          }
        }
      }
    }
  },
  methods: {
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
  },
  created() {
    this.loading = true
    const loadSubcategoriesPromise = this.loadSubcategories()
    Promise.all([loadSubcategoriesPromise])
      .then(() => {
        this.loading = false
      })
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
