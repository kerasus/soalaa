<template>
  <div class="dashboard">
    <page-builder
      :sections="sections"
      :options="options"
      :containerFullHeight="calculateHeightStyle"
    ></page-builder>
  </div>
</template>

<script>
// import DashboardHeader from 'components/Dashboard/DashboardHeader'
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'Dashboard',
  components: {
    pageBuilder
  },
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
      options: []
    }
  },
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>

<style scoped>

</style>
