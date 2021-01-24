<template>
    <v-menu bottom :offset-y="true" class="rounded-b-xl rounded-r-xl">
        <template v-slot:activator="{ on, attrs }">
            <v-btn large tile v-bind="attrs" v-on="on" elevation="0" class="pl-3" >
                <v-icon class="mr-2" :size="30" color="#666">mdi-account-circle</v-icon>
                <span v-if="$store.getters.user.first_name || $store.getters.user.last_name">
                    {{ $store.getters.user.first_name + ' ' + $store.getters.user.last_name }}
                </span>
            </v-btn>
        </template>
        <v-card max-width="375" class="mx-auto" rounded="b-xl r-xl">
            <TopMenu_OnlineQuiz v-if="$route.name === 'onlineQuiz.alaaView'"/>
            <TopMenu_Dashboard v-else/>
        </v-card>
    </v-menu>
</template>

<script>
    import { TopMenu_OnlineQuiz, TopMenu_Dashboard } from '@/components/Menu/Menus'
    export default {
        name: 'TopMenu',
        components: {
            TopMenu_Dashboard,
            TopMenu_OnlineQuiz
        },
    }
</script>
