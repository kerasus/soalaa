<template>
    <v-sheet class="map-of-questions">
        <vue-confirm-dialog />
        <div>
            <div v-for="(categoryItem) in quiz.categories.list"
             :key="'category-'+categoryItem.id">
            <div v-if="categoryItem.is_active">
                <v-btn :elevation="0" block class="categoryItem">
                    {{ categoryItem.title }}
                </v-btn>
                <v-expansion-panels
                    accordion
                    flat
                    hover
                    dense
            >
                <v-expansion-panel
                        v-for="(subcategoryItem) in categoryItem.sub_categories.list"
                        :key="'subcategory-'+subcategoryItem.id"
                >
                    <v-expansion-panel-header>
                        {{ subcategoryItem.title }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div v-for="(question) in getQuestionsOfSubcategory(subcategoryItem.id)" :key="'question-'+question.id">
                            <v-btn :class="{ active: currentQuestion.id === question.id }"
                                   :elevation="0"
                                   @click="changeQuestion(question.id)"
                                   block
                            >
                                تست شماره
                                {{ getQuestionNumberFromIndex(question.index) }}
                                <v-icon v-if="userQuizListData[quiz.id][question.id] && userQuizListData[quiz.id][question.id].status === 'x'" color="red">
                                    mdi-close
                                </v-icon>
                                <v-icon v-if="userQuizListData[quiz.id][question.id] && userQuizListData[quiz.id][question.id].status === 'o'" color="yellow" size="15">
                                    mdi-checkbox-blank-circle
                                </v-icon>
                                <v-icon v-if="userQuizListData[quiz.id][question.id] && userQuizListData[quiz.id][question.id].answered_choice_id" color="--success-1">
                                    mdi-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            </div>
        </div>
        </div>
        <v-btn @click="getConfirmation" :color="'#4caf50'" :style="{ backgroundColor: '#4caf50 !important' }" dark class="end-exam-btn">ثبت و پایان آزمون</v-btn>
    </v-sheet>
</template>

<script>
    import mixinQuiz from '@/mixin/Quiz'
    import Time from "@/plugins/time";
    import Vue from 'vue'
    import VueConfirmDialog from 'vue-confirm-dialog'

    Vue.use(VueConfirmDialog)
    Vue.component('vue-confirm-dialog', VueConfirmDialog.default)

    export default {
        name: 'SideMenu_MapOfQuestions',
        mixins: [mixinQuiz],
        data: () => ({
            currentCat: null,
        }),
        created() {
            let that = this
            this.interval = setInterval(() => {
                that.currentCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
            }, 1000)
        },
        methods: {
            getConfirmation(){
                this.$confirm(
                    {
                        message: `Are you sure?`,
                        button: {
                            no: 'No',
                            yes: 'Yes'
                        },
                        callback: confirm => {
                            if (confirm) {
                                this.sendAnswersAndFinishExam()
                            }
                        }
                    }
                )
            },
            sendAnswersAndFinishExam() {
                let that = this
                this.sendUserQuestionsDataToServerAndFinishExam(this.quiz.id, this.quiz.user_exam_id)
                    .then( () => {
                        that.$notify({
                            group: 'notifs',
                            text: 'اطلاعات آزمون شما ثبت شد.',
                            type: 'success'
                        })
                        that.$store.commit('clearExamData', that.quiz.id)
                        that.$router.push({ name: 'user.exam.list'})
                    })
                    .catch( () => {
                        that.$notify({
                            group: 'notifs',
                            title: 'توجه!',
                            text: 'مشکلی در ثبت اطلاعات آزمون شما رخ داده است. لطفا تا قبل از ساعت 24 اقدام به ارسال مجدد پاسخنامه نمایید.',
                            type: 'warn',
                            duration: 30000,
                        })
                        that.$router.push({ name: 'user.exam.list'})
                    })
            }
        }
    }
</script>

<style>
.end-exam-btn .v-btn__content {
    display: flex;
    justify-content: center !important;
}

.map-of-questions {
    min-height: 42px !important;
    width: 80%;
    height: calc(100% - 200px);
    margin: 0 10%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.map-of-questions .v-expansion-panel-header {
    transition: all ease-in-out 0.3s;
    min-height: 42px;
    padding: 11px 24px;

}

.map-of-questions .theme--light.v-expansion-panels .v-expansion-panel-header--active .v-expansion-panel-header__icon .v-icon {
    color: var(--text-3);
}


.map-of-questions .v-expansion-panel-header--active {
    background: var(--primary-1);
    border-radius: 40px;
    min-height: 42px !important;
    max-height: 42px !important;
    padding: 5px 24px;
    color: white;
}

.map-of-questions .v-expansion-panel-content__wrap {
    padding: 16px 24px;
}

.map-of-questions .v-btn__content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.map-of-questions .v-btn {
    background: var(--surface-1) !important;
}

.v-navigation-drawer .v-navigation-drawer__content .map-of-questions .theme--light.v-btn.active {
    color: var(--accent-1);
}

.question-container .question-answers .answer-box,
.map-of-questions .v-expansion-panel .v-expansion-panel-content .v-btn.v-size--default {
    font-size: 0.87rem;
}
.map-of-questions .categoryItem.v-btn {
    font-size: 1.2rem;
    margin-top: 50px;
}
.map-of-questions .v-expansion-panel .v-expansion-panel-header {
    font-size: 1.2rem;
}
</style>
