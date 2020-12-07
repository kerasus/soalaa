<template>
    <div dir="ltr">
        <v-text-field v-if="textfieldon" id="thename" /> <v-btn @click="checkname">save name</v-btn>
        <vue-tree-list
                :key="componentKey"
                @click="onClick"
                @change-name="onChangeName"
                @delete-node="onDel"
                @add-node="onAddNode"
                :model="data"
                default-tree-node-name=""
                default-leaf-node-name="آیتم جدید"
                v-bind:default-expanded="true"
        >

            <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}


             <span>
            <v-btn  v-if="editing ===  slotProps.model.id" @click="saveNode(slotProps.model)">
                <v-icon>
                mdi-checkbox-marked-circle-outline
            </v-icon>

            </v-btn>
                <v-btn  v-if="editing ===  slotProps.model.id" @click="close(slotProps.model)">
                <v-icon>
                mdi-window-close
            </v-icon>
            </v-btn>


        </span>
        </span>
            </template>
            <span class="icon" slot="addTreeNodeIcon"><v-icon v-if="showOptions">mdi-plus</v-icon></span>
            <span class="icon" slot="addLeafNodeIcon"></span>
            <span class="icon" slot="editNodeIcon"><v-icon v-if="showOptions">mdi-pencil</v-icon></span>
            <span class="icon" slot="delNodeIcon"><v-icon v-if="showOptions">mdi-delete</v-icon></span>
            <span class="icon" slot="leafNodeIcon">🍃</span>
            <span class="icon" slot="treeNodeIcon">🌲</span>
        </vue-tree-list>
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
            defaultedit: false,
            name:'',
            textfieldon:false,
            showOptions: true,

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

            // search(tree, target,newChild)  {
            //     if (tree.id === target) {
            //         tree.children.push(newChild);
            //     }
            //
            //     for (const child of tree.children) {
            //         const res = this.search(child, target,newChild);
            //
            //         if (res) {
            //             return res;
            //         }
            //     }
            // },
            saveNode(node) {
                this.node.id = node.id
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
                console.log(item)

            },
            save() {
              localStorage.setItem('tree', this.data.children[0])
                this.overlay=true
                this.componentKey += 1
                this.overlay =false
            },
            onDel(node) {
                node.remove()

            },

            onChangeName(params) {
                this.defaultedit = true
                console.log(params)
                this.editing = params.id
                this.showOptions = false
            },
            onAddNode(params) {
                this.textfieldon = true
                params.addLeafNodeDisabled = true
                this.editing = params.id
                this.showOptions = false
            },

            checkname() {
              this.name = document.getElementById("thename").value
              this.textfieldon = false
            },

            onClick(params) {
                console.log(params)
            },
        }
    }
</script>

<style scoped>

</style>
