<template>
    <v-sheet width="100%" class="map-of-questions">
        <div v-for="(categoryItem) in quiz.categories.list" :key="'category-'+categoryItem.id">
            {{ categoryItem.title }}
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
                        <div v-for="(question, questionIndex) in questions.list" :key="'question-'+question.id">
                            <v-btn v-if="question.sub_category.id === subcategoryItem.id"
                                   :class="{ active: currentQuestion.id === question.id }"
                                   :elevation="0"
                                   @click="changeQuestion(question.id)"
                                   block
                            >
                                تست شماره
                                {{ getQuestionNumberFromIndex(questionIndex) }}
                                <v-icon v-if="question.state === 'cross'" color="red">
                                    mdi-close
                                </v-icon>
                                <v-icon v-if="question.state === 'circle'" color="yellow">
                                    mdi-checkbox-blank-circle
                                </v-icon>
                                <v-icon v-if="question.isAnswered()" color="green">
                                    mdi-check
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>
    </v-sheet>
</template>

<script>

    import mixinQuiz from '@/mixin/Quiz'
    export default {
        name: "MapOfQuestions",
        props: ['questions'],
        mixins: [mixinQuiz]
    }
</script>

<style>
.map-of-questions .v-expansion-panel-header {
    transition: all ease-in-out 0.3s;
}

.map-of-questions .v-expansion-panel-header--active {
    background: #ffc107;
    width: 80%;
    border-radius: 40px;
    margin: 0 10%;
    min-height: 42px !important;
    max-height: 42px !important;
    padding: 5px 24px;
}
.map-of-questions .v-expansion-panel-header {
    min-height: 42px !important;
    max-height: 42px !important;
    width: 80%;
    margin: 0 10%;
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

.map-of-questions .v-btn.active {
    color: #6ad1ff;
}

.question-container .question-answers .answer-box,
.map-of-questions .v-expansion-panel .v-expansion-panel-content .v-btn.v-size--default {
    font-size: 0.87rem;
}
.map-of-questions .v-expansion-panel .v-expansion-panel-header {
    font-size: 1.2rem;
}
</style>
