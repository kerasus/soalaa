<template>
    <v-sheet class="map-of-questions">
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
                        <div v-for="(question, questionIndex) in getQuestionsOfSubcategory(subcategoryItem.id)" :key="'question-'+question.id">
                            <v-btn :class="{ active: currentQuestion.id === question.id }"
                                   :elevation="0"
                                   @click="changeQuestion(question.id)"
                                   block
                            >
                                تست شماره
                                {{ getQuestionNumberFromIndex(questionIndex) }}
                                <v-icon v-if="question.state === 'x'" color="red">
                                    mdi-close
                                </v-icon>
                                <v-icon v-if="question.state === 'o'" color="yellow" size="15">
                                    mdi-checkbox-blank-circle
                                </v-icon>
                                <v-icon v-if="typeof (question.isAnswered) === 'function' && question.isAnswered()" color="green">
                                    mdi-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            </div>
        </div>
    </v-sheet>
</template>

<script>
    import mixinQuiz from '@/mixin/Quiz'
    import Time from "@/plugins/time";

    export default {
        name: "MapOfQuestions",
        mixins: [mixinQuiz],
        data: () => ({
            currentCat: null,
        }),
        created() {
            let that = this
            this.interval = setInterval(() => {
                that.currentCat = Time.getCurrentCategoryAcceptAt(that.quiz.categories)
            }, 1000)
        }
    }
</script>

<style>
.map-of-questions {
    min-height: 42px !important;
    max-height: 42px !important;
    width: 80%;
    margin: 0 10%;
}

.map-of-questions .v-expansion-panel-header {
    transition: all ease-in-out 0.3s;
    min-height: 42px;
    padding: 11px 24px;
}

.map-of-questions .theme--light.v-expansion-panels .v-expansion-panel-header--active .v-expansion-panel-header__icon .v-icon {
    color: white;
}


.map-of-questions .v-expansion-panel-header--active {
    background: #ffc107;
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
    background: #fff !important;
}

.v-navigation-drawer .v-navigation-drawer__content .map-of-questions .theme--light.v-btn.active {
    color: #6ad1ff;
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
