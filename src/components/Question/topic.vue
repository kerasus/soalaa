<template>
  <span class="topic-component">
    <topic
      v-if="topic.parentTopic"
      :topic="topic.parentTopic"
    />
    <q-chip
      text-color="white"
      color="purple-5"
    >
      {{ topic.name }}
    </q-chip>
  </span>
</template>

<script>
export default {
  name: 'Topic',
  props: ['topic']
}
</script>

<style lang="scss" scoped>
.topic-component{
  .q-chip{
    margin: 0;
  }
}
</style>
