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
        <handel-modal :config="configModalBody" />
        <!--        <auth />-->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
 import HandelModal from './HandelModal'

    export default {
        name: 'Login',
      components: {HandelModal},
      data :() => ({
        configModalBody:{
          hasLogin:true,
          hasSignIn:true,
          hasVerify:true,
          hasForgotPass:false,
          starter:'login'
        }
      }),

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
