<template>
    <div class="mt-4">
        <editor
                api-key="no-api-key"
                id="editor"
                :init="initObj"
        />
        <div dir="ltr">
            <div id="mathfield" locale="fa">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</div>
            <div class="latexData" v-html="latexData"></div>
        </div>
    </div>
</template>

<script>
    import Editor from '@tinymce/tinymce-vue'
    import MathLive from 'mathlive';
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'

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
                            icon: 'character-count',
                            onAction: () => { this.that.addTextToEditor('$' + this.that.latexData + '$') }
                        });
                    }
                },
                formula: '',
                latexData: null
            }
        },
        methods: {
            addTextToEditor (text = '') {
                tinymce.activeEditor.execCommand('mceInsertContent', false, text) // eslint-disable-line
            }
        },
        mounted() {
            let that = this
            const mf = MathLive.makeMathField(
                document.getElementById('mathfield'),
                {
                    virtualKeyboardMode: 'manual',
                    onContentDidChange: (mf) => {
                        console.log(mf.getValue());
                        that.latexData = mf.getValue()
                    },
                });
            mf.$setConfig(
                //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
            );
            that.latexData = mf.getValue()
        }
    }
</script>

<style>
    .tox.tox-silver-sink.tox-tinymce-aux {
        display: none;
    }

    .ML__virtual-keyboard-toggle {
        color: gray !important;
    }

    #mathfield, .latexData {
        font-size: 32px;
        margin: 3em;
        padding: 8px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, .3);
        box-shadow: 0 0 8px rgba(0, 0, 0, .2)
    }
</style>

