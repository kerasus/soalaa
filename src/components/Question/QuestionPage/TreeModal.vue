<template>
  <q-dialog v-model="modal"
            :persistent="persistent">
    <q-card class="tree-card">
      <div class="fit row wrap tree-inner-container">
        <div class="choose-tree-box question-details col-6">
          <div class="details-container-2 default-details-container">
            <div class="detail-box-container row">
              <div v-for="(layer, index) in layersList"
                   :key="index"
                   class="col-12 col-md-6 detail-box">
                <div class="detail-box-title">{{layer.label}}</div>
                <q-select v-model="layer.selectedValue"
                          filled
                          dense
                          dropdown-icon="isax:arrow-down-1"
                          option-label="title"
                          :options="layer.nodeList"
                          :disable="!doesHigherLayerHaveValue"
                          @update:model-value="layerNodeSelected(layer, index)" />
              </div>
            </div>
            <div class="question-tree">
              <tree ref="tree"
                    :key="treeKey"
                    :no-nodes-label="'لطفا یک پایه و درس را انتخاب کنید'"
                    tick-strategy="strict"
                    :get-node-by-id="getNodeById"
                    @ticked="updateNodes"
                    @lazy-loaded="syncAllCheckedIds" />
            </div>
          </div>
        </div>
        <div class="tree-result-box question-details col-6 ">
          <div class="details-container-2 default-details-container ">
            <div class="detail-box"
                 style="padding-right:0;">
              <div class="box-btn-title flex justify-between">
                <div class="detail-box-title">انتخاب ها</div>
                <q-btn class="delete-all-btn"
                       flat
                       label="حذف همه"
                       color="primary"
                       @click="deleteAllNodes" />
              </div>
              <div class="tree-chips-box">
                <!--                <div v-if="getAllSubjects[0]">-->
                <!--                  <q-chip v-for="item in getAllSubjects"-->
                <!--                          :key="item"-->
                <!--                          class="tree-chips"-->
                <!--                          icon-remove="mdi-close"-->
                <!--                          removable-->
                <!--                          @remove="removeNode(item)">-->
                <!--                    {{ item.title }}-->
                <!--                  </q-chip>-->
                <!--                </div>-->
              </div>
            </div>
          </div>
          <div class="action-btn-box text-right">
            <slot name="tree-dialog-action-box">
              <q-btn v-close-popup
                     class="close-btn"
                     label="بستن"
                     color="primary"
                     :disable="persistent" />
            </slot>
          </div>
        </div>
      </div>
      <q-inner-loading :showing="dialogLoading"
                       dark />
    </q-card>
  </q-dialog>
</template>
<script>

import Tree from 'components/Tree/Tree.vue'
import mixinTree from 'src/mixin/Tree.js'
import { TreeNode, TreeNodeList } from 'src/models/TreeNode.js'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'TreeModal',
  components: {
    Tree
  },
  mixins: [
    mixinTree
  ],
  props: {
    dialogValue: {
      type: Boolean
    },
    selectedNodesList: {
      type: [Array, TreeNodeList],
      default () {
        return new TreeNodeList()
      }
    },
    singleHighestLayerOnly: {
      type: Boolean,
      default () {
        return false
      }
    },
    exchangeLowestLayerOnly: {
      type: Boolean,
      default () {
        return false
      }
    },
    initialLowestLayerNode: {
      type: [Object, TreeNode],
      default () {
        return new TreeNode()
      }
    },
    initialNodeList: {
      type: [Object, TreeNode],
      required: true,
      default () {
        return new TreeNode()
      }
    },
    persistent: {
      type: Boolean,
      default () {
        return false
      }
    },
    numberOfLayers: {
      type: Number,
      default () {
        return 2
      }
    }
  },
  emits: [
    'update:dialogValue',
    'update:subjectsField'
  ],
  data () {
    return {
      dialogLoading: false,
      lowestLayerNode: '',
      highestLayerNode: '',
      layersList: [],
      layersLabels: [
        'پایه تحصیلی',
        'نام درس'
      ],
      selectedNodesIDs: [],
      lowestLayerNodeList: [],
      currentTreeNode: [],
      lastTreeNodes: [],
      treeKey: 0,
      areNodesSynced: false,
      highestLayerNodeList: []
    }
  },
  computed: {
    getAllSubjects () {
      const fieldText = []
      if (Object.keys(this.chosenSubjects).length === 0) {
        return fieldText
      }

      for (const key in this.chosenSubjects) {
        if (this.chosenSubjects[key].nodes && this.chosenSubjects[key].nodes.length > 0) {
          this.chosenSubjects[key].nodes.forEach(val => {
            fieldText.push(val)
          })
        }
      }
      return fieldText
    },
    doesHigherLayerHaveValue () {
      return (layerIndex) => {
        if (layerIndex <= 0) {
          return true
        }
        return !!(this.layersList[layerIndex - 1].nodeList &&
          this.layersList[layerIndex - 1].selectedValue?.id)
      }
    },
    modal: {
      get () {
        return this.dialogValue
      },
      set (value) {
        this.$emit('update:dialogValue', value)
      }
    },
    // global scope (main storage)
    chosenSubjects: {
      get () {
        return this.subjectsField
      },
      set (value) {
        this.$emit('update:subjectsField', value)
      }
    }
  },
  watch: {
    modal (newVal) {
      this.updateChosenSubjects()
      if (!newVal) {
        this.lowestLayerNode = ''
      }
    },
    currentTreeNode (newVal) {
      if (newVal.length > 0) {
        this.updateChosenSubjects()
      }
    },
    lowestLayerNode (newVal) {
      if (newVal && this.onlyOneGradeMode) {
        this.deleteAllNodes()
      }
    },
    initialLowestLayerNode (newVal) {
      if (newVal.id) {
        this.lowestLayerNode = newVal
        // this.lowestLayerNodeSelected(newVal)
      }
    },
    initialNodeList () {
      this.initInitialLayer()
    }
  },
  created () {
    this.createNodesStorage()
  },
  mounted () {
    this.initLayers()
    this.initInitialLayer()
    // this.initInitialLesson()
  },
  updated () {},
  methods: {
    initLayers() {
      this.layersList = new Array(this.numberOfLayers)
        .fill(undefined, undefined, undefined)
        .map((item, index) => {
          return {
            name: 'layer' + (index + 1),
            selectedValue: new TreeNode(),
            nodeList: [],
            label: this.layersLabels[index]
          }
        })
      this.defineLayersEmits(this.layersList.map((item) => item.name))
    },
    defineLayersEmits (layerEmitNamesList) {
      layerEmitNamesList.forEach(layerName => {
        Object.assign(this._.emitsOptions, {
          [layerName + 'nodeSelected']: null
        })
      })
    },
    createNodesStorage () {

    },
    initInitialLesson() {
      // if (this.initialLowestLayerNode.id) {
      //   this.lowestLayerNode = this.initialLowestLayerNode
      //   this.lowestLayerNodeSelected(this.lowestLayerNode)
      // }
    },
    initInitialLayer() {
      console.log('this.layersList', this.layersList)
      if (this.layersList.length === 0) {
        return
      }
      this.layersList[0].nodeList = this.initialNodeList
    },
    setLayerList (layerId, layerIndex = 0) {
      this.dialogLoading = true
      this.$axios.get(API_ADDRESS.tree.getNodeById(layerId))
        .then((response) => {
          this.layersList[layerIndex].nodeList = response.data.data.children
          console.log('this.layersList', this.layersList)
          this.dialogLoading = false
        }).catch(() => {
          this.dialogLoading = false
        })
    },
    updateNodes (values) {
      console.log('updateNodes', values)
      this.nodesUpdatedFromTree = values
      // if nodes are synced with response don't update currentTreeNode
      if (!this.areNodesSynced) {
        this.currentTreeNode = values
      }
      this.selectedNodesIDs = values.map(item => item.id)
    },
    removeNode (item) {
      const node = item.id ? item : { id: item }
      if (this.nodesUpdatedFromTree.find(item => item.id === node.id)) {
        this.setTickedMode('tree', node.id, false)
      }
      this.removeNodeFromChosenSubjects(node)
      this.updateChosenSubjects()
    },
    removeAllNodes () {
      this.setTickedMode('tree', this.selectedNodesIDs, false)
      this.chosenSubjects = {}
    },
    deleteAllNodes () {
      this.removeAllNodes()
    },
    removeNodeFromChosenSubjects (node) {
      for (const key in this.chosenSubjects) {
        this.chosenSubjects[key].nodes.forEach((value, index) => {
          if (value.id === node.id) {
            this.chosenSubjects[key].nodes.splice(index, 1)
          }
        })
      }
    },
    layerNodeSelected (layer, layerIndex) {
      this.$emit(layer.name + 'nodeSelected', layer.selectedValue)
      if (!this.layersList[layerIndex + 1]) {
        this.showTreeModalNode(layer.selectedValue.id)
        return
      }
      this.layersList[layerIndex + 1].selectedValue = ''
      this.setLayerList(layer.selectedValue.id, layerIndex + 1)
    },
    showTreeModalNode (layerId) {
      this.treeKey += 1
      this.dialogLoading = true
      this.showTree('tree', this.getNode(layerId))
        .then(() => {
          // this.syncAllCheckedIds()
          // this.selectWantedTree(this.lowestLayerNode)
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    selectWantedTree (lesson) {
      if (this.chosenSubjects[lesson.id] && this.chosenSubjects[lesson.id].nodes) {
        this.switchToSelectedTree(lesson.id)
        return
      }
      this.createNewDataTree(lesson.id)
    },
    createNewDataTree (lessonId) {
      this.chosenSubjects[lessonId] = {}
      this.chosenSubjects[lessonId].nodes = []
    },
    switchToSelectedTree (lessonId) {
      this.currentTreeNode = this.chosenSubjects[lessonId].nodes
    },
    updateChosenSubjects () {
      if (this.lowestLayerNode.id && this.chosenSubjects[this.lowestLayerNode.id]) {
        this.chosenSubjects[this.lowestLayerNode.id].nodes = this.currentTreeNode
      }
    },
    syncAllCheckedIds (syncedWithResponse) {
      if (syncedWithResponse) {
        this.areNodesSynced = true
      }
      if (this.lowestLayerNode && this.chosenSubjects[this.lowestLayerNode.id]) {
        const selectedNodesIds = this.chosenSubjects[this.lowestLayerNode.id].nodes.map(item => item.id)
        if (selectedNodesIds.length > 0) {
          this.$refs.tree.setNodesTicked(selectedNodesIds, true)
        }
        this.areNodesSynced = false
      }
    },
    getUniqueListBy (arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    },
    getTheLastSelectedNode () {
      const foundedNodes = []
      let cleaned = []
      this.allSubjectsFlat.forEach((selectedNode) => {
        selectedNode.ancestors.forEach((parentNode) => {
          if (this.allSubjectsFlat.find(item => item.id === parentNode.id)) {
            foundedNodes.push(parentNode)
          }
        })
      })
      cleaned = this.getUniqueListBy(foundedNodes, 'id')
      this.lastSelectedNodes = this.allSubjectsFlat.filter((selectedNode) => {
        return !(cleaned.find(item => item.id === selectedNode.id))
      })
    }
  }
}
</script>
<style scoped lang="scss">
.action-btn-box {
  padding-top: 20px;
  .close-btn {
    color: #FFFFFF;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    background: #9690E4;
    border-radius: 10px;
    width: 96px;
    height: 40px;
    margin: auto 0 auto auto;
  }
  @media screen and (max-width: 880px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.q-card {
  min-width: 830px;
  height: 580px;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 30px;
  width: 830px;
  @media screen and (max-width: 880px) {
    min-width: 350px;
    width: 350px;
    .tree-inner-container {
      display: flex;
      flex-direction: column;
      height: auto !important;
    }
  }
}
.question-details {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: right #{"/* rtl:ignore */"};
  color: #23263B;
  @media screen and (max-width: 880px) {
    width: 100%;
  }
  .tree-chips-box {
    height: 412px;
    max-width: 367px;
    background: #F4F5F6;
    border-radius: 10px;
    padding: 16px;
    overflow-x: scroll;
    .tree-chips {
      background: #FFFFFF;
      margin-right: 10px;
    }
  }
  .question-tree {
    height: 378px;
    overflow-x: scroll;
    margin-top: 10px;
  }
  .default-details-container {
    .detail-box {
      //margin-top: 10px;
      .detail-box-title, .delete-all-btn {
        margin-bottom: 5px;
      }
    }
  }
  .details-container-1 {
    .detail-box {
      padding-right: 12px #{"/* rtl:ignore */"};
      padding-left: 12px #{"/* rtl:ignore */"};
    }
    .detail-box-first {
      padding-right: 0 #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-left: 0 #{"/* rtl:ignore */"};
    }
  }
  .default-detail-btn {
    color: #65677F;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
  }
  .details-container-2 {
    .detail-box {
      .input-container {
        .input-box {
          width: 91%;
        }
        .icon-box {
          width: 40px;
          height: 40px;
          background: #FFFFFF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 16px  ;
          .question-details-subject-img {
            height: 24px;
            max-width: 24px;
          }
        }
      }
    }
    .detail-box-first {
      padding-right: 0 #{"/* rtl:ignore */"};
    }
    .detail-box-last {
      padding-right: 0 #{"/* rtl:ignore */"};
      width: 200px;
      //margin-right: 132px #{"/* rtl:ignore */"};
    }
    .detail-box-last-of-row {
      padding-left: 0 #{"/* rtl:ignore */"};
      margin-top: 43px;
      text-align: end;
      display: flex;
      align-items: center;
      justify-content: center;
      .draft-btn {
        background: #FFFFFF;
        margin-left: 16px #{"/* rtl:ignore */"};
        font-weight: normal;
        color: #23263B;
      }
      .save-btn {
        background: #9690E4;
        font-weight: 500;
        color: #FFFFFF;
      }
    }
  }
}
@media screen and (min-width: 881px) {
  .choose-tree-box {
    padding-right: 15px;
  }
  .tree-result-box {
    padding-left: 15px;
  }
}

.tree-card {
  .question-details {
    .default-details-container {
      .detail-box {
        margin-left: 2px;
        margin-right: 2px;
        :deep(.q-field) {
          background: #FFFFFF;
          border-radius: 10px;
          line-height: 24px;
          height: 40px;
          min-height: 40px;
          .q-field__marginal {
            height: 40px;
          }
          .q-field__inner {
            margin-top: 9px;
            padding-right: 0 !important;
            padding-left: 0 !important;
            .q-field__control {
              border-radius: 10px;
              min-height: 40px;
              color: #65677F;
              background-color: #f4f5f6;
              &::before {
                display: none;
              }
              &::after {
                display: none;
              }
            }
          }
        }
        :deep(.q-field--auto-height){
          .q-field__native {
            min-height: 40px;
            color: #65677F;
            //background-color: #f4f5f6;
            &.q-field__prefix &.q-field__suffix &.q-field__input {
              color: #65677F;
            }
          }
          .q-field__control {
            border-radius: 10px;
            min-height: 40px;
            color: #65677F;
            background-color: #f4f5f6;
            ::before {
              display: none;
            }
            ::after {
              display: none;
            }
          }
        }
      }
    }
  }
}
</style>
