<template>
  <tree
    @ticked="test"
    ref="tree"
    tick-strategy="strict"
    :editable="true"
    :get-node-by-id="getNodeById"
  />
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'components/Tree/Tree'
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
    }
    // getSelectedNode (node) {
    //   this.selectedNode = node
    // },
    // getNewNodeData () {
    //   this.createNode(this.selectedNode.id)
    // }
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
