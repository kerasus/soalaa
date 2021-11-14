<template>
  <q-card
    flat
    class="showImg-card"
  >
    <div class="q-pt-md">
      <div class="justify-center">
        <div class="col">
          <span> فایل های بارگزاری شده</span>
        </div>
        <div class="col text-left">
          <q-icon
            class="q-ml-sm"
            name="mdi-close"
            @click="closeImgPanel"
          />
        </div>
      </div>
    </div>
    <q-card
      flat
      class="q-ma-lg second-card"
    >
      <q-img
        :src="test"
      />
    </q-card>
  </q-card>
</template>

<script>
export default {
  name: 'ShowImg',
  props: {
    test: {
      default: '',
      type: String
    }
  },
  data () {
    return {
      image: ''

    }
  },
  methods: {
    closeImgPanel () {
      this.$emit('closePanel')
    }
  }
}
</script>

<style scoped>
</style>
