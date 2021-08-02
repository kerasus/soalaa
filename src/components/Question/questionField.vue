<template>
  <v-row>
    <v-col v-if="editStatus">
      <vue-tiptap-katex
        v-model="html"
        :loading="loading"
        :access-token="$store.getters['Auth/accessToken']"
        :upload-url="'/api/v1/question/upload/' + questionId"
        @input="updateValue"
      />
    </v-col>
    <!-- eslint-disable vue/no-v-html -->
    <v-col v-else >
      <vue-katex :input="html" />
    </v-col>
    <v-btn @click="print">
      click
    </v-btn>
    <v-col md="12">
      <div v-html="test" />
    </v-col>
  </v-row>
</template>

<script>
import VueKatex from '@/components/VueKatex'
import VueTiptapKatex from 'vue-tiptap-katex'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex,
    VueKatex
  },
  props: {
    value: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    },
    editStatus: {
      default: false,
      type: Boolean
    },
    questionId: {
      required: true,
      type: String
    }
  },
  data() {
    return {
      test: '',
      html: '',
      loading: false
    }
  },
  watch: {
    value: function () {
      this.getHtmlValueFromValueProp()
    }
  },
  created () {
    this.loading = true
    this.getHtmlValueFromValueProp()
  },
  methods: {
    print () {
      this.test = this.convertToPureHTML(this.html)
    },
    convertToPureHTML (string) { //call this function when you want to convert tiptap output to pure html
      string = this.convertInteractiveImagesToHTML(string)
      string = this.convertInteractiveIKatexToHTML(string)
      return string
    },
    convertInteractiveImagesToHTML (string) { //this function converts interactiveImage from tiptap to html image
      var wrapper = document.createElement('div')
      wrapper.innerHTML = string
      let images = wrapper.querySelectorAll('tiptap-interactive-image-upload')
      images.forEach(item => {
        let interactiveImage = item.attributes[0].nodeValue
        if (interactiveImage) {
          //create img tag and set its attrs
          interactiveImage =
              '<img src="' + item.attributes['url'].nodeValue + '" style="width: ' + item.attributes['width'].nodeValue + 'px; height: ' + item.attributes['height'].nodeValue + 'px" />'
          //create img parent and set the display settings and justify the image
          var imageWrapper = document.createElement('div')
          imageWrapper.innerHTML = interactiveImage
          imageWrapper.style.display = 'flex'
          if (item.attributes['justify'].nodeValue === 'right') {
            imageWrapper.style.justifyContent = "flex-start"
          } else if (item.attributes['justify'].nodeValue === 'center') {
            imageWrapper.style.justifyContent = "center"
          } else if (item.attributes['justify'].nodeValue === 'left') {
            imageWrapper.style.justifyContent = "flex-end"
          }
          item.replaceWith(imageWrapper)
        }
      })
      return wrapper.innerHTML
    },
    convertInteractiveIKatexToHTML (string) { //this function converts interactiveKatex from tiptap to html image
      var wrapper = document.createElement('div')
      wrapper.innerHTML = string
      let images = wrapper.querySelectorAll('tiptap-interactive-katex-inline')
      images.forEach(item => {
        let interactiveKatex = item.attributes[0].nodeValue
        if (interactiveKatex) {
          interactiveKatex = '$' + item.attributes['katex'].nodeValue + '$'
          var katexWrapper = document.createElement('div')
          katexWrapper.innerHTML = interactiveKatex
          item.replaceWith(katexWrapper.innerHTML)
        }
      })
      return wrapper.innerHTML
    },
    getHtmlValueFromValueProp () {
      let html = this.value
      if (html === null || typeof html === 'undefined') {
        html = ''
      }
      this.html = html
      this.loading = false
    },
    updateValue() {
      this.$emit('input', this.html)
    },
    convertMarkdownImageToHtml (markdownString, index = 0) {
      const startIndex = markdownString.indexOf('![](', index)
      if (startIndex === -1) {
        return markdownString
      }
      const endIndex = markdownString.indexOf(')', startIndex)
      const firstThird = markdownString.slice(0, startIndex)
      const secondThird = markdownString.slice(startIndex + 4, endIndex)
      const remaining = markdownString.slice(endIndex + 1)
      const widthIndex = markdownString.indexOf('?w=', startIndex)
      if (widthIndex !== -1 && widthIndex < endIndex) {
        let width, height
        width = parseInt(markdownString.slice(widthIndex + 3, markdownString.indexOf('&h', widthIndex)))
        height = parseInt(markdownString.slice(markdownString.indexOf('&h=', widthIndex) + 3, markdownString.indexOf(')', widthIndex)))
        markdownString = firstThird + '<tiptap-interactive-image-upload url="'
            + secondThird.slice(0, secondThird.indexOf('?w=')) + '" width="' + width + '" height="' + height + '"></tiptap-interactive-image-upload>'+ remaining
      } else {
        // this need to be completed, what if width and height of the image is not equal
        markdownString = firstThird + '<tiptap-interactive-image-upload url="'
            + secondThird + '" width="100" height="100"></tiptap-interactive-image-upload>' + remaining
      }
      return this.convertMarkdownImageToHtml(markdownString, endIndex)
    },
  }
}
</script>

<style scoped>
</style>

<style>
.inline .v-btn.blue--text {
  display: none;
}

.tiptap-plus-container.focused {
  border: solid 1px #dedede;
}
</style>

<!--remove this later ToDo-->
<style>
th, td {
  border: 1px solid;
}
</style>
