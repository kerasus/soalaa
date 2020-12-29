<template>
    <div dir="ltr">

        <v-row>
            <v-col class="pl-5">
                <v-textarea dir="rtl"
                            clearable
                            clear-icon="mdi-close-circle"
                            auto-grow
                            label="متن سوال"
                            v-model="questMarkdownText"
                            @input="updateRendered"
                ></v-textarea>
            </v-col>
            <v-col>
                <div class="renderedPanel" v-html="rendered">
                </div>
            </v-col>
        </v-row>

        <hr>
        <div id="mathfield" locale="fa">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</div>
        <div class="latexData" v-html="latexData"></div>

<!--        <div dir="rtl" v-katex:auto>-->
<!--                        این یک فرمول ریاضی هست-->
<!--            <span dir="ltr">\(x=\frac{-b\pm\sqrt[]{b^2-4aca}}{2a}\)</span>-->
<!--                        ببینید جوابش چی میشه؟-->
<!--        </div>-->
<!--        <hr>-->
<!--        <div v-katex:auto>-->
<!--            \(x=\frac{-b\pm\sqrt[]{b^2-4aca}}{2a}\)-->
<!--        </div>-->

    </div>
</template>
<style>
    .renderedPanel {
        direction: rtl;
    }
    .renderedPanel .katex {
        direction: ltr;
    }
    .renderedPanel strong>strong>s {
        text-decoration: underline;
        text-underline-position: under;
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
<script>
    // import Vue from 'vue';
    import MathLive from 'mathlive';
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'


    // import 'katex/dist/katex.min.css';
    import 'github-markdown-css/github-markdown.css';
    var md = require('markdown-it')(),
        mk = require('markdown-it-katex');
    md.use(mk);

    // import VueKatex from 'vue-katex';
    // import 'katex/dist/katex.min.css';
    // Vue.use(VueKatex, {
    //     globalOptions: {
    //         //... Define globally applied KaTeX options here
    //     }
    // });

    // import Vue from 'vue'
    // import MathLive from "https://unpkg.com/mathlive/dist/mathlive.min.mjs";
    // import Mathfield from "https://unpkg.com/mathlive/dist/vue-mathlive.mjs";
    //
    // Vue.use(Mathfield, MathLive);

    // import Vue from 'vue'
    // import MathLive from 'mathlive/dist/mathlive.js'
    // import Mathfield from 'mathlive/dist/vue-mathlive.mjs'
    //
    // Vue.use(Mathfield, MathLive);

    export default {
        name: "QuestEditor",
        data: () => {
            return {
                questMarkdownText: '# Math Rulez! \n  $x=\\frac{-b\\pm\\sqrt[]{b^2-4ac}}{2a}$',
                rendered: '',
                formula: '',
                latexData: null
            }
        },
        methods: {
            updateRendered () {
                this.rendered = md.render(this.questMarkdownText);
            },
            ping() {

            },
            displayKeystroke() {

            }
        },
        mounted() {

            // this.rendered = md.render();
            // this.updateRendered();

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

<style scoped>

</style>
