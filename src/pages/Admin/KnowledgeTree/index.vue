<template>
  <q-tree
    class="q-ma-lg"
    :nodes="nodes"
    node-key="id"
    ref="tree"
    label-key="title"
    @lazy-load="onLazyLoadTree"
  >
    <template v-slot:default-header="prop ">
      <!--        <q-icon :name= "prop.node.icon "></q-icon>-->
      {{ prop.node.title }}
      <q-icon @click.stop @keypress.stop class="edit-btn " name="edit " @click="openEditMenu(prop.node) "/>
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
        <q-tab class="text-purple " name="edit " icon="edit " label="ویرایش "/>
        <q-tab class="text-orange " name="addNew " icon="add " label="اضافه کردن گره جدید "/>
        <q-tab class="text-red " name="delete " icon="delete " label="حذف "/>
      </q-tabs>
      <q-tab-panels v-model="tab " animated>
        <q-tab-panel name="edit ">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName "
            label="نام جدید "
          />
          <q-btn
            text
            color="green "
            :loading="loading "
            @click="saveClicked() "
          >
            ثبت
          </q-btn>
        </q-tab-panel>

        <q-tab-panel name="addNew ">
          <q-input
            class="q-ma-md"
            filled
            v-model="newName"
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
            @click="addClicked() "
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
import { defineComponent } from 'vue'
import API_ADDRESS from 'src/api/Addresses'

export default defineComponent({
  name: 'PageIndex',
  data: () => {
    return {
      nodes: [],
      copy: {},
      simple: [],
      tab: 'edit',
      loading: false,
      vModelSelected: [],
      newName: '',
      newOrder: 1,
      selectedNode: {},
      editDialog: false
    }
  },
  created () {
    this.getRootNodeByType('test')
  },
  methods: {
    createNode (parentId, title, order, callback) {
      this.$axios.post(API_ADDRESS.tree.base, { parent_id: parentId, title: title, order: order })
        .then(response => {
          if (callback) {
            callback(response)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    openEditMenu (node) {
      this.newName = ''
      this.selectedNode = {
        id: node.id,
        title: node.title
      }
      this.editDialog = true
    },
    async deleteNode () {
      const nodeUid = this.selectedNode.uid
      const arr = nodeUid.split('-')
      await arr.pop()
      if (arr.length > 0) {
        const parentUid = arr.join('-')
        const getParentNode = await this.$refs.tree.getNodeByKey(parentUid)
        if (getParentNode) {
          getParentNode.children = getParentNode.children.filter(node => node.uid !== nodeUid)
        }
        this.editDialog = false
      } else {
        this.simple.filter(node => node.uid !== nodeUid)
      }
      this.editDialog = false
    },
    addClicked () {
      const id = this.selectedNode.id
      const getNode = this.$refs.tree.getNodeByKey(id)
      this.createNode(id, this.newName, this.newOrder, (response) => {
        console.log('response', response)
        getNode.children.unshift({
          id: response.data.data.id,
          uid: response.data.data.id,
          type: response.data.data.type,
          title: response.data.data.title,
          parent: response.data.data.parent.id,
          // icon: 'school',
          children: [],
          lazy: true
        })
        // { title: apiData.title, id: apiData.id, parent: apiData.parent, children: apiData.children, lazy: true }
        this.editDialog = false
      })
      // console.log('getNode', getNode)
      // const arr = id.split(':')
      // console.log('arr', arr)
      // arr.pop()
      // const newId = Date.now()
      // arr.push(newId)
      // const newUid = arr.join(':')
      // getNode.children.unshift({
      //   id: newId,
      //   uid: newUid,
      //   type: 'level',
      //   icon: 'school',
      //   name: this.newName,
      //   children: []
      // })
      // this.editDialog = false
    },
    async saveClicked () {
      this.loading = true
      const node = this.$refs.tree.getNodeByKey(this.selectedNode.uid)
      node.name = this.newName
      this.loading = false
      this.editDialog = false
    },
    getRootNodeByType (type) {
      this.$axios.get(API_ADDRESS.tree.getNodeByType(type))
        .then(response => {
          const apiData = response.data.data
          this.nodes.push({ title: apiData.title, id: apiData.id, parent: apiData.parent, children: apiData.children, lazy: true })
        }).catch(err => {
          console.log(err)
        })
    },
    getLeafNodeById (id, done, fail) {
      this.$axios.get(API_ADDRESS.tree.getNodeById(id))
        .then(response => {
          const apiData = response.data.data
          const tree = []
          apiData.children.forEach(child => {
            tree.push({ title: child.title, id: child.id, parent: apiData.id, children: [], lazy: true })
          })
          done(tree)
        }).catch(err => {
          console.log(err)
          if (fail) {
            fail()
          }
        })
    },
    showChildOfNode (node, key, done, fail) {
      if (node.children && node.children.length) {
        this.showChildOfNodeFromCache(node, key, done, fail)
      } else {
        this.showChildOfNodeFromServer(node, key, done, fail)
      }
    },
    showChildOfNodeFromCache (node, key, done, fail) {
      const tree = []
      node.children.forEach(child => {
        tree.push({ title: child.title, id: child.id, parent: node.id, children: [], lazy: true })
      })
      done(tree)
    },
    showChildOfNodeFromServer (node, key, done, fail) {
      this.getLeafNodeById(node.id, done, fail)
    },
    onLazyLoadTree ({ node, key, done, fail }) {
      this.showChildOfNode(node, key, done, fail)
    }
  }
})
</script>
<style scoped lang='scss'>
.edit-btn {
  color: transparent;

  &:hover {
    color: #f18305;
  }
}

.active {
  display: block;
}

.hide {
  display: none;
}
</style>
