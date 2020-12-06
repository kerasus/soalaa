<template>
    <div>
<!--        <button @click="addNode">Add Node</button>-->
        <vue-tree-list
                @click="onClick"
                @change-name="onChangeName"
                @delete-node="onDel"
                @add-node="onAddNode"
                :model="data"
                default-tree-node-name="ریشه جدید"
                default-leaf-node-name="آیتم جدید"
                v-bind:default-expanded="true"
        >
            <span class="icon" slot="addTreeNodeIcon">📂</span>
            <span class="icon" slot="addLeafNodeIcon">＋</span>
            <span class="icon" slot="editNodeIcon">📃</span>
            <span class="icon" slot="delNodeIcon">✂️</span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
        </vue-tree-list>
        <v-btn @click="save">save</v-btn>
    </div>

</template>

<script>
    import { VueTreeList, Tree } from 'vue-tree-list'
    export default {
        components: {
            VueTreeList
        },
        data: () => ({
            data: new Tree([
                {
                    name: 'درخت دانش',
                    id: 1,
                    pid: 0,
                },
            ])
        }),
        mounted() {
            if (localStorage.getItem('tree')) {
                this.data =  JSON.parse(localStorage.getItem('tree'))
            }
        },
        methods: {
            save() {
              localStorage.setItem('tree', this.data)
            },
            onDel(node) {
                console.log(node)
                node.remove()
            },
            //
            // onChangeName(params) {
            //     console.log(params)
            // },
            // //
            // onAddNode(params) {
            //     console.log(params)
            //
            // },
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
