<template>
  <div class="test"><h3>Soala Content!!!!</h3></div>
</template>

<script>
export default {
  name: 'Test',
  methods: {
    getTemplateHeaderType () {
      this.$store.dispatch('AppLayout/updateTemplateHeaderType', {
        headerVisibility: true,
        headerType: 'A',
        sideBarVisibility: false,
        sideBarType: 'A'
      })
      // this.$store.commit('AppLayout/updateTemplateHeaderType', this.$route.name)
    }
  },
  mounted() {
    setTimeout(() => {
      this.getTemplateHeaderType()
    }, 50)
    // this.getTemplateHeaderType()
  }
}
</script>

<style scoped>
.test {
  height: 1000px;
  background: #9092A7;
  color: #FFFFFF;
}
</style>
