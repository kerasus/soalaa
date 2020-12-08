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
                                <v-col :md="6" class="answer-box">
                                    <v-sheet class="answer-sheet">
                                        <div class="answer-text">
                                            واب سوال جواب سوال جواب سوال جواب سوال جواب سوال جواب سوال جواب سوال
                                        </div>
                                        <div class="answer-checkbox"></div>
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
            return {}
        },
        methods: {

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
        height: 135px;
        align-items: center;
    }

    .answer-sheet {
        background: #f1f1f1;
        width: 90%;
        height: 100px;
        padding: 2% 3%;
        border-radius: 10px;
        cursor: pointer;
        transition: all ease-in-out 0.3s;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
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
    }
</style>
