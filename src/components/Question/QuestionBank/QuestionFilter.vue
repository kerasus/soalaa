<template>
  <div>
    <q-card v-if="!mobileMode"
            class="custom-card q-pa-none">
      <div class="filter-card-container">
        <div class="filter-header">
          <q-card-section class="header-title-container q-pa-none">
            <div class="header-title">
              فیلترهای اعمال شده
            </div>
          </q-card-section>
          <q-card-actions class="delete-all-container q-pa-none">
            <q-btn flat
                   rounded
                   color="primary"
                   class="delete-all"
                   @click="deleteAllFilters">
              حذف همه
            </q-btn>
          </q-card-actions>
        </div>
        <div>
          <q-card-actions class="filter-container q-pa-none">
            <q-chip
              v-for="(filter, index) in selectedFilters"
              :key="index"
              v-model="selectedFilters[index]"
              class="filter-items"
              removable
              @remove="deleteFilterObject(filter)"
            >
              {{ getFilterTitle(filter.value) }}
            </q-chip>
          </q-card-actions>
        </div>
      </div>
    </q-card>
    <div class="filter-options-section"
         :class="{'filter-options-desktop': !mobileMode}">
      <question-filter-expansion
        header-title="درس و مبحث"
      >
        <q-checkbox
          v-if="availableSearchSingleNode"
          v-model="searchSingleNode"
          class="q-ml-md"
          right-label
          label="جستجوی تک گره"
          @update:model-value="onSearchSingleNode"
        />
        <tree-component
          ref="tree"
          :key="treeKey"
          tick-strategy="strict"
          :get-node-by-id="getNodeById"
          @ticked="tickedData"
          @lazy-loaded="getExpandedTree"
        />
      </question-filter-expansion>
      <!--      header-title="مرجع"-->
      <question-filter-expansion
        header-title="مرجع سوال"
        :loading="localLoadings.optionsLoading"
      >
        <q-option-group
          v-model="selectedReference"
          type="checkbox"
          :options="filterQuestions.reference_type.map(option => {
            return {
              label: option.value,
              value: option
            }
          })"
          @update:model-value="onChangeReference"
        />
        <div v-if="filterQuestions.reference_type.length === 0"> هیچ مرجعی ایجاد نشده است</div>
      </question-filter-expansion>

      <question-filter-expansion
        header-title="سال انتشار"
        :loading="localLoadings.optionsLoading"
      >
        <q-option-group
          v-model="selectedYears"
          type="checkbox"
          :options="filterQuestions.year_type.map(option => {
            return {
              label: option.value,
              value: option
            }
          })"
          @update:model-value="onChangeYears"
        />
        <div v-if="filterQuestions.year_type.length === 0"> هیچ سال انتشاری ایجاد نشده است</div>
      </question-filter-expansion>

      <question-filter-expansion
        v-if="showMajorList"
        header-title="رشته تحصیلی"
        :loading="localLoadings.optionsLoading"
      >
        <q-option-group
          v-model="selectedMajors"
          type="checkbox"
          :options="filterQuestions.major_type.map(option => {
            return {
              label: option.value,
              value: option
            }
          })"
          @update:model-value="onChangeMajors"
        />
        <div v-if="filterQuestions.major_type.length === 0"> هیچ رشته تحصیلی ایجاد نشده است</div>

      </question-filter-expansion>

      <question-filter-expansion
        header-title="درجه سختی"
        :loading="localLoadings.levelTypeLoading"
      >
        <q-option-group
          v-model="selectedLevels"
          type="checkbox"
          :options="filterQuestions.level_type.map(option => {
            return {
              label: option.trans,
              value: option
            }
          })"
          @update:model-value="onChangeLevels"
        />
        <div v-if="filterQuestions.level_type.length === 0"> هیچ درجه سختی ایجاد نشده است</div>

      </question-filter-expansion>

      <question-filter-expansion
        v-if="filterQuestions.statuses"
        header-title="وضعیت سوال"
        :loading="localLoadings.statusLoading"
      >
        <q-option-group
          v-model="selectedStatuses"
          type="checkbox"
          :options="filterQuestions.statuses.map(option => {
            return {
              label: option.display_title,
              value: option
            }
          })"
          @update:model-value="onChangeStatuses"
        />
        <div v-if="filterQuestions.statuses.length === 0"> هیچ درجه سختی ایجاد نشده است</div>

      </question-filter-expansion>

      <question-filter-expansion
        v-if="filterQuestions.types"
        header-title="نوع سوال"
        :loading="localLoadings.optionsLoading"
      >
        <q-option-group
          v-model="type_id"
          :options="singleModeFilterOptions('types', 'value')"
          @update:model-value="onChangeTypes"
        />
        <div v-if="filterQuestions.types.length === 0"> هیچ نوع سوالی ایجاد نشده است</div>

      </question-filter-expansion>

      <question-filter-expansion
        v-if="filterQuestions.report_type"
        header-title="نوع خطا"
        :loading="localLoadings.optionsLoading"
      >
        <q-option-group
          v-model="selectedReportType"
          :options="singleModeFilterOptions('report_type', 'value')"
          @update:model-value="onChangeReportTypes"
        />
        <div v-if="filterQuestions.report_type.length === 0"> هیچ نوع خطایی ایجاد نشده است</div>

      </question-filter-expansion>

      <question-filter-expansion
        v-if="filterQuestions.report_status"
        header-title="وضعیت خطا"
        :loading="localLoadings.reportStatusLoading"
      >
        <q-option-group
          v-model="report_status"
          :options="singleModeFilterOptions('report_status', 'description')"
          @update:model-value="onChangeErrorStatus"
        />
        <div v-if="filterQuestions.report_status.length === 0"> هیچ نوع وضعیت خطایی ایجاد نشده است</div>

      </question-filter-expansion>

    </div>
  </div>
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import TreeComponent from 'components/Tree/Tree'
import QuestionFilterExpansion from 'components/Question/QuestionBank/QuestionFilterExpansion'

export default {
  name: 'QuestionBankFilter',
  components: { QuestionFilterExpansion, TreeComponent },
  mixins: [mixinTree],
  props: {
    mobileMode: {
      type: Boolean,
      default: false
    },
    loadings: {
      type: Object,
      default() {
        return {
          optionsLoading: false,
          levelTypeLoading: false,
          statusLoading: false,
          reportStatusLoading: false
        }
      }
    },
    availableSearchSingleNode: {
      type: Boolean,
      default: true
    },
    filterQuestions: {
      type: Object,
      default: () => {
        return {
          reference_type: null
        }
      }
    },
    rootNodeIdToLoad: {
      type: String,
      default: () => {
        return ''
      }
    },
    nodeIdsToTick: {
      type: Array,
      default: () => {
        return []
      }
    },
    initialLoadMode: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    showMajorList: {
      type: Boolean,
      default: () => {
        return true
      }
    }
  },
  emits: [
    'onFilter',
    'tagsChanged',
    'deleteFilter'
  ],
  data () {
    return {
      defaultLoadings: {
        optionsLoading: false,
        levelTypeLoading: false,
        statusLoading: false,
        reportStatusLoading: false
      },
      treeKey: 0,
      searchSingleNode: false,
      check: false,
      selectedReference: [],
      selectedYears: [],
      selectedMajors: [],
      selectedLevels: [],
      type_id: {},
      selectedReportType: {},
      report_status: {},
      selectedTags: [],
      selectedStatuses: [],
      selectedFilters: [],
      filtersData: {
        tags: [],
        reference: [],
        majors: [],
        level_type: [],
        years: [],
        type_id: '',
        report_type: '',
        statuses: [],
        question_report_type: '',
        report_status: '',
        tags_with_childrens: 1
      }
    }
  },
  watch: {
    'selectedQuestions.length': {
      handler(newValue, oldValue) {
        this.exam.questions.list = []
        this.exam.questions.list = this.selectedQuestions
        this.questionListKey = Date.now()
      }
    },
    rootNodeIdToLoad: {
      deep: true,
      handler(newVal) {
        this.showTreeModalNode(newVal)
      }
    }
  },
  computed: {
    localLoadings() {
      return Object.assign(this.defaultLoadings, this.loadings)
    }
  },
  created () {
    if (this.initialLoadMode) {
      this.showTreeModalNode(this.rootNodeIdToLoad)
    }
  },
  methods: {
    updateSelectedFiltersObject (filterType) {
      const filtersDataKey = Object.keys(this.filtersData)
      const filters = []
      filtersDataKey.forEach(key => {
        const filterGroup = this.filtersData[key]
        if (Array.isArray(filterGroup) && filterGroup) {
          filterGroup.forEach(filterItem => {
            filters.push({ value: filterItem, type: filterType })
          })
        } else if (typeof filterGroup === 'object') {
          filters.push({ value: filterGroup, type: filterType })
        } else if (typeof filterGroup === 'number' && !filterGroup) {
          filters.push({ value: filterGroup, type: filterType })
        }
      })
      this.selectedFilters = filters
    },
    getFilterTitle(filter) {
      if (typeof filter === 'number') {
        if (!filter) {
          return 'جستجوی تک گره'
        }
      } else {
        return filter.display_title || filter.description || filter.title || filter.value || filter.trans || filter
      }
    },
    singleModeFilterOptions(filterKey, labelKey) {
      const options = this.filterQuestions[filterKey].map(option => {
        return {
          label: option[labelKey],
          value: option
        }
      })
      const noneOption = {
        label: 'هیچکدام',
        value: ''
      }
      options.push(noneOption)
      return options
    },
    setNodesTicked (nodeIds) {
      this.$refs.tree.setNodesTicked(nodeIds, true)
    },
    getExpandedTree(tree) {
      const currentTreeNodeIds = tree.map(node => node.id)
      const availableIdsToTick = []
      this.nodeIdsToTick.forEach(idToTick => {
        const foundedIds = currentTreeNodeIds.filter(key => key === idToTick)
        availableIdsToTick.push(...foundedIds)
      })
      if (availableIdsToTick.length > 0) {
        this.setNodesTicked(availableIdsToTick)
      }
    },
    showTreeModalNode (NodeId) {
      const nodeToLoadTreeFrom = NodeId ? this.getNode(NodeId) : this.getRootNode('test')
      this.treeKey += 1
      this.showTree('tree', nodeToLoadTreeFrom)
        .then(() => {
        })
    },
    getFilters () {
      return this.filtersData
    },
    onUpdateFilterData () {
      this.$emit('onFilter', this.filtersData)
    },
    changeFilterData (key, value) {
      this.filtersData[key] = value
      this.updateSelectedFiltersObject(key)
      this.onUpdateFilterData()
      if (this.mobileMode) {
        this.$emit('updateSelectedFilters', key, value)
      }
    },
    onChangeReference (value) {
      this.changeFilterData('reference', value)
    },
    onChangeLevels (value) {
      this.changeFilterData('level_type', value)
    },
    onChangeYears (value) {
      this.changeFilterData('years', value)
    },
    onChangeMajors (value) {
      this.changeFilterData('majors', value)
    },
    onChangeStatuses(value) {
      this.changeFilterData('statuses', value)
    },
    onChangeTypes (value) {
      this.changeFilterData('type_id', value)
    },
    onChangeReportTypes (value) {
      this.changeFilterData('question_report_type', value)
    },
    onChangeErrorStatus(value) {
      this.changeFilterData('report_status', value)
    },
    onSearchSingleNode(value) {
      const sendData = value ? 0 : 1
      this.changeFilterData('tags_with_childrens', sendData)
    },
    tickedData (value) {
      this.changeFilterData('tags', value)
    },
    deleteFilterObject (filterObj) {
      if (Array.isArray(this.filtersData[filterObj.type])) {
        let index = null
        if (filterObj.type === 'level_type') {
          index = this.filtersData[filterObj.type].findIndex(filter => filter.key === filterObj.value.key)
        } else if (filterObj.type === 'tags') {
          index = this.selectedFilters.findIndex(filter => filter.type === 'tags' && filter.value.id === filterObj.value.id)
        } else {
          index = this.filtersData[filterObj.type].findIndex(filter => filter.id === filterObj.value.id)
        }
        this.filtersData[filterObj.type].splice(index, 1)
        this.onUpdateFilterData()
      } else if (filterObj.type === 'tags_with_childrens') {
        this.searchSingleNode = false
        this.filtersData.tags_with_childrens = 0
        this.onUpdateFilterData()
      } else {
        this[filterObj.type] = ''
        this.filtersData[filterObj.type] = ''
        this.onUpdateFilterData()
      }
    },
    deleteAllFilters () {
      this.filtersData.tags.splice(0, this.filtersData.tags.length)
      this.filtersData.reference.splice(0, this.filtersData.reference.length)
      this.filtersData.level_type.splice(0, this.filtersData.level_type.length)
      this.filtersData.years.splice(0, this.filtersData.years.length)
      this.filtersData.majors.splice(0, this.filtersData.majors.length)
      this.filtersData.question_report_type = ''
      this.filtersData.type_id = ''
      this.filtersData.report_status = ''
      this.filtersData.statuses.splice(0, this.filtersData.statuses.length)
      this.showTreeModalNode(this.rootNodeIdToLoad)
      // this.QuestionFilters.splice(0, this.QuestionFilters.length)
      this.updateSelectedFiltersObject()
      this.onUpdateFilterData()
    }
  }
}
</script>
<style lang="scss" scoped>
.custom-card {
  border-radius: 16px;
  @media only screen and (max-width: 1023px) {
    border-radius: 12px !important;
  }
  @media only screen and (max-width: 599px) {
    border-radius: 8px !important;
  }
}
.filter-card-container {
  padding: 20px 23px 16px 24px;
  margin-bottom: 24px;

  .filter-header {
    padding-bottom: 11px;
    display: grid;
    grid-template-columns: auto 76px;
    @media only screen and (max-width: 1439px) {
      grid-template-columns: auto 68px;
    }

    .delete-all-container {
      font-style: normal;
      font-weight: normal;
      font-size: 12px;
      line-height: 21px;
      position: relative;
      top: -5px;
      .delete-all {
        padding: 0;
      }
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

  .filter-container {
    .filter-items {
      margin-right: 4px;
      margin-bottom: 4px;
      display: flex;
    }
  }

}

.filter-options-section {

  .filter-option-container {
    width: 500px;
    display: flex;
    //padding: 20px 24px 20px 24px;
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
    padding: 20px 16px !important;

    .filter-header {
      .delete-all-container {
        width: 90px;
      }
    }
  }
}

@media only screen and (max-width: 1023px) {
  .filter-card-container {
    padding: 20px 16px !important;
  }
  .filter-options-desktop {
    display: none;
  }
}

@media only screen and (max-width: 599px) {
  .filter-card-container {
    padding: 12px 16px !important;
  }
}
</style>

<style lang="scss">
.filter-options-section {
  .q-expansion-item__container {
    .q-focus-helper {
      background: none !important;
    }
  }
}
</style>
