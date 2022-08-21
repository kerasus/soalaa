<template>
  <div class="upload-file">
    <upload-file :exam-id="id" />
  </div>
</template>

<script>
import uploadFile from 'src/components/OnlineQuiz/Quiz/uploadFile'
export default {
  name: 'Upload',
  components: { uploadFile },
  data () {
    return {
      id: null
    }
  },
  created () {
    this.id = this.$route.params.id
  }
}
</script>

<style lang="scss" scoped>
.upload-file{
  display: flex;
  margin: auto;
}
</style>
