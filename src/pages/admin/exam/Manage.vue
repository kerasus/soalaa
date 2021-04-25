<template>
    <v-container>
        <v-row>
            <v-col col-lg="7" cols="12">
                <exam-list @update-exam-id="updateExamId" ref="examList"/>
            </v-col>
            <v-col>
                <exam-info col-lg="5" cols="12" :exam="exam" @refresh-exam-list="rereshExamList"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
    import ExamList from "@/components/OnlineQuiz/Quiz/examList";
    import {Exam} from "@/models/Exam";

    export default {
        name: 'Manage',
        data: () => ({
            exam: new Exam()
        }),
        components: {ExamList, ExamInfo},
        methods: {
            rereshExamList () {
                this.$refs.examList.getExams()
            },
            updateExamId(e){
                this.exam = new Exam(e)
            }
        }
    }
</script>

<style scoped>

</style>
