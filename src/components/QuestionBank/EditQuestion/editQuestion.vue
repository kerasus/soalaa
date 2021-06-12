<template>
  <div id="app">
    <v-app id="inspire" class="transparent">
      <v-container>
        <v-row class="mx-4">
          <v-col :cols="12 - colsNumber" >
            <v-row>
              <v-col>
                <!-- ------------------------- title -------------------------------  -->
                <div>
                  <v-row>
                    <v-col cols="3 mb-10">
                      <span> سوال #123 </span>
                    </v-col>
                    <v-col>
                      <span> سازنده سوال : فیلان دبیر </span>
                    </v-col>
                  </v-row>
                </div>
                <!-- ------------------------- exam -------------------------------  -->
                <v-row>
                  <v-col cols="8">
                    <div class="mb-6">
                      <span> آزمون ها </span>
                    </div>
                    <div class="mb-12">
                      <v-row no-gutters>
                        <v-col cols="5">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                        <v-col cols="4">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                        <v-col cols="2">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                        <v-col cols="1">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="5" class="pa-1">
                          <v-sheet rounded="lg" l class="ma-2 pa-1">g</v-sheet>
                        </v-col>
                        <v-col cols="4">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                        <v-col cols="2">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                        <v-col cols="1">
                          <v-sheet rounded="lg" class="pa-1 ma-2">g</v-sheet>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
                <!-- ------------------------- upload file -------------------------   -->
                <div class="mb-6">
                  <span> فایل های بارگزاری شده </span>
                </div>
                <v-row class="mb-12">
                  <v-col cols="6">
                    <v-sheet rounded="lg">
                      <v-row justify="space-between" align="center">
                        <v-col cols="3" >
                          <v-sheet  rounded="lg">صورت سوال</v-sheet>
                        </v-col>
                        <v-col cols="3" class="text-right">
                          <v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"></v-img>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                  <v-col cols="6">
                    <v-sheet rounded="lg">
                      <v-row justify="space-between" align="center">
                        <v-col cols="3">
                          <v-sheet class="gray" rounded="lg">پاسخ سوال</v-sheet>
                        </v-col>
                        <v-col cols="3" class="text-right">
                          <v-img src="https://picsum.photos/id/11/500/300" width="60" height="60"></v-img>
                        </v-col>
                      </v-row>
                    </v-sheet>
                  </v-col>
                </v-row>
                <!-- ------------------------- upload file -------------------------   -->
                <div class="mb-6">
                  <span>تایپ سوال</span>
                </div>
                <v-row>
                  <v-col cols="12">
                    <v-sheet class="mb-10" height="200" rounded="lg">
                    </v-sheet>
                    <v-sheet class="mb-5" height="110" rounded="lg">
                      گزینه 1
                    </v-sheet>
                    <v-sheet class="mb-5" height="110" rounded="lg">
                      گزینه 2
                    </v-sheet>
                    <v-sheet class="mb-5" height="110" rounded="lg">
                      گزینه 3
                    </v-sheet>
                    <v-sheet class="mb-10" height="110" rounded="lg">
                      گزینه 4
                    </v-sheet>
                    <v-sheet class="mb-15" height="200" rounded="lg">
                      پاسخ
                    </v-sheet>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-row justify="space-around">
                      <v-col cols="4">
                        <v-btn color="green darken-1 " dark class="ml-13 " large @click="closeDrawer">
                          ذخیره
                        </v-btn>
                        <span>
                          لغو
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
            <!-- ------------------------- type question -----------------------   -->
          </v-col>
          <v-col :cols ="colsNumber" :class="displayEditQuestion">
            <v-card flat height="1856">
              <!-- ------------------------- type question  title-----------------------   -->
             <div class="pa-6">
               <v-row justify="space-between" >
                 <v-col >
                   <span> فایل های بارگزاری شده</span>
                 </v-col>
                 <v-col class="text-left">
                   <v-icon class="ml-4" @click="openDrawer">
                     mdi-close
                   </v-icon>
                 </v-col>
               </v-row>
             </div>
              <!-- ------------------------- type question  content-----------------------   -->
              <v-card height="1099" color="#f5f5f5" flat class="ma-7">

              </v-card>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>

</template>

<script>
export default {
  name: "editQuestion",
  data(){
    return {
     colsNumber:5,
      displayEditQuestion:'d-none'
    }
  },
  methods: {
    closeDrawer (){
      console.log('save click')
      this.displayEditQuestion=""
      this.$store.commit('AppLayout/updateAppBarAndDrawer', false)
      this.colsNumber=5;

    },
    openDrawer(){
      console.log('close click')
      this.displayEditQuestion="d-none"
      this.$store.commit('AppLayout/updateAppBarAndDrawer', true)
      this.colsNumber = 0;
    }
  },
}
</script>

<style scoped>

</style>