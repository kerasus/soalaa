<template>
    <v-col :md="6" :cols="12" class="answer-box" @click="answerClicked">
        <v-sheet :class="{ 'answer-sheet': true, active: choice.active }">
            <div class="answer-text renderedPanel" v-html="choiceBody"></div>
            <div class="answer-checkbox">
                <v-checkbox v-model="choice.active" disabled />
            </div>
        </v-sheet>
    </v-col>
</template>

<script>
    // import 'katex/dist/katex.min.css';
    import 'github-markdown-css/github-markdown.css';
    import '@/assets/scss/markdownKatex.scss';

    var md = require('markdown-it')(),
        mk = require('markdown-it-katex');
    md.use(mk);

    export default {
        name: "Choice",
        props: ['choice'],
        computed: {
            choiceBody() {
                return md.render(this.choice.body)
            }
        },
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
    .answer-sheet.active .theme--light.v-input--selection-controls.v-input--is-disabled:not(.v-input--indeterminate) .v-icon {
        color: #fbc10c !important;
    }
    .answer-sheet.active {
        box-shadow: 0 3px 5px -1px rgba(255, 191, 7, 0.10), 0 5px 8px 0 rgba(255, 191, 7, 0.06), 0 1px 14px 0 rgba(255, 191, 7, 0.02) !important;
    }
</style>

<style scoped>


    .answer-box {
        display: flex;
        justify-content: center;
        min-height: 135px;
        align-items: center;
    }

    .answer-sheet {
        background: #fff;
        width: 100%;
        min-height: 100px;
        height: max-content;
        padding: 2% 3%;
        border-radius: 20px;
        cursor: pointer;
        transition: all ease 0.3s;
        display: flex;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    /*.answer-sheet:hover {*/
    /*    background: rgba(245, 208, 22, 0.2);*/
    /*}*/

    .answer-text {
        height: max-content;
        width: 100%;
        display: flex;
        color: #777;
        padding-right: 30px;
        align-items: center;
    }

    .answer-sheet.active {
        background: #fffaee;
    }

    /*.answer-sheet.active:hover {*/
    /*    background: rgba(245, 208, 22, 0.6);*/
    /*}*/

    .answer-text {
        height: max-content;
        width: 100%;
        display: flex;
        align-content: center;
        align-self: center;
    }

    .answer-checkbox {
        height: 74px;
        width: 85px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all ease-in-out 0.3s;
    }
</style>
