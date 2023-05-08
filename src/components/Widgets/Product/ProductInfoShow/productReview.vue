<template>
  <div class="product-review">
    <p class="review-title"> بررسی محصول</p>
    <q-card class="custom-card">
      <q-card-section v-if="description.long"
                      v-html="description.long" />
      <q-card-section v-else-if="description.short"
                      v-html="description.short" />

    </q-card>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
// import { QuasarTemplateBuilderAppLayout } from 'quasar-template-builder'
// import * as getters from 'src/store/AppLayout/getters'

export default {
  name: 'productReview',
  mixins: [mixinWidget],

  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      description: {
        long: '',
        short: '',
        slogan: ''
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler (newValue) {
        Object.assign(this.description, newValue)
      }
    }
  },
  methods: {

  }
}
</script>

<style>
h2{
  font-size: 28px;
}
</style>
<style lang="scss" scoped>
.product-review {
  .review-title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    margin-right: 10px;

    &::before {
      content: ".";
      color: #BAD9FB;
      font-size: 50px;
      font-weight: bold;
      line-height: 10px;
    }

  }
}
</style>
