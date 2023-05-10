<template>
  <q-card v-if="loading"
          class="product-item-box q-pa-md"
          :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
    <div style="max-width: 300px">
      <q-skeleton height="270px"
                  square
                  animation="fade" />
      <q-skeleton type="text"
                  animation="fade" />
      <q-item>
        <q-item-section avatar>
          <q-skeleton type="QAvatar"
                      animation="fade" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text"
                        animation="fade" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text"
                        animation="fade" />
          </q-item-label>
        </q-item-section>
      </q-item>

      <div class="row items-start no-wrap q-mt-sm">
        <div class="col q-pr-sm">
          <q-skeleton type="text"
                      square
                      width="30%"
                      animation="fade" />
          <q-skeleton type="text"
                      square
                      height="12px"
                      animation="fade" />
          <q-skeleton type="text"
                      square
                      height="12px"
                      width="75%"
                      animation="fade" />
        </div>
        <q-skeleton width="56px"
                    height="20px"
                    square
                    animation="fade" />
      </div>
    </div>
  </q-card>
  <q-card v-else
          class="product-item-box"
          :style="{minWidth: localOptions.minWidth, ...localOptions.style}">
    <div class="img-box">
      <router-link :to="getRoutingObject">
        <lazy-img :src="product.photo"
                  :alt="product.title"
                  width="1"
                  height="1"
                  class="img" />
      </router-link>
    </div>
    <div class="product-content-box">
      <div class="title-box">
        <div class="main-title ellipsis-2-lines">
          {{ product.title }}
        </div>
      </div>
      <div v-if="product.attributes"
           class="info-box">
        <div class="teacher-image">
          <q-avatar size="32px"
                    font-size="32px"
                    color="grey"
                    text-color="white"
                    icon="account_circle" />
        </div>
        <div v-if="product.attributes.info"
             class="teacher-name">{{getTeacherOfProduct()}}</div>
      </div>
      <div v-if="localOptions.showPrice"
           class="action-box">
        <div class="more-detail product-more-detail">
          <div class="price-box">
            <div class="price-info">
              <div v-if="product.price['final'] !== product.price['base']"
                   class="discount">
                <span>
                  %{{
                    (
                      (1 - product.price['final'] / product.price['base']) *
                      100
                    ).toFixed(0)
                  }}
                </span>
              </div>
              <div class="price-container">
                <div class="final-price-box">
                  <div class="final-price">
                    {{ product.price['final'] }}
                  </div>
                  <div class="price-Toman">تومان</div>
                </div>
                <div v-if="product.price['discount'] !== 0"
                     class="main-price">{{ product.price['base'] }}</div>
              </div>
            </div>
          </div>
        </div>
        <q-btn v-if="localOptions.canAddToCart"
               unelevated
               :loading="addToCartLoading"
               :productId="product.id"
               :data-product-id="product.id"
               class="btn-green"
               @click="addToCart">
          <q-icon name="add" />
          <span>افزودن به سبد</span>
        </q-btn>
      </div>
    </div>
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'productItem',
  components: { LazyImg },
  mixins: [mixinWidget],
  data: () => ({
    addToCartLoading: false,
    loading: false,
    defaultOptions: {
      style: {},
      minWidth: 'auto',
      canAddToCart: true,
      showPrice: true,
      product: new Product(),
      routeToProduct: true
    }
  }),
  computed: {
    getRoutingObject() {
      if (this.defaultOptions.routeToProduct) {
        return {
          name: 'Public.Product.Show',
          params: { id: this.product.id || -1 }
        }
      }
      return {}
    },
    product: {
      get() {
        if (!this.localOptions.product) {
          return new Product()
        }
        return this.localOptions.product
      },
      set(value) {
        this.localOptions.product = value
      }
    }
  },
  created () {
    if (this.options.product) {
      this.product = new Product(this.options.product)
    } else if (this.options.productId || this.options.paramKey || this.$route.params.id) {
      this.loading = true
      const productId = this.options.productId ? this.options.productId : this.options.paramKey ? this.$route.params[this.options.paramKey] : this.$route.params.id
      return this.$alaaApiInstance.get(API_ADDRESS.product.show.base + '/' + productId)
      // this.$apiGateway.product.show(productId)
        .then(response => {
          const product = response.data.data
          this.product = new Product(product)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    } else {
      this.product = new Product(this.options)
    }
  },
  methods: {
    getTeacherOfProduct() {
      if (this.product.attributes.info.teacher) {
        return this.product.attributes.info.teacher[0]
      }
      return null
    },
    addToCart() {
      this.addToCartLoading = true
      this.$store.dispatch('Cart/addToCart', { product_id: this.product.id })
        .then(() => {
          this.$store.dispatch('Cart/reviewCart')
            .then(() => {
              this.addToCartLoading = false
            })
        }).catch(() => {
          this.addToCartLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-item-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
  2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;
  top: 0;
  transition: all ease 0.5s;

  &:hover {
    box-shadow: -5px -6px 10px rgba(255, 255, 255, 0.6),
    5px 5px 20px rgba(0, 0, 0, 0.1);
    top: -10px;
  }

  .img-box {

    a {
      border-radius: inherit;
      box-shadow: none;
      width: 100%;
      height: 270px;

      .img {
        width: inherit;
        border-radius: 20px 20px 0 0;

        @media screen and (max-width: 600px){
          width: 100%;
        }
      }
    }
  }

  &.q-card {
    //min-width: 318px;
  }

  .product-content-box {
    padding: 10px 16px 16px 16px;

    .title-box {
      min-height: 42px;
      display: flex;
      align-items: center;
    }

    .price-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-top: 21px;

      .add-cart-info {
        display: flex;
        justify-content: center;
        align-items: center;

        .add-cart-icon {
          width: 19px;
          order: 1;
        }
      }

      .price-info {
        display: flex;
        justify-content: center;
        align-items: baseline;

        .final-price-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .final-price {
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.03em;
            color: #656f7b;
            margin-left: 8px;
          }
        }

        .main-price {
          text-decoration: line-through;
          /* margin-left: 12px; */
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #656f7b;

          opacity: 0.4;
        }

        .price-Toman {
          font-size: 12px;
          font-weight: 400;
          line-height: 19px;
          margin-left: 3px;
          color: #656f7b;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .more-detail {
        font-weight: 500;
        font-size: 12px;
        line-height: 21px;
        color: #666666;
        cursor: pointer;

        a {
          text-decoration: none;
          color: inherit;
        }
      }

      .btn-style {
        width: 116px;
        height: 40px;
        background-color: #4caf50;
        border-radius: 10px;
        border: none;
        color: white;
        font-size: 14px;
        letter-spacing: -0.03em;

        img {
          width: 15px;
          height: 15px;
          margin-right: 7px;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active {
          border: 2px solid #4caf50;
          color: #4caf50;
          background-color: white;
        }
      }
    }

    .discount {
      width: 36px;
      height: 24px;
      border-radius: 6px;
      background-color: #ef5350;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: white;
        font-weight: 500;
        font-size: 14px;
        padding-top: 3px;
      }
    }
    @media screen and(max-width: 600px) {
    }
  }

  .info-box {
    display: flex;
    align-items: center;
  }

  .total-score {
    display: flex;
  }

  .teacher-image {
    height: 32px;
    width: 32px;
  }

  .star-score {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBnVNBToNQEJ35KJtuOEL/ynQl3oAj6AnQxBrjqj2B9Qa6M9EFnMDewHoK027KEf6qixaYDr+B/ob/G9qXAAN58+bNzAfBAfp/7oMofvWLv7lBmSgbT7gEwCte+d7X19ofuWh4pPrS+KTYhbS5EEeqmwhcLg4c0HLExFXE0Y+Fq5g9hsveFOV74wRp/nTLz5iTQtj13AUZi2VA+MECQ4LzoXgGlMK5IEj1DGj+mHA38UnJJaU4+L5vhniiyBSvvu6qYL9GP6/WpDqll964DhsB11G1QOHgM2sJ0GJYrTHoIBDQ4iVsCTBCWzWrRJlHbQHC6JBEb+D3JPcrdWxC4HUdXhgJM5aL+YTNoPAejD4rFxP+wRIQ+URvqij/6rQtVRliQ9SZCLgAAAAASUVORK5CYII=');
    width: 18px;
    height: 18px;
  }

  .teacher-name {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: right;
    letter-spacing: -0.03em;
    color: #656f7b;
    margin-left: 8px;
  }

  .price-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .btn-green {
    background: #4caf50;
    color: white;
    @media screen and (max-width: 600px){
      font-size: 11px;
      margin: 5px;
    }
  }

  @media screen and (max-width: 992px) {
    .img-box {
      .img {
      }
    }

    .product-content-box {
      .main-title {
        a {
        }

        .title-box {
          .title-text {
          }
        }
      }

      .price-box {
        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
            }
          }

          .main-price {
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          a {
          }
        }

        .btn-style {
          width: 102px;

          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        span {
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    width: 240px;
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;

    .img-box {
      width: 100px;

      .img {
        border-radius: 10px;
      }

      @media screen and (max-width: 600px){
        width: 100%;
      }
    }

    .product-content-box {
      padding: 0 0 0 16px;
      width: 100%;

      .main-title {
        margin-bottom: 0;

        a {
        }

        .title-box {
          height: 44px;
          justify-content: center;

          .title-text {
            -webkit-line-clamp: 2;
          }
        }
      }

      .price-box {
        margin-bottom: 0;

        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
              margin-left: 2px;
            }
          }

          .main-price {
            margin-left: 4px;
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          .more {
            display: none;
          }
        }
        .btn-green{
          margin-left: 20px;
        }

        .btn-style {
          width: 100px;
          height: 25px !important;
          border-radius: 8px;

          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        height: 20px;
        /* margin-left: 3px; */
      }
    }
  }

  @media screen and (max-width: 600px){
    flex-direction: row;
    padding: 10px;
    .img-box{
      a{
        .img{
          border-radius: 20px;
        }
      }
    }
    .product-content-box{
      .action-box{
        display: block;
        .price-box{
          display: block;
          .price-info{
            margin-right: 10px;
            align-items: center;
            .discount{
              margin-right: 5px;
            }
          }
        }
        .btn-green{
          width: 100px;
        }
      }
    }
  }
}
</style>
