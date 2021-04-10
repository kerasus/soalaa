<template>
    <div>
        <a class="btn" @click="toggleShow">set avatar</a>
        <my-upload field="file"
                   @crop-success="cropSuccess"
                   @crop-upload-success="cropUploadSuccess"
                   @crop-upload-fail="cropUploadFail"
                   v-model="show"
                   :width="300"
                   :height="300"
                   :url="url"
                   :params="params"
                   :lang-type="langType"
                   :headers="headers"
                   img-format="png"></my-upload>
        <img :src="imgDataUrl">
    </div>
</template>

<script>
    // import 'babel-polyfill'; // es6 shim
    import myUpload from 'vue-image-crop-upload/upload-2.vue';

    export default {
        name: "UploadImage",
        props: ['url'],
        data: () => {
            return {
                show: true,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                langType: 'fa',
                imgDataUrl: '' // the datebase64 url of created image
            }
        },
        computed: {
            accessToken () {
                return this.$store.getters['Auth/accessToken']
            },
            headers () {
                return {
                    Authorization: 'Bearer ' + this.accessToken
                }
            }
        },
        components: {
            'my-upload': myUpload
        },
        methods: {
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field){
                console.log('-------- crop success --------', field);
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData  server api return data, already json encode
             * [param] field
             */
            cropUploadSuccess(jsonData, field){
                console.log('-------- upload success --------', field);
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field){
                console.log('-------- upload fail --------', field);
                console.log(status);
                console.log('field: ' + field);
            }
        }
    }
</script>

<style scoped>

</style>
