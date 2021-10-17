<template>
<div>
  uploadAnswers
<!--  <div-->
<!--    class="row"-->
<!--    v-for="(item, index) in questionCategories.list"-->
<!--    :key="index"-->
<!--  >-->
<!--    <div class="col">-->
<!--    </div>-->
<!--    <div class="col">-->
<!--    </div>-->
<!--  </div>-->
</div>
</template>

<script>
import { QuestCategoryList } from 'src/models/QuestCategory'
// import VueFileAgent from 'vue-file-agent'
// import API_ADDRESS from '@/api/Addresses'

export default {
  name: 'uploadAnswers',
  // components: [VueFileAgent],
  props: ['exam_id'],
  data () {
    return {
      questionCategories: new QuestCategoryList(),
      random: 0,
      options: []
    }
  }
}
</script>

<style scoped>

</style>
