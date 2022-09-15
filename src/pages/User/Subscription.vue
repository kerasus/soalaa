<template>
  <page-builder
    :sections="sections"
    :options="options"
    :containerFullHeight="calculateHeightStyle"
  ></page-builder>
</template>

<script>
import PageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'Subscription',
  components: {
    PageBuilder
  },
  data() {
    return {
      test: {
        t: 'hi'
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'SubscriptionPackagesSection'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
                  boxedWidth: 1362,
                  style: {}
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'SubscriptionBanner'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
                  style: {}
                }
              }
            ]
          },
          options: {}
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'FAQ'
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false,
                  boxedWidth: 1362,
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

<style lang="scss">

</style>
