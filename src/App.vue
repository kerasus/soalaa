<template>
    <v-app v-resize="updateWindowSize">
        <v-navigation-drawer
                v-model="drawer"
                app
                right
                width="316"
        >
            <div style="height: 150px;line-height: 150px;text-align: center;font-size: 4rem;color: #ffc107;">
                لوگو
            </div>
            <map-of-questions
                    v-if="$route.name === 'onlineQuiz.alaaView'"
                    :questions="quiz.questions"
                    @changeQuestion="changeQuestion($event)"
            />
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
                                >
                                    <v-img
                                            src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                                            height="300px"
                                            dark
                                    >
                                        <v-row class="fill-height">
                                            <v-card-title>
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

                                            <v-card-title class="white--text pl-12 pt-12">
                                                <div class="display-1 pl-12 pt-12">
                                                    Ali Conners
                                                </div>
                                            </v-card-title>
                                        </v-row>
                                    </v-img>

                                    <v-list two-line>
                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-phone
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>(650) 555-1234</v-list-item-title>
                                                <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-icon>
                                                <v-icon>mdi-message-text</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>

                                        <v-list-item>
                                            <v-list-item-action></v-list-item-action>

                                            <v-list-item-content>
                                                <v-list-item-title>(323) 555-6789</v-list-item-title>
                                                <v-list-item-subtitle>Work</v-list-item-subtitle>
                                            </v-list-item-content>

                                            <v-list-item-icon>
                                                <v-icon>mdi-message-text</v-icon>
                                            </v-list-item-icon>
                                        </v-list-item>

                                        <v-divider inset></v-divider>

                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-email
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>aliconnors@example.com</v-list-item-title>
                                                <v-list-item-subtitle>Personal</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-list-item>
                                            <v-list-item-action></v-list-item-action>

                                            <v-list-item-content>
                                                <v-list-item-title>ali_connors@example.com</v-list-item-title>
                                                <v-list-item-subtitle>Work</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>

                                        <v-divider inset></v-divider>

                                        <v-list-item>
                                            <v-list-item-icon>
                                                <v-icon color="indigo">
                                                    mdi-map-marker
                                                </v-icon>
                                            </v-list-item-icon>

                                            <v-list-item-content>
                                                <v-list-item-title>1400 Main Street</v-list-item-title>
                                                <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                </v-card>
                            </v-menu>
                        </div>
                        <div>
                            <v-app-bar-nav-icon
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
        })
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
    .v-navigation-drawer .v-navigation-drawer__content {
        overflow-y: scroll;
    }
    .v-navigation-drawer .v-navigation-drawer__content .theme--light.v-btn {
        color: #666;
    }
    .v-navigation-drawer__border {
        background: transparent !important;
    }
</style>
