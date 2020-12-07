<template>
    <div dir="ltr">
        <vue-tree-list
                :key="componentKey"
                @click="onClick"
                @change-name="onChangeName"
                @delete-node="onDel"
                @add-node="onAddNode"
                :model="data"
                default-tree-node-name="ریشه جدید"
                default-leaf-node-name="آیتم جدید"
                v-bind:default-expanded="true"
        >

            <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}
             <span>
                 <v-btn  v-if="editing ===  slotProps.model.id" @click="saveNode(slotProps.model)">
                <v-icon>
                save node
            </v-icon>
            </v-btn>
            <v-btn  v-if="editing ===  slotProps.model.id" @click="save">
                <v-icon>
                mdi-checkbox-marked-circle-outline
            </v-icon>
            </v-btn>
                <v-btn  v-if="editing ===  slotProps.model.id" @click="close(slotProps.model.id)">
                <v-icon>
                mdi-window-close
            </v-icon>
            </v-btn>
        </span>
        </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><v-icon>mdi-plus</v-icon></span>
            <span class="icon" slot="addLeafNodeIcon"></span>
            <span class="icon" slot="editNodeIcon"><v-icon>mdi-pencil</v-icon></span>
            <span class="icon" slot="delNodeIcon"><v-icon>mdi-delete</v-icon></span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
        </vue-tree-list>
        <v-btn @click="save">save</v-btn>
<!--        <v-treeview :items="items.children[0].children"></v-treeview>-->
        <v-overlay
                :value="overlay"
        >
        </v-overlay>
    </div>

</template>

<script>
    import { VueTreeList, Tree } from 'vue-tree-list'
    export default {
        components: {
            VueTreeList
        },
        data: () => ({

            nodes: [{
                name: 'درخت دانش',
                id: 1,
                pid: 0,
                addLeafNodeDisabled: true,
                children:[]
            }],
            node: {id: null, parentId: null, name: ''},
            componentKey:0,
            editing: null,
            overlay: false,
            items: null,
            data: new Tree([
                {
                    name: 'درخت دانش',
                    id: 1,
                    pid: 0,
                    addLeafNodeDisabled: true,
                },
            ]),
        }),
        mounted() {
            if (localStorage.getItem('tree')) {
                this.data =  new Tree( [JSON.parse(localStorage.getItem('tree'))] )
            }
            this.items = JSON.parse(localStorage.getItem('tree'))
        },
        methods: {


            search(tree, target,newChild)  {
                if (tree.id === target) {
                    tree.children.push(newChild);
                }

                for (const child of tree.child) {
                    const res = this.search(child, target,newChild);

                    if (res) {
                        return res;
                    }
                }
            },


            saveNode(node){
                this.node.id = node.id
                this.node.parentId = node.pid
                this.node.name = node.name
                this.search(this.nodes[0] , node.pid, this.node)
                localStorage.setItem('tree', this.nodes[0])

            },
            close(item) {
                console.log(item)

            },
            save() {
              localStorage.setItem('tree', this.data.children[0])
                this.overlay=true
                this.editing = null
                this.componentKey += 1
                this.overlay =false
            },
            onDel(node) {
                node.remove()

            },

            onChangeName(params) {
                console.log(params)
                this.editing = params.id
            },

            onAddNode(params) {
                console.log(params)
                params.addLeafNodeDisabled = true
                this.editing = params.id

            },
            //
            // onClick(params) {
            //     console.log(params)
            // },

            // addNode() {
            //     var node = new TreeNode({ name: this.name, isLeaf: false })
            //     if (!this.data.children) this.data.children = []
            //     this.data.addChildren(node)
            // },

        }
    }
</script>

<style scoped>

</style>
