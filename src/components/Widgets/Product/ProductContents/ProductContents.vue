<template>
  <div v-if="set.contents || set.pamphlets_count"
       class="product-contents-widget"
       :class="options.className"
       :style="options.style">
    <q-card class="previewSetsOfProduct custom-card q-mb-md">
      <div v-if="product.loading"
           class="q-py-md">
        <q-skeleton type="QToolbar" />
      </div>
      <div v-if="setOptions.length > 0"
           class="box bg-primary q-pa-md q-mb-sm row">
        <div class="q-my-md text-white text-subtitle1 text-weight-bolder title">
          انتخاب دوره
        </div>
        <q-select v-model="setTitle"
                  :options="filteredOptions"
                  behavior="menu"
                  use-input
                  class="select-set q-px-md"
                  @filter="filterSetTitle" />
      </div>
      <div v-else-if="!product.loading"
           class="bg-primary q-pa-md q-mb-sm text-white flex justify-center">
        دوره ای وجود ندارد
      </div>
      <q-tabs v-model="tab"
              active-color="black"
              class="text-grey-5 bg-white tabs">
        <q-tab v-if="videos.length > 0"
               name="videos"
               class="tab">
          <span>فیلم ها</span>
        </q-tab>
        <q-tab v-if="pamphlets.length > 0"
               name="pamphlets"
               class="tab">
          <span>جزوات</span>
        </q-tab>
      </q-tabs>
      <q-tab-panels v-if="!set.loading && (pamphlets.length > 0 || videos.length > 0)"
                    v-model="tab"
                    animated
                    transition-prev="scale"
                    transition-next="scale"
                    class="bg-white text-black text-center tab-panels">
        <q-tab-panel name="videos">
          <div v-if="videos.length > 0"
               v-dragscroll
               class="contents-block">
            <block-component class="block"
                             :options="getBlockOptions" />
          </div>
          <q-banner v-else
                    inline-actions
                    rounded
                    class="bg-grey-2 text-primary"> فیلمی وجود ندارد</q-banner>
        </q-tab-panel>

        <q-tab-panel name="pamphlets">
          <div v-if="pamphlets.length > 0"
               v-dragscroll
               class="pamphlet-list">
            <div v-for="pamphlet in pamphlets"
                 :key="pamphlet.id"
                 class="q-mx-md pamphlet">
              <q-tooltip anchor="top middle"
                         self="bottom middle"
                         :offset="[10, 10]">
                {{pamphlet.title}}
              </q-tooltip>
              <div class="pamphlet-title q-mb-sm column justify-center ellipsis-2-lines">
                {{pamphlet.title}}
              </div>
              <svg version="1.1"
                   xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink"
                   x="0px"
                   y="0px"
                   viewBox="0 0 512 512"
                   xml:space="preserve"
                   class="pdf-icon"
                   @click="downloadPamphlet(pamphlet)">
                <path style="fill:#F4A14E;"
                      d="M512,256c0,19.508-2.184,38.494-6.311,56.738c-6.416,28.348-17.533,54.909-32.496,78.817  c-0.637,1.024-1.285,2.048-1.943,3.072C425.681,465.251,346.3,512,256,512S86.319,465.251,40.751,394.627  c-19.822-30.699-33.249-65.912-38.4-103.769c-1.191-8.735-1.933-17.617-2.215-26.624C0.042,261.496,0,258.759,0,256  c0-24.9,3.553-48.964,10.177-71.722c2.654-9.101,5.799-17.993,9.415-26.645c5.862-14.106,12.967-27.564,21.159-40.26  C86.319,46.749,165.7,0,256,0s169.681,46.749,215.249,117.373c10.365,16.06,18.986,33.353,25.59,51.618  c3.124,8.673,5.81,17.565,8.004,26.645c2.111,8.714,3.772,17.607,4.953,26.645c1.16,8.746,1.86,17.638,2.111,26.645  C511.969,251.277,512,253.628,512,256z" />
                <path style="fill:#F9EED7;"
                      d="M471.249,127.76v266.867C425.681,465.251,346.3,512,256,512S86.319,465.251,40.751,394.627V22.8  c0-12.591,10.209-22.8,22.8-22.8h279.939L471.249,127.76z" />
                <path style="fill:#E8DBC4;"
                      d="M343.489,104.958V0l127.76,127.76H366.291C353.698,127.76,343.489,117.551,343.489,104.958z" />
                <path style="fill:#FF525D;"
                      d="M471.249,330.961v63.666C425.681,465.251,346.3,512,256,512S86.319,465.251,40.751,394.627v-63.666  L471.249,330.961L471.249,330.961z" />
                <path style="fill:#5C5E70;"
                      d="M157.375,292.967c-3.474,0-6.921-0.547-10.187-1.678c-8.463-2.934-13.871-9.302-14.841-17.473  c-1.317-11.103,5.306-29.586,44.334-54.589c11.285-7.229,22.837-12.976,34.413-17.492c1.162-2.198,2.351-4.438,3.558-6.711  c8.945-16.848,19.331-36.411,27.596-55.402c-15.258-30.061-21.671-58.182-21.671-66.936c0-15.46,8.68-27.819,20.639-29.387  c4.811-0.632,21.117-0.425,28.887,28.714c4.785,17.942-1.38,41.91-11.673,66.958c2.814,5.151,5.964,10.429,9.479,15.702  c7.666,11.499,16.328,22.537,25.247,32.441c37.765,0.227,67.003,9.163,74.427,13.943c10.572,6.809,14.857,18.342,10.662,28.7  c-5.549,13.703-20.603,15.948-31.812,13.707c-16.191-3.238-34.248-17.427-46.544-28.758c-4.367-4.024-8.712-8.328-12.978-12.842  c-18.743,0.422-41.758,3.244-65.516,11.696c-1.971,3.754-3.836,7.355-5.553,10.76c-2.391,5.244-21.103,45.772-33.678,58.348  C175.52,289.313,166.357,292.967,157.375,292.967z M200.593,222.43c-5.368,2.695-10.724,5.722-16.02,9.116  c-37.601,24.088-38,38.004-37.699,40.549c0.296,2.493,2.014,4.302,5.105,5.373c5.426,1.88,13.981,0.718,19.841-5.141  C180.051,264.094,193.9,236.627,200.593,222.43z M308.038,202.364c15.452,14.531,30.458,24.596,41.264,26.756  c9.163,1.835,14.013-1.469,15.385-4.854c1.497-3.698-0.474-7.981-5.025-10.91C355.383,210.602,335.446,204.274,308.038,202.364z   M251.13,155.566c-6.247,13.416-13.238,26.834-19.949,39.513c14.801-4.077,29.376-6.35,43.204-7.348  c-6.683-8.035-12.988-16.454-18.647-24.943C254.142,160.395,252.605,157.983,251.13,155.566z M243.624,57.773  c-0.172,0-0.342,0.01-0.508,0.032c-3.806,0.498-7.911,6.33-7.911,14.881c0,3.494,2.029,14.9,7.474,30.631  c1.746,5.042,4.037,11.087,6.957,17.737c6.246-17.614,9.422-33.685,6.332-45.271C252.619,63.225,247.458,57.773,243.624,57.773z" />
                <g>
                  <path style="fill:#F9EED7;"
                        d="M135.128,366.165c0-3.319,3.053-6.239,7.7-6.239h27.479c17.523,0,31.328,8.231,31.328,30.532v0.664   c0,22.302-14.337,30.798-32.656,30.798h-13.142v28.673c0,4.248-5.177,6.372-10.355,6.372c-5.176,0-10.354-2.124-10.354-6.372   V366.165z M155.838,377.979v28.011h13.142c7.433,0,11.947-4.247,11.947-13.275v-1.46c0-9.027-4.513-13.275-11.947-13.275   L155.838,377.979L155.838,377.979z" />
                  <path style="fill:#F9EED7;"
                        d="M256.464,359.926c18.319,0,32.656,8.496,32.656,31.328v34.382c0,22.833-14.337,31.328-32.656,31.328   h-23.497c-5.442,0-9.027-2.921-9.027-6.239v-84.56c0-3.319,3.585-6.239,9.027-6.239L256.464,359.926L256.464,359.926z    M244.65,377.979v60.932h11.815c7.433,0,11.947-4.248,11.947-13.275v-34.382c0-9.027-4.513-13.275-11.947-13.275H244.65V377.979z" />
                  <path style="fill:#F9EED7;"
                        d="M315.541,366.297c0-4.247,4.513-6.372,9.027-6.372h46.064c4.38,0,6.239,4.646,6.239,8.894   c0,4.912-2.256,9.16-6.239,9.16h-34.381v22.435h20.045c3.983,0,6.239,3.85,6.239,8.098c0,3.584-1.858,7.833-6.239,7.833h-20.045   v34.249c0,4.247-5.177,6.372-10.355,6.372c-5.176,0-10.354-2.124-10.354-6.372v-84.296H315.541z" />
                </g>
              </svg>
            </div>
          </div>
          <q-banner v-else
                    inline-actions
                    rounded
                    class="bg-grey-2 text-primary">جزوه ای وجود ندارد</q-banner>
        </q-tab-panel>
      </q-tab-panels>
      <q-banner v-else-if="!product.loading && !set.loading"
                inline-actions
                rounded
                class="bg-grey-2 text-primary text-center">محتوایی وجود ندارد</q-banner>
      <div v-if="product.loading || set.loading"
           class="q-py-md">
        <q-skeleton type="QToolbar" />
      </div>

    </q-card>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import { dragscroll } from 'vue-dragscroll'
import { Product } from 'src/models/Product.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'
import { Content, ContentList } from 'src/models/Content'
import { Block } from 'src/models/Block.js'
import BlockComponent from 'src/components/Widgets/Block/Block.vue'
import { openURL } from 'quasar'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'ProductContents',
  components: {
    BlockComponent
  },
  directives: {
    dragscroll
  },
  mixins: [
    mixinPrefetchServerData,
    mixinWidget
  ],
  data() {
    return {
      set: new Set(),
      product: new Product(),
      index: null,
      tab: 'videos',
      videos: [],
      pamphlets: [],
      setTitle: null,
      setOptions: [],
      contents: new ContentList(),
      filteredOptions: []
    }
  },
  computed: {
    getBlockOptions () {
      return {
        block: new Block({
          title: '',
          contents: this.contents
        }),
        gridView: this.options.contentGridView
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
  watch: {
    options: {
      handler() {
        this.setProduct()
      },
      deep: true
    },
    setTitle(newVal) {
      if (!newVal) {
        return
      }
      const set = this.product.sets.list.filter(set => set.title === newVal)
      this.getSet(set[0].id)
    },
    setOptions(newVal) {
      this.filteredOptions = newVal
    }
  },
  methods: {
    filterSetTitle (val, update) {
      if (val === '') {
        update(() => {
          this.filteredOptions = this.setOptions
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.setOptions.filter(v => v.indexOf(needle) > -1)
      })
    },
    setProductSets (product) {
      this.setOptions = product.sets.list.map(set => set.title)
      if (this.setOptions.length === 0) {
        this.product.loading = false
        return
      }
      this.setTitle = this.setOptions[0]
    },
    setProduct () {
      this.product.loading = true
      if (this.options.product.id) {
        this.product = this.options.product
        this.setProductSets(this.product)
        this.product.loading = false
        return
      }
      this.getProduct()
        .then((response) => {
          this.product = new Product(response.data.data)
          this.setProductSets(this.product)
          this.product.loading = false
        })
        .catch(() => {
          this.product.loading = false
        })
    },
    prefetchServerDataPromise () {
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (response) {
      this.product = new Product(response.data.data)
      this.setProductSets(this.product)
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    getProduct() {
      if (this.options.product?.id || !this.productId) {
        return new Promise((resolve) => {
          resolve(new Product())
        })
      }
      this.product.loading = true
      return this.$axios.get(API_ADDRESS.product.show.base + '/' + this.productId)
      // return this.$apiGateway.product.show(this.productId)
    },
    getSet(id) {
      this.set.loading = true
      this.$axios.get(API_ADDRESS.set.base + '/' + id)
      // this.$apiGateway.set.show(id)
        .then(response => {
          const set = new Set(response.data.data)
          this.videos = []
          this.pamphlets = []
          this.contents = set.contents
          set.contents.list.forEach(content => {
            if (content.isVideo()) {
              this.videos.push(content)
            } else {
              this.pamphlets.push(content)
            }
          })
          this.set.loading = false
        })
        .catch(() => {
          this.set.loading = false
        })
    },
    downloadPamphlet(pamphlet) {
      this.$axios.get(API_ADDRESS.content.base + '/' + pamphlet.id)
      // this.$apiGateway.content.show(pamphlet.id)
        .then(response => {
          const content = new Content(response.data.data)
          if (content.file && content.file.pamphlet && content.file.pamphlet[0]) {
            openURL(content.file.pamphlet[0].link)
          } else {
            this.$q.notify({
              type: 'negative',
              message: 'فایلی برای دانلود وجود ندارد',
              position: 'top'
            })
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.product-contents-widget {
  .tabs {
    .tab {
      font-size: 16px;
    }
  }

  .previewSetsOfProduct {
    .box {
      justify-content: space-between;
      align-items: center;
      box-shadow: none;
      @media screen and (max-width: 1024px) {
        justify-content: center;
      }
      .title {
        margin-left: 8px;
        @media screen and (max-width: 1024px) {
          margin-left: 0;
        }
      }
    }
    .select-set{
      width: 50%;
      @media screen and (max-width: 1024px) {
        width: 100%;
        margin-bottom: 20px;
      }
    }
    .tab-panels {
      padding-top: 0;
    }
    .contents-block {
      display: flex;
      overflow: auto;
      padding: 10px 0 0 0;
      background: #ffffff;
      margin-right: 20px;
      border-radius: 20px;
      .pamphlet-title {
        height: 40px;
        max-width: 110px;
      }
      .pdf-icon {
        width: 50px;
        height: 50px;
        cursor: pointer;
      }
      .block {
        margin-bottom: 0;
        :deep(.scroll-view) {
          overflow-x: hidden;
        }
        :deep(.block-header) {
          justify-content: normal;
        }
        :deep(.block-item-box){
          display: none;
        }
        :deep(.q-tab-panel){
          padding-top: 0;
        }
        :deep(.block-header) {
          padding-top: 0;
          padding-bottom: 0;
        }
        :deep(.item-container) {
          .content-spacing{
            margin-right: 20px;
          }
        }
        :deep(.content-item-box) {
          width: auto;
        }
      }
    }
    .pamphlet-list {
      display: flex;
      overflow: auto;
      padding: 10px 0 0 0;
      background: #ffffff;
      margin-right: 20px;
      border-radius: 20px;
      .pamphlet {
        min-width: 110px;
      }
      .pamphlet-title {
        height: 40px;
      }
      .pdf-icon {
        width: 50px;
        height: 50px;
        cursor: pointer;
      }
      .block {
        margin-bottom: 0;
        :deep(.scroll-view) {
          overflow-x: hidden;
        }
        :deep(.block-header) {
          justify-content: normal;
        }
        :deep(.block-item-box){
          display: none;
        }
        :deep(.q-tab-panel){
          padding-top: 0;
        }
        :deep(.block-header) {
          padding-top: 0;
          padding-bottom: 0;
        }
        :deep(.item-container) {
          .content-spacing{
            margin-right: 20px;
          }
        }
        :deep(.content-item-box) {
          width: auto;
        }
      }
    }
  }
}
</style>
