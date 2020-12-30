<template>
    <div class="mt-4">
        <vue-markdown :source="text"></vue-markdown>
        <v-textarea outlined v-model="text"></v-textarea>
        <div dir="ltr">
            <div id="mathfield" locale="fa">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</div>
            <div class="latexData" v-html="latexData"></div>
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown'
    import MathLive from 'mathlive';
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'

    export default {
        name: "TinymceEditor",
        data () {
            return {
                formula: '',
                latexData: null,
                text: 'hi'
            }
        },
        components: {
            VueMarkdown
        },
        methods: {
            // addTextToEditor (text = '') {
            //     tinymce.activeEditor.execCommand('mceInsertContent', false, text) // eslint-disable-line
            // }
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

