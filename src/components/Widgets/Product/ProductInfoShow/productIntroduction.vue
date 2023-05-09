<template>
  <div class="product-introduction row">
    <div class="intro-features col-md-6 col-12">
      <div class="title">
        ویژگی های این محصول
      </div>

      <div class="product-info-box row">
        <div v-for="(info, index) in information"
             :key="index"
             class="product-info col-sm-3 col-xs-6">
          <div class="product-info-inside q-ma-sm">
            <div class="info-header ">
              <q-img :src="info.src"
                     class="info-image" />
              <p class="info-title">
                {{info.title}}
              </p>
            </div>
            <div class="info-content">
              <div v-for="(value , i) in info.value"
                   :key="i"
                   class="info-value col-6">
                <span v-if="value">{{ value }}</span>
                <span v-else>
                  <q-skeleton width="100px" />
                </span>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VideoPlayer from 'src/components/VideoPlayer.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'productIntroduction',
  // components: { VideoPlayer },
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
      givenData: {
        intro: null,
        attributes: null,
        price: null,
        has_instalment_option: false
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler (newValue) {
        const sources = []
        Object.assign(this.givenData, newValue)
        if (this.givenData.intro && this.givenData.intro.video) {
          this.givenData.intro.video = sources.push(this.givenData.intro.video)
        }
        this.setInformation()
      }
    }
  },
  created () {
    this.setInformation()
  },
  methods: {
    setInformation () {
      if (!this.givenData.attributes) {
        return
      }
      const attributesInfoKeys = Object.keys(this.givenData.attributes.info)
      this.information.forEach(info => {
        const targetInfo = info.key
        const findingAttribute = attributesInfoKeys.find(attribute => (attribute === targetInfo))

        if (findingAttribute) {
          info.value = this.givenData.attributes.info[findingAttribute]
        }
      })
    },
    addToCart (hasInstallment) {
      this.$emit('addToCart')
      // this.$emit('addToCart', {
      //   product: this.product.eec.getData(),
      //   ...(typeof hasInstallment === 'boolean' && { hasInstallment })
      // })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
