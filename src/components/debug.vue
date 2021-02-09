

<template>
    <div :style="{ 'max-width': '700px'}">
        <v-text-field outlined v-model="input" />
        <button @click="generate">Generate</button>
    </div>
</template>

<script>


    export default {
        name: 'debug',
        components: {
        },
        data() {
            return {
                input: '',
            }
        },
        methods: {
            convertHexToRgbObject (hexColor) {  // '#f1f1f1'
                const hexColorCode = hexColor.split('#').join('') // 'f1f1f1'
                const red = parseInt('0x' + hexColorCode[0] + hexColorCode[1])
                const green = parseInt('0x' + hexColorCode[2] + hexColorCode[3])
                const blue = parseInt('0x' + hexColorCode[4] + hexColorCode[5])
                return { red, green, blue }
            },
            convertRgbToObject (rgbColor) { // '(241, 241, 241)'
                const rgbColorCode = rgbColor.split('(').join('').split(')').join('').split(',') // ['241', '241', '241']
                const red = parseInt(rgbColorCode[0])
                const green = parseInt(rgbColorCode[1])
                const blue = parseInt(rgbColorCode[2])
                return { red, green, blue }
            }
        }
    }
</script>