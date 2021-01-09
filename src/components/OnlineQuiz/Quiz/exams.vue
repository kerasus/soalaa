<template>
    <v-row>

        <v-col cols="4">
            <exam-list @update-exam-id="updateExamId"/>
        </v-col>
        <v-col >
            <exam-info :exam="exam"/>
        </v-col>
    </v-row>

</template>

<script>
    import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
    import ExamList from "@/components/OnlineQuiz/Quiz/examList";

    export default {
        name: "exams",
        data: () => ({

            exam: {}
        }),
        components: {ExamList, ExamInfo},
        methods:{
            updateExamId(e){
                this.exam = e
            }
        }
    }
</script>

<style scoped>

</style>
