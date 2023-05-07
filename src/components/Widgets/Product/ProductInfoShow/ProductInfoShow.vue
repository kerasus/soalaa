<template>
  <div :style="options.style"
       :class="options.className">
    <div class="show-product-introduction">
      <div class="product-introduction justify-center">
        <div class="intro-features col-md-12">
          <div class="title full-width">
            <span>
              ویژگی های این محصول
            </span>
            <div dir="ltr"
                 class="float-right share q-mr-lg">
              <q-btn icon="isax:share"
                     flat
                     color="black"
                     size="14px">
                <q-tooltip anchor="top middle"
                           self="bottom middle"
                           :offset="[10, 10]">
                  اشتراک گزاری
                </q-tooltip>
                <q-popup-proxy :offset="[10, 10]"
                               transition-show="flip-up"
                               transition-hide="flip-down">
                  <q-banner dense
                            rounded>
                    <share-network :url="pageUrl"
                                   @on-select="shareGiftCard" />
                  </q-banner>
                </q-popup-proxy>
              </q-btn>
              <bookmark :is-favored="product.is_favored"
                        :loading="bookmarkLoading"
                        @clicked="handleProductBookmark" />
            </div>
          </div>
          <div class="product-info-box row">
            <div v-for="(info, index) in information"
                 :key="index"
                 class="product-info col-grow">
              <div class="product-info-inside q-ma-sm">
                <div class="info-header ">
                  <q-img :src="info.src"
                         class="info-image img" />
                  <p class="info-title">
                    {{ info.title }}
                  </p>
                </div>
                <div class="info-content">
                  <div v-for="(value , i) in info.value"
                       :key="i"
                       class="info-value">
                    <template v-if="!product.loading">
                      <span v-if="value">{{ value }}</span>
                      <span v-else>-</span>
                    </template>
                    <q-skeleton v-else
                                type="text"
                                width="70px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import Bookmark from 'components/Bookmark.vue'
import ShareNetwork from 'src/components/ShareNetwork.vue'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductInfoShow',
  components: { Bookmark, ShareNetwork },
  mixins: [mixinWidget, mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {
      }
    }
  },
  data() {
    return {
      bookmarkLoading: false,
      product: new Product(),
      samplePhotosIndex: null,
      isFavored: false,
      // product: new Product(),
      introduction: {
        intro: null,
        attributes: null,
        price: null,
        has_instalment_option: false
      },
      information: [
        {
          key: 'teacher',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-teacher.png\n',
          title: 'مدرس',
          value: []
        },
        {
          key: 'production_year',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-calendar.png\n',
          title: 'سال تولید',
          value: []
        },
        {
          key: 'major',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-book.png\n',
          title: 'رشته',
          value: []
        },
        {
          key: 'shipping_method',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-document-download.png\n',
          title: 'مدل دریافت',
          value: []
        }
      ],
      demo: {
        contents: [],
        sample_photos: []
      },
      review: {
        long: '',
        short: '',
        slogan: ''
      }
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
    },
    pageUrl() {
      return window.location.href
    }
  },
  watch: {
    // options: {
    //   handler() {
    //     this.getProduct()
    //   },
    //   deep: true
    // },
    'options.teacher'(newVal) {
      if (!newVal) {
        this.information.splice(0, 1)
      } else {
        this.information.splice(0, 0, {
          key: 'teacher',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-teacher.png\n',
          title: 'مدرس',
          value: this.product.attributes.info.teacher
        })
      }
    },
    'options.major'(newVal) {
      if (!newVal) {
        this.information.splice(2, 1)
      } else {
        this.information.splice(2, 0, {
          key: 'major',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-book.png\n',
          title: 'رشته',
          value: this.product.attributes.info.major
        })
      }
    },
    'options.production_year'(newVal) {
      if (!newVal) {
        this.information.splice(1, 1)
      } else {
        this.information.splice(1, 0, {
          key: 'production_year',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-calendar.png\n',
          title: 'سال تولید',
          value: this.product.attributes.info.production_year
        })
      }
    },
    'options.shipping_method'(newVal) {
      if (!newVal) {
        this.information.splice(3, 1)
      } else {
        this.information.splice(3, 0, {
          key: 'shipping_method',
          src: 'https://nodes.alaatv.com/upload/landing/28/modal/landing-taftan-modal-document-download.png\n',
          title: 'مدل دریافت',
          value: this.product.attributes.info.shipping_method
        })
      }
    }
  },
  methods: {
    handleProductBookmark () {
      this.bookmarkLoading = true
      if (this.product.is_favored) {
        this.$axios.post(API_ADDRESS.product.unfavored(this.product.id))
        // this.$apiGateway.product.unfavored(this.product.id)
          .then(() => {
            this.product.is_favored = !this.product.is_favored
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$axios.post(API_ADDRESS.product.favored(this.product.id))
      // this.$apiGateway.product.favored(this.product.id)
        .then(() => {
          this.product.is_favored = !this.product.is_favored
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (response) {
      this.product = new Product(response.data.data)
      this.isFavored = this.product.is_favored_2
      this.setInformation()
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },

    getProductId() {
      if (this.options.productId) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return null
    },
    loadProduct() {
      const productId = this.getProductId()
      if (!productId) {
        return
      }

      this.getProduct(productId)
    },
    getProduct() {
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return APIGateway.product.show(this.productId)
    },

    setInformation() {
      if (!this.product.attributes) {
        return
      }
      const attributesInfoKeys = Object.keys(this.product.attributes.info)
      this.information.forEach(info => {
        const targetInfo = info.key
        const findingAttribute = attributesInfoKeys.find(attribute => (attribute === targetInfo))

        if (findingAttribute) {
          info.value = this.product.attributes.info[findingAttribute]
        }
      })
    },
    shareGiftCard({ name, url }) {
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin-bottom: 0 !important;
  color: #333333;
  letter-spacing: -0.03em;
}

.hide {
  display: none;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  padding-left: 15px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #BAD9FB;
  border-radius: 30px;
}

.title-text {
  font-weight: 500;
  font-size: 20px;
  line-height: 35px;
  text-align: center;
}

.product-introduction {
  .intro-features {
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    align-items: center;
    @media screen and(max-width: 599px) {
      padding: 0;
    }

    .title {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      margin-right: 10px;
      margin-bottom: 20px;
      align-self: start;

      &::before {
        content: ".";
        color: #BAD9FB;
        font-size: 50px;
        font-weight: bold;
        line-height: 10px;
      }
      .share {
        top: 50px;
      }
    }

    .product-info-box {
      margin-bottom: 20px;

      .product-info {
        display: flex;
        justify-content: center;

        .product-info-inside {
          margin: 5px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 120px;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
          border-radius: 15px;
          @media only screen and (max-width: 1439px) {
            width: 108px;
            height: 135px;
          }
          @media only screen and (max-width: 1023px) {
            width: 190px;
            height: 102px;
          }
          @media only screen and (max-width: 599px) {
            width: 120px;
          }

          .info-header {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: #EEF5FC;
            border-radius: 15px 15px 0 0;
            height: 110px;
            @media only screen and (max-width: 1023px) {
              height: 65px;
            }

            .info-image {
              width: 46px;
              height: 46px;
              margin: 8px 0;
              @media only screen and (max-width: 1023px) {
                width: 20px;
                height: 20px;
                margin: 4px 0;
              }
            }
          }

          .info-content {
            height: 30%;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;

            .info-value {
              text-align: center;
              align-self: center;

              &:after {
                content: '-';
                padding: 0 2px;
              }

              &:last-child {
                &:after {
                  display: none;
                }
              }

              @media only screen and (max-width: 1023px) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }

    .product-price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      height: 70px;
      border-radius: 20px;
      width: 524px;
      padding-right: 20px;
      margin-bottom: 20px;
      @media only screen and (max-width: 1439px) {
        width: 472px;
      }
      @media only screen and (max-width: 1023px) {
        max-width: 440px;
        width: 100%;
        padding-right: 10px;
      }

      .discount-percent {
        width: 120px;
        height: 70px;
        background-color: #E05555;
        color: #ffffff;
        border-radius: 20px 0 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .percent {
          margin-right: 5px;
        }
      }

      .price {
        display: flex;
        align-items: center;
        margin: 0 20px;
        @media only screen and (max-width: 1023px) {
          margin: 0 10px;
        }
        @media only screen and (max-width: 1023px) {
          flex-direction: column;
        }

        .product-base-price {
          text-decoration: line-through;
          font-style: normal;
          font-weight: normal;
          font-size: 14px;
          line-height: 24px;
          color: #E05555;
          margin-right: 10px;
        }

        .product-final-price {
          font-style: normal;
          font-weight: 500;
          font-size: 18px;
          line-height: 31px;
          letter-spacing: -0.05em;
          margin-left: 5px;
          margin-right: 10px;
        }

        .product-price-title {
          font-style: normal;
          font-weight: 500;
          font-size: 10px;
          line-height: 17px;
        }
      }

      .purchase-button {
        display: flex;
        width: 117px;
        height: 40px;
        background-color: #4CAF50;
        border-radius: 10px;
        justify-content: center;
        align-items: center;

        &.pay-later {
          background-color: #75B7FF;
        }
      }

    }
  }

  .intro-video {
    &:deep(.vjs-error-display) {
      border-radius: 20px;
    }

    &:deep(.video-js) {
      border-radius: 20px;
    }

    &:deep(.vjs-tech) {
      border-radius: 20px;
    }

    &:deep(.vjs-poster) {
      border-radius: 20px;
    }
  }

  //vjs-error-display video-js
}

.product-demos-widget {
  display: flex;
  justify-content: space-between;

  .section-title {
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

  .contents-block {
    display: flex;
    overflow: auto;
    padding: 10px 0 0 0;
    background: #ffffff;
    margin-right: 20px;
    border-radius: 20px;

    .pamphlet-image {
      min-width: 157px;
      height: 223px;
      background-color: #F2F2F2;
      color: #fdeded;
      box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(54 90 145 / 5%);
      border-radius: 16px;
      margin: 10px 0 19px 16px;
      cursor: pointer;

      &:deep(.q-img__image) {
        border-radius: 10px;
      }
    }
  }
}

.show-product-introduction {
  margin-bottom: 30px;
  margin-top: 30px;
}

.title-style {
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
  }
}

.show-product-demos {
  margin-bottom: 30px;
}

.show-product-review {
  margin-bottom: 100px;

}

.sample-videos-pamphlet-box {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;

  .sample-container {
    display: flex;
    overflow: auto;
    scrollbar-color: #BAD9FB transparent;
    border-radius: 0;
    padding-bottom: 10px;
  }

  .sample-cart-style {
    background-color: #FFFFFF;
    box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
    border-radius: 20px;
    margin-top: 20px;
    padding: 20px 20px 10px 0;
  }

  .sample-videos-box {

    .sample-videos {
      width: 655px;
      margin-right: 24px;

      .video-item {
        margin-right: 16px;

        .player {
          width: 240px;
          height: 135px;
          background-color: #C4C4C4;
          border-radius: 16px;
          margin-bottom: 10px;

          .img {
            width: 100%;
            height: 100%;
            border-radius: inherit;

          }
        }

        .player-title {
          height: 44px;
          font-weight: 500;
          font-size: 12px;
          line-height: 21px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;

        }
      }
    }
  }

  .pamphlet-box {
    .pamphlets {
      width: 461px;

      .pamphlet-item {
        min-width: 112px;
        height: 160px;
        background-color: #F2F2F2;
        color: #fdeded;
        box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
        border-radius: 16px;
        margin: 10px 0 19px 16px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 16px;
        }
      }
    }
  }
}

.product-description {
  display: flex;
  justify-content: center;
  margin-bottom: 80px;

  .description-container {
    width: 1140px;

    .description-text {
      background-color: #FFFFFF;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
      border-radius: 20px;
      margin-top: 20px;
      padding: 10px 20px;
    }
  }
}

@media screen and (max-width: 1199px) {
  .sample-videos-pamphlet-box {
    .sample-videos-box {
      .sample-videos {
        width: 520px;
      }
    }

    .pamphlet-box {
      .pamphlets {
        width: 364px;
      }
    }
  }

  .product-description {
    .description-container {
      width: 908px;

      .description-text {

      }
    }

  }
}

@media screen and (max-width: 991px) {
  .sample-videos-pamphlet-box {
    margin-bottom: 30px;

    .sample-videos-box {
      width: 392px;
      margin-left: 16px;
    }

    .pamphlet-box {
      width: 276px;
    }
  }

  .product-description {
    .description-container {
      width: 684px;
    }
  }
}

@media screen and (max-width: 767px) {
  .title-style {
    width: 100%;
  }

  .sample-videos-pamphlet-box {
    flex-direction: column;
    margin-right: 30px;

    .sample-videos-box {
      width: 100%;
      margin-bottom: 40px;

      .sample-videos {
        background-color: transparent;
        width: 100%;
        box-shadow: none;
        margin-left: 0;
        padding: 0;
        border-radius: 0;

        .video-item {
          .player {
            width: 300px;
            height: 170px;
            border-radius: 16px;
          }
        }
      }
    }

    .pamphlet-box {
      width: 100%;

      .pamphlets {
        width: 100%;
        background-color: transparent;
        box-shadow: none;
        padding: 10px 0;
        border-radius: 0;

        .pamphlet-item {
          min-width: 105px;
          height: 150px;
          background: #FFFFFF;
          box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(54, 90, 145, 0.05);
          border-radius: 12px;
          cursor: pointer;
        }
      }
    }
  }

  .product-description {
    width: 100%;

    .description-container {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 30px;

      .description-text {
        width: 516px;
      }
    }

  }
}

@media screen and (max-width: 575px) {
  .sample-videos-pamphlet-box {
    margin-right: 16px;
    margin-bottom: 30px;

    .sample-videos-box {
      width: 100%;
      margin-bottom: 30px;

      .sample-videos {
        background-color: transparent;
        width: 100%;
        box-shadow: none;

        .video-item {
          .player {
            width: 240px;
            height: 135px;
            border-radius: 16px;

          }
        }
      }
    }

    .pamphlet-box {
      width: 100%;

      .pamphlets {
        padding: 0;
        width: 100%;
        background-color: transparent;
        box-shadow: none;

        .pamphlet-item {
          width: 70px;
          height: 100px;
          min-width: 70px;
          border-radius: 8px;
          margin: 0 0 5px 10px;
        }
      }
    }
  }

  .product-description {
    .description-container {
      margin: 0 16px;

      .description-text {
        width: 100%;
      }
    }

  }
}
</style>
