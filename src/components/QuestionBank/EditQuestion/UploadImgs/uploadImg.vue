<template>
  <div class="my-10">
    <v-row>
      <v-col cols="5">
        <p class="font-weight-medium">فایل های آپلود شده:</p>
        <v-card height="138" flat>
          <v-row justify="space-between">
            <v-col>
              <p>صورت سوال</p>
              <v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"></v-img>
            </v-col>
            <v-col>
              <p>جواب سوال</p>
              <v-row >
                <v-col><v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"> </v-img></v-col>
                <v-col><v-img src="https://picsum.photos/id/11/500/300" width="60" height="60" rounded="lg"> </v-img></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="7">
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "uploadImg"
}
</script>

<style scoped>

</style>