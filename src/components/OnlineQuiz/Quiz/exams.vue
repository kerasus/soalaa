<template>
    <v-row>

        <v-col cols="4">
            <exam-list/>
        </v-col>
        <v-col >
            <exam-info/>
        </v-col>
    </v-row>

</template>

<script>
    import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
    import ExamList from "@/components/OnlineQuiz/Quiz/examList";

    export default {
        name: "exams",
        components: {ExamList, ExamInfo}
    }
</script>

<style scoped>

</style>
