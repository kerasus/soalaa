 <template>
  <div >
    <q-card class="custom-card q-pa-none">
      <div class="filter-card-container">
        <div class="filter-header">
          <q-card-section class="header-title-container q-pa-none">
            <div class="header-title">
              فیلترهای اعمال شده
            </div>
          </q-card-section>
          <q-card-actions class="delete-all-container q-pa-none">
            <q-btn
              flat
              rounded
              color="primary"
              @click="deleteAllFilters"
              label="حذف همه"
            />
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
    <div
      class="filter-options-section"
    >
      <question-filter-option-mobile
      header-title="درس و مبحث"
      >
        <tree
          ref="tree"
          tick-strategy="strict"
          :get-node-by-id="getNodeById"
        />
      </question-filter-option-mobile>
      <question-filter-option-mobile
      header-title="نوع سوال"
      >
        <tree
          ref="tree"
          tick-strategy="strict"
          :get-node-by-id="getNodeById"
        />
      </question-filter-option-mobile>
      <question-filter-option-mobile
      header-title="سختی سوال"
      >
        <tree
          ref="tree1"
          tick-strategy="strict"
          :get-node-by-id="getNodeById"
        />
      </question-filter-option-mobile>
      <question-filter-option-mobile
      header-title="تاریخ تالیف"
      >
        <div class="q-pa-md">
          salam
        </div>
      </question-filter-option-mobile>
    </div>
  </div>
 </template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'components/Tree/Tree'
import QuestionFilterOptionMobile from 'components/Question/QuestionBank/QuestionFilterOptionMobile'

export default {
  name: 'QuestionBankFilter',
  data () {
    return {
      filters: ['درس و مبحث', 'نوع سوال', 'متنی', 'تاریخ تالیف'],
      filterOptions: ['درس و مبحث', 'نوع سوال', 'طراح سوال', 'تاریخ تالیف']
    }
  },
  mixins: [mixinTree],
  components: { QuestionFilterOptionMobile, Tree },
  created () {
    this.showTree('tree', this.getRootNode('test'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
    this.showTree('tree1', this.getRootNode('test'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    tickedData (value) {
      this.filters = value
      console.log('ticked', value)
      this.testArr = []
      value.forEach(val => {
        this.testArr.push(val.id)
      })
    },
    deleteFilterObject (item) {
      this.$emit('deleteFilter', item)
    }
  }
}
</script>
<style lang="scss" scoped>

.filter-card-container {
  padding: 20px 26px 24px 24px;
  margin-bottom: 24px;
  .filter-header {
    padding-bottom: 11px;
    display: flex;
    justify-content: space-between;

    .delete-all-container {
      &:deep(.q-btn){
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 21px;
        padding: 0;
      }
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

@media only screen and (max-width: 1919px) {
  .filter-card-container {
    padding: 20px 16px 24px 24px;
  }
  .filter-header{
    .delete-all-container{

    }
    .header-title-container{
      .header-title{
        width: 135px;
        height: 28px;

      }
    }
  }
}
@media only screen and (max-width: 1439px) {
  .filter-card-container {
    padding: 16px 16px 14px 14px !important;

    .filter-header {
      .delete-all-container {
        &:deep(.q-btn){
          height: 32px;
          width: 68px;
        }
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .filter-card-container {
    padding: 16px !important;
  }
  .filter-options-section {
    display: none;
  }
}

@media only screen and (max-width: 599px) {
  .filter-card-container {
    padding: 20px 16px 24px 16px !important;
  }
}
</style>
