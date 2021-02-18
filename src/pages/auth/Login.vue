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
                <auth/>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Auth from '@/components/Auth'

    export default {
        name: 'Login',
        components: {Auth},
        created() {
            this.$store.commit('AppLayout/updateOverlay', {show: false, loading: false, text: ''})
            this.$store.commit('AppLayout/updateAppBarAndDrawer', false)
        },
        destroyed() {
            this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
        },
    }
</script>

<style scoped>

</style>
