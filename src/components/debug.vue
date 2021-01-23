<template>
    <BubbleSheet :info="{ type: 'pasokh-nameh' }" />
</template>

<script>
    import BubbleSheet from "@/components/OnlineQuiz/Quiz/BubbleSheet/BubbleSheet";
    // import FakeQuizData from "@/plugins/fakeQuizData";
    import {mixinQuiz} from "@/mixin/Mixins";
    import {Exam} from '@/models/exam'
    export default {
        name: 'debug',
        components: {BubbleSheet},
        mixins: [mixinQuiz],
        created() {
            this.quiz = new Exam(this.quizData)
        },
        data () {
            return {
                quizData: null
            }
        }
    }
</script>
