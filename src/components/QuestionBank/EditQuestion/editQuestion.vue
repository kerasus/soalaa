<template>
  <div id="app">
    <v-app id="inspire" class="transparent">
      <v-container>
        <v-row class="mx-4">
          <v-col >
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
                        <v-col cols="3">
                          <v-sheet class="gray" rounded="lg">صورت سوال</v-sheet>
                        </v-col>
                        <v-col cols="3" class="text-center">
                          <v-sheet class="ma=0" height="60" width="60" color="grey lighten-2" rounded="lg"></v-sheet>
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
                        <v-col cols="3" class="text-center">
                          <v-sheet class="ma=0" height="60" width="60" color="grey lighten-2" rounded="lg"></v-sheet>
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
                        <v-btn color="green darken-1 " dark class="ml-13 " large>
                          ذخیره
                        </v-btn>
                        <span>
                          لغو
                        </span>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <!-- ------------------------- type question -----------------------   -->
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="0">
            <v-card elevation="0" height="1856">
              <div class="pt-10 pb-6 pr-8">
                <span> فایل های بارگزاری شده</span>
              </div>
              <v-sheet width="750" height="1099" ccolor="grey lighten-3" rounded="lg">
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </div>

</template>

<script>
export default {
  name: "editQuestion"
}
</script>

<style scoped>

</style>