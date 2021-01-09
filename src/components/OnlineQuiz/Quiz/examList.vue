<template>
    <div >



            <div v-for="(exam) in examList.list" :key="exam.id" class="d-flex justify-center">
                <v-btn @click="selectExam(exam)" >

                    {{exam.title}}

                </v-btn>
                <br><br>

            </div>


    </div>
</template>

<script>
    import {ExamList} from "@/models/exam";

    export default {
        name: "examList",
        data: () => ({


            examList: new ExamList([
                {
                    title: 'آزمون اول',
                    holding_status:'',
                    start_at:'10صبح',
                    finish_at:'',
                    price:'',
                    delay_time:'',
                    id: 1
                }, {
                    title: 'آزمون دوم',
                    start_at:'11 صبح',
                    id: 2
                }, {
                    title: 'آزمون سوم',
                    id: 3
                }, {
                    title: 'آزمون چهارم',
                    id: 4
                }, {
                    title: 'آزمون پنجم',
                    id: 5
                }, {
                    title: 'آزمون ششم',
                    id: 6
                },


            ])

        }),
        methods:{
            selectExam(item){
                this.$emit('update-exam-id', item)
            }
        }
    }
</script>

<style scoped>

</style>
