<template>
  <tree
    ref="tree"
    tick-strategy="strict"
    :editable="true"
    :get-node-by-id="getNodeById"
    :add-new-node="createNode"
    :edit-node="editNode"
    @ticked="onTicked"
  />
</template>

<script>
import { mixinTree } from 'src/mixin/Mixins'
import Tree from 'src/components/Tree/Tree'

export default {
  name: 'SubjectTree',
  data: () => {
    return {
      loading: false,
      nodeIds: []
    }
  },
  mixins: [mixinTree],
  components: { Tree },
  created () {
    this.loading = true
    this.showTree('tree', this.getRootNode('subject_tags'))
      .then(() => {
        this.loading = false
      })
      .catch(err => {
        console.error(err)
        this.loading = false
      })
  },
  watch: {
    loading (newValue) {
      this.$store.dispatch('loading/overlayLoading', newValue)
    }
  },
  methods: {
    onTicked (value) {
      this.nodeIds = []
      value.forEach(val => {
        this.nodeIds.push(val.id)
      })
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
