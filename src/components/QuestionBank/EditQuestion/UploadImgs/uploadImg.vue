<template>
  <div class="my-10">
    <p class="font-weight-medium">
      فایل های آپلود شده:
    </p>

    <v-row justify="space-between">
      <v-card
        height="138"
        flat
      >
        <v-col>
          <p>صورت سوال</p>
          <v-img
            src="https://picsum.photos/id/11/500/300"
            width="60"
            height="60"
            rounded="lg"
          />
        </v-col>
        <v-col>
          <p>جواب سوال</p>
          <v-row>
            <v-col>
              <v-img
                src="https://picsum.photos/id/11/500/300"
                width="60"
                height="60"
                rounded="lg"
              />
            </v-col>
            <v-col>
              <v-img
                src="https://picsum.photos/id/11/500/300"
                width="60"
                height="60"
                rounded="lg"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "UploadImg"
}
</script>

<style scoped>

</style>