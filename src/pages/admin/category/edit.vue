<template>
  <v-container class="category-editor">
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
        <v-toolbar-title>لیست دفترچه ها</v-toolbar-title>

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
          @click="addCategory"
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
import axios from "axios";
import {QuestCategory, QuestCategoryList} from "@/models/QuestCategory";
import API_ADDRESS from "@/api/Addresses";

export default {
  name: "Edit",
  data () {
    return {
      categoryList: new QuestCategoryList(),
      loading: false,
      searchValue: '',
    }
  },
  computed: {
    filteredItems () {
      return this.categoryList.list.filter(item => !item.title || item.title.includes(this.searchValue))
    },
    iconPicker () {
      return () => {
        return {
          icon: 'mdi-card-text',
          color: 'grey'
        }
      }
    }
  },

  created() {
    this.loading = true
    const loadCategoriesPromise = this.loadCategories()

    Promise.all([loadCategoriesPromise])
        .then(() => {
          this.loading = false
        })
  },
  methods: {
    update (item) {
      item.editMode = false
      item.title = item.title.trim()
      item.apply()
      axios.put(API_ADDRESS.questionCategory.update(item.id), item)
        .then(response => {
          item = new QuestCategory(response.data.data)
        })
    },
    create (item) {
      item.editable = false
      item.title = item.title.trim()
      axios.post(API_ADDRESS.questionCategory.base, item)
        .then(response => {
          this.deleteItem(item)
          this.categoryList.list.unshift(new QuestCategory(response.data.data))
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
    deleteItem (category) {
      this.categoryList.list.forEach((item, index) => {
        if (item === category) {
          this.categoryList.list.splice(index, 1)
        }
      })
    },
    addCategory () {
      this.categoryList.list.unshift(new QuestCategory({
        editable: true,
        title: ''
      }))
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
.category-editor .v-text-field__details {
  display: none;
}

.category-editor .v-input__slot {
  margin-bottom: 0 !important;
}
</style>
