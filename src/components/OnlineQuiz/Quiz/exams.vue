<template>
    <v-row>
        <v-col cols="4">
            <exam-list @update-exam-id="updateExamId" ref="examList"/>
        </v-col>
        <v-col>
            <exam-info :exam="exam" @refresh-exam-list="rereshExamList"/>
        </v-col>
    </v-row>
</template>

<script>
    import ExamInfo from "@/components/OnlineQuiz/Quiz/examInfo";
    import ExamList from "@/components/OnlineQuiz/Quiz/examList";
    import {Exam} from "@/models/exam";

    export default {
        name: 'exams',
        data: () => ({
            exam: new Exam()
        }),
        components: {ExamList, ExamInfo},
        methods: {
            rereshExamList () {
                console.log('rereshExamList1')
                this.$refs.examList.getExams()
            },
            updateExamId(e){
                this.exam = new Exam(e)
            }
        }
    }
</script>
