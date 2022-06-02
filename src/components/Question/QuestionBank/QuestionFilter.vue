<template>
  <div>
    <q-card class="custom-card q-pa-none">
      <div class="filter-card-container">
        <div class="filter-header">
          <q-card-section class="header-title-container q-pa-none">
            <div class="header-title">
              فیلترهای اعمال شده
            </div>
          </q-card-section>
          <q-card-actions class="delete-all-container q-pa-none">
            <q-btn flat rounded color="primary" @click="deleteAllFilters">
              حذف همه
            </q-btn>
          </q-card-actions>
        </div>
        <div>
          <q-card-actions class="filter-container q-pa-none">
            <q-chip
              v-for="item in filters"
              :key="item"
              class="filter-items"
              icon-remove="mdi-close"
              removable
              @remove="deleteFilterObject(item)"
            >
              {{ item }}
            </q-chip>
          </q-card-actions>
        </div>
      </div>
    </q-card>
    <div class="filter-options-section"
         v-for="item in filterOptions" :key="item">
      <q-card class="custom-card q-pa-none">
        <q-card-section class="q-pa-none">
          <q-expansion-item
            expand-icon="isax:arrow-down-1"
          >
              <template v-slot:header>
                <div class="filter-option-container " >
                <div class="filter-option-title">
                  {{ item }}
                </div>
                </div>
              </template>
            <tree
              @ticked="tickedData"
              ref="tree"
              tick-strategy="strict"
              :get-node-by-id="getNodeById"
            />
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'components/Tree/Tree'

export default {
  name: 'QuestionBankFilter',
  data () {
    return {
      filtersData: {
        tags: []
      },
      filters: ['درس و مبحث', 'نوع سوال', 'طراح سوال', 'تاریخ تالیف'],
      filterOptions: ['درس و مبحث', 'نوع سوال', 'طراح سوال', 'تاریخ تالیف']
    }
  },
  mixins: [mixinTree],
  components: { Tree },
  created () {
    this.showTree('tree', this.getRootNode('test'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    tickedData (value) {
      this.filters = value
      this.testArr = []
      this.filtersData.tags = []
      value.forEach(val => {
        this.testArr.push(val.id)
        this.filtersData.tags.push(val)
      })
    },
    deleteFilterObject (item) {
      this.$emit('deleteFilter', item)
    },
    getFilters () {
      return this.filtersData
    }
  }
}
</script>
<style lang="scss" scoped>

.filter-card-container {
  padding: 20px 23px 16px 24px;
  margin-bottom: 24px;
  .filter-header {
    padding-bottom: 11px;
    display: flex;
    justify-content: space-between;

    .delete-all-container {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
      position: relative;
      top: -5px;
    }

    .header-title-container {
      .header-title {
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 28px;
        color: #23263B;
      }
    }
  }
  .filter-container{
    .filter-items {
      margin-right: 4px;
      margin-bottom: 4px;
      display: flex;
    }
  }

}
.filter-options-section {
  margin-bottom: 16px;

  .filter-option-container {
    width: 500px;
    display: flex;
    padding: 20px 24px 20px 24px;
    justify-content: space-between;

    .filter-option-title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #23263B;
    }

    .filter-option-drop-down-btn {
      position: relative;
      top: -3px;
    }
  }
}

@media only screen and (max-width: 1439px) {
  .filter-card-container {
    padding: 16px 16px 8px 16px !important;

    .filter-header {
      .delete-all-container {
        width: 90px;
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .filter-card-container {
    padding: 16px 0 8px 16px !important;
  }
  .filter-options-section {
    display: none;
  }
}

@media only screen and (max-width: 599px) {
  .filter-card-container {
    padding: 20px 0 16px 16px !important;
  }
}
</style>

<style lang="scss">
.filter-options-section {
  .q-expansion-item__container{
    .q-focus-helper{
      background: none !important;
    }
  }
}
</style>
