<template>

    <v-list
            nav
            dense
    >
        <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
        >
            <router-link class="text-decoration-none" :to="{ name: 'tree.edit' }">
                <v-list-item>
                    <v-list-item-title>ویرایش درخت دانش</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'quest.create' }">
                <v-list-item>
                    <v-list-item-title>ساخت سوال</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'TinymceEditor' }">
                <v-list-item>
                    <v-list-item-title>ویرایشگر</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.alaaView', params: { quizId: 313, questNumber: 1 } }">
                <v-list-item>
                    <v-list-item-title>آزمون آنلاین</v-list-item-title>
                </v-list-item>
            </router-link>

        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        name: "Menu",
        data: () => ({
            group: null,
        }),
    }
</script>

<style scoped>

</style>
