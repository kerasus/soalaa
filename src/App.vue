<template>
    <v-app>
        <v-app-bar
                app
                color="#f4f4f4"
                elevate-on-scroll
                dark
        >
            <div class="header">
                <div v-if="!isQuizPage"/>
                <v-app-bar-nav-icon @click.stop="toggleMapOfQuestionsDrawer" color="#666"
                                    v-if="isQuizPage"></v-app-bar-nav-icon>
                <div class="d-flex justify-end">
                    <p class="user-name" :style="{ color: '#666', margin: '0 15px', 'align-self': 'center' }">سید مصطفی
                        کاظمی</p>
                    <v-icon :size="40" color="#666">mdi-account-circle</v-icon>
                </div>
            </div>
            <v-app-bar-nav-icon color="#666" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                dark
                src="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
                absolute
                bottom
                temporary
                right
        >
            <Menu/>
        </v-navigation-drawer>

        <v-navigation-drawer
                v-model="mapOfQuestionDrawer"
                app
                right
                absolute
        >
            <map-of-questions :questions="quiz.questions" @changeQuestion="changeQuestion($event)"/>
        </v-navigation-drawer>

        <v-main>
            <router-view
                    :key="$route.name + ($route.params.quizId || '') + ($route.params.questNumber || '')"></router-view>

        </v-main>
    </v-app>
</template>

<script>
    import Menu from './components/Menu'
    import './assets/scss/font.scss'
    import '@mdi/font/css/materialdesignicons.css';
    import MapOfQuestions from "./components/OnlineQuiz/Quiz/MapOfQuestions"

    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            group: null
        }),
        watch: {
            group() {
                this.drawer = false
            }
        },
        components: {
            Menu,
            MapOfQuestions
        },
        computed: {
            mapOfQuestionDrawer: {
                get() {
                    return this.$store.getters.mapOfQuestionsDrawer
                },
                set(newInfo) {
                    this.$store.commit('updateMapOfQuestionsDrawer', newInfo)
                }
            },
            quiz: {
                get() {
                    return this.$store.getters.quiz
                },
                set(newInfo) {
                    this.$store.commit('updateQuiz', newInfo)
                }
            },
            currentQuestion: {
                get() {
                    return this.$store.getters.currentQuestion
                },
                set(newInfo) {
                    this.$store.commit('updateCurrentQuestion', newInfo)
                }
            },
            isQuizPage() {
                return this.$store.getters.isQuizPage
            }
        },
        methods: {
            toggleMapOfQuestionsDrawer() {
                this.$store.commit('updateMapOfQuestionsDrawer', !this.$store.getters.mapOfQuestionsDrawer)
            },
            changeQuestion(id) {
                this.currentQuestion = this.quiz.questions.getQuestionById(id)
            }
        }
    };
</script>

<style scoped>
    .header {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }
</style>

<style>
    .v-navigation-drawer__border {
        background: transparent !important;
    }
</style>
