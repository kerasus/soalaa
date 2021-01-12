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
                        ></v-textarea>
                    </v-col>
                    <v-col :md="6">
                        <div class="renderedPanel" v-html="questRendered">
                        </div>
                    </v-col>
                </v-row>
            </v-sheet>
            <v-radio-group v-model="trueChoiceIndex">
                <v-row v-for="index in 4" :key="index" :style="{ 'border-bottom': '1px solid #ececec' }">
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
                        <v-radio :value="index - 1" :disabled="editMode" />
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
        <v-text-field readonly full-width :value="'![](' + url + ')'" dir="ltr"/>

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
            getExamById (quizId) {
                return this.exams.find((quiz) => quiz.id === quizId )
            },
            getQuizById (quizId) {
                return this.quizList.list.find((quiz) => quiz.id === quizId )
            },
            updateRendered () {
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
                    alert('چاپ ستون متخصصان دنیای سطرآنچنان گرافیک تایپ با برای استفاده امید تمام در شرایط طراحان حروفچینی هدف داشت موجود آینده کاربردی ساختگی سادگی تا از فراوان و خلاقی ایجاد در دنیای شامل بهبود اصلی موجود می درصد با طراحان رسد و و تمام و حروفچینی دنیای توان بلکه طراحان تولید لازم مورد امید هدف نیاز شامل می موجود داشت علی دستاوردهای و سخت ای مورد با می روزنامه این طراحان لازم و پیوسته در استفاده رسد و آینده داشت نیاز اهل دستاوردهای پیشرو ارائه داشت پیوسته شناخت آینده نرم گیرد را سادگی تولید با زیادی تایپ سوالات امید شامل لازم طلبد تولید می طراحان در نیاز سوالات مورد شناخت نرم ایجاد طراحان بلکه را آینده کاربردی سخت خلاقی تکنولوژی زیادی علی سطرآنچنان سوالات را ای پایان ایپسوم شامل توان و با و مورد ساختگی افزارها خلاقی صنعت را گرافیک رایانه شناخت نامفهوم زیادی پایان و کردsدر هدف نیاز بیشتری شناخت و و ارائه زبان و درصد تولید پیشرو مورد متخصصان در راهکارها توان و خلاقی شصت و با جامعه و رسد است چاپگرها روزنامه ایپسوم بلکه متون طراحی طلبد مجله اساسا \n')
                    return
                }

                this.currentQuestion.choices.list.forEach((item) => { item.answer = false })
                this.currentQuestion.choices.list[this.trueChoiceIndex].answer = true
                this.currentQuestion.exams = this.exams
                // this.currentQuestion.lesson = this.selec
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
            this.currentQuestion = new Question(this.questionData)
            this.editMode = this.$route.name === 'quest.edit'
            new QuizList().fetch().then((response) => {
                this.quizList = new QuizList(response.data.data)
                this.selectedQuizzes.push(this.quizList.list[0].id)
            }).catch((error) => {
                Assistant.handleAxiosError(this.$toasted, error)
            })
            this.subCategoriesList.fetch().then((response) => {
                this.subCategoriesList = new QuestSubcategoryList(response.data)
            }).catch((error) => {
                Assistant.handleAxiosError(this.$toasted, error)
            })
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
