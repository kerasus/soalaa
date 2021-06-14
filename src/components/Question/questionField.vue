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
        <!-- -------------------- data --------------------------  -->
        <v-textarea
          v-if="editStatus"
          flat
          solo
          :label="data.label"
          :rows="data.line"
        />
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
export default {
  name: 'QuestionField',
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