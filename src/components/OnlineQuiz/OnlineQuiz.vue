<template>
    <v-container :fluid="true">
        <v-row>
            <v-col :md="2">
                <v-sheet color="#f1f1f1" width="100%">

                </v-sheet>
            </v-col>
            <v-col :md="10">
                <v-sheet width="100%">
                    <v-row>
                        <v-col :md="1"></v-col>
                        <v-col :md="10">
                            <v-row class="question-header">
                                <div class="question-number">
                                    <p>ادبیات فارسی - سوال شماره 9</p>
                                </div>
                                <div class="question-buttons">
                                    <v-btn icon>
                                        <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                    <v-btn icon>
                                        <v-icon>mdi-heart-outline</v-icon>
                                    </v-btn>
                                </div>
                            </v-row>
                            <v-row class="question-body">
                                <v-col>
                                    <p>متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال متن سوال
                                        متن سوال متن سوال متن سوال </p>
                                </v-col>
                            </v-row>
                            <v-row class="question-answers">
                                <v-col :md="6" class="answer-box" v-for="item in answers" :key="item.id" @click="answerClicked(item.id)">
                                    <v-sheet :class="{ 'answer-sheet': true, active: item.active }">
                                        <div class="answer-text">
                                            {{ item.body }}
                                        </div>
<!--                                        <div class="answer-checkbox">-->
<!--                                            <v-checkbox v-model="item.active" disabled />-->
<!--                                        </div>-->
                                    </v-sheet>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col :md="1"></v-col>
                    </v-row>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    // const inputText;
    // document.getElementById('textfield').addEventListener('change', handler())
    // function handler() {
    //     inputText = document.getElementById('textfield').innerText
    // }
    export default {
        name: "OnlineQuiz",
        data () {
            return {
                answers: [
                    {
                        id: 0,
                        body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                        active: false
                    },
                    {
                        id: 1,
                        body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                        active: false
                    },
                    {
                        id: 2,
                        body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                        active: false
                    },
                    {
                        id: 3,
                        body: 'جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب جواب ',
                        active: false
                    }
                ]
            }
        },
        methods: {
            answerClicked (id) {
                console.log(id)
                for (let i = 0; i < this.answers.length; i++) {
                    if (this.answers[i].id !== id) {
                        this.answers[i].active = false
                    } else {
                        this.answers[i].active = true
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .question-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .question-body {
        margin-top: 50px;
        line-height: 35px;
    }

    .question-answers {
        margin-top: 50px;
    }

    .answer-box {
        display: flex;
        justify-content: center;
        min-height: 110px;
        align-items: center;
    }

    .answer-sheet {
        transition: all ease-in-out 0.3s;
        background: #f1f1f1;
        width: 90%;
        min-height: 100px;
        padding: 2% 3%;
        border-radius: 10px;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .answer-sheet.active {
        width: 100%;
    }

    .answer-sheet:hover {
        background: #e1e1e1;
    }

    .answer-text {
        height: 100%;
        width: 100%;
        display: flex;
        align-content: center;
    }

    .answer-checkbox {
        height: 100%;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }

    .answer-sheet.active .answer-checkbox {
        width: 120px;
    }
</style>
