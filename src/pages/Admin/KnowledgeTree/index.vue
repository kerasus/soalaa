<template>
  <tree
    @ticked="test"
    ref="tree"
    tick-strategy="strict"
    :editable="true"
    :get-node-by-id="getNodeById"
    :add-new-node="createNode"
    :edit-node="editNode"
  />
<!--  <q-btn v-for="(t, k) in testArr" :key="k" :label="t" @click="test2"/>-->
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'src/components/Tree/Tree'

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
    }
    // test2 (id) {
    //   this.setTickedMode('tree', id, false)
    // },
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
