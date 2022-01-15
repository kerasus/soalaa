<template>
  <div class="category-body">
    <q-card>
      <q-toolbar class="bg-light-blue text-white shadow-5 category-toolbar">
        <q-toolbar-title>
          لیست دفترچه ها
        </q-toolbar-title>
        <q-input
          v-model="searchValue"
          class="search-input"
          color="grey-3"
          outlined
          rounded
          :input-style="{outlineColor: '#111'}"
        >
          <template v-slot:prepend>
            <q-icon
              name="mdi-magnify"
              color="white"
            />
          </template>
        </q-input>
        <q-btn
          class="add-button"
          flat
          round
          dense
          icon="mdi-plus"
          @click="addCategory"
        />
      </q-toolbar>
      <q-list>
        <q-item
          v-for="(item, index) in filteredItems"
          :key="index"
        >
          <q-item-section avatar>
            <q-avatar
              color="grey"
              text-color="white"
              icon="mdi-card-text"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label
              v-if="!item.editable && !item.editMode"
              class="category-input"
            >
              {{item.title}}
            </q-item-label>
            <q-input
              v-else-if="item.editable && !item.editMode"
              v-model="item.title"
              class="category-input"
              color="grey-3"
              outlined
              rounded
            />
            <q-input
              v-else-if="!item.editable && item.editMode"
              v-model="item.title_buffer"
              class="category-input"
              color="grey-3"
              outlined
              rounded
            />
          </q-item-section>
          <q-item-section side>
            <div class="text-grey-8 q-gutter-xs">
              <div v-if="!item.editable && !item.editMode">
                <q-btn
                  class="gt-xs text-light-blue"
                  flat
                  dense
                  round
                  icon="mdi-pencil-circle-outline"
                  @click="editMode(item)"
                />
              </div>
              <div v-else-if="item.editable && !item.editMode">
                <q-btn
                  class="gt-xs text-green"
                  flat
                  dense
                  round
                  icon="mdi-check-circle-outline"
                  @click="create(item)"
                />
                <q-btn
                  class="gt-xs text-red"
                  flat
                  dense
                  round
                  icon="mdi-close-circle-outline"
                  @click="deleteItem(item)"
                />
              </div>
              <div v-else-if="!item.editable && item.editMode">
                <q-btn
                  class="gt-xs text-green"
                  flat
                  dense
                  round
                  icon="mdi-check-circle-outline"
                  @click="update(item)"
                />
                <q-btn
                  class="gt-xs text-red"
                  flat
                  dense
                  round
                  icon="mdi-close-circle-outline"
                  @click="cancelEdit(item)"
                />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
import { QuestCategory, QuestCategoryList } from 'src/models/QuestCategory'
import API_ADDRESS from 'src/api/Addresses'
export default {
  name: 'categoryList',
  data () {
    return {
      categoryList: new QuestCategoryList(),
      loading: false,
      searchValue: ''
    }
  },
  created () {
    this.loading = true
    const loadCategoriesPromise = this.loadCategories()
    Promise.all([loadCategoriesPromise])
      .then(() => {
        this.loading = false
      })
  },
  computed: {
    filteredItems () {
      return this.categoryList.list.filter(item => !item.title || item.title.includes(this.searchValue))
    }
  },
  watch: {
    loading () {
      if (this.loading) {
        this.$store.dispatch('loading/overlayLoading', true)
      } else {
        this.$store.dispatch('loading/overlayLoading', false)
      }
    }
  },
  methods: {
    update (item) {
      item.editMode = false
      item.title = item.title.trim()
      item.apply()
      this.$axios.put(API_ADDRESS.questionCategory.update(item.id), item)
        .then(response => {
          item = new QuestCategory(response.data.data)
        })
    },
    create (item) {
      item.editable = false
      item.title = item.title.trim()
      this.$axios.post(API_ADDRESS.questionCategory.base, item)
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
      const that = this
      return new Promise(function (resolve, reject) {
        that.$axios.get(API_ADDRESS.questionCategory.base)
          .then((response) => {
            that.categoryList = new QuestCategoryList(response.data.data)
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

<style lang="scss" scoped>
.category-body {
  width: 100%;
  max-width: 800px;
  margin: auto;
  padding: 12px;

  .category-toolbar {
    height: 65px;
    .search-input {
      max-width: 200px;
    }
    .add-button{
      height: 48px;
      width: 48px;
      margin-left: 12px;
    }
  }
  .category-input {
    max-width: 250px;
    font-size: 16px;
  }
  .q-card{
    padding-bottom: 8px;
  }
  .q-card > div:first-child {
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12) !important;
  }
  .q-item{
    height: 72px;
  }
}
</style>
<style lang="scss">
.category-body {
  .category-toolbar {
    .q-field__control {
      height: 40px !important;
      box-sizing: border-box;
      .q-field__prepend{
        &.q-field__marginal{
          height: 40px !important;
        }
      }
    }
  }
}
</style>
