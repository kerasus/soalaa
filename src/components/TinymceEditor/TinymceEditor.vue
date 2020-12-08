<template>
    <div class="mt-4">
        <editor
                api-key="no-api-key"
                id="editor"
                :init="initObj"
        />
        <v-btn @click="addTextToEditor">click</v-btn>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    export default {
        name: "TinymceEditor",
        components: {
            'editor': Editor
        },
        data () {
            return {
                initObj: {
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | addFormula',
                    directionality : 'rtl',
                    auto_focus: 'editor',
                    branding: false,
                    that: this,
                    setup:function(editor){
                        // You can do what you want here
                        // like adding custom buttons
                        editor.ui.registry.addButton('addFormula', {
                            text: 'Add Formula',
                            icon: 'false',
                            onAction: () => { this.that.addTextToEditor('hi') }
                        });
                    }
                }
            }
        },
        methods: {
            addTextToEditor (text = '') {
                tinymce.activeEditor.execCommand('mceInsertContent', false, text) // eslint-disable-line
            }
        }
    }
</script>

<style>
    .tox.tox-silver-sink.tox-tinymce-aux {
        display: none;
    }
</style>
