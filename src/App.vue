<template>
    <v-app v-resize="updateWindowSize">
        <v-navigation-drawer app v-model="drawer" right width="316"
                             :class="{
                                 'mapOfQuestions': $route.name === 'onlineQuiz.alaaView' || $route.name === 'onlineQuiz.konkoorView',
                                 'right-drawer': $route.name !== 'onlineQuiz.alaaView' && $route.name !== 'onlineQuiz.konkoorView'
                             }"
        >
            <div style="height: 150px;line-height: 150px;font-size: 4rem;color: rgb(255, 193, 7);display: flex;align-items: center;justify-content: center;">
                <div style="display: block">
                    <v-img src="/img/logo-1.png" width="150" v-if="$route.name === 'onlineQuiz.alaaView'" />
                    <v-img src="/img/logo-2.png" width="150" v-else />
                </div>
            </div>
            <SideMenu_MapOfQuestions v-if="$route.name === 'onlineQuiz.alaaView' || $route.name === 'onlineQuiz.konkoorView'"/>
            <SideMenu_Dashboard v-else/>
        </v-navigation-drawer>
        <v-app-bar v-if="appbar" app color="--background-2" elevate-on-scroll>
            <div class="header">
                <v-container>
                    <v-row>
                        <v-col class="px-md-0 px-10 d-flex justify-space-between">
                            <div class="rounded-b-xl rounded-r-xl d-flex flex-row align-center">
                                <v-menu bottom :offset-y="true" class="rounded-b-xl rounded-r-xl">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn large tile v-bind="attrs" v-on="on" elevation="0" class="pl-3 topMenuOpenButton">
                                            <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                                            <span v-if="user.last_name">
                                                {{ user.last_name }}
                                            </span>
                                            <span v-if="user.first_name">
                                                {{ user.first_name }}
                                            </span>
                                        </v-btn>
                                    </template>
                                    <v-card max-width="375" class="mx-auto" rounded="b-xl r-xl">
                                        <TopMenu_OnlineQuiz v-if="$route.name === 'onlineQuiz.alaaView'"/>
                                        <TopMenu_Dashboard v-else/>
                                    </v-card>
                                </v-menu>

                            </div>
                            <div>
                                <v-btn v-if="$route.name === 'onlineQuiz.alaaView'" class="switch-view-button" icon @click="changeView('konkoor')">
                                    <v-icon>mdi-dots-grid</v-icon>
                                </v-btn>
                                <v-app-bar-nav-icon
                                        v-if="$route.name !== 'onlineQuiz.konkoorView'"
                                        @click.stop="toggleDrawer"
                                        :color="(isQuizPage) ? '#fcaf25' : '#666'"
                                />
                            </div>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-app-bar>
        <v-main>
            <notifications group="notifs" />
            <v-overlay :absolute="true" :opacity="1" :value="overlay" />
            <router-view :key="$route.name + ($route.params.quizId || '') + ($route.params.questNumber || '')">
            </router-view>
        </v-main>
    </v-app>
</template>

<script>
    import { mixinAuth, mixinQuiz, mixinDrawer, mixinWindowSize } from '@/mixin/Mixins'
    import '@/assets/scss/font.scss'
    import '@mdi/font/css/materialdesignicons.css'
    import { SideMenu_Dashboard, SideMenu_MapOfQuestions, TopMenu_OnlineQuiz, TopMenu_Dashboard } from '@/components/Menu/Menus'

    export default {
        name: 'App',
        mixins: [mixinAuth, mixinQuiz, mixinDrawer, mixinWindowSize],
        watch: {
            selectedItem () {
                this.selectedItem = null
            }
        },
        computed: {
            appBar () {
                return this.$store.getters['AppLayout/appBar']
            },
            overlay () {
                return this.$store.getters['AppLayout/overlay']
            }
        },
        components: {
            TopMenu_OnlineQuiz,
            TopMenu_Dashboard,
            SideMenu_Dashboard,
            SideMenu_MapOfQuestions
        },
        data: () => ({
            selectedItem: null
        }),
        created() {
            this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
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

    .right-drawer {
        background: var(--primary-1) !important;
    }

    .map-of-questions {
        background: var(--surface-1) !important;
    }
</style>

<style>
    :root {
        --background-1: #fff;
        --background-2: #f5f5f5;
        --background-3: red;
        --surface-1: #fff;
        --surface-2: #f1f1f1;
        --surface-3: #f1f1f1;
        --primary-1: #ffc107;
        --primary-2: #fbcf4b;
        --primary-3: #ffc107;
        --text-1: #000;
        --text-2: #666;
        --text-3: #fff;
        --accent-1: #2196F3;
        --accent-2: #2196F3;
        --accent-3: #2196F3;
        --success-1: #4caf50;
        --success-2: #4caf50;
        --success-3: #4caf50;
        --error-1: #f44336;
        --error-2: #f44336;
        --error-3: #f44336;
    }

    .v-application {
        font-family: 'IRANSans', 'Arial', 'Verdana', 'Tahoma', sans-serif;
    }

    .choice p:nth-child(2n) {
        display: block;
    }

    .answer-text p:nth-child(2n) {
        display: block;
    }

    .notification-title,
    .notification-content {
        text-align: right;
    }

    .v-application > .v-menu__content {
        border-top-right-radius: 24px !important;
        border-bottom-left-radius: 24px !important;
        border-bottom-right-radius: 24px !important;
    }
    /*ToDo: not suport IE*/
    .v-navigation-drawer {
        filter: drop-shadow(-3px 0px 10px rgba(0, 0, 0, 0.102));
    }
    .v-navigation-drawer .v-navigation-drawer__content .theme--light.v-btn {
        color: #666;
    }
    .v-navigation-drawer__border {
        background: transparent !important;
    }

    .v-main {
        background: var(--background-2);
    }

    .appDarkMode * {
        transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);;
    }
    .appDarkMode .v-main {
        background: #242424;;
    }
    .appDarkMode header,
    .appDarkMode .topMenuOpenButton {
        background: #242424 !important;
    }
    .appDarkMode div,
    .appDarkMode .topMenuOpenButton span {
        color: #bfbfbf;
    }

    @media only screen and (max-width: 960px) {
        .switch-view-button {
            display: none;
        }
    }

    strong em s {
        margin-left: 50px;
        font-weight: normal;
        text-decoration: none;
        font-style: normal;
    }
</style>
