<template>
    <v-container :fluid="true">
        <v-row>
            <v-col :md="2">
                <map-of-questions />
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
                            <choice />
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
    import Choice from "./Choice";
    import MapOfQuestions from "./MapOfQuestions";
    export default {
        name: "Quiz",
        components: {
            Choice,
            MapOfQuestions
        },
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
</style>
