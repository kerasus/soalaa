<template>


    <div >
       <v-row>
               <VueDragResize  :h="600" :sticks="['mr']" :isDraggable="false" :isActive="false" :w="leftColumnWidth"  v-on:resizing="resizeLeftColumnWidth" >
                   <p>{{ leftColumnWidth }} </p>
               </VueDragResize>
               <div style="height:600px;background-color: aqua" :style="{  width: (1600 - leftColumnWidth)+'px'}" >
                   {{(600 - leftColumnWidth)}}
               </div>
       </v-row>
    </div>


</template>

<script>

    import VueDragResize from 'vue-drag-resize'


    export default {
        name: "test",
        data: () => ({
            leftColumnWidth: 500,
            rightColumnWidth: 200,
        }),
        components: {
            VueDragResize
        },
        methods: {

            resizeLeftColumnWidth(newRect) {
                this.leftColumnWidth = newRect.width;
            },

        },
        created() {
            this.leftColumnWidth = (window.innerWidth)/2
        }
    }
</script>

<style scoped>


</style>
