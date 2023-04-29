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
                          :disable="!doesHigherLayerHaveValue || layer.disable"
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
                       @click="removeAllNodes" />
              </div>
              <div class="tree-chips-box">
                <div v-if="getGlobalStorageSelectedNodes.length > 0">
                  <q-chip v-for="item in getGlobalStorageSelectedNodes"
                          :key="item"
                          class="tree-chips"
                          icon-remove="mdi-close"
                          removable
                          @remove="removeNode(item)">
                    {{ item.title }}
                  </q-chip>
                </div>
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
import { TreeNodeList } from 'src/models/TreeNode.js'

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
    layersConfig: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    persistent: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  emits: [
    'update:dialogValue',
    'update:subjectsField',
    'update:layersConfig',
    'update:selectedNodesList'
  ],
  data () {
    return {
      dialogLoading: false,
      lowestLayerNode: '',
      highestLayerNode: '',
      selectedNodesIDs: [],
      lowestLayerNodeList: [],
      currentTreeNode: [],
      lastTreeNodes: [],
      treeKey: 0,
      areNodesSynced: false,
      highestLayerNodeList: [],
      globalStorage: {}
    }
  },
  computed: {
    getGlobalStorageSelectedNodes () {
      const nodes = []
      Object.entries(this.globalStorage).forEach(([parentKey]) => {
        Object.entries(this.globalStorage[parentKey]).forEach(([childKey, childValue]) => {
          nodes.push(...childValue.nodes)
        })
      })
      if (nodes.length === 0) {
        return this.selectedNodesList
      }
      return nodes
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
    layersList: {
      get () {
        return this.layersConfig
      },
      set (value) {
        this.$emit('update:layersConfig', value)
      }
    },
    selectedNodesArray: {
      get () {
        return this.selectedNodesList
      },
      set (value) {
        this.$emit('update:selectedNodesList', value)
      }
    },
    currentLocalStorage: {
      get () {
        console.log('currentLocalStorage', this.currentLocalStorage)
        console.log('secondLowestLayer', this.secondLowestLayer.selectedValue.id)
        console.log('lowestLayer', this.lowestLayer.selectedValue.id)
        return this.globalStorage[this.secondLowestLayer
          ?.selectedValue?.id][this.lowestLayer
          ?.selectedValue?.id]
      },
      set (value) {
        this.globalStorage[this.secondLowestLayer
          ?.selectedValue?.id][this.lowestLayer
          ?.selectedValue?.id].nodes = value
      }
    },
    getSelectedNodesIds() {
      return this.selectedNodesArray.map(item => item.id)
    },
    lowestLayer() {
      return this.layersList[this.layersList.length - 1]
    },
    secondLowestLayer() {
      return this.layersList[this.layersList.length - 2]
    }
  },
  watch: {
    modal (newVal) {
      if (!newVal) {
        this.onModalClosed()
      }
    },
    lowestLayerNode (newVal) {
      if (newVal && this.singleHighestLayerOnly) {
        this.removeAllNodes()
      }
    },
    layersList: {
      handler(newVal) {
        this.$emit('update:layersConfig', newVal)
      },
      deep: true
    },
    globalStorage: {
      handler(newVal) {
        // Object.entries(newVal).forEach(([parentKey]) => {
        //   Object.entries(newVal[parentKey]).forEach(([childKey, childValue]) => {
        //     this.selectedNodesArray.push(...childValue.nodes)
        //   })
        // })
      },
      deep: true
    }
  },
  created () {},
  async mounted () {
    await this.initLayers()
    this.initGlobalStorage()
    this.initLocalStorage()
    this.fillGlobalStorage(this.selectedNodesArray)
  },
  updated () {},
  methods: {
    async initLayers() {
      this.defineLayersEmits(this.layersConfig.map((item) => item.name))
      await this.initInitialLayer()
    },
    defineLayersEmits (layerEmitNamesList) {
      layerEmitNamesList.forEach(layerName => {
        Object.assign(this._.emitsOptions, {
          [layerName + 'nodeSelected']: null
        })
      })
    },
    onModalClosed () {
      this.finalizeOutputData()
      this.layersList[this.layersList.length - 1].selectedValue = ''
    },
    finalizeOutputData () {
      this.selectedNodesArray = this.getTheLastSelectedNode(this.selectedNodesArray)
    },
    initGlobalStorage () {
      const secondLowestLayer = this.secondLowestLayer
      secondLowestLayer.nodeList.forEach(upperNode => {
        Object.assign(this.globalStorage, {
          [upperNode.id]: {}
        })
      })
    },
    initLocalStorage() {
      if (this.globalStorage[this.secondLowestLayer.selectedValue.id]) {
        this.lowestLayer.nodeList.forEach(innerNode => {
          if (this.globalStorage[this.secondLowestLayer.selectedValue.id][innerNode.id]?.nodes?.length > 0) {
            return
          }
          Object.assign(this.globalStorage[this.secondLowestLayer.selectedValue.id], {
            [innerNode.id]: {
              nodes: []
            }
          })
        })
      }
      console.log('globalStorage', this.globalStorage)
    },
    fillGlobalStorage(nodesToFillInStorage = []) {
      Object.entries(this.globalStorage).forEach(([parentKey]) => {
        // const nodesWithThisParent = nodesToFillInStorage
        //   .filter(node => !!node.ancestors.find(parent => parent.id === (parentKey)))
        //   .forEach(node => {
        //     const parentIndex = node.ancestors.findIndex(parent => parent.id === (parentKey))
        //     this.globalStorage[node.ancestors[parentIndex]][node.ancestors[parentIndex + 1]] = {
        //       nodes :
        //     }
        //   })
        // nodesWithGlobalStorageParent.forEach(item => {
        //   // item
        //   console.log('item', item)
        // })
        // Object.entries(this.globalStorage[parentKey]).forEach(([childKey]) => {
        //   const nodesInThisLayer = nodesToFillInStorage
        //     .filter(node => !!node.ancestors.find(parent => parent.id === (childKey)))
        //   this.globalStorage[parentKey][childKey].nodes = nodesInThisLayer
        // })
      })
      console.log('fillGlobalStorage', this.globalStorage)
    },
    async initInitialLayer() {
      if (this.layersConfig.length === 0) {
        return
      }
      await this.setLayerList(this.layersConfig[0].routeNameToGetNode)
    },
    setLayerList (layerRoute, layerIndex = 0) {
      this.dialogLoading = true
      return new Promise((resolve, reject) => {
        this.$axios.get(layerRoute)
          .then((response) => {
            this.layersList[layerIndex].nodeList = response.data.data.children
            this.dialogLoading = false
            resolve()
          }).catch(() => {
            reject()
            this.dialogLoading = false
          })
      })
    },
    updateNodes (values) {
      this.currentLocalStorage = values
      this.selectedNodesArray.push(...values
        .filter(node => this.selectedNodesArray
          .findIndex(item => item.id === node.id) === -1))
    },
    updateGlobalStorage() {
      this.fillGlobalStorage(this.selectedNodesArray)
    },
    removeNode (item) {
      const node = item.id ? item : { id: item }
      if (this.currentLocalStorage?.nodes.find(item => item.id === node.id)) {
        this.setTickedMode('tree', node.id, false)
      }
      const nodeIndex = this.selectedNodesArray.findIndex(item => item.id === node.id)
      if (nodeIndex > -1) {
        this.selectedNodesArray.splice(nodeIndex, 1)
      }
      this.updateGlobalStorage()
    },
    removeAllNodes () {
      this.setTickedMode('tree', this.getSelectedNodesIds, false)
      this.selectedNodesArray.splice(0, this.selectedNodesArray.length)
      if (this.lowestLayer.selectedValue.id &&
        this.secondLowestLayer.selectedValue.id) {
        this.updateGlobalStorage()
      }
    },
    getLayerIndex (layer) {
      return this.layersList.findIndex(item => item.name === layer.name)
    },
    layerNodeSelected (layer, layerIndex) {
      this.$emit(layer.name + 'nodeSelected', layer.selectedValue)
      if (!this.layersList[layerIndex + 1]) {
        this.initLocalStorage()
        this.showTreeModalNode(layer.selectedValue.id)
        return
      }
      this.treeKey += 1
      this.updateGlobalStorage()
      this.layersList[layerIndex + 1].selectedValue = ''
      this.setLayerList(this.getLayerRoute(this.layersConfig[layerIndex + 1], layer.selectedValue.id), layerIndex + 1)
    },
    getLayerRoute(layer, layerId) {
      return typeof layer.routeNameToGetNode === 'function'
        ? layer.routeNameToGetNode(layerId)
        : layer.routeNameToGetNode
    },
    showTreeModalNode (layerId) {
      this.dialogLoading = true
      this.showTree('tree', this.getNode(layerId))
        .then(() => {
          this.syncAllCheckedIds()
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    syncAllCheckedIds () {
      const selectedNodesIds = this.currentLocalStorage?.nodes?.map(item => item.id) || []
      if (selectedNodesIds.length > 0) {
        this.$refs.tree.setNodesTicked(selectedNodesIds, true)
      }
    },
    getUniqueListBy (arr, key) {
      return [...new Map(arr.map(item => [item[key], item])).values()]
    },
    getTheLastSelectedNode (arrayOfNodes) {
      const foundedNodes = []
      let cleaned = []
      arrayOfNodes.forEach((selectedNode) => {
        selectedNode.ancestors.forEach((parentNode) => {
          if (arrayOfNodes.find(item => item.id === parentNode.id)) {
            foundedNodes.push(parentNode)
          }
        })
      })
      cleaned = this.getUniqueListBy(foundedNodes, 'id')
      return arrayOfNodes.filter((selectedNode) => {
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
        padding-left: 2px;
        padding-right: 2px;
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
