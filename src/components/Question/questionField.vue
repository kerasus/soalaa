<template>
  <div>
    <div v-if="title.length > 0" v-text="title" />
    <v-card v-if="editStatus" v-html="value" />
    <div v-else v-html="value" />
  </div>
</template>

<script>
export default {
  name: 'questionField',
  props: {
    value: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    titlePosition: {
      default: 'top', // top - right
      type: String
    },
    editStatus: {
      default: false,
      type: Boolean
    },
    line: {
      default: 3,
      type: Number
    }
  }
}
</script>

<style scoped>

</style>