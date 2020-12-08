<template>
    <v-app>
        <v-app-bar
                app
                color="primary"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        alt="Vuetify Logo"
                        class="shrink mr-2"
                        contain
                        src="img/logo.png"
                        transition="scale-transition"
                        width="200"
                />
            </div>

            <v-spacer></v-spacer>

            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        </v-app-bar>
        <v-navigation-drawer
                v-model="drawer"
                absolute
                bottom
                temporary
        >
            <Menu/>
        </v-navigation-drawer>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
    import Menu from './components/Menu'
    import './assets/scss/font.scss'
    import '@mdi/font/css/materialdesignicons.css';

    export default {
        name: 'App',
        data: () => ({
            drawer: false,
            group: null,
        }),
        watch: {
            group() {
                this.drawer = false
            },
        },
        components: {
            Menu
        }
    };
</script>

