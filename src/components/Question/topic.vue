<template>
  <span>
    <topic
      v-if="topic.parentTopic"
      :topic="topic.parentTopic"
    />
    <v-chip
      dark
      color="purple lighten-1"
    >
      {{ topic.name }}
    </v-chip>
  </span>
</template>

<script>
import topic from 'src/components/Question/topic'

export default {
  name: 'Topic',
  components: {
    topic
  },
  props: ['topic'],
  computed: {
    majorName () {
      if (this.topic.module && this.topic.module.major) {
        return this.topic.module.major.name
      }
      return ''
    },
    gradeName () {
      if (this.topic.module && this.topic.module.grade) {
        return this.topic.module.grade.name
      }
      return ''
    }
  },
  methods: {
    isLastParent () {
      return !!topic.parentTopic
    }
  }
}
</script>

<style scoped>

</style>
