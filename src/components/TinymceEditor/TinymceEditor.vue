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
                        'insertdatetime media table paste code help wordcount codesample code textpattern markdown lists advlist faketable'
                    ],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help | addFormula | code markdown numlist bullist faketable',
                    textpattern_patterns: [
                        {start: '*', end: '*', format: 'italic'},
                        {start: '**', end: '**', format: 'bold'},
                        {start: '#', format: 'h1'},
                        {start: '##', format: 'h2'},
                        {start: '###', format: 'h3'},
                        {start: '####', format: 'h4'},
                        {start: '#####', format: 'h5'},
                        {start: '######', format: 'h6'},
                        {start: '1. ', cmd: 'InsertOrderedList'},
                        {start: '* ', cmd: 'InsertUnorderedList'},
                        {start: '- ', cmd: 'InsertUnorderedList'}
                    ],
                    directionality : 'rtl',
                    auto_focus: 'editor',
                    branding: false,
                    that: this,
                    icons: 'markdown-labs-demo',
                    setup:function(editor){
                        // You can do what you want here
                        // like adding custom buttons
                        editor.ui.registry.addButton('addFormula', {
                            text: 'Add Formula',
                            icon: 'character-count',
                            onAction: () => { this.that.addTextToEditor('$' + this.that.latexData + '$') }
                        });
                        tinymce.IconManager.add('markdown-labs-demo', { // eslint-disable-line
                            icons: {
                                markdown: `<?xml version="1.0" encoding="UTF-8"?>
        <svg width="24px" height="24px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="markdown-mark" transform="translate(2.000000, 12.000000)" fill="#222f3e" fill-rule="nonzero">
                    <path d="M0.5,16 L0.5,0 L5.40322581,0 L10.3064516,5.88235294 L15.2096774,0 L20.1129032,0 L20.1129032,16 L15.2096774,16 L15.2096774,6.82352941 L10.3064516,12.7058824 L5.40322581,6.82352941 L5.40322581,16 L0.5,16 Z M31.1451613,16 L23.7903226,8.23529412 L28.6935484,8.23529412 L28.6935484,0 L33.5967742,0 L33.5967742,8.23529412 L38.5,8.23529412 L31.1451613,16 Z" id="Shape"></path>
                </g>
            </g>
        </svg>`
                            }
                        });

                        tinymce.PluginManager.add('faketable', function (editor) { // eslint-disable-line
                            editor.ui.registry.addButton('faketable', {
                                name: 'faketable',
                                text: 'non-markdown-table',
                                onAction: function (buttonApi) { // eslint-disable-line
                                    editor.insertContent('<table><tbody><tr><th>No</th></tr></tbody></table>');
                                }
                            });
                        });
                    },
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

    .tox.tox-tinymce {
        margin: 0 100px;
    }
</style>

