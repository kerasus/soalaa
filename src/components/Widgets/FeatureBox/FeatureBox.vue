<template>
  <q-card class="feature-card">
    <q-card-section class="feature-horizontal-section"
                    :class="localOptions.className"
                    :horizontal="localOptions.horizontal">
      <img class="feature-image"
           :src="localOptions.image">
      <q-card-section>
        <div class="feature-title ellipsis">{{ localOptions.title }}</div>
        <div class="feature-description">
          {{ localOptions.description }}
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'FeatureBox',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        title: null,
        description: null,
        image: null,
        horizontal: true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.feature-card {
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  .feature-horizontal-section {

    .feature-image {
      width: 100px;
      height: 100px;
    }

    .feature-title {
      font-weight: 700;
      font-size: 20px;
      line-height: 35px;

      @media screen and (max-width: 600px) {
        font-weight: 600;
        font-size: 18px;
        line-height: 26px;
      }
    }

    .feature-description {
      max-width: 300px;
      font-weight: 400;
      font-size: 18px;
      line-height: 31px;

      @media screen and (max-width: 600px) {
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
}
</style>
