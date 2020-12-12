<template>
    <v-col :md="6" class="answer-box" @click="answerClicked">
        <v-sheet :class="{ 'answer-sheet': true, active: choice.active }">
            <div class="answer-text">
                {{ choice.body }}
            </div>
            <!--                                        <div class="answer-checkbox">-->
            <!--                                            <v-checkbox v-model="choice.active" disabled />-->
            <!--                                        </div>-->
        </v-sheet>
    </v-col>
</template>

<script>
    export default {
        name: "Choice",
        props: ['choice'],
        methods: {
            answerClicked () {
                this.$emit('answerClicked', this.choice.id)
            }
        }
    }
</script>

<style scoped>
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
        transition: all ease 0.3s;
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

    .answer-sheet.active {
        width: 95%;
        background: #55a1ed;
        color: #fff;
        height: 120px;
    }

    .answer-sheet.active:hover {
        background: #4a9bed;
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
