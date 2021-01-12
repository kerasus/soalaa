<template>

    <v-list
            nav
            class="menu"
    >
        <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
        >
            <router-link class="text-decoration-none" :to="{ name: 'dashboard' }">
                <v-list-item>
                    <v-list-item-icon>
                        <v-icon color="#fff">mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>داشبورد</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.lessonDetails' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>شرکت در آزمون</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'user.onlineQuiz.list' }">
                <v-list-item>
                    <v-list-item-title>آزمون های سه آ</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'tree.edit' }">
                <v-list-item>
                    <v-list-item-title>نتایج آزمون</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'quest.create' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>اطلاعیه و اصلاحیه</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result' }">
                <v-list-item>
                    <v-list-item-title>کارنامه</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.lessonDetails' }">
                <v-list-item>
                    <v-list-item-title>ریزدرس ها</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.topScore' }">
                <v-list-item>
                    <v-list-item-title>نتایج نفرات برتر</v-list-item-title>
                </v-list-item>
            </router-link>

        </v-list-item-group>
        <v-list-item-group
                class="admin-panel"
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

            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.exams' }">
                <v-list-item>
                    <v-list-item-title>لیست آزمون ها</v-list-item-title>
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
            group: null
        }),
    }
</script>

<style scoped>
    .admin-panel {
        border-top: 1px solid #fff;
    }
</style>

<style>
    .menu .v-list-item__title {
        color: #fff;
        font-size: 16px !important;
        font-weight: normal !important;
    }

    .menu .v-list-item__icon {
        margin-left: 12px !important;
    }

    .v-list.menu {
        padding: 8px 0 !important;
    }

    .router-link-exact-active .v-list-item {
        background: #ffb507;
        padding: 0 8px 0 0 !important;
        border-radius: 0 !important;
    }

    .router-link-exact-active .v-list-item .v-list-item__title {
        border-left: 4px solid #fff;
    }
</style>
