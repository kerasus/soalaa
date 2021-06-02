<template>
  <div class="wrapperSize">
    <v-select
      v-model="errorMessage.type"
      :items="items"
      solo
      label="نوع خطا"
    />
    <v-textarea
      v-model="errorMessage.text"
      solo
    />
    <v-btn
      class="submitBtnPosition"
      @click="emitData"
    >
      ثبت
    </v-btn>
  </div>
</template>

<script>
    export default {
        name: "ErrorReport",
        props:{
            items:{
                type:Array,
            }
        },
        data: () => ({
            errorMessage:{type:'', text:''},
        }),
        methods:{
            emitData(){
                this.$emit('clicked', this.errorMessage)
            }
        }
    }
</script>

<style scoped>
    .wrapperSize {
        width: 60%;
        margin: auto;
        height: 300px;
    }
    .submitBtnPosition{
        float: left;
    }
</style>
