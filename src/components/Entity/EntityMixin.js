import axios from 'axios'

const EntityMixin = {
  methods: {
    getEntityId () {
      const target = this.inputData.find(item => item.name.toString() === this.entityIdKey.toString())
      if (!target) {
        return false
      }

      return target.value
    },
    goToIndexView () {
      this.$router.push({ name: this.indexRouteName })
    },
    goToShowView () {
      this.$router.push({ name: this.showRouteName, params: { [this.entityParamKey]: this.getEntityId() } })
    },
    formHasFileInput () {
      const target = this.inputData.find(item => item.type === 'file')
      return !!target
    },
    getHeaders () {
      if (this.formHasFileInput()) {
        return { 'Content-Type': 'multipart/form-data' }
      }
    },
    isFile (file) {
      return file instanceof File
    },
    getFormData () {
      const formHasFileInput = this.formHasFileInput()
      const formData = formHasFileInput ? new FormData() : {}
      this.inputData.forEach(item => {
        if (item.disable || typeof item.value === 'undefined' || item.value === null) {
          return
        }

        if (item.type === 'file' && !this.isFile(item.value)) {
          return
        }

        if (formHasFileInput) {
          formData.append(item.name, item.value)
        } else {
          formData[item.name] = item.value
        }
      })

      return formData
    },
    toggleFullscreen () {
      const target = this.$refs.portlet
      this.$q.fullscreen.toggle(target)
        .then(() => {
          // success!
        })
        .catch((err) => {
          alert(err)
          // uh, oh, error!!
          // console.error(err)
        })
    },
    getData () {
      this.loading = true
      axios.get(this.api)
        .then(response => {
          this.loadInputData(response.data)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    loadInputData (responseData) {
      this.inputData.forEach(input => {
        if (typeof input.responseKey !== 'undefined' && input.responseKey !== null) {
          input.value = this.getValidChainedObject(responseData, input.responseKey.split('.'))
        }
      })
      console.log('loadInputData: ', this.inputData)
      this.change(this.inputData)
    },
    getValidChainedObject (object, keys) {
      if (!Array.isArray(keys) && typeof keys !== 'string') {
        console.warn('keys must be array or string')
        return false
      }

      if (keys === '') {
        return object
      }

      let keysArray = keys
      if (typeof keys === 'string') {
        keysArray = keys.split('.')
      }

      if (keysArray.length === 1) {
        if (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null) {
          return object[keysArray[0]]
        }
        return false
      }

      if (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null) {
        return this.getValidChainedObject(object[keysArray[0]], keysArray.splice(1))
      }

      return (typeof object[keysArray[0]] !== 'undefined' && object[keysArray[0]] !== null)
    }
  }
}

export default EntityMixin
