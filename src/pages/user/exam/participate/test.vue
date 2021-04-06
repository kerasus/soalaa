<template>

    <div @mousemove="resizing" @mouseup="endResize">
        <div class="ghostbar" ref="ghostbar" v-show="dragging">
        </div>
        <div class="sidebar" ref="sidebar">
            <span></span>
            <div class="dragbar" ref="dragbar" @mousedown="startResize"></div>
            sidebar
        </div>
        <div class="main" ref="main">
            main
        </div>


    </div>


</template>


<script>
    // import ElementQueries from 'css-element-queries/src/ElementQueries'
    // import VueDragResize from 'vue-drag-resize'
    import resize from 'vue-resize-directive'


    export default {
        name: "test",
        data: () => ({
            leftColumnWidth: 500,
            rightColumnWidth: 200,
            resizeCount: 0,
            dragging: false
        }),
        directives: {
            resize,
        },
        components: {
            // VueDragResize
        },
        computed: {
            height() {
                return this.$refs.main.clientHeight
            },
            top() {
                return this.$refs.main.offsetTop
            },
            left() {
                return this.$refs.main.offsetLeft
            }
        },
        methods: {
            startResize(e) {
                e.preventDefault();
                this.dragging = true;

            },
            resizing(e) {
                e.preventDefault();

                if (this.dragging){
                    this.$refs.ghostbar.style.left = (e.pageX + 2) + 'px'
                }


            },
            endResize(e) {
                if (!this.dragging) {
                    return
                }

                this.$refs.sidebar.style.width = (e.pageX + 2) + 'px'
                this.$refs.main.style.left = (e.pageX + 2) + 'px'

                // document.getElementById(document).unbind('mousemove');
                this.dragging = false;
            }

        },

    }
</script>

<style scoped>

    body, html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }

    .main {
        background-color: BurlyWood;
        float: right;
        position: absolute;
        height: 200px;
        right: 0;
        left: 200px;
        margin-top: 10px;

    }

    .sidebar {
        background-color: IndianRed;

        margin-top: 10px;
        width: 200px;
        float: left;
        /*position: absolute;*/
        height: 200px;
        overflow-y: hidden;
    }

    .dragbar {
        background-color: black;
        height: 100%;
        float: right;
        width: 3px;
        cursor: col-resize;
    }

    .ghostbar {
        margin-top: 10px;
        width: 3px;
        background-color: #000;
        opacity: 0.5;
        cursor: col-resize;
        z-index: 999;
        position: absolute;
        height: 200px;
    }
</style>
