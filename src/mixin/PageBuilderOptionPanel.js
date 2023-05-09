const PageBuilderOptionPanel = {
  data: () => {
    return {
      defaultOptions: {}
    }
  },
  watch: {
    localOptions: {
      handler(newValue) {
        this.updateLocalOptions(newValue)
      },
      deep: true
    }
  },
  props: {
    data: {
      type: Object,
      default: () => {
      }
    },
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    localOptions: {
      get() {
        return Object.assign(this.defaultOptions, this.options)
      },
      set(newValue) {
        this.updateLocalOptions(newValue)
      }
    }
  },
  methods: {
    removeNullKeys () {

    },
    updateLocalOptions (newValue) {
      const newVal = newValue || this.localOptions
      this.$emit('update:options', newVal)
    }
  }
}

export default PageBuilderOptionPanel
