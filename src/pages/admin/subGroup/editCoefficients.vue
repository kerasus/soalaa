<template>
  <v-container fluid>
    <v-row>
      <v-col>
        tes
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import API_ADDRESS from "@/api/Addresses";
export default {
  name: "EditCoefficients",
  created() {
    axios.get(API_ADDRESS.exam.examUser, {
      body: {
        exam_id: this.$route.params.exam_id
      }
    })
    .then(response => {
      console.log(response.data.data)
    })
  }
}
</script>

<style scoped>

</style>
