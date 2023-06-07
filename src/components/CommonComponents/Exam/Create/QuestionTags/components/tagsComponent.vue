<template>
  <div
    v-for="(item, index) in tags"
    :key="index"
    class="question-tag ellipsis"
  >
    <span v-for="(ancestor,ancestorIndex) in item.ancestors"
          :key="ancestorIndex"
          class="ancestors">
      <span v-if="ancestorIndex !== 0"
            class="tag-title">{{ ancestor.title }}</span>
      <span v-if="ancestorIndex !== 0"
            class="tag-circle" />
    </span>
    <span>
      <span class="title-circle" />
      <span class="tag-title">{{ item.title }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'tagsComponent',
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
