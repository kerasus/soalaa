import { createMetaMixin } from 'quasar'
import SeoMeta from 'src/assets/js/SeoMeta.js'

const mixinSEO = {
  data() {
    return {
      title: 'آموزش مجازی آلاء',
      description: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.',
      robots: 'index, follow',
      ogTitle: 'آموزش مجازی آلاء',
      ogUrl: '',
      ogDescription: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.',
      ogImage: ''
    }
  },
  mixins: [
    createMetaMixin(function () {
      const title = this.$store.getters['SEO/title']
      const description = this.$store.getters['SEO/description']
      const robots = this.$store.getters['SEO/robots']
      const ogTitle = this.$store.getters['SEO/ogTitle'] ? this.$store.getters['SEO/ogTitle'] : title
      const ogUrl = this.$store.getters['SEO/ogUrl'] ? this.$store.getters['SEO/ogUrl'] : ''
      const ogDescription = this.$store.getters['SEO/ogDescription']
      const ogImage = this.$store.getters['SEO/ogImage']

      return SeoMeta.getMixin({
        title,
        description,
        robots,
        ogTitle,
        ogUrl,
        ogDescription,
        ogImage
      })
    })
  ]
}

export default mixinSEO
