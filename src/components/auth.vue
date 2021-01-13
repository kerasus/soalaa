<template>
    <v-container
            fluid
            fill-height
    >
        <v-layout
                align-center
                justify-center
        >
            <v-flex
                    xs12
                    sm8
                    md4
            >
                <v-card class="elevation-12">
                    <v-toolbar
                            color="primary"
                            dark
                            flat
                    >
                        <v-toolbar-title>
                            <v-row>
                                <v-col>
                                    <v-img src="/img/logo.png" width="20" />
                                </v-col>
                                <v-col>
                                    ورود / ثبت نام
                                </v-col>
                            </v-row>
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        :href="'https://alaatv.com/'"
                                        icon
                                        small
                                        target="_blank"
                                        v-on="on"
                                >
                                    <v-img src="https://cdn.alaatv.com/upload/footer-alaaLogo.png?w=30&h=40" width="20" />
                                </v-btn>
                            </template>
                            <span>آموزش مجازی آلاء</span>
                        </v-tooltip>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                    id="username"
                                    label="شماره همراه"
                                    name="login"
                                    prepend-icon="mdi-account"
                                    type="text"
                                    v-model="username"
                            ></v-text-field>

                            <v-text-field
                                    id="password"
                                    label="کد ملی"
                                    name="password"
                                    prepend-icon="mdi-lock"
                                    type="password"
                                    v-model="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="primary" @click="login">
                            ورود
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'
    import Assistant from "@/plugins/assistant";
    import {User} from "@/models/User";

    export default {
        name: 'auth',
        data () {
            return {
                user: new User(window.localStorage.getItem('user')),
                username: null,
                password: null
            }
        },
        destroyed() {
            this.changeAppBarAndDrawer(true)
        },
        created() {
            this.changeAppBarAndDrawer(false)
            this.getUserData()
            if (!this.isLogin) {
                this.getUserData()
            }
        },
        methods: {
            isLogin() {
                let accessToken = window.localStorage.getItem('access_token')
                return !!(accessToken)
            },
            getUserData () {
                const token = window.localStorage.getItem('access_token')
                if (token) {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                }
                let that = this
                this.user.show(null, '/alaa/api/v2/getUserFor3a')
                .then( (response) => {
                    that.user = new User(response.data.data)
                    that.$store.commit('updateUser', that.user)
                    that.redirectTo(token)
                })
                .catch( (error) => {
                    console.log('error', error)
                })
            },
            changeAppBarAndDrawer (state) {
                this.$store.commit('updateAppbar', state)
                this.$store.commit('updateDrawer', state)
            },
            redirectTo (access_token) {
                let redirect_to = window.localStorage.getItem('redirect_to')
                window.localStorage.setItem('access_token', access_token)
                if (!redirect_to) {
                    redirect_to = 'dashboard'
                }
                this.$router.push({ name: redirect_to })
            },
            login () {
                let that = this
                axios.post('/alaa/api/v2/login', {
                    mobile: this.username,
                    password: this.password
                })
                .then((response) => {
                    that.user = new User(response.data.data.user)
                    that.$store.commit('updateUser', that.user)
                    const access_token = response.data.data.access_token
                    that.redirectTo(access_token)
                })
                .catch( (error) => {
                    Assistant.handleAxiosError(this.$toasted, error)
                })
            }
        }
    }
</script>

<style scoped>

</style>
