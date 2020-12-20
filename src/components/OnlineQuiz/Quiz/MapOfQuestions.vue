<template>
    <v-sheet color="#f1f1f1" width="100%" class="map-of-questions">
        <v-expansion-panels accordion flat hover dense>
            <v-expansion-panel
                    v-for="(item, index) in lessons"
                    :key="index"
            >
                <v-expansion-panel-header>
                    {{ item }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-for="question in questions.list" :key="question.id">
                        <v-btn :class="{ active: currentQuestion === question.id }" block :elevation="0" v-if="question.lesson === item" @click="changeQuestion(question.id)">
                            تست شماره {{ question.order }}
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
    </v-sheet>
</template>

<script>
    export default {
        name: "MapOfQuestions",
        props: ['questions', 'currentQuestion'],
        computed: {
            lessons () {
                const lessons = []
                for (let i = 0; i < this.questions.list.length; i++) {
                    lessons.push(this.questions.list[i].lesson)
                }
                return lessons.filter(function(item, pos) {
                    return lessons.indexOf(item) == pos;
                })
            }
        },
        methods: {
            changeQuestion (id) {
                this.$emit('changeQuestion', id)
            }
        }
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
    margin: 2% 10%;
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
</style>
