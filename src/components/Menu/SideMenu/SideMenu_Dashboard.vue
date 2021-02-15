<template>
    <v-list
            nav
            class="menu"
    >
        <v-list-item-group
                v-model="group"
                active-class="deep-purple--text text--accent-4"
        >
            <router-link class="text-decoration-none" :to="{ name: 'dashboard' }" v-if="false">
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

            <router-link
                    v-for="item in userList"
                    :key="item.displayName"
                    class="text-decoration-none"
                    :class="{'router-link-active': $route.name === item.to.name}"
                    :to="item.to">
                <v-list-item>
                    <v-list-item-title>{{ item.displayName }}</v-list-item-title>
                </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" :to="{ name: 'quest.create' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>اطلاعیه و اصلاحیه</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>کارنامه</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.lessonDetails' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>ریزدرس ها</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.topScore' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>نتایج نفرات برتر</v-list-item-title>
                </v-list-item>
            </router-link>
            <router-link class="text-decoration-none" :to="{ name: 'onlineQuiz.result.pasokhbarg' }" v-if="false">
                <v-list-item>
                    <v-list-item-title>پاسخ برگ</v-list-item-title>
                </v-list-item>
            </router-link>


<!--            <a>-->
<!--                <v-list-item>-->
<!--                    <v-list-item-title>درباره ما</v-list-item-title>-->
<!--                </v-list-item>-->
<!--            </a>-->

        </v-list-item-group>
        <v-list-item-group
                v-if="$store.getters['Auth/user'].has_admin_permission"
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

            <router-link class="text-decoration-none" :to="{ name: 'video.set' }">
                <v-list-item>
                    <v-list-item-title>ثبت ویدئو تحلیل</v-list-item-title>
                </v-list-item>
            </router-link>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        name: "SideMenu_Dashboard",
        data: () => ({
            group: null,
            userList: [
                {
                    displayName: 'آزمون های سه آ',
                    to: { name: 'user.exam.list' }
                },
                {
                    displayName: 'سوالات متداول',
                    to: { name: 'common-questions' }
                }
            ]
        }),
    }
</script>

<style scoped>
    .admin-panel {
        border-top: 1px solid var(--surface-1);
    }
</style>

<style>
    .menu .v-list-item__title {
        color: var(--text-3);
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
        background: var(--primary-1);
        padding: 0 8px 0 0 !important;
        border-radius: 0 !important;
    }

    .router-link-exact-active .v-list-item .v-list-item__title {
        border-left: 4px solid var(--surface-1);
    }
</style>
