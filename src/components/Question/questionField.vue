<template>
  <div>
    questionField.vue
  </div>
<!--  <div class="row">-->
<!--    <div-->
<!--      v-if="editStatus"-->
<!--      class="col-12"-->
<!--    >-->
  <!--      Todo : vue-tiptap-katex-->
<!--      <vue-tiptap-katex-->
<!--        ref="tiptap"-->
<!--        :loading="loading"-->
<!--        :access-token="$store.getters['Auth/accessToken']"-->
<!--        :upload-url="imageUrl"-->
<!--        :options="{ bubbleMenu: false, floatingMenu: false, poem: true, reading: true }"-->
<!--      />-->
<!--    </div>-->
<!--    &lt;!&ndash; eslint-disable vue/no-v-html &ndash;&gt;-->
<!--    <div class="col" v-else>-->
<!--      <vue-katex :input="html" />-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
// ToDo : vue-tiptap-katex in incompatible with vue 3 (right now)
// import VueKatex from 'src/components/VueKatex'
// ToDo : vue-tiptap-katex in incompatible with vue 3 (right now)
// import VueTiptapKatex from 'vue-tiptap-katex'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'QuestionField',
  components: {
    // VueTiptapKatex,
    // VueKatex
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
  data () {
    return {
      html: '',
      loading: false
    }
  },
  computed: {
    imageUrl () {
      return API_ADDRESS.question.uploadImage(this.questionId)
    }
  },
  watch: {

  },
  created () {
    this.loading = true
    this.getHtmlValueFromValueProp()
  },
  mounted () {
    if (this.$refs.tiptap) {
      // ToDo : vue-tiptap-katex in incompatible with vue 3 (right now)
      // this.$refs.tiptap.setContent(this.html)
      console.log('this.$refs.tiptap.setContent(this.html)')
    }
  },
  methods: {
    getContent () {
      // ToDo : vue-tiptap-katex in incompatible with vue 3 (right now)
      // this.$emit('input', this.$refs.tiptap.getContent())
      console.log(' this.$emit(\'input\', this.$refs.tiptap.getContent())')
    },
    getHtmlValueFromValueProp () {
      let html = this.value
      if (html === null || typeof html === 'undefined') {
        html = ''
      }
      this.html = html
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>

<style>
#mathfield .ML__cmr,
.katex .mtight {
  font-family: IRANSans;
}
.inline .v-btn.blue--text {
  display: none;
}

.tiptap-plus-container.focused {
  border: solid 1px #dedede;
}
</style>
