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
              ],
              options: {
                boxed: true,
                boxedWidth: 1362,
                style: {
                  marginTop: '10px'
                }
              }
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
