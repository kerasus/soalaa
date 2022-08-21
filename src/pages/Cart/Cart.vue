<template>
  <div class="cart-page">
    <page-builder
      :sections="sections"
      :options="options"
      :containerFullHeight="calculateHeightStyle"
    ></page-builder>
  </div>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'

export default {
  name: 'Cart',
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
                        name: 'CartInvoice'
                      }
                    ],
                    options: {
                      className: 'col-md-4 col-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  style: {
                    marginTop: '30px'
                  }
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

<style lang="scss" scoped>
.cart-page {
  &:deep(.boxed) {
    max-width: 1362px !important;
    width: 100% !important;
    margin-bottom: 72px;
  }
}
</style>
