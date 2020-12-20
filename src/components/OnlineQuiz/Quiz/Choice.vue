<template>
    <v-col :md="6" class="answer-box" @click="answerClicked">
        <v-sheet :class="{ 'answer-sheet': true, active: choice.active }">
            <div class="answer-text">
                {{ choice.body }}
            </div>
            <div class="answer-checkbox">
                <v-checkbox v-model="choice.active" disabled />
            </div>
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

<style>
    .answer-box .mdi-checkbox-marked::before,
    .answer-box .mdi-checkbox-blank-outline {
        size: 40px;
        font-size: 40px;
    }
</style>

<style scoped>
    .answer-box {
        display: flex;
        justify-content: center;
        height: 135px;
        align-items: center;
    }

    .answer-sheet {
        background: #fff;
        width: 100%;
        height: 100%;
        padding: 2% 3%;
        border-radius: 10px;
        cursor: pointer;
        transition: all ease 0.3s;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    /*.answer-sheet:hover {*/
    /*    background: rgba(245, 208, 22, 0.2);*/
    /*}*/

    .answer-text {
        height: 100%;
        width: 100%;
        display: flex;
        color: #777;
        padding-right: 30px;
        align-items: center;
    }

    .answer-sheet.active {
        background: rgba(245, 208, 22, 0.6);
    }
    
    /*.answer-sheet.active:hover {*/
    /*    background: rgba(245, 208, 22, 0.6);*/
    /*}*/

    .answer-text {
        height: 100%;
        width: 100%;
        display: flex;
        align-content: center;
    }

    .answer-checkbox {
        height: 100%;
        width: 85px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }
</style>
