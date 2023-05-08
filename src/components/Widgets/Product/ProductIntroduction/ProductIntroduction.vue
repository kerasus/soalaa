<template>
  <q-card v-if="product.intro"
          class="intro-video custom-card"
          :class="options.className"
          :style="options.style">
    <template v-if="!product.loading">
      <video-player :poster="product.intro.photo"
                    :source="videoSource()" />
      <div v-if="options.download_date && getDownloadDate()"
           class="q-mt-md q-ml-md">
        <q-icon name="info"
                color="primary"
                size="25px"
                class="q-pr-sm" />
        <span>
          زمان دریافت فایل های این محصول:
          {{ getDownloadDate() }}
        </span>
      </div>
      <div v-if="getDuration() && options.duration"
           class="q-mt-md q-ml-md">
        <q-icon name="timer"
                color="primary"
                size="25px"
                class="q-pr-sm" />
        <span>
          مدت زمان:
          {{ getDuration() }}
        </span>
      </div>
    </template>
    <q-skeleton v-else
                height="250px"
                square />
  </q-card>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses.js'
import { Product } from 'src/models/Product.js'
import VideoPlayer from 'src/components/VideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductIntroduction',
  components: { VideoPlayer },
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      product: new Product()
    }
  },
  computed: {
    productId () {
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  watch: {
    options: {
      handler() {
        this.getProduct()
      },
      deep: true
    }
  },
  methods: {
    getDownloadDate() {
      if (this.product.attributes.download_date) {
        return this.product.attributes.download_date[0]
      }
      return null
    },
    getDuration() {
      if (this.product.attributes.duration) {
        return this.product.attributes.duration[0]
      }
      return null
    },
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (response) {
      this.product = new Product(response.data.data)
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },

    videoSource() {
      return new PlayerSourceList([{
        default: true,
        res: 1024,
        type: 'video/mp4',
        src: this.product.intro.video,
        label: 'کیفیت عالی'
      }])
    },
    getProduct() {
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return APIGateway.product.show(this.productId)
    }
  }
}
</script>

<style scoped>

</style>
