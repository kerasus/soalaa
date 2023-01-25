<template>
  <div class="dashboard">
    <q-page-builder v-model:sections="sections"
                    v-model:options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>

export default {
  name: 'Dashboard',
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'Dashboard'
                      }
                    ]
                  }
                ],
                options: {
                  style: {}
                }
              }
            ]
          },
          options: {}
        }
      ],
      pageConfig: {}
    }
  },
  computed: {
    pageBuilderEditable() {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    },
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style scoped>

</style>
