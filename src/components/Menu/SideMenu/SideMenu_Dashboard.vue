<template>
    <v-list
            nav
            class="menu"
    >
        <v-list-item-group
                v-model="userGroup"
                active-class="deep-purple--text text--accent-4"
                @change="adminGroup = null"
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
                <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
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
        </v-list-item-group>
        <v-list-item-group
                v-if="$store.getters['Auth/user'].has_admin_permission"
                class="admin-panel"
                active-class="deep-purple--text text--accent-4"
                v-model="adminGroup"
                @change="userGroup = null"
        >
            <router-link
                    v-for="item in adminList"
                    :key="item.displayName"
                    class="text-decoration-none"
                    :class="{'router-link-active': $route.name === item.to.name}"
                    :to="item.to">
                <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
                    <v-list-item-title>{{ item.displayName }}</v-list-item-title>
                </v-list-item>
            </router-link>
        </v-list-item-group>
        <v-list-item-group
                v-if="$store.getters['Auth/user'].has_educational_permission && !$store.getters['Auth/user'].has_admin_permission"
                class="admin-panel"
                active-class="deep-purple--text text--accent-4"
                v-model="adminGroup"
                @change="userGroup = null"
        >
            <router-link
                    v-for="item in educationList"
                    :key="item.displayName"
                    class="text-decoration-none"
                    :class="{'router-link-active': $route.name === item.to.name}"
                    :to="item.to">
                <v-list-item :class="{ 'v-list-item--active': $route.name === item.to.name, 'v-list-item--link': $route.name === item.to.name, 'deep-purple--text': $route.name === item.to.name }">
                    <v-list-item-title>{{ item.displayName }}</v-list-item-title>
                </v-list-item>
            </router-link>
        </v-list-item-group>
    </v-list>
</template>

<script>
    export default {
        name: "SideMenu_Dashboard",
        data: () => ({
            userGroup: null,
            adminGroup: null,
            userList: [
                {
                    displayName: 'آزمون های سه آ',
                    to: { name: 'user.exam.list' }
                },
                {
                    displayName: 'سوالات متداول',
                    to: { name: 'faq' }
                }
            ],
            adminList: [
                {
                    displayName: 'ویرایش درخت دانش',
                    to: {name: 'tree.edit'}
                },
                {
                    displayName: 'ساخت سوال',
                    to: {name: 'quest.create'}
                },
                {
                    displayName: 'لیست آزمون ها',
                    to: {name: 'onlineQuiz.exams'}
                },
                {
                    displayName: 'ثبت ویدئو تحلیل',
                    to: {name: 'video.set'}
                },
            ],
            educationList: [
                {
                    displayName: 'لیست آزمون ها',
                    to: {name: 'onlineQuiz.exams'}
                },
            ]
        }),
        created() {
            if (
                !this.$store.getters['Auth/user'].has_admin_permission &&
                this.$store.getters['Auth/user'].has_educational_permission
            ) {
                this.adminList = [
                    {
                        displayName: 'لیست آزمون ها',
                        to: {name: 'onlineQuiz.exams'}
                    }
                ]
            }
        }
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
