<template>
  <q-card class="content-item-box"
          :style="{minWidth: options.minWidth}">
    <router-link :to="getRoutingObject"
                 class="content-item-router-link">
      <div class="img-box">
        <div class="img-title-container">
          <lazy-img :src="content.photo"
                    :alt="content.title"
                    class="img"
                    width="16"
                    height="9" />
        </div>
        <div class="play-btn">
          <div class="play-icon" />
        </div>
      </div>
    </router-link>
    <div class="content-info-container ">
      <router-link :to="getRoutingObject"
                   class="content-item-router-link">
        <div class="content-box-text">
          <div v-if="defaultOptions.showSetTitle"
               class="main-title ellipsis">
            {{ content.set.short_title}}
          </div>
          <div class="title-text  ellipsis-2-lines">
            {{ content.short_title ? content.short_title : content.title }}
          </div>
        </div>
      </router-link>
      <div class="content-action-container">
        <bookmark v-if="defaultOptions.showBookmark"
                  class="content-item-bookmark"
                  :is-favored="options.content.is_favored"
                  :loading="bookmarkLoading"
                  @clicked="handleContentBookmark" />
        <q-btn v-if="localOptions.showDownloadMenu && localOptions.content.file?.video"
               class="content-item-more-btn"
               flat
               icon="isax:more-circle">
          <q-tooltip anchor="top middle"
                     self="bottom middle"
                     :offset="[10, 10]">
            دانلود محتوا
          </q-tooltip>
          <q-menu>
            <q-list>
              <q-item v-for="(item, index) in localOptions.content.file.video"
                      :key="index"
                      v-close-popup
                      clickable
                      class="route-link"
                      target="_blank"
                      :href="item.link + (item.link.includes('?') ? '' : '?') +'download=1'">
                <q-item-section> دانلود فایل با {{ item.caption }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>

  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'
import LazyImg from 'src/components/lazyImg.vue'
import Bookmark from 'components/Bookmark.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'contentItem',
  components: { LazyImg, Bookmark },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['onBookmarkLoaded', 'onBookmarkClicked'],
  data: () => ({
    bookmarkLoading: false,
    content: new Content(),
    defaultOptions: {
      style: {},
      minWidth: 'auto',
      content: new Content(),
      showSetTitle: false,
      showBookmark: false,
      showDownloadMenu: false,
      routeToContent: true
    }
  }),
  computed: {
    getRoutingObject() {
      if (this.defaultOptions.routeToContent) {
        return {
          name: 'Public.Content.Show',
          params: { id: this.content.id ? this.content.id : -1 }
        }
      }
      return {}
    },
    bookmarkValue: {
      get () {
        return this.options.content.is_favored
      },
      set () {
        this.bookmarkUpdated()
      }
    }
  },
  created () {
    if (!this.options.content) {
      this.content = new Content(this.options)
    } else {
      this.content = new Content(this.options.content)
    }
  },
  methods: {
    handleContentBookmark (value) {
      this.bookmarkLoading = true
      if (this.bookmarkValue) {
        this.$apiGateway.content.unfavored(this.options.content.id)
          .then(() => {
            this.bookmarkValue = !this.bookmarkValue
            this.bookmarkClicked(value)
            this.bookmarkLoading = false
          })
          .catch(() => {
            this.bookmarkLoading = false
          })
        return
      }
      this.$apiGateway.content.favored(this.options.content.id)
        .then(() => {
          this.bookmarkValue = !this.bookmarkValue
          this.bookmarkClicked(value)
          this.bookmarkLoading = false
        })
        .catch(() => {
          this.bookmarkLoading = false
        })
    },
    bookmarkUpdated (value) {
      this.$emit('onBookmarkLoaded', value)
    },
    bookmarkClicked (value) {
      this.$emit('onBookmarkClicked', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
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

    .img-box .img-videos {
      opacity: 0.6;
    }
  }

  &:hover .play-btn {
    opacity: 1;
    background: #ffc107;
    transition: opacity ease 0.5s;
  }

  &.q-card {
    //min-width: 318px;
  }

  .content-action-container{
    position: absolute;
    right: 0;
    top: -10px;
    .content-item-bookmark {
      margin: -10px;
    }
  }

  .content-item-router-link {
    width: 100%;
  }

  .content-box-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 48px;
  }

  .img-box {
    position: relative;

    .img-title-container {
      border-radius: inherit;
      box-shadow: none;
      width: 100%;

      .img {
        width: inherit;
        border-radius: 20px 20px 0 0;
      }
    }

    .img-videos {
      background: #000000;
      color: white;
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 40px;
      top: 140px;
      display: flex;
      align-items: center;
      padding-right: 12.19px;
      padding-left: 14px;
      justify-content: space-between;
      transition: all ease 0.5s;
    }
  }

  .content-info-container {
    min-height: 100px;
    padding: 10px 16px 16px 16px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .main-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      width: 220px;

      a {
        margin-bottom: 0;
      }

    }
    .title-text {
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.03em;
      color: #333333;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
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
  }

  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    background: #000000;
    opacity: 0.6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    .play-icon {
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADKSURBVHgBrdRdDcIwFAXgO4KASagFHGwOwEFxABJQMFAwCzjoJOCASpiDci60SyF0W39Och62Nd9u2qREiDGmQU+ooJwwYL7TJ6N2on+JRjdoHfgmUcU/owhsLgLtAD5RSZmYj/YWbXIxH1Wh/YzFXCTKU3Y+moq58OEoB+ZiHMFgKWxKCUyjhxLYDd1VVfXghy2lZUCPQLT/MnayAW2BtL8QRUym0TOA+9yiJWykz75cAY0La99YaNFlLTLF3rJlLkcL7u0lWVNGXs6ulXAPwEiJAAAAAElFTkSuQmCC');
      height: 19px;
      width: 19px;
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 992px) {
    .img-box {
      .img {
      }
    }

    .content-info-container {
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
    width: 250px;
    display: flex;
    border-radius: 18px;
    flex-direction: row;

    .img-box {
      width: 100%;

      .img {
        border-radius: 10px;
      }
    }

    .content-info-container {
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
          a {
          }

          .more {
            display: none;
          }
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

  @media screen and(max-width: 350px) {
    width: 150px;
  }
}
</style>
