<template>
  <div>
    <v-row>
      <v-col
        v-if="title.length > 0 && !titleTopPosition"
        cols="1"
        class="text-left"
      >
        <span
          flat
          class="font-weight-medium mb-4 transparent"
          v-text="title"
        />
      </v-col>
      <v-col>
        <v-card
          v-if="title.length > 0 && titleTopPosition"
          flat
          class="font-weight-medium mb-4 transparent"
          v-text="title"
        />
        <!--        &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; data &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
        <v-textarea
          v-if="editStatus"
          flat
          solo
          :label="data.label"
          :rows="data.line"
        />
        <!--        <vue-tiptap-katex-->
        <!--          v-if="editStatus"-->
        <!--          v-html="value"-->
        <!--        />-->
        <v-card
          v-else
          flat
          class="transparent"
          :color="color"
          v-html="data.value"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
  import VueTiptapKatex from 'vue-tiptap-katex'

export default {
  name: 'QuestionField',
  components: {
    VueTiptapKatex,
  },
  props: {
    data: {
      default () {
        return {}
      },
      type: Object
    },
    value: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    titleTopPosition: {
      default: true, // top - right
      type: Boolean
    },
    editStatus: {
      default: false,
      type: Boolean
    },
    line: {
      default: 2,
      type: Number
    },
    color: {
      default: 'transparent',
      type: String
    }
    ,label:{
      default: '',
      type: String
    }
  }
}
</script>

<style scoped>

</style>