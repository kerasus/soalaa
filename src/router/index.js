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
        }
    ]
})
