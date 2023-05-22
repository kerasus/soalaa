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
                   class="detail-box"
                   :class="getDefaultLayerClassName(layer)"
              >
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
                    :no-nodes-label="noNodesLabel"
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
                <div v-if="globalStorage.length > 0">
                  <q-chip v-for="item in globalStorage"
                          :key="item"
                          class="tree-chips"
                          icon-remove="mdi-close"
                          removable
                          @remove="onChipRemoved(item)">
                    {{ item.title }}
                  </q-chip>
                </div>
              </div>
            </div>
          </div>
          <div class="action-btn-box text-right hide-in-mobile">
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
      <div class="action-btn-box text-right is-sticky show-in-mobile">
        <slot name="tree-dialog-action-box">
          <q-btn v-close-popup
                 class="close-btn"
                 label="بستن"
                 color="primary"
                 :disable="persistent" />
        </slot>
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
    initialNode: {
      type: [String, TreeNode],
      default () {
        return new TreeNode({})
      }
    },
    treeType: {
      type: [String],
      default: ''
    },
    selectedNodes: {
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
    exchangeLastLayerOnly: {
      type: Boolean,
      default () {
        return false
      }
    },
    layersConfig: {
      type: Array,
      default () {
        return []
      }
    },
    noNodesLabel: {
      type: String,
      default () {
        return 'لطفا یک پایه و درس را انتخاب کنید'
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
    'update:selectedNodes',
    'layerSelected'
  ],
  data () {
    return {
      dialogLoading: false,
      selectedNodesIDs: [],
      treeKey: 0,
      globalStorage: [],
      localInitialNode: new TreeNode(),
      routeNameToGetNode: (layerId) => API_ADDRESS.tree.getNodeById(layerId)
    }
  },
  computed: {
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
        return this.selectedNodes
      },
      set (value) {
        this.$emit('update:selectedNodes', value)
      }
    },
    localStorage() {
      return this.globalStorage.filter(node => node.isInCurrentTree)
    },
    selectedNodesIds() {
      return this.globalStorage?.map(item => item.id)
    },
    lowestLayer() {
      return this.layersList[this.layersList.length - 1]
    }
  },
  watch: {
    modal (newVal) {
      if (!newVal) {
        this.onModalClosed()
        return
      }
      this.onModalOpened()
    },
    'lowestLayer.selectedValue.id': {
      handler(newValue) {
        if (newValue && this.singleHighestLayerOnly) {
          this.removeAllNodes()
        }
      }
    },
    layersList: {
      handler(newVal) {
        this.$emit('update:layersConfig', newVal)
      },
      deep: true
    }
  },
  created () {},
  async mounted () {
    await this.initTreeEssentials()
  },
  updated () {},
  methods: {
    async setupInitialNode() {
      if (!this.initialNode?.id) {
        return
      }
      const typeOfNode = typeof this.initialNode
      let node = this.initialNode
      if (typeOfNode === 'string') {
        node = new TreeNode({
          id: this.initialNode
        })
      } else if (typeOfNode !== 'object' || !node.id) {
        console.error('TreeModal Error : ' +
          'initialNode must include either an id or an object with id')
        return
      }
      const response = await this.getTreeNode(node.id)
      this.localInitialNode = response.data.data
    },
    async initTreeByType () {
      if (!this.treeType) {
        return
      }
      await this.showTreeModalNode(this.treeType, false, true)
    },
    async initTreeEssentials () {
      await this.initLayers()
      await this.setupInitialNode()
      this.updateGlobalStorage(this.selectedNodesArray)
    },
    updateGlobalStorage (nodeList = []) {
      this.globalStorage = nodeList.map(node => {
        return {
          ...node,
          isInCurrentTree: node.isInCurrentTree || false
        }
      })
    },
    addNodeToGlobalStorage (node, isInCurrentTree = false) {
      this.globalStorage.push({
        ...node,
        isInCurrentTree
      })
    },
    async initTree() {
      if (this.modalHasLayer()) {
        return
      }
      await this.initTreeByType()
      if (!this.localInitialNode?.id) {
        return
      }
      this.showTreeModalNode(this.localInitialNode.id)
    },
    modalHasLayer () {
      return this.layersConfig.length > 0
    },
    async initLayers() {
      if (!this.modalHasLayer()) {
        return
      }
      await this.initInitialLayer()
    },
    getDefaultLayerClassName (layer) {
      if (layer.className?.includes('col')) {
        return layer.className
      }
      return 'col-12 col-md-6'
    },
    onModalOpened() {
      this.initTree()
      this.updateGlobalStorage(this.selectedNodesArray)
    },
    onModalClosed () {
      this.finalizeOutputData()
      if (!this.modalHasLayer()) {
        return
      }
      this.layersList[this.layersList.length - 1].selectedValue = ''
    },
    finalizeOutputData () {
      const finalCollectedNodes = this.globalStorage.map(node => new TreeNode(node))
      if (!this.exchangeLastLayerOnly) {
        this.selectedNodesArray = finalCollectedNodes
        return
      }
      this.selectedNodesArray = this.getTheLastSelectedNode(finalCollectedNodes)
    },
    async initInitialLayer() {
      if (this.layersConfig[0].selectedValue?.id) {
        this.layerNodeSelected(this.layersConfig[0], 0)
      }
      if (this.layersConfig[0].nodeList.length > 0) {
        return
      }
      await this.setLayerList(API_ADDRESS.tree.getNodeByType(this.treeType))
    },
    loadLayerList (layerRoute) {
      return new Promise((resolve, reject) => {
        this.getTreeNode(layerRoute, false)
          .then((response) => {
            resolve(response.data.data)
          }).catch(() => {
            reject()
          })
      })
    },
    async setLayerList (layerRoute, layerIndex = 0) {
      const treeNode = await this.loadLayerList(layerRoute)
      this.layersList[layerIndex].nodeList = treeNode.children
    },
    getRouteForNode (value, isValueNode, hasTreeType) {
      if (hasTreeType) {
        return API_ADDRESS.tree.getNodeByType(value)
      }
      if (isValueNode && typeof value) {
        const nodeId = typeof value === 'string' ? value : value.id
        return API_ADDRESS.tree.getNodeById(nodeId)
      }
      return value
    },
    getTreeNode(value, isValueNode = true, hasTreeType) {
      const route = this.getRouteForNode(value, isValueNode, hasTreeType)
      return new Promise((resolve, reject) => {
        this.dialogLoading = true
        this.$axios.get(route)
          .then((response) => {
            resolve(response)
            this.dialogLoading = false
          }).catch(() => {
            reject()
            this.dialogLoading = false
          })
      })
    },
    updateNodes (values) {
      const newValues = values
        .filter(node => this.globalStorage
          .findIndex(item => item.id === node.id) === -1)
      newValues.forEach(node => this.addNodeToGlobalStorage(node, true))
      const removedNodes = this.getRemovedNodes(values)
      removedNodes.forEach(node => this.removeNodeFromGlobalStorage(node))
    },
    getRemovedNodes(newNodes) {
      const deletedNodes = []
      this.localStorage.forEach(node => {
        const existingNode = newNodes.find(item => item.id === node.id)
        if (!existingNode) {
          deletedNodes.push(node)
        }
      })
      return deletedNodes
    },
    removeNodeFromGlobalStorage(node) {
      const nodeIndex = this.globalStorage.findIndex(item => item.id === node.id)
      if (nodeIndex > -1) {
        this.globalStorage.splice(nodeIndex, 1)
      }
    },
    onChipRemoved (chipItem) {
      this.removeNode(chipItem)
    },
    removeNode (item) {
      const node = item.id ? item : { id: item }
      if (this.localStorage?.find(item => item.id === node.id)) {
        this.setTickedMode('tree', node.id, false)
      }
      this.removeNodeFromGlobalStorage(item)
    },
    removeAllNodes () {
      this.setTickedMode('tree', this.selectedNodesIds, false)
      this.globalStorage.splice(0, this.globalStorage.length)
    },
    resetAllCurrentTreeFlags() {
      this.globalStorage.forEach(node => {
        node.isInCurrentTree = false
      })
    },
    setNextLayer (layer, nextLayerIndex) {
      const nextLayer = this.layersList[nextLayerIndex]
      if (!nextLayer) {
        this.resetAllCurrentTreeFlags()
        this.showTreeModalNode(layer.selectedValue.id)
        return
      }
      this.treeKey += 1
      this.layersList[nextLayerIndex].selectedValue = ''
      this.setLayerList(this.getLayerRoute(layer.selectedValue.id), nextLayerIndex)
    },
    layerNodeSelected (layer, layerIndex) {
      this.$emit('layerSelected', {
        layerIndex,
        layer
      })
      this.setNextLayer(layer, layerIndex + 1)
    },
    getLayerRoute(layerId) {
      return this.routeNameToGetNode(layerId)
    },
    showTreeModalNode (id, isValueNode = true, hasTreeType = false) {
      this.dialogLoading = true
      this.treeKey += 1
      this.showTree('tree', this.getTreeNode(id, isValueNode, hasTreeType))
        .then((response) => {
          const allNodes = response.data.data.children
          allNodes.push(new TreeNode({
            id
          }))
          this.updateCurrentTreeFlags(allNodes)
          this.syncAllCheckedIds()
          this.dialogLoading = false
        })
        .catch(() => {
          this.dialogLoading = false
        })
    },
    updateCurrentTreeFlags (nodeList = []) {
      this.globalStorage.forEach(node => {
        if (nodeList.find(item => item.id === node.id)) {
          node.isInCurrentTree = true
        }
      })
    },
    syncAllCheckedIds (values = []) {
      this.updateCurrentTreeFlags(values)
      const selectedNodesIds = this.selectedNodesIds || []
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
  &.hide-in-mobile {
    @media screen and (max-width: 880px) {
      display: none !important;
    }
  }
  &.show-in-mobile {
    display: none;
    @media screen and (max-width: 880px) {
      display: block;
    }
  }
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
    display: flex !important;
    justify-content: center;
    align-items: center;
    &.is-sticky {
      position: sticky;
      background-color: #FFFFFF;
      bottom: -30px;
      padding-bottom: 30px;
    }
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
    @media screen and (max-width: 880px) {
      max-height: 378px;
      height: auto;
    }
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
