<template>
  <tree
    @ticked="test"
    @selected-node="getSelectedNode"
    @new-data="getNewNodeData"
    ref="tree"
    tick-strategy="strict"
    :editable="true"
    :get-node-by-id="getNodeById"
    :add-new-node="addNode"
    :edit-node="edit"
  />
<!--  <q-btn v-for="(t, k) in testArr" :key="k" :label="t" @click="test2"/>-->
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'src/components/Tree/Tree'
// import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'PageIndex',
  data: () => {
    return {
      nodes: [],
      loading: false,
      newName: '',
      newOrder: 1,
      selectedNode: {},
      editDialog: false,
      newNode: {}
      // testArr: []
    }
  },
  mixins: [mixinTree],
  components: { Tree },
  created () {
    // this.showTree('tree', this.getNode('6232e6482012ae19f05331d9'))
    this.showTree('tree', this.getRootNode('test'))
      .then(() => {})
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    test (value) {
      console.log('ticked', value)
      this.testArr = []
      value.forEach(val => {
        this.testArr.push(val.id)
      })
    },
    // test2 (id) {
    //   this.setTicked('tree', id, false)
    // },
    getSelectedNode (node) {
      this.selectedNode = node
    },
    addNode () {
      this.createNode(this.selectedNode.id, this.newNode.title, this.newNode.order, (response) => {
        console.log('response', response)
        return response
      })
    },
    getNewNodeData (newNode) {
      this.newNode = newNode
    },
    edit () {
      this.editNode(this.selectedNode.id, this.newNode.title, this.newNode.order)
    }
  }
}
</script>
<style scoped lang='scss'>
.node-title{
  &:hover {
  .edit-btn {
    color: #f18305;
    }
  }
}

.active {
  display: block;
}

.hide {
  display: none;
}
</style>
