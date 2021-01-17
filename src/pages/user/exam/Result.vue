<template>
    <div>
        result
    </div>
</template>

<script>
    import {Exam} from "@/models/exam";

    export default {
        name: "Result",
        data: () => ({
            exam: new Exam()
        }),
        created() {
            this.exam.user_exam_id = this.$route.params.user_exam_id
            this.exam.getAnswerOfUserInResultPage()
            .then( (response) => {
                console.log('response', response)
            })
            .catch( () => {
                this.$router.push({ name: 'user.exam.list'})
            })
        }
    }
</script>

<style scoped>

</style>
