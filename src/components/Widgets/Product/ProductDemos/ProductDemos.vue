<template>
  <div class="row product-demos-widget"
       :class="options.className"
       :style="options.style">
    <div v-if="contents.list && contents.list.length > 0"
         class="demos-container col-md-12 q-mt-md">
      <p class="section-title">نمونه فیلم ها</p>
      <div v-dragscroll
           class="contents-block">
        <div v-for="content in contents.list"
             :key="content.id">
          <content-item class="q-mr-md"
                        :options="content" />
        </div>
      </div>
    </div>
    <div v-if="pamphlets && pamphlets.length > 0"
         class="demos-container col-md-12 q-mt-md">
      <p class="section-title">نمونه جزوه ها</p>
      <div v-dragscroll
           class="contents-block">
        <div v-for="pamphlet in pamphlets"
             :key="pamphlet.id"
             class="pamphlet-image">
          <!-- <FsLightbox
            :toggler="toggler"
            :sources="[
              pamphlet.photo
            ]"
          /> -->
          {{ pamphlet }}
          <!-- <vue-picture-swipe :items="[
            {
              src: pamphlet.photo,
              thumbnail: pamphlet.photo,
              w:600,
              h: 400,
              title: pamphlet.title
            }
          ]"></vue-picture-swipe> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { ContentList } from 'src/models/Content.js'
import ContentItem from 'src/components/Widgets/ContentItem/ContentItem.vue'
import API_ADDRESS from 'src/api/Addresses'
// import FsLightbox from 'fslightbox-vue'

export default {
  name: 'productDemos',
  components: {
    ContentItem
    // FsLightbox
  },
  directives: {
    dragscroll
  },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      contents: new ContentList(),
      pamphlets: [],
      toggler: false
    }
  },
  serverPrefetch () {
    return this.loadProduct()
  },
  computed: {
    product: {
      get () {
        return new Product(this.$store.getters['Widgets/data']('ProductIntroduction'))
      },
      set (newData) {
        this.$store.dispatch('Widgets/updateData', { name: 'ProductIntroduction', data: newData })
      }
    },
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
  methods: {
    loadProduct() {
      this.getProduct()
      this.getSampleContents()
    },
    getProduct() {
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return APIGateway.product.show(this.productId)
        .then(response => {
          const product = new Product(response.data.data)
          this.pamphlets = product.sample_photos
        })
        .catch(() => {
          this.product.loading = false
        })
    },
    getSampleContents() {
      return this.$axios.get(API_ADDRESS.product.sampleContent(this.productId))
      // return APIGateway.product.sampleContent(this.productId)
        .then(response => {
          this.contents = new ContentList(response.data.data)
        })
        .catch(() => {

        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-demos-widget {
  display: flex;
  justify-content: center;

  .demos-container {
    width: 1140px;
  }

  .section-title {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;

    &::before {
      content: ".";
      color: #BAD9FB;
      font-size: 50px;
      font-weight: bold;
      line-height: 10px;
      margin-right: 4px;
    }

  }

  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0 0;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 8px 19px 8px;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: 10px;
      }
    }
  }
}
</style>
