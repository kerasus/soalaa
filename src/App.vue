<template>
    <v-app>
        <v-app-bar
                app
                color="#f4f4f4"
                elevate-on-scroll
                dark
        >
            <div class="header">
                <div class="d-flex justify-end" :style="{ direction: 'rtl' }">
                    <p class="user-name" :style="{ color: '#666', margin: '0 15px', 'align-self': 'center' }">سید مصطفی
                        کاظمی</p>
                    <v-icon :size="40" color="#666">mdi-account-circle</v-icon>
                </div>
                <v-app-bar-nav-icon
                        v-if="isQuizPage"
                        @click.stop="toggleDrawer"
                        color="#666"
                />
            </div>
            <v-app-bar-nav-icon color="#666" @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                app
                right
                absolute
        >
            <map-of-questions
                    v-if="isQuizPage"
                    :questions="quiz.questions"
                    @changeQuestion="changeQuestion($event)"
            />
            <Menu v-if="!isQuizPage"/>
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
    import mixinQuiz from '@/mixin/Quiz'
    import mixinDrawer from '@/mixin/Drawer'

    export default {
        name: 'App',
        mixins: [mixinQuiz, mixinDrawer],
        components: {
            Menu,
            MapOfQuestions
        }
    };
</script>

<style scoped>
    .header {
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
        direction: ltr;
    }
</style>

<style>
    .v-navigation-drawer__border {
        background: transparent !important;
    }
</style>
