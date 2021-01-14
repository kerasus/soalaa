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
                        <div v-for="index in selectedQuizzes.length" :key="index">
                            <v-text-field
                                    v-if="typeof getQuizById(selectedQuizzes[index - 1]) !== 'undefined' && typeof getExamById(selectedQuizzes[index - 1]) !== 'undefined'"
                                    :label="'ترتیب در ' + getQuizById(selectedQuizzes[index - 1]).title"
                                    v-model="getExamById(selectedQuizzes[index - 1]).order"
                                    type="number"
                                    :disabled="editMode"
                                    outlined
                            />
                        </div>
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
                    <v-col :md="1">
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', '**__~~آندرلاین~~__**')">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', '**بولد**')">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', whiteSpace)">
                            <v-icon>mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', '__***این متن در نمای کنکور قابل مشاهده نیست***__')">
                            <v-icon>mdi-eye-off</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', '![](' + url + ')')">
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion, 'statement', renderMatrixKatex())">
                            <v-icon>mdi-matrix</v-icon>
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
                        <v-textarea v-if="typeof currentQuestion.choices.list[index - 1] !== 'undefined'"
                                    dir="rtl"
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
                        <v-btn outlined icon @click="addString(currentQuestion.choices.list[index - 1], 'title', '**__~~آندرلاین~~__**')">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion.choices.list[index - 1], 'title', '**بولد**')">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion.choices.list[index - 1], 'title', whiteSpace)">
                            <v-icon>mdi-keyboard-space</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion.choices.list[index - 1], 'title', '![](' + url + ')')">
                            <v-icon>mdi-image</v-icon>
                        </v-btn>
                        <v-btn outlined icon @click="addString(currentQuestion.choices.list[index - 1], 'title', renderMatrixKatex())">
                            <v-icon>mdi-matrix</v-icon>
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
        <v-sheet width="500px">
            <v-container :fluid="true">
                <v-row>
                    <v-col :md="2">
                        <v-text-field label="عرض" outlined dense v-model="matrixWidth" type="number" @input="initMatrix"/>
                    </v-col>
                    <v-col :md="2">
                        <v-text-field label="ارتفاع" outlined dense v-model="matrixHeight" type="number" @input="initMatrix"/>
                    </v-col>
                </v-row>
                <div dir="ltr">
                    <v-row v-for="indexY in parseInt(matrixTempHeight)" :key="indexY">
                        <v-col v-for="indexX in parseInt(matrixTempWidth)" :key="indexX">
                            <v-text-field v-model="matrix[indexY - 1][indexX - 1]" outlined :label="'(' + indexX + ', ' + indexX + ')'" dense></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-btn @click="initMatrix">ایجاد ماتریکس</v-btn>
                        </v-col>
                    </v-row>
                </div>
            </v-container>
        </v-sheet>

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

<script>
    import '@/assets/scss/markdownKatex.scss'
    import MathLive from 'mathlive';
    import 'mathlive/dist/mathlive-fonts.css'
    import 'mathlive/dist/mathlive-static.css'
    import { Question } from '@/models/Question'
    import {QuizList} from "@/models/Quiz";
    import Toasted from 'vue-toasted';
    import Assistant from "@/plugins/assistant";
    import {QuestSubcategoryList} from "@/models/QuestSubcategory";
    import Vue from 'vue'
    Vue.use(Toasted)

    var md = require('markdown-it')(),
        mk = require('markdown-it-katex');
    md.use(mk);

    export default {
        name: 'CreateOrEdit',
        data: () => {
            return {
                whiteSpace: '                   ',
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
                exams: [],
                matrixWidth: 1,
                matrixHeight: 1,
                matrixTempWidth: 1,
                matrixTempHeight: 1,
                matrix: [[]]
            }
        },
        methods: {
            initMatrix () {
                this.matrix = []
                let row = []
                for (let i = 0; i < this.matrixHeight; i++) {
                    row = []
                    for (let j = 0; j < this.matrixWidth; j++) {
                        row.push(0)
                    }
                    this.matrix.push(row)
                }
                this.matrixTempWidth = this.matrixWidth
                this.matrixTempHeight = this.matrixHeight
            },
            renderMatrixKatex () {
                let matrixKatex = ''
                matrixKatex += '$$\\begin{bmatrix}'
                for (let i = 0; i < this.matrixTempHeight; i++) {
                    for (let j = 0; j < this.matrixTempWidth; j++) {
                        matrixKatex += this.matrix[i][j]
                        if (j !== this.matrixTempWidth - 1) {
                            matrixKatex += ' & '
                        }
                    }
                    if (i !== this.matrixTempHeight - 1) {
                        matrixKatex += ' \\\\ '
                    }
                }
                matrixKatex += '\\end{bmatrix}$$'
                // this.matrixTempHeight = 1
                // this.matrixTempWidth = 1
                return matrixKatex
            },
            replaceNimFasele () {
                if (!this.currentQuestion.statement) {
                    this.currentQuestion.statement = ''
                }
                this.currentQuestion.statement = this.currentQuestion.statement.replace('¬', '‌')
            },
            addString (elem, key, string) {
                if (!elem[key]) {
                    elem[key] = ''
                }
                Vue.set(elem, key, elem[key] + string)
                this.updateRendered()
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
                    const title = (typeof this.currentQuestion.choices.list[i] !== 'undefined') ? this.currentQuestion.choices.list[i].title : null
                    if (title) {
                        this.choiceRendered[i] = md.render(title.toString())
                    }
                }
                this.replaceNimFasele()
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
                if (!this.editMode) {
                    this.selectedQuizzes.push(this.quizList.list[0].id)
                }
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
                        this.updateRendered()
                    }).catch((error) => {
                    Assistant.handleAxiosError(this.$toasted, error)
                })
            } else {
                this.currentQuestion = new Question(this.questionData)
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

<style scoped>

</style>
