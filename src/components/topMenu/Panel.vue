<template>
    <div>
        <v-img
                style="background-color: #e8e8e8;"
                :src="$store.getters.user.photo"
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
                style="letter-spacing: inherit;"
                href="https://alaatv.com/"
                large
                dark
                tile
                block
                color="#ffc107"
                elevation="0"
        >
            آلاء
        </v-btn>
        <v-btn
                style="letter-spacing: inherit;"
                large
                dark
                tile
                block
                color="red"
                elevation="0"
                @click="logout"
        >
            خروج
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'PannelPanel',
        methods: {
            logout () {
                // window.localStorage.setItem('access_token', '')
                // window.localStorage.setItem('user', '')
                // window.localStorage.setItem('vuex', '')
                // this.$store.commit('updateUser', '')
                this.$store.commit('resetState')
                this.$router.push({ name: 'login' })
            },
        }
    }
</script>

<style scoped>

</style>
