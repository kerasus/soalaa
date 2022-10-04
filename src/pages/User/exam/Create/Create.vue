<template>
  <div class="create-exam-page">
    <tab-panel
      :exam-info-inputs="examInfoInputs"
    />
  </div>
</template>

<script>
import TabPanel from 'components/CommonComponents/Exam/Create/TabPanel/TabPanel'

export default {
  name: 'Create',
  components: {
    TabPanel
  },
  data () {
    return {

    }
  }

}
</script>

<style scoped>

</style>
