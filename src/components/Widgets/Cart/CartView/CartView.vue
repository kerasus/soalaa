<template>
  <div>
    <div class="cart-count">سبدخرید شما ({{count}} محصول)</div>
    <div class="cart-items-container">
      <div v-for="item in cartItems"
           :key="item.id"
           class="cart-items">
        <q-card class="cart-card">
          <div class="image">
            <q-img :src="item.product.photo"></q-img>
          </div>
          <div class="content">
            <div class="title">{{ item.product.title }}</div>
            <div
              v-if="item.product && item.product.attributes && item.product.attributes.info"
              class="desc-container"
            >
              <div class="item">
                <div class="icon-spacing icon-teacher"></div>
                <div class="desc">{{ item.product.attributes.info.teacher.join('، ') }}</div>
              </div>
              <div class="item">
                <div class="icon-spaitemng icon-book"></div>
                <div class="desc">رشته تحصیلی: {{ item.product.attributes.info.major.join(' - ') }}</div>
              </div>
              <div class="item">
                <div class="icon-spacing icon-menu-board"></div>
                <div class="desc">{{ item.product.attributes.info.production_year.join('، ') }}</div>
              </div>
            </div>
            <div
              v-if="item.price"
              class="price-container"
            >
              <div class="discount">{{ item.price.discountInPercent() }}%</div>
              <div class="previous">{{ item.price.toman('base', null) }}</div>
              <div class="current">{{ item.price.toman('final', null) }}</div>
              <div class="toman">تومان</div>
            </div>
          </div>
          <div class="actions">
            <q-btn
              unelevated
              class="trash"
              @click="removeItem(item)"
            >
              <div class="icon-trash"></div>
            </q-btn>
            <div class="products-container">
              <q-btn unelevated
                     @click="goToDescPage(item)">
                <div class="link">{{ descLinkLabel }}</div>
              </q-btn>
              <q-btn unelevated
                     class="details-btn"
                     @click="descShow(item)"
              >
                <div class="details">
                  <div class="icon-caret"></div>
                  <div>جزئیات محصول</div>
                </div>
              </q-btn>
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import Widgets from 'components/PageBuilder/Widgets'

export default {
  name: 'cartView',
  mixins: [Widgets],
  data() {
    return {

    }
  },
  props: {
    getData: {
      type: Function
    }
  },
  created() {
    this.loading = true
  },
  computed: {
    cartItems () {
      return this.$store.getters['Cart/cart'].cartItems.list
    },
    count () {
      return this.$store.getters['Cart/cart'].count
    },
    windowSize() {
      return this.$store.getters['AppLayout/windowSize']
    },
    descLinkLabel() {
      if (this.windowSize.x > 1024) {
        return 'رفتن به صفحه محصول'
      } else {
        return 'صفحه محصول'
      }
    }
  },

  methods: {
    cartReview() {
      this.$store.commit('loading/loading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    goToDescPage(ci) {
      // TODO:
      // do something with: ci.product.url.web
      window.location.href = ci.product.url.web
    },
    descShow(ci) {
      // TODO:
      // do something with: ci.product.url.api
      window.location.href = ci.product.url.api
    },
    removeItem(ci) {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/removeItemFromCart', ci.id).then(() => {
        this.cartReview()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.q-btn .q-btn__content {
  margin: 0px !important;
}
.cart-count {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: #65677f;
  margin-top: 24px;
}
.cart-items-container {
  margin-top: 22px;
  .cart-items {
    margin-bottom: 10px;
    .cart-card {
      background: #ffffff;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
        2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 16px;
      display: flex;
      flex-direction: row;
      .image {
        background: url('data:image/png;base64,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');
        height: 144px;
        width: 144px;
        margin: 20px;
      }
      .title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        letter-spacing: -0.03em;
        color: #23263b;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .desc-container {
          .item {
            margin-top: 8px;

            display: flex;
          }
          .icon-spacing {
            margin-right: 4px;
          }
        }
        .desc {
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #65677f;
        }
        .price-container {
          display: flex;
          align-items: center;
          margin-top: 10px;
          .discount {
            background: #e86562;
            font-size: 12px;
            padding: 5px 4px 3px 5px;
            border-radius: 6px 6px 0px 6px;
            margin-right: 10px;
            color: white;
          }
          .previous {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            text-decoration-line: line-through;
            color: #e86562;
            margin-right: 19px;
          }
          .current {
            font-style: normal;
            font-weight: 600;
            font-size: 18px;
            line-height: 28px;
            color: #23263b;
            margin-right: 4px;
          }
          .toman {
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            color: #23263b;
          }
        }
      }
      .actions {
        position: absolute;
        right: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        .products-container {
          display: flex;
          margin-bottom: 20px;
          margin-right: 20px;
          .details-btn {
            margin-left: 10px;
          }
          .details {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            margin-left: 21px;
            div {
              margin-right: 4px;
            }
          }
          .link {
            color: #9690e4;
          }
        }
        .trash {
          margin-top: 20px;
          margin-right: 20px;
        }
      }
    }
  }
}
.icon-teacher {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFlSURBVHgBhVLNUcJQEN59MoiMB+wAO4gdSAfagc4QQE/pIEsHeAPDDNCBHUgHwQrADrhAmDFk3X2YzDPisJe3sz/f7vu+RThiQUCN3Q489YdDmh+rwXKg16PbPfMEEFc2wNw8Q3wsA6A7ZZtwKO5dJoXjn0K/Rw/IEmd4MwZfBMACGpv0ydskHDMw1i/wZuygR0OaGsRWZvBKNnn3n8krxvrdMG53KIAT1n6iwO+EcTFRzEvrMD3VmCZSgwfSDo2I82rCEyGm+V+TclA9txxA0fi1g3vlyf5ByCg3KdM5B3mscNqSNCqDGAPMRYJ+rQbrzZYnKOtJDFQWBY9GfTQusiRXr6P+NSN+7jOOpWnJBj+U6ULXTHyxSjHawBpSaKgvcpA85ILKF+wbRbT4tapapxsu5VKmxphZLrR7GLpNXltxG1XoFJFY1hRtLbKs60lidgbQcmv/3KpLlr6XNVgMBrQu578BvIukbGS34/IAAAAASUVORK5CYII=');
  width: 14px;
  height: 14px;
}
.icon-book {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFDSURBVHgBnZJRTsJAEIb/WdqAYCJHwBPgDcQTyBEwSumb5QRdTyC8obzICewNbG/QI+gJ7ItJo6bjTLWkD5oKf7LNznT/me18BfYU6WM6C5+YcUKEVBKpIVquVva5fDe1ki/OmWikZwwhfj+gC7r07FiCSYsQfAIDOTsxzKcMxNBYDsPQRuLosIP0Lcej5DeOMegb4PWngy414Mq3D8TIel0cLxY2q67o+fZFisCpEr5vB5IImTm7v7uZGy0i966b6toa8xyZ20ECIvxHW6Pr6vdwWA7Et41GU23Wa5u2iM509TqImoxOPagQqLyGrga7ivmo7PiRI3LbfOvNwkx4JYaR1jurgsD2hd+YmIcFY+QQ5uUIFUUh4AX2UHCMBEMq+28MhD7Kv4piMSXCNtZ5/Dp7maoWuRZTJnSW3Tbiv3jurC+EXH02wyRplQAAAABJRU5ErkJggg==');
  width: 14px;
  height: 14px;
}
.icon-menu-board {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF3SURBVHgBjVHRTQJBEJ23nBH0w+vAswLPCoAKgArAiAb/KGHpAP9QfqACoQKhA0q4DrwflYC348zCJWeCxEkuN7Ozb+fNe0R/RK9nozzv921YrDVwCLB1FBtwowQM9OzbubYBQvmeRiOb/AIqIGN+JSAFc8SEVLqpbzqO5TzxtfS2FdyYHJgR1cCYjke2znKpBGpprp8Akm2FfA5gebahyBRYtoOAFpqcl6mVU/J1BfXJ0PrpTHSpqyCn6ZjfXp4HV3QkOh0bnpzyu9C+DXKaUvhp9z3bkdeiIoAzmo3HdhWUKSZHKUCRB4oYDVXM6yANYyg5NBFMTWMwc+zCYH8Wy04L9Wu9plXxcrlM6XC/n4h07YimBqYa3D3YJmMnyseamipSEfj55S1p6X5iS1gyWGQyOVCj4TDXSyL3RH6TQzT9foQ9G75QO+LN2W7isdD94GjubWIK0X20feO4Ksamx4CZ46aoudo9wkvvY7dna/TPQEapWvMD+7ieSJKNzPAAAAAASUVORK5CYII=');
  width: 14px;
  height: 14px;
}
.icon-trash {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGeSURBVHgBtVPNSsNAEJ5JYhE8GKHgQcTF2lLwknNQjDeP+gZ9BPsEtk9Q38BX6BtY8Adv9liKlRU9CKLmKE2y42xrYgJJ8FA/SHZ29ttvdmZnARYELFrYbrhnCNhJ+wio8zi+7ebxDSiMgKdo4OFkfIP607b2FfN/0Gx6IjKntgpMgagEEfR4YxKdDCVB4QWbLRZ9QlP5ZlTxR6OBTITqdddRiPds+uzxWWC2SEQyiYgoUikK/tls2vqkD6PrASwKZnpSa7qt6vomfLw9v5ZtqjX2j9eqG0ef7y93sc/KMBR6pFCwNSwTQiCHi7aV9llFZCE8e2llKigy7NhXVgsrGwklF3IWyaxEngqxp0ubSqk9GV/1dbHjC8kVSkNv4KGft8Yiq6Un0r2CZBzEc52etRw6c6Il454hJNtQhiwU0lBESU3MSnDOjTkTDmCqL+Ak4XG/FQoh6Ci/Qvw0WpAPgQZlhDJvDSPlw18w72ooPFEQVCSnI+q7rqPfUZ5GCKEgRXb4ZQ0LhaQc+DuNva4K4FJBYEM+fERoay78B74BbzufGt9esNEAAAAASUVORK5CYII=');
  height: 18px;
  width: 18px;
}
.icon-caret {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACYSURBVHgB5c+xDYJQEAbg/2AAHcERjAmxfiM4gbHQoBUjHFvQUVpaW0FrJM5gaWkFFe+AhGvgEQbgqj+X/0vugAVNFPF6rhOGvNHsaSgryc433k6hyzU+WpFsBD2iA9WSunCHYC23HaM7X0NR5P8gME9Yue/25vV5578hShL+ap/g+KM96QGhGD6tXMgJFddA2p90GqKlTAM5kztiD0yNhAAAAABJRU5ErkJggg==');
  width: 14px;
  height: 14px;
}

@media screen and (min-width: 1920px) {
}
@media screen and (min-width: 1440px) {
}
@media screen and (min-width: 1024px) and (max-width: 1439px) {
  .cart-items-container {
    .cart-items {
      .cart-card {
        .image {
          margin: 16px !important;
        }
        .actions {
          .products-container {
            margin-bottom: 10px !important;
            .details {
              margin-left: 5px !important;
            }
          }
        }
        .content {
          .desc-container {
            .item {
              margin-top: 9px !important;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 600px) and (max-width: 1023px) {
  :deep(.q-btn .q-btn__content) {
    margin: 0px !important;
  }
  .cart-items {
    .cart-card {
      .content {
        margin-top: 20px;
        padding-bottom: 25px;
        .price-container {
          .previous {
            margin-right: 8px !important;
          }
        }
        .desc-container {
          margin-top: 8px !important;
          .item {
            margin-top: 7px !important;
          }
        }
      }
      .image {
        width: 110px !important;
        height: 110px !important;
        background-repeat: round !important;
        border-radius: 0;
      }
      .actions {
        .products-container {
          margin-right: 0px !important;
          .details {
            margin-left: 0px !important;
            margin-right: 16px !important;
            font-weight: 400;
            font-size: 12px;
          }
          .link {
            font-weight: 400;
            font-size: 12px;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 350px) and (max-width: 599px) {
  .cart-card {
    padding-bottom: 40px !important;
    .content {
      margin-top: 0px !important;
      padding-top: 49px !important;
      .title {
        position: absolute;
        top: 12px;
        left: 12px;
      }
      .desc-container {
        .item {
          margin-top: 0px !important;
          margin-bottom: 6px !important;
        }
      }
      .price-container {
        .previous {
          margin-right: 13px !important;
        }
        .current {
          font-size: 16px !important;
        }
        .toman {
          font-size: 14px !important;
        }
      }
    }
    .actions {
      .products-container {
        margin-bottom: 5px !important;
        margin-right: 0px !important;
        .details-btn {
          margin-left: 25px !important;
        }
      }
      .details {
        margin-left: 0px !important;
        margin-right: 13px !important;
      }
      .link {
        font-size: 12px !important;
      }
      div {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
      }
      .trash {
        margin-left: 13px !important;
        margin-top: 8px !important;
      }
    }
    .image {
      width: 72px !important;
      height: 72px !important;
      margin-left: 12px !important;
      margin-right: 8px !important;
      background-repeat: round !important;
      border-radius: 0;
      margin-top: 45px !important;
    }
  }
  :deep(.q-btn .q-btn__content) {
    margin: 0px !important;
  }
}
</style>
