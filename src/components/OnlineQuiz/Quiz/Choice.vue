<template>
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
</template>

<script>
    export default {
        name: "Choice"
    }
</script>

<style scoped>
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
