<template>
    <BubbleSheet :info="{ type: 'pasokh-nameh' }" />
</template>

<script>
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    import FakeQuizData from "@/plugins/fakeQuizData";
    import {mixinQuiz} from "@/mixin/Mixins";
    import {Quiz} from "@/models/Quiz";
    export default {
        name: 'debug',
        components: {BubbleSheet},
        mixins: [mixinQuiz],
        created() {
            this.quiz = new Quiz(this.quizData)
        },
        data () {
            return {
                quizData: FakeQuizData
            }
        }
    }
</script>