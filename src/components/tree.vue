<template>
    <div dir="ltr">
        <p v-if="test === true"> test </p>
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
            <template>
        <span>
            <v-btn @click="save">
                <v-icon>
                mdi-checkbox-marked-circle-outline
            </v-icon>
            </v-btn>
        </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><v-icon>mdi-plus</v-icon></span>
            <span class="icon" slot="addLeafNodeIcon">＋</span>
            <span class="icon" slot="editNodeIcon"><v-icon>mdi-pencil</v-icon></span>
            <span class="icon" slot="delNodeIcon"><v-icon>mdi-delete</v-icon></span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
        </vue-tree-list>
        <v-btn @click="save">save</v-btn>
<!--        <v-treeview :items="items.children[0].children"></v-treeview>-->
<!--        <v-overlay-->
<!--                :value="overlay"-->
<!--        >-->
<!--        </v-overlay>-->
    </div>

</template>

<script>
    import { VueTreeList, Tree } from 'vue-tree-list'
    export default {
        components: {
            VueTreeList
        },
        data: () => ({
            overlay: false,
            items: null,
            data: new Tree([
                {
                    name: 'درخت دانش',
                    id: 1,
                    pid: 0,
                    addLeafNodeDisabled: true,
                },
            ])
        }),
        mounted() {
            if (localStorage.getItem('tree')) {
                this.data =  new Tree( [JSON.parse(localStorage.getItem('tree'))] )
            }
            this.items = JSON.parse(localStorage.getItem('tree'))
        },
        methods: {
            save() {
              localStorage.setItem('tree', this.data)
            },
            onDel(node) {
                node.remove()

            },
            //
            // onChangeName(params) {
            //     console.log(params)
            // },
            // //
            onAddNode(params) {
                console.log(params)
                params.addLeafNodeDisabled = true

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
