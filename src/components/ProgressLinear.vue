<template>
    <v-progress-linear
            color="#ffc107"
            absolute
            top
            :active="active"
            indeterminate
            rounded
            height="6"
    ></v-progress-linear>
</template>

<script>
    export default {
        name: "ProgressLinear",
        props: [
            'active'
        ]
    }
</script>

<style scoped>

</style>
