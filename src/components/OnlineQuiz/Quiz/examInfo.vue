<template>
    <div class="d-flex justify-center">
        <v-col cols="8">

            <v-row>

                <v-text-field label="عنوان" v-model="exam.title">
                    {{exam.title}}
                </v-text-field>

            </v-row>
            <v-row>
                <v-text-field label="وضعیت" v-model="exam.holding_status">

                </v-text-field>
            </v-row>
            <v-row>

                <v-text-field label="زمان شروع" v-model="exam.start_at">

                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="زمان پایان" v-model="exam.finish_at">

                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="قیمت" v-model="exam.price">

                </v-text-field>
            </v-row>
            <v-row>
                <v-text-field label="زمان تاخیر" v-model="exam.delay_time">
                </v-text-field>

            </v-row>
        </v-col>
    </div>
</template>

<script>
    import {Exam} from "@/models/exam";

    export default {
        name: "examInfo",
        props:[ 'examId' ],
        data: () => ({


            exam: new Exam()

        }),
    }
</script>

<style scoped>

</style>
