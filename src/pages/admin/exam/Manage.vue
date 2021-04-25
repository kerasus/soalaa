<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <exam-list @update-exam-id="updateExamId" ref="examList"/>
            </v-col>
            <v-dialog v-model="dialog" max-width="600px">
                <v-sheet>
                    <v-row>
                        <v-btn icon :style="{ margin: '20px' }" @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-row>
                    <v-row>
                        <v-col>
                            <exam-info col-lg="5" cols="12" :exam="exam" @refresh-exam-list="rereshExamList"/>
                        </v-col>
                    </v-row>
                </v-sheet>
            </v-dialog>
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
            exam: new Exam(),
            dialog: false,
        }),
        components: {ExamList, ExamInfo},
        methods: {
            rereshExamList () {
                this.$refs.examList.getExams()
            },
            updateExamId(e){
                this.exam = new Exam(e)
                this.dialog = true
            }
        }
    }
</script>

<style scoped>

</style>
