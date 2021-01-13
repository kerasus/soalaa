<template>
    <v-container :fluid="true" dir="rtl">
        <v-form>
            <v-sheet color="#f4f4f4">
                <v-row>
                    <v-col :md="3">
                        <v-select label="آزمون" :items="quizList.list" item-text="title" item-value="id" v-model="selectedQuizzes" multiple dense :disabled="editMode" outlined />
                    </v-col>
                    <v-col :md="2">
                        <v-btn @click="selectAllExams" color="secondary">انتخاب همه آزمون ها</v-btn>
                    </v-col>
                    <v-col :md="2">
                        <v-select label="درس" :items="subCategoriesList.list" item-text="display_title" item-value="id" v-model="currentQuestion.sub_category_id" dense :disabled="editMode" outlined />
                    </v-col>
                    <v-col :md="2">
                        <v-text-field :label="'ترتیب در ' + getQuizById(selectedQuizzes[index - 1]).title" v-model="getExamById(selectedQuizzes[index - 1]).order" type="number" :disabled="editMode" outlined  v-for="index in selectedQuizzes.length" :key="index" />
                    </v-col>
                    <v-col :md="3" @click="submitQuestion" type="submit">
                        <v-btn color="primary" block>ثبت سوال</v-btn>
                    </v-col>
                    <v-col :md="6" class="pl-5">
                        <v-textarea dir="rtl"
                                    clearable
                                    outlined
                                    clear-icon="mdi-close-circle"
                                    auto-grow
                                    label="متن سوال"
                                    v-model="currentQuestion.statement"
                                    @input="updateRendered"
                                    @change="replaceNimFasele"
                        ></v-textarea>
                    </v-col>
                    <v-col :md="1">
                        <v-btn outlined icon @click="underlineStatement">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="boldStatement">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="spaceStatement">
                            <v-icon>mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="hideForKonkoor">
                            <v-icon>mdi-eye-off</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addImageStatement">
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col :md="5">
                        <div class="renderedPanel" v-html="questRendered">
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-radio-group v-model="trueChoiceIndex">
                <v-row v-for="index in 4" :key="index" :style="{ 'border-bottom': '1px solid #ececec' }">
                    <v-col class="pl-5" :md="5">
                        <v-textarea dir="rtl"
                                      clearable
                                      clear-icon="mdi-close-circle"
                                      auto-grow
                                      :label="choiceNumber[index -1]"
                                      v-model="currentQuestion.choices.list[index - 1].title"
                                      @input="updateRendered"
                        ></v-textarea>
                    </v-col>
                    <v-col :md="2">
        <!--                <v-checkbox @click="changeTrueChoice(index - 1)" v-model="choicesMarkdownText[index - 1].true" />-->
                        <v-radio :value="index - 1" />
                        <v-btn outlined icon @click="underlineChoice(currentQuestion.choices.list[index - 1])">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="boldChoice(currentQuestion.choices.list[index - 1])">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="spaceChoice(currentQuestion.choices.list[index - 1])">
                            <v-icon>mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addImageChoice(currentQuestion.choices.list[index - 1])">
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                    </v-col>
                    <v-col :md="5">
                        <div class="renderedPanel" v-html="choiceRendered[index - 1]">
                        </div>
                    </v-col>
                </v-row>
            </v-radio-group>
        </v-form>
        <hr>
        <div id="mathfield" locale="fa">x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}</div>
        <div class="latexData" v-html="latexData"></div>
        <v-text-field full-width label="url" v-model="url" dir="ltr"/>

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
    import {QuizList} from "@/models/Quiz";
    import Toasted from 'vue-toasted';
    // import 'katex/dist/katex.min.css';
    import 'github-markdown-css/github-markdown.css';
    import Assistant from "@/plugins/assistant";
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";
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
    import Vue from 'vue'
    Vue.use(Toasted)
    export default {
        name: "QuestEditor",
        data: () => {
            return {
                test: [true, false, false, false],
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
                fieldId: [0],
                questionData: {
                    statement: '',
                    category_id: '',
                    sub_category_id: 1,
                    order: [],
                    choices: [
                        {
                            title: '',
                            order: 1,
                            answer: false
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
                currentQuestion: new Question(),
                url: '',
                editMode: false,
                quizList: new QuizList(),
                subCategoriesList: new QuestSubcategoryList(),
                selectedQuizzes: [],
                exams: []
            }
        },
        methods: {
            addImageChoice (choice) {
                if (!choice.title) {
                    choice.title = ''
                }
                this.currentQuestion.statement += '![](' + this.url + ')'
            },
            addImageStatement () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement += '![](' + this.url + ')'
            },
            replaceNimFasele () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement = this.currentQuestion.statement.replace('¬', '‌')
            },
            hideForKonkoor () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement += '__***این متن در نمای کنکور قابل مشاهده نیست***__'
            },
            underlineChoice (choice) {
                if (!choice.title) {
                    choice.title = ''
                }
                choice.title += '**__~~آندرلاین~~__**'
            },
            underlineStatement () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement += '**__~~آندرلاین~~__**'
            },
            boldChoice (choice) {
                if (!choice.title) {
                    choice.title = ''
                }
                choice.title += '**بولد**'
            },
            boldStatement () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement += '**بولد**'
            },
            spaceChoice (choice) {
                if (!choice.title) {
                    choice.title = ''
                }
                choice.title += '                   '
            },
            spaceStatement () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement += '                   '
            },
            getExamById (quizId) {
                return this.exams.find((quiz) => quiz.id === quizId )
            },
            getQuizById (quizId) {
                return this.quizList.list.find((quiz) => quiz.id === quizId )
            },
            updateRendered () {
                this.replaceNimFasele()
                this.questRendered = md.render(this.currentQuestion.statement.toString());
                for (let i = 0; i < 4; i++) {
                    const title = this.currentQuestion.choices.list[i].title
                    if (title) {
                        this.choiceRendered[i] = md.render(title.toString())
                    }
                }
            },
            ping() {

            },
            displayKeystroke() {

            },
            selectAllExams () {
                if (this.selectedQuizzes.length !== this.quizList.list.length) {
                    this.selectedQuizzes = []
                    this.quizList.list.forEach((item) => { this.selectedQuizzes.push(item.id) })
                }
            },
            submitQuestion () {
                if (this.editMode) {
                    this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
                    this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
                    this.currentQuestion.update('/3a/api/question/' + this.currentQuestion.id )
                        .then(() => {
                            this.$toasted.show('ویرایش با موفقیت انجام شد', {
                                theme: "toasted-primary",
                                position: "top-right",
                                duration : 2000
                            })
                        }).catch((error) => {
                        Assistant.handleAxiosError(this.$toasted, error)
                        // this.$toasted.show('hello billo')
                    })
                    return
                }

                this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
                this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
                this.currentQuestion.exams = this.exams
                this.currentQuestion.create()
                    .then(() => {
                        this.currentQuestion.statement = ''
                        this.currentQuestion.choices.list.forEach((item) => { item.title = '' })
                        this.$toasted.show('ثبت با موفقیت انجام شد', {
                            theme: "toasted-primary",
                            position: "top-right",
                            duration : 2000
                        })
                    }).catch((error) => {
                    Assistant.handleAxiosError(this.$toasted, error)
                    // this.$toasted.show('hello billo')
                })

            }
            // changeTrueChoice (index) {
            //     for (let i = 0; i < 4; i++) {
            //         if (i === index) {
            //
            //         }
            //     }
            // }
        },
        // computed : {
        //     subCategories () {
        //         const sub_categories = []
        //         for (let i = 0; i < this.categories.list.length; i++) {
        //             for (let j = 0; j < this.categories.list[i].sub_categories.list.length; j++) {
        //                 sub_categories.push({ category: this.categories.list[i].title, sub_category: this.this.categories.list[i].sub_categories.list[j] })
        //             }
        //         }
        //         return sub_categories
        //     }
        // },
        mounted() {

            // this.rendered = md.render();
            // this.updateRendered();

            let that = this
            const mf = MathLive.makeMathField(
                document.getElementById('mathfield'),
                {
                    virtualKeyboardMode: 'manual',
                    onContentDidChange: (mf) => {
                        that.latexData = mf.getValue()
                    },
                });
            // mf.$setConfig(
            //     //{ macros: { ...mf.getConfig('macros'), smallfrac: '{}^{#1}\\!\\!/\\!{}_{#2}', }, }
            // );
            that.latexData = mf.getValue()
        },
        created() {
            this.editMode = this.$route.name === 'quest.edit'
            new QuizList().fetch().then((response) => {
                this.quizList = new QuizList(response.data.data)
            }).catch((error) => {
                Assistant.handleAxiosError(this.$toasted, error)
            })
            this.subCategoriesList.fetch().then((response) => {
                this.subCategoriesList = new QuestSubcategoryList(response.data)
            }).catch((error) => {
                Assistant.handleAxiosError(this.$toasted, error)
            })
            if (this.editMode) {
                this.currentQuestion.show(null, '/3a/api/question/' + this.$route.params.id)
                    .then((response) => {
                        this.currentQuestion = new Question(response.data.data)
                        this.trueChoiceIndex = this.currentQuestion.choices.list.findIndex((item) => item.answer )
                        console.log(this.trueChoiceIndex)
                    }).catch((error) => {
                        Assistant.handleAxiosError(this.$toasted, error)
                    })
            } else {
                this.currentQuestion = new Question(this.questionData)
                this.selectedQuizzes.push(this.quizList.list[0].id)
            }
        },
        watch: {
            'selectedQuizzes': function () {
                this.exams = []
                this.selectedQuizzes.forEach((item) => { this.exams.push({ id: item, order: null }) })
            }
        }
    }
</script>

<style scoped>

</style>
