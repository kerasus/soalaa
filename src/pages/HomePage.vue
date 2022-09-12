<template>
  <page-builder
    :sections="sections"
  />
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
export default {
  name: 'HomePage',
  components: {
    PageBuilder
  },
  data: () => ({
    sections: [
      {
        data: {
          rows: [
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'home-page'
                    }
                  ]
                }
              ]
            }
          ]
        },
        options: {}
      }
    ]
  })
}
</script>

<style scoped>

</style>
