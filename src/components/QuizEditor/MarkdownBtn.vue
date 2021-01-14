<template>
    <div>
        <v-btn outlined icon @click="add(elem, elemKey, '**__~~آندرلاین~~__**')">
            <v-icon>mdi-format-underline</v-icon>
        </v-btn>
        <v-btn outlined icon @click="add(elem, elemKey, '**بولد**')">
            <v-icon>mdi-format-bold</v-icon>
        </v-btn>
        <v-btn outlined icon @click="add(elem, elemKey, whiteSpace)">
            <v-icon>mdi-keyboard-space</v-icon>
        </v-btn>
        <v-btn outlined icon @click="add(elem, elemKey, '__***این متن در نمای کنکور قابل مشاهده نیست***__')">
            <v-icon>mdi-eye-off</v-icon>
        </v-btn>
        <v-btn outlined icon @click="add(elem, elemKey, '![](' + url + ')')">
            <v-icon>mdi-image</v-icon>
        </v-btn>
        <v-btn outlined icon @click="add(elem, elemKey, renderedMatrixKatex)">
            <v-icon>mdi-matrix</v-icon>
        </v-btn>
    </div>
</template>

<script>
    export default {
        name: 'MarkdownBtn',
        props: [
            'elem',
            'url',
            'elemKey',
            'renderedMatrixKatex',
        ],
        data: () => {
            return {
                whiteSpace: '                   '
            }
        },
        methods: {
            add (elem, key, string) {
                this.$emit('add', {elem, key, string})
            }
        }
    }
</script>

<style scoped>

</style>
