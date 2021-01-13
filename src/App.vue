<template>
    <v-app v-resize="updateWindowSize">
        <v-navigation-drawer
                v-model="drawer"
                app
                right
                width="316"
                v-if="$route.name === 'onlineQuiz.alaaView'"
                :style="{ backgroundColor: $route.name === 'onlineQuiz.alaaView' ? '#fff' : '#ffc107' }"
        >
            <div style="height: 150px;line-height: 150px;font-size: 4rem;color: rgb(255, 193, 7);display: flex;align-items: center;justify-content: center;">
                <div style="display: block">
                    <v-img src="/img/logo-1.png" width="150" v-if="$route.name === 'onlineQuiz.alaaView'" />
                    <v-img src="/img/logo-2.png" width="150" v-else />
                </div>
            </div>
            <map-of-questions v-if="$route.name === 'onlineQuiz.alaaView'"/>
            <Menu v-else/>
        </v-navigation-drawer>
        <v-app-bar
                app
                color="#f4f4f4"
                elevate-on-scroll
                v-if="appbar"
        >
            <div class="header">
                <v-row>
                    <v-col :md="1" class="d-md-flex justify-center align-center d-none"></v-col>
                    <v-col :md="10" class="px-md-0 px-10 d-flex justify-space-between">
                        <div class="rounded-b-xl rounded-r-xl">
                            <v-menu
                                    bottom
                                    :offset-y="true"
                                    class="rounded-b-xl rounded-r-xl"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                            large
                                            tile
                                            v-bind="attrs"
                                            v-on="on"
                                            elevation="0"
                                    >
                                        <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                                        سید مصطفی
                                        کاظمی
                                    </v-btn>
                                </template>
                                <v-card
                                        max-width="375"
                                        class="mx-auto"
                                        rounded="b-xl r-xl"
                                        v-if="$route.name === 'onlineQuiz.alaaView'"
                                >
                                    <v-img
                                            style="background-color: #e8e8e8;"
                                            src="/img/account-circle.svg"
                                            width="300px"
                                            height="300px"
                                            dark
                                    >
                                        <v-row class="fill-height">
                                            <v-card-title v-if="false">
                                                <v-btn
                                                        dark
                                                        icon
                                                        :to="{ name: 'dashboard'}"
                                                >
                                                    <v-icon>mdi-chevron-left</v-icon>
                                                </v-btn>

                                                <v-spacer></v-spacer>

                                                <v-btn
                                                        dark
                                                        icon
                                                        class="mr-4"
                                                >
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>

                                                <v-btn
                                                        dark
                                                        icon
                                                >
                                                    <v-icon>mdi-dots-vertical</v-icon>
                                                </v-btn>
                                            </v-card-title>

                                            <v-spacer></v-spacer>

                                            <v-card-title v-if="false" class="white--text pl-12 pt-12">
                                                <div class="display-1 pl-12 pt-12">
                                                    Ali Conners
                                                </div>
                                            </v-card-title>
                                        </v-row>
                                    </v-img>
                                    <v-btn
                                            style="width: 100%;background: #5cbf60;color: white;letter-spacing: inherit;"
                                            large
                                            tile
                                            elevation="0"
                                    >
                                        ثبت و پایان آزمون
                                    </v-btn>
                                </v-card>
                            </v-menu>
                        </div>
                        <div>
                            <v-btn v-if="$route.name === 'onlineQuiz.alaaView'" class="switch-view-button" icon @click="changeView('konkoor')">
                                <v-icon>mdi-dots-grid</v-icon>
                            </v-btn>
                            <v-app-bar-nav-icon
                                    v-if="$route.name === 'onlineQuiz.alaaView'"

                                    @click.stop="toggleDrawer"
                                    :color="(isQuizPage) ? '#fcaf25' : '#666'"
                            />
                        </div>
                    </v-col>
                    <v-col :md="1" class="d-md-flex justify-center align-center d-none"></v-col>
                </v-row>
            </div>
        </v-app-bar>
        <v-main>
            <router-view :key="$route.name + ($route.params.quizId || '') + ($route.params.questNumber || '')">
            </router-view>
        </v-main>
    </v-app>
</template>

<script>
    import { Menu, MapOfQuestions } from '@/components/Menus'
    import { mixinQuiz, mixinDrawer, mixinWindowSize } from '@/mixin/Mixins'
    import '@/assets/scss/font.scss'
    import '@mdi/font/css/materialdesignicons.css';

    export default {
        name: 'App',
        mixins: [mixinQuiz, mixinDrawer, mixinWindowSize],
        watch: {
            selectedItem () {
                this.selectedItem = null
            }
        },
        computed: {
            appbar () {
                return this.$store.getters.appbar
            }
        },
        components: {
            Menu,
            MapOfQuestions
        },
        data: () => ({
            selectedItem: null
        }),
        created() {
            this.$store.commit('updateAppbar', true)
            this.$store.commit('updateDrawer', true)
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
    .v-application > .v-menu__content {
        border-top-right-radius: 24px !important;
        border-bottom-left-radius: 24px !important;
        border-bottom-right-radius: 24px !important;
    }
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
        background: #f4f4f4;
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
