<template>
    <div>
        <quasar-tiptap v-bind="options" @update="onUpdate" />
    </div>
</template>

<script>
    import Vue from 'vue'
    import { QuasarTiptapPlugin, QuasarTiptap, RecommendedExtensions } from 'quasar-tiptap'
    import 'quasar-tiptap/lib/index.css'

    Vue.use(QuasarTiptapPlugin, {
        language: 'zh-hans',
        spellcheck: true
    })

    export default {
        name: 'debug',
        data () {
            return {
                options: {
                    content: 'content',
                    editable: true,
                    extensions: [
                        ...RecommendedExtensions,
                        // other extenstions
                        // name string, or custom extension
                    ],
                    toolbar: [
                        'add-more',
                        'separator',
                        'bold',
                        'italic',
                        'underline',
                        // other toolbar buttons
                        // name string
                    ]
                },
                json: '',
                html: ''
            }
        },
        components: {
            QuasarTiptap,
        },
        methods: {
            onUpdate ({ getJSON, getHTML }) {
                this.json = getJSON()
                this.html = getHTML()
                console.log('html', this.html)
            }
        },
        mounted () {
            // set language dynamically
            this.$o.lang.set('en-us')
        }
    }
</script>
