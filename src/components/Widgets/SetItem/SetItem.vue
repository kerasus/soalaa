<template>
  <q-card class="set-item-box"
          :style="{minWidth: options.minWidth}">
    <router-link :to="{
      name: 'Public.Set.Show',
      params: { id: set.id ? set.id : -1 }
    }">
      <div class="img-box">
        <div class="img-videos">
          <div class="flex">
            <div class="play-icon" />
            {{ set.contents_count }} ویدیو
          </div>
          <div class="flex pop-up">
            <div class="tv" />
            <span class="title">
              {{ set.short_title }}
            </span>
          </div>
        </div>
        <div class="img-container">
          <lazy-img :src="set.photo"
                    class="img"
                    :alt="set.title"
                    width="16"
                    height="9" />
        </div>
      </div>
      <div class="set-content-box flex">
        <div class="main-title ellipsis-2-lines">
          {{ set.title }}
        </div>
      </div>
    </router-link>
    <div v-if="false"
         class="info-box">
      <div class="teacher-info">
        <div v-if="set.author?.photo"
             class="teacher-image">
          <lazy-img :src="set.author?.photo"
                    alt="set"
                    width="1"
                    height="1" />
        </div>
        <div v-if="setAuthorFullName"
             class="teacher-name">
          {{ setAuthorFullName }}
        </div>
      </div>
      <!-- <div class="teacher-score">
          <div class="total-score">
            <div class="counts-score">(۶۲۵)</div>
            ۳.۸
            <div class="star-score"></div>
          </div>
        </div> -->
      <div class="three-dots" />
    </div>
  </q-card>
</template>

<script>
import { Set } from 'src/models/Set.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'setItem',
  components: {
    LazyImg
  },
  props: {
    data: {
      type: Set,
      default: new Set()
    },
    options: {
      type: Object,
      default: () => {
        return {
          style: {},
          minWidth: 'auto',
          set: new Set()
        }
      }
    }
  },
  data: () => ({
    set: new Set()
  }),
  computed: {
    setAuthorFullName () {
      if (!this.set.author?.first_name && !this.set.author?.last_name) {
        return ''
      }
      return this.set.author?.first_name + ' ' + this.set.author?.last_name
    }
  },
  created () {
    if (!this.options.set) {
      this.set = new Set(this.data)
    } else {
      this.set = new Set(this.options.set)
    }
  }
}
</script>

<style lang="scss" scoped>
.set-item-box {
  display: flex;
  flex-direction: column;
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
    .img-box .img-videos {
      opacity: 0.6;
    }
  }

  .img-box {
    .img-container {
      box-shadow: none;
      width: 100%;
      border-radius: 20px 20px 0 0;
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
      bottom: 82px;
      left: 0;
      display: flex;
      align-items: center;
      padding-right: 12.19px;
      padding-left: 14px;
      justify-content: space-between;
      transition: all ease 0.5s;
      z-index: 2;
      .pop-up {
        .title {
          max-width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .set-content-box {
    min-height: 75px;
    padding: 10px 16px 16px 16px;

    .main-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      align-self: center;

      a {
        margin-bottom: 0;
      }
      .title-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
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

  &.q-card {
    //min-width: 318px;
  }

  .teacher-info {
    display: flex;
    align-items: center;
  }

  .info-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 16px;
    margin-right: 26px;
    margin-bottom: 16px;
  }

  .total-score {
    display: flex;
  }

  .teacher-image {
    height: 32px;
    width: 32px;
    img {
      height: 32px;
      width: 32px;
      border-radius: 50%;
    }
  }

  .star-score {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEjSURBVHgBnVNBToNQEJ35KJtuOEL/ynQl3oAj6AnQxBrjqj2B9Qa6M9EFnMDewHoK027KEf6qixaYDr+B/ob/G9qXAAN58+bNzAfBAfp/7oMofvWLv7lBmSgbT7gEwCte+d7X19ofuWh4pPrS+KTYhbS5EEeqmwhcLg4c0HLExFXE0Y+Fq5g9hsveFOV74wRp/nTLz5iTQtj13AUZi2VA+MECQ4LzoXgGlMK5IEj1DGj+mHA38UnJJaU4+L5vhniiyBSvvu6qYL9GP6/WpDqll964DhsB11G1QOHgM2sJ0GJYrTHoIBDQ4iVsCTBCWzWrRJlHbQHC6JBEb+D3JPcrdWxC4HUdXhgJM5aL+YTNoPAejD4rFxP+wRIQ+URvqij/6rQtVRliQ9SZCLgAAAAASUVORK5CYII=');
    width: 18px;
    height: 18px;
  }

  .three-dots {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAQCAYAAAAxtt7zAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAABHSURBVHgB1Y2xDYAwEMTOLwZgQ2agThM2SMV8jPAT/BEaWmosWXJnWjs3U8MmJfpScpdZJU09Ap54yajSPuMCp0OHPuE3lxsqOj6hAowbEAAAAABJRU5ErkJggg==');
    width: 4px;
    height: 16px;
  }

  .play-icon {
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADvSURBVHgBnVOBEYIwDGw9B2AE3IAR4gaMgBPoBjCCToAb6Aa4AW4AG+AGNTmeu1qBlv7dXyBNv+n1o5UFYwxxIPz2zJfWuldbwCKlmYfk01CRApuuzAS5jHlHvpOaEKFGihfWUmZrCdKakKBS/q471NZ/18WJJqj1sb5iDmAeLWTtma5LktupCMASRzVapIwWgtiHw41J8tLRQi6iheC3M/Mt3e1VBPD0D6bEw+aOpAsZGf5sIXL6mcVpPDwiuWXIxszNHxaaBYEM65MArZ1G1qTbQ1sjLy6+qBDA+i4G5BPffu2IpRwK/PbMJ4znxRemPTi8LJF12AAAAABJRU5ErkJggg==');
    height: 18px;
    width: 18px;
    margin-right: 9.67px;
  }

  .tv {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACmSURBVHgB1ZLhDURAEIVn5QrQwd11oAQlXAnXAR2ICrSgAzqgA1RgStDBehMjkY3YjX8m+ezgfSy7RE5Za5OTaz/yFUI1qA7nBWhCxBjMIAeZ9rGbM3sYQwr2wAcU2peAtV+MMe1RnPUmX0zmD3p5KOSvSCnoyP8JVsdBnEinxRRekzgR3ayHiUzbDwqttzgvHEYRdVtNV4ZmZB17d+cknrcxaCEuK0dYXXRSR/1RAAAAAElFTkSuQmCC');
    height: 14px;
    width: 14px;
    margin-top: 2px;
    margin-right: 5px;
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

  @media screen and (max-width: 992px) {
    .img-box {
      .img {
      }
    }

    .set-content-box {
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
    margin-bottom: 16px;

    .img-box {
      width: 100%;
      img {
        border-radius: 10px;
      }
    }

    a {
    }

    .set-content-box {
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

  @media screen and (max-width: 350px){
    width: 150px;
  }

}
</style>
