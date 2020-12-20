import Vue from 'vue'
import VueRouter from 'vue-router'
import lazyLoadView from './LazyLoadView'

Vue.use(VueRouter);

export default new VueRouter({
    // mode: 'history',
    routes: [
        {
            path: '/tree/edit',
            name: 'tree.edit',
            component: () => lazyLoadView(import('../components/tree'))
        },
        {
            path: '/quest/create',
            name: 'quest.create',
            component: () => lazyLoadView(import('../components/QuestEditor/QuestEditor'))
        },
        {
            path: '/TinymceEditor',
            name: 'TinymceEditor',
            component: () => lazyLoadView(import('../components/TinymceEditor/TinymceEditor'))
        },
        {
            path: '/online_quiz/:quizId/:questNumber',
            name: 'onlineQuiz.quiz',
            component: () => lazyLoadView(import('../components/OnlineQuiz/Quiz/Quiz'))
        }
    ]
})
