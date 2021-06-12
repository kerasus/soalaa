<template>
  <div>
    <!--   -------------------- title --------------------------  --><!--   -------------------- title --------------------------  -->
    <v-card
      v-if="title.length > 0"
      class="font-weight-medium mb-4"
      v-text="title"
    />
    <!-- -------------------- data --------------------------  -->
    <v-card
      v-if="editStatus"
      flat
      class="transparent"
      :color="color"
      v-html="value"
    />
    <v-card
      v-else
      flat
      height="160"
      class="pa-7 px-11"
      v-html="value"
    />
  </div>
</template>

<script>
export default {
  name: 'QuestionField',
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
      default: true,
      type: Boolean
    },
    line: {
      default: 3,
      type: Number
    },
    color: {
      default: 'transparent',
      type: String
    }
  }
}
</script>

<style scoped>

</style>