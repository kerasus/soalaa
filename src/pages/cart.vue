<template>
  <page-builder
    :sections="sections"
    :options="options"
    :containerFullHeight="calculateHeightStyle"
  ></page-builder>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'cart',
  components: { pageBuilder },
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
                        name: 'cart-view'
                      }
                    ],
                    options: {
                      className: 'col-md-9 q-pr-md col-xs-12'
                    }
                  },
                  {
                    // widgets: [
                    //   {
                    //     name: 'test-component2-widget'
                    //   }
                    // ],
                    // options: {
                    //   className: 'col-md-3 q-pl-md col-xs-12'
                    // }
                  },
                  {
                    widgets: [
                      {
                        name: 'cart-empty'
                      }
                    ],
                    options: {
                      className: 'col-xs-12'
                    }
                  }
                ],
                options: {
                  // boxed: true,
                  // style: {
                  //   marginTop: '30px'
                  // }
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

<style scoped></style>
