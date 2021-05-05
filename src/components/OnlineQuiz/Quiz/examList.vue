<template>
    <div >
        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title class="headline">از حذف آزمون اطمینان دارید؟</v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDelete">خیر</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteItemConfirm">بله</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-progress-linear
                color="#ffc107"
                absolute
                top
                :active="examList.loading"
                indeterminate
                rounded
                height="6"
        ></v-progress-linear>
        <v-simple-table v-if="!examList.loading">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-right">
                        عنوان
                    </th>
                    <th class="text-right">
                        شروع
                    </th>
                    <th class="text-right">
                        پایان
                    </th>
                    <th class="text-right">
                        میزان تاخیر
                    </th>
                    <th class="text-right">
                        عملیات
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="item in examList.list"
                        :key="item.id"
                >
                    <td>{{ item.title }}</td>
                    <td>{{ item.shamsiDate('start_at').dateTime }}</td>
                    <td>{{ item.shamsiDate('finish_at').dateTime }}</td>
                    <td>{{ item.delay_time }} دقیقه</td>
                    <td>
                        <v-tooltip top v-if="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        color="orange"
                                        @click="selectExam(item)"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon dark>
                                        mdi-pencil
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>ویرایش</span>
                        </v-tooltip>
                        <v-tooltip top v-if="false">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        color="primary"
                                        :to="{ name: 'onlineQuiz.exams.lessons', params: { quizId: item.id}}"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon
                                            small
                                    >
                                        mdi-arrow-up-bold-box-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>مشاهده تمام سوالات</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        color="cyan"
                                        :to="{name: 'exam.results', params: {examId: item.id}}"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon
                                            small
                                    >
                                        mdi-clipboard-list-outline
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>مشاهده نتایج تمام شرکت کنندگان</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        color="light-blue"
                                        :to="{ name: 'onlineQuiz.exams.lessons', params: { quizId: item.id}}"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon
                                            small
                                    >
                                        mdi-book-open-page-variant
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>مشاهده سوالات به تفکیک درس</span>
                        </v-tooltip>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                        class="mx-2"
                                        fab
                                        dark
                                        x-small
                                        color="pink"
                                        @click="deleteItem(item)"
                                        v-bind="attrs"
                                        v-on="on"
                                >
                                    <v-icon
                                            small
                                    >
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </template>
                            <span>حذف آزمون</span>
                        </v-tooltip>

                    </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div class="text-center">
            <v-btn elevation="2" @click="selectExam(null)">
                ثبت آزمون جدید
            </v-btn>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Exam, ExamList} from "@/models/Exam";
    import Toasted from 'vue-toasted';
    Vue.use(Toasted)

    export default {
        name: 'examList',
        data: () => ({
            dialog: false,
            dialogDelete: false,
            examList: new ExamList(),
            examItem: new Exam()
        }),
        mounted() {
            this.getExams()
        },
        methods:{
            editItem () {
                // this.editedIndex = this.desserts.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            deleteItem () {
                // this.editedIndex = this.desserts.indexOf(item)
                // this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            deleteItemConfirm () {
                // this.desserts.splice(this.editedIndex, 1)
                this.closeDelete()
            },
            save () {
                this.close()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    // this.editedItem = Object.assign({}, this.defaultItem)
                    // this.editedIndex = -1
                })
            },
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    // this.editedItem = Object.assign({}, this.defaultItem)
                    // this.editedIndex = -1
                })
            },
            getExams () {
                this.examList.loading = true
                this.examList.fetch()
                .then((response) => {
                    this.examList.loading = false
                    this.examList = new ExamList(response.data.data, {meta: response.data.meta, links: response.data.links})
                })
                .catch(() => {
                    this.examList.loading = false
                    this.examList = new ExamList()
                })
            },
            selectExam(item){
                this.$emit('update-exam-id', item)
            }
        }
    }
</script>

<style scoped>

</style>
