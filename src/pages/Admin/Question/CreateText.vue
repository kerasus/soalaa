<template>
  <div class="createQ-text-container">
    <Navbar/>
  </div>
</template>

<script>
import Navbar from 'components/Question/QuestionPage/Create/textMode/Navbar'
export default {
  name: 'CreateText',
  components: { Navbar }
}
</script>

<style scoped lang="scss">
.createQ-text-container {
  padding: 40px 100px;
  display: flex;
  flex-direction: column;

}
</style>
