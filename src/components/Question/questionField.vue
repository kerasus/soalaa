<template>
  <v-row>
    <v-col
      v-if="editStatus"
      cols="12"
    >
      <vue-tiptap-katex
        id="vue-tiptap-katex"
        ref="tiptap"
        :value="value"
        :loading="loading"
        :options="{
          bubbleMenu: false,
          floatingMenu: false,
          poem: true,
          reading: true,
          persianKeyboard: true,
          onResizeEnd: onResizeEnd,
          mathliveOptions: { smartFence: false },
          uploadServer: {
            url: imageUrl,
            instantUpload: true,
            headers: { Authorization: 'Bearer ' + $store.getters['Auth/accessToken'] }
          }
        }"
        @input="$emit('input', $event)"
      />
    </v-col>
    <!-- eslint-disable vue/no-v-html -->
    <v-col v-else>
      <vue-katex :input="value" />
    </v-col>
  </v-row>
</template>

<script>
import VueKatex from '@/components/VueKatex'
import VueTiptapKatex from 'vue-tiptap-katex'
import API_ADDRESS from "@/api/Addresses";

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
      loading: false,
    }
  },
  computed: {
    imageUrl () {
      return API_ADDRESS.question.uploadImage(this.questionId)
    }
  },
  methods: {
    onResizeEnd (url, width, height) {
      return url.split('?w=')[0] + '?w=' + width + '&h=' + height
    },
    getContent () {
      this.$emit('input', this.$refs.tiptap.getContent())
    }
  }
}
</script>

<style scoped>
</style>

<style>
#vue-tiptap-katex  .accent {
  background-color: unset !important;
  border-color: unset !important;
}

#vue-tiptap-katex .overline {
  font-size: inherit !important;
  font-weight: inherit !important;
  letter-spacing: inherit !important;
  line-height: inherit !important;
  text-transform: unset !important;
  font-family: inherit !important;
}

.katex * {
  font-family: KaTeX_Main;
}

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

