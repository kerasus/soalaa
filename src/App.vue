<template>
    <v-app v-resize="updateWindowSize">
        <v-navigation-drawer
                v-if="$route.name === 'onlineQuiz.alaaView' || $store.getters.user.has_admin_permission"
                v-model="drawer"
                app
                right
                width="316"
                :class="{ 'mapOfQuestions': $route.name === 'onlineQuiz.alaaView'}"
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
                <v-container>
                    <v-row>
                        <v-col class="px-md-0 px-10 d-flex justify-space-between">
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
                                                class="pl-3"
                                        >
                                            <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                                            {{ $store.getters.user.first_name + ' ' + $store.getters.user.last_name }}
                                        </v-btn>
                                    </template>
                                    <v-card
                                            max-width="375"
                                            class="mx-auto"
                                            rounded="b-xl r-xl"
                                    >
                                        <online-quiz v-if="$route.name === 'onlineQuiz.alaaView'"/>
                                        <panel v-else/>
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
            <v-overlay
                    :absolute="true"
                    :opacity="1"
                    :value="overlay"
            />
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
    import OnlineQuiz from "@/components/topMenu/OnlineQuiz";
    import Panel from "@/components/topMenu/Panel";

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
            },
            overlay () {
                return this.$store.getters.overlay
            }
        },
        components: {
            Panel,
            OnlineQuiz,
            Menu,
            MapOfQuestions
        },
        data: () => ({
            selectedItem: null
        }),
        created() {
            this.$store.commit('updateAppBar', true)
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
