<template>
  <tree ref="tree"
        tick-strategy="strict"
        :editable="true"
        :get-node-by-id="getNodeById"
        :add-new-node="createNode"
        :edit-node="editNode"
        @ticked="test" />
<!--  <q-btn v-for="(t, k) in testArr" :key="k" :label="t" @click="test2"/>-->
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins.js'
import Tree from 'src/components/Tree/Tree.vue'

export default {
  name: 'PageIndex',
  components: { Tree },
  mixins: [mixinTree],
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
  watch: {
    loading (newValue) {
      this.$store.dispatch('loading/overlayLoading', newValue)
    }
  },
  created () {
    this.loading = true
    this.showTree('tree', this.getRootNode('test'))
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        console.error(err)
        this.loading = false
      })
  },
  methods: {
    test (value) {
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
