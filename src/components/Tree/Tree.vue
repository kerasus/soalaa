<template>
  <q-tree
    class="q-ma-lg"
    :nodes="nodes"
    node-key="id"
    ref="tree"
    label-key="title"
    :tick-strategy="tickStrategy"
    v-model:ticked="ticked"
    @update:ticked="tickedNode"
    @lazy-load="getChildOfNode"
  >
    <template v-slot:default-header="prop" >
      <span class="node-title">
        {{ prop.node.title }}
        <q-icon
          :v-if="editable"
          @click.stop
          @keypress.stop
          class="edit-btn"
          name="edit"
          @click="openEditMenu(prop.node) "
        />
      </span>
    </template>
  </q-tree>
  <q-dialog v-model="editDialog " persistent>
    <q-card class="q-pa-md ">
      <q-btn flat icon="close " color="red " v-close-popup @click="editDialog = false "/>
      <q-tabs
        v-model="tab "
        narrow-indicator
        dense
        align="justify "
      >
        <q-tab class="text-purple" name="editNode" icon="edit" label="ویرایش "/>
        <q-tab class="text-orange" name="createNewNode" icon="add" label="اضافه کردن گره جدید "/>
        <q-tab class="text-red" name="delete" icon="delete" label="حذف "/>
      </q-tabs>
      <q-tab-panels v-model="tab " animated>
        <q-tab-panel name="editNode">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName "
            label="نام جدید "
          />
          <q-input
            class="q-ma-md"
            filled
            v-model="newOrder"
            label="ترتیب جدید "
          />
          <q-btn
            text
            color="green "
            :loading="loading "
            @click="edit"
          >
            ثبت
          </q-btn>
        </q-tab-panel>
        <q-tab-panel name="createNewNode">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName"
            label="نام "
          />
          <q-input
            class="q-ma-md"
            filled
            v-model="newOrder"
            label="ترتیب "
          />
          <q-btn
            text
            color="green "
            :loading="loading "
            @click="addNode() "
          >
            اضافه شود
          </q-btn>
        </q-tab-panel>
        <q-tab-panel name="delete ">
          <div class="text-subtitle1 ">آیا از حذف گرۀ " {{ selectedNode.name }} " اطمینان دارید؟</div>
          <q-btn
            color="red "
            :loading="loading "
            @click="deleteNode "
            class="q-mt-md "
          >
            حذف
          </q-btn>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>
<script>
import { TreeNode, TreeNodeList } from 'src/models/TreeNode'

export default {
  name: 'Tree',
  props: {
    tickStrategy: {
      type: String,
      default: 'none'
    },
    editable: {
      type: Boolean,
      default: false
    },
    getNodeById: {
      type: Function,
      default: (id, done, fail, callback) => {
      }
    },
    addNewNode: {
      type: Function,
      default: () => {
      }
    },
    editNode: {
      type: Function,
      default: () => {
      }
    }
  },
  data: () => {
    return {
      ticked: [],
      completeTickedNode: [],
      nodes: [],
      tab: 'edit',
      loading: false,
      newName: '',
      newOrder: 1,
      selectedNode: {},
      editDialog: false
    }
  },
  emits: ['ticked', 'selectedNode', 'newData'],
  methods: {
    createRoot (nodeData) {
      const treeNodeData = new TreeNode(nodeData)
      treeNodeData.children = (new TreeNodeList(treeNodeData.children)).list
      this.nodes = [treeNodeData]
    },

    tickedNode (target) {
      this.completeTickedNode = []
      target.forEach(id => {
        this.completeTickedNode.push(this.nodes[0].findNode(id))
      })
      this.$emit('ticked', this.completeTickedNode)
    },

    loadChildOfNode (node, done) {
      const tree = []
      node.children.forEach(child => {
        tree.push(new TreeNode({ id: child.id, title: child.title, parent: node.id }))
      })
      done(tree)
    },

    getChildOfNode ({ node, key, done, fail }) {
      if (node.children && node.children.length) {
        this.showChildOfNodeFromCache(node, key, done, fail)
      } else {
        this.showChildOfNodeFromServer(node, key, done, fail)
      }
    },

    showChildOfNodeFromCache (node, key, done, fail) {
      const tree = []
      node.children.forEach(child => {
        tree.push(new TreeNode({ id: child.id, title: child.title, order: child.order, parent: node.id }))
      })
      done(tree)
    },

    showChildOfNodeFromServer (node, key, done, fail) {
      this.getNodeById(node.id, done, fail, this.loadChildOfNode)
    },

    edit () {
      this.editNode()
    },

    addNode () {
      const id = this.selectedNode.id
      const getNode = this.$refs.tree.getNodeByKey(id)
      this.$emit('newData', { title: this.newName, order: this.newOrder })
      const newNodeData = this.addNewNode()
      if (newNodeData) {
        getNode.children.unshift(new TreeNode({
          id: newNodeData.data.data.id,
          type: newNodeData.data.data.type,
          title: newNodeData.data.data.title,
          parent: newNodeData.data.data.parent.id
        }))
        this.editDialog = false
      }
    },

    openEditMenu (node) {
      this.newName = ''
      this.newOrder = 1
      this.selectedNode = {
        id: node.id,
        title: node.title
      }
      this.$emit('selectedNode', this.selectedNode)
      this.editDialog = true
    },

    setNodesTicked (keys, state) {
      if (state) {
        this.$refs.tree.setTicked(keys, state)
      } else {
        this.$refs.tree.setTicked(keys, false)
      }
    }
  }
}
</script>
<style scoped lang='scss'>
  .q-tree {
    display: inline-block;

    .node-title {
      &:hover {
        .edit-btn {
          color: #f18305;
        }
      }

      .edit-btn {
        color: transparent;
      }
    }
  }
</style>
