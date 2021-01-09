<template>
    <v-container :fluid="true" dir="rtl">
        <v-row>
            <v-col :md="5" class="pl-5">
                <v-textarea dir="rtl"
                            clearable
                            clear-icon="mdi-close-circle"
                            auto-grow
                            label="متن سوال"
                            v-model="currentQuestion.statement"
                            @input="updateRendered"
                ></v-textarea>
            </v-col>
            <v-col :md="5">
                <div class="renderedPanel" v-html="questRendered">
                </div>
            </v-col>
            <v-col :md="2">
                <v-select lable="آزمون" :items="fields" v-model="currentQuestion.exam_id" />
                <v-select lable="درس" :items="fields" v-model="field" />
            </v-col>
        </v-row>
        <v-radio-group v-model="trueChoiceIndex">
            <v-row v-for="index in 4" :key="index">
                <v-col class="pl-5" :md="5">
                    <v-text-field dir="rtl"
                                  clearable
                                  clear-icon="mdi-close-circle"
                                  auto-grow
                                  :label="choiceNumber[index -1]"
                                  v-model="currentQuestion.choices.list[index - 1].title"
                                  @input="updateRendered"
                    ></v-text-field>
                </v-col>
                <v-col :md="2">
    <!--                <v-checkbox @click="changeTrueChoice(index - 1)" v-model="choicesMarkdownText[index - 1].true" />-->
                    <v-radio :value="index - 1" />
                </v-col>
                <v-col :md="5">
                    <div class="renderedPanel" v-html="choiceRendered[index - 1]">
                    </div>
                </v-col>
            </v-row>
        </v-radio-group>
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

    </v-container>
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
    import { Question } from '@/models/Question'


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
                choicesMarkdownText: ['', '', '', ''],
                questRendered: '',
                formula: '',
                choiceRendered: ['', '', '', ''],
                latexData: null,
                choiceNumber: {
                    0: 'الف ',
                    1: 'ب ',
                    2: 'ج ',
                    3: 'د '
                },
                trueChoiceIndex: 0,
                field: 'ریاضی',
                fields: ['ریاضی', 'تجربی', 'انسانی'],
                questionData: {
                    statement: '',
                    exam_id: '',
                    category_id: '',
                    sub_category_id: '',
                    order: '',
                    choices: [
                        {
                            title: '',
                            order: 1,
                            answer: true
                        },
                        {
                            title: '',
                            order: 2,
                            answer: false
                        },
                        {
                            title: '',
                            order: 3,
                            answer: false
                        },
                        {
                            title: '',
                            order: 4,
                            answer: false
                        }
                    ]
                },
                currentQuestion: new Question()
            }
        },
        methods: {
            updateRendered () {
                this.questRendered = md.render(this.currentQuestion.statement);
                for (let i = 0; i < 4; i++) {
                    this.choiceRendered[i] = md.render(this.currentQuestion.choices.list[i].title)
                }
            },
            ping() {

            },
            displayKeystroke() {

            },
            // changeTrueChoice (index) {
            //     for (let i = 0; i < 4; i++) {
            //         if (i === index) {
            //
            //         }
            //     }
            // }
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
        },
        created() {
            this.currentQuestion = new Question(this.questionData)
        }
    }
</script>

<style scoped>

</style>
