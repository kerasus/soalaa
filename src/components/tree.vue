<template>
  <div dir="ltr">
    <br>
    <v-text-field
      v-model="searchInTree"
      label="جستجو"
      style="width: 50%"
    />
    <v-dialog
      v-model="dialog"
      persistent
      max-width="40%"
    >
      <v-text-field
        id="thename"
        style="background-color:aliceblue "
      />
      <v-btn @click="checkname">
        save name
      </v-btn>
    </v-dialog>
    <vue-tree-list
      :key="componentKey"
      :model="data"
      default-tree-node-name=""
      default-leaf-node-name="آیتم جدید"
      :default-expanded="true"
      @click="onClick"
      @change-name="onChangeName"
      @delete-node="onDel"
      @add-node="onAddNode"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}


          <span>
            <v-btn
              v-if="editing === slotProps.model.id"
              @click="saveNode(slotProps.model)"
            >
              <v-icon>
                mdi-checkbox-marked-circle-outline
              </v-icon>

            </v-btn>
            <v-btn
              v-if="editing === slotProps.model.id"
              @click="close(slotProps.model)"
            >
              <v-icon>
                mdi-window-close
              </v-icon>
            </v-btn>


          </span>
        </span>
      </template>
      <span
        slot="addTreeNodeIcon"
        class="icon"
      ><v-icon v-if="showOptions">mdi-plus</v-icon></span>
      <span
        slot="addLeafNodeIcon"
        class="icon"
      />
      <span
        slot="editNodeIcon"
        class="icon"
      ><v-icon v-if="showOptions">mdi-pencil</v-icon></span>
      <span
        slot="delNodeIcon"
        class="icon"
      ><v-icon v-if="showOptions">mdi-delete</v-icon></span>
      <span
        slot="leafNodeIcon"
        class="icon"
      >🍃</span>
      <span
        slot="treeNodeIcon"
        class="icon"
      >🌲</span>
    </vue-tree-list>
    <v-treeview
      v-model="selection"
      :search="searchInTree"
      selection-type="independent"
      selectable
      :items="items"
    />
    <v-overlay
      :value="overlay"
    />
    <v-btn @click="selectModify">
      check selection
    </v-btn>
    <br><br>
    <v-btn @click="showselecteds">
      show all selected path
    </v-btn>
    <div v-if="isShowSelections">
      <div
        v-for="t in allPath"
        :key="t.id"
      >
        {{ t }}
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
    import {VueTreeList, Tree} from 'vue-tree-list'

    export default {
        components: {
            VueTreeList
        },
        data: () => ({
            searchInTree : '',
            selectedId: [],
            leaves : null,
            allSelections: [],
          selectedNode: {id: null, name: ''},
            render: true,
            items: [{
                name: 'درخت دانش',
                id: 1,
                pid: 0,
                addLeafNodeDisabled: true,
                children: []
            }],
            selection: [],
            dialog: false,
            defaultedit: false,
            name: '',
            textfieldon: false,
            showOptions: true,
            nodes: [{
                name: 'درخت دانش',
                id: 1,
                pid: 0,
                addLeafNodeDisabled: true,
                children: []
            }],
            node: {id: null, parentId: null, name: ''},
            componentKey: 0,
            componentKey1: 1,
            editing: null,
            overlay: false,
            children: [],
            isShowSelections: false,
            data: new Tree([
                {
                    name: 'درخت دانش',
                    id: 1,
                    pid: 0,
                    addLeafNodeDisabled: true,
                    children: null
                },
            ]),
            path:[],
            allPath: [],
            leaf: { id:null , name :''},
            parent: { id:null , name :''},
        }),
        mounted() {
            if (localStorage.getItem('tree')) {
                this.data = new Tree([JSON.parse(localStorage.getItem('tree'))])
                this.items = []
                this.items.push(JSON.parse(localStorage.getItem('tree')))
            }

        },
        methods: {
            createPath(){
                this.allSelections = []
                this.selectedId = []
                this.allPath = []
                for (let i = 0; i < this.selection.length; i++) {
                    this.selectedNode = {id: null, name: ''}
                    this.selectedNode.id = this.selection[i]
                    this.selectedNode.name = this.search(this.items[0], this.selection[i])
                    this.allSelections.push(this.selectedNode)
                }
                for (let q=0;q<this.allSelections.length;q++) {
                    this.selectedId.push(this.allSelections[q].id)
                }

                this.leaves = this.allSelections.filter(item => this.searchChildren(this.items[0], item.id).length === 0 || this.searchChildren(this.items[0], item.id).filter( k => this.selectedId.includes(k.id) ).length === 0 )

                for (let w=0;w<this.leaves.length;w++){
                    this.leaf = this.leaves[w]
                    this.path.push(this.leaf)
                    this.parent = { id:null , name :''}

                    while (this.leaf.id !== 0 ) {
                        this.parent.id = this.searchParent(this.items[0] , this.leaf.id)
                        this.parent.name=this.search(this.items[0] , this.parent.id )
                        this.leaf = this.parent
                        this.path.push(this.leaf)
                        this.parent = {}
                    }
                    this.allPath.push(this.path)
                    this.path = []
                }

            },
            selectModify() {
                this.createPath()
                for (let t=1;t<this.allPath[0].length -1 ;t++) {
                    this.selection.push(this.allPath[0][t].id)
                }

            },

            search(tree, target) {
                if (tree.id === target) {
                    return tree.name;
                }

                if (tree.children) {
                    for (const child of tree.children) {
                        const res = this.search(child, target);

                        if (res) {
                            return res;
                        }
                    }
                }
            },
            searchParent(tree, target) {
                if (tree.id === target) {
                    return tree.pid;
                }

                if (tree.children) {
                    for (const child of tree.children) {
                        const res = this.searchParent(child, target);

                        if (res) {
                            return res;
                        }
                    }
                }
            },
            searchChildren(tree, target) {
                this.children = []
                if (tree.id === target) {
                    if (tree.children) {
                        this.children = tree.children
                    }
                    return this.children
                }

                if (tree.children) {
                    for (const child of tree.children) {
                        const res = this.searchChildren(child, target);

                        if (res) {
                            return res;
                        }
                    }
                }
            },
            showselecteds() {

                this.createPath()
                this.isShowSelections = true
            },

            saveNode(node) {
                this.node.id = node.pid + 1
                this.node.parentId = node.pid
                this.node.name = node.name
                this.editing = null
                this.showOptions = true
                if (this.defaultedit === false) {
                    node.changeName(this.name)
                }
                this.save()


            },
            close(item) {
                item.remove()
                this.editing = null
                this.showOptions = true
            },
            save() {
                localStorage.setItem('tree', this.data.children[0])
                this.items = []
                this.items.push(this.data.children[0])
                this.overlay = true
                this.componentKey += 1
                this.overlay = false
            },
            onDel(node) {
                node.remove()

            },
            reload() {
                this.render = false;
                this.$nextTick(() => {
                    this.render = true;
                });
            },

            onChangeName(params) {
                this.defaultedit = true
                this.editing = params.id
                this.showOptions = false
            },
            onAddNode(params) {
                this.dialog = true
                params.addLeafNodeDisabled = true
                this.editing = params.id
                this.showOptions = false
            },

            checkname() {
                this.name = document.getElementById("thename").value
                this.dialog = false
            },

            onClick() {
                // console.Log(params)
            },
        }
    }
</script>

<style scoped>

</style>
