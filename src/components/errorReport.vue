<template>
    <div class="wrapperSize">
        <v-select :items="items" solo label="نوع خطا" v-model="errorMessage.type">

        </v-select>
        <v-textarea v-model="errorMessage.text" solo/>
        <v-btn @click="emitData" class="submitBtnPosition">
            ثبت
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: "errorReport",
        data: () => ({
            errorMessage:{type:'', text:''},
        }),
        props:{
            items:{
                type:Array,
            }
        },
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
