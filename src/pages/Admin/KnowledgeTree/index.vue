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
    :editNode="edit"
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
    this.showTree('tree', 'test')
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
      console.log('index')
      console.log('selectedNode', this.selectedNode)
      console.log('newNode', this.newNode)
      this.createNode(this.selectedNode.id, this.newNode.title, this.newNode.order, (response) => {
        console.log('response', response)
        return response
      })
    },
    getNewNodeData (newNode) {
      this.newNode = newNode
    },
    edit () {
      this.editNode(this.selectedNode)
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
