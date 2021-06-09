<template>
  <div id="app" >
    <v-app id="inspire">
      <v-form>
        <v-container class="test">
          <v-row v-for="i in list_exams">
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-card  elevation="0"> test </v-card>

            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-app>
  </div>

</template>

<script>
export default {
  name: "exams",
  data(){
    return{
      list_exams:[1,2,3,4,5,6]
    }
  },
  components:{

  }
}
</script>

<style scoped>
.test{

  background-color: grey;
}

</style>