import Vue from 'vue'
import VueRouter from 'vue-router'
import lazyLoadView from '@/router/LazyLoadView'

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => lazyLoadView(import('@/components/dashboard'))
        },
        {
            path: '/tree/edit',
            name: 'tree.edit',
            component: () => lazyLoadView(import('@/components/tree'))
        },
        {
            path: '/quest/create',
            name: 'quest.create',
            component: () => lazyLoadView(import('@/components/QuestEditor/QuestEditor'))
        },
        {
            path: '/TinymceEditor',
            name: 'TinymceEditor',
            component: () => lazyLoadView(import('@/components/TinymceEditor/TinymceEditor'))
        },
        {
            path: '/online_quiz/personal-result',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/personalResult'))
        },
        {
            path: '/online_quiz/top-scores-result',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/topScoreResult'))
        },
        {
            path: '/online_quiz/statistic-result',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/statisticResult'))
        },
        {
            path: '/online_quiz/:quizId',
            name: 'onlineQuiz.konkoorView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/ViewTypes/Konkoor'))
        },
        {
            path: '/online_quiz/:quizId/:questNumber',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/ViewTypes/AlaaView'))
        }
    ]
})
