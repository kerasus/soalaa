const mixinWidget = {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    options: {
      type: Object,
      default() {
        return {}
      }
    },
    editable: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'onOptionAction'
  ],
  data () {
    return {
      defaultOptions: {}
    }
  },
  watch: {
    editable () {
      this.reloadWidget()
    }
  },
  created () {
    this.mergeOptionsToDefaultOptions()
  },
  computed: {
    localOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      }
    }
    //   className() {
    //     if (!this.defaultOptions.className) {
    //       this.defaultOptions.className = ''
    //     }
    //     // TODO: adding more vertical align values such as top & bottom
    //     if (this.defaultOptions.verticalAlign === 'center') {
    //       this.defaultOptions.className += ' vertical-align-center'
    //     }
    //     return this.defaultOptions.className
    //   },
    //   style() {
    //     // if fullHeight option is true, then using containerFullHeight (which is come from PageBuilder the parent)
    //     if (this.defaultOptions.fullHeight) {
    //       this.defaultOptions.style.minHeight = this.containerFullHeight
    //     }
    //     return this.defaultOptions.style
    //   }
  },
  methods: {
    reloadWidget () {},
    mergeOptionsToDefaultOptions () {
      Object.assign(this.defaultOptions, this.options)
      if (!this.defaultOptions.style) {
        this.defaultOptions.style = {}
      }
    }
  }
}

export default mixinWidget
