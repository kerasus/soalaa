import Vue from 'vue'
import VueRouter from 'vue-router'
import lazyLoadView from '@/router/LazyLoadView'
import auth from '@/middleware/auth'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => lazyLoadView(import('@/pages/auth/Login'))
        },
        {
            path: '/',
            name: 'dashboard',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            // component: () => lazyLoadView(import('@/components/dashboard')),
            meta: {middleware: auth}
        },
        {
            path: '/tree/edit',
            name: 'tree.edit',
            component: () => lazyLoadView(import('@/components/tree')),
            meta: {middleware: auth}
        },
        {
            path: '/quiz/edit/:quizId',
            name: 'quiz.edit',
            component: () => lazyLoadView(import('@/components/QuizEditor/QuizEditor')),
            meta: {middleware: auth}
        },
        {
            path: '/quiz/edit-all',
            name: 'quiz.allQuestions',
            component: () => lazyLoadView(import('@/components/QuizEditor/AllQuestions')),
            meta: {middleware: auth}
        },
        {
            path: '/TinymceEditor',
            name: 'TinymceEditor',
            component: () => lazyLoadView(import('@/components/TinymceEditor/TinymceEditor')),
            meta: {middleware: auth}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه'),
            name: 'onlineQuiz.result',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/personalResult')),
            meta: {middleware: auth}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه/ریز درس_ها'),
            name: 'onlineQuiz.result.lessonDetails',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/statisticResult')),
            meta: {middleware: auth}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه/نتایج_نفرات_برتر'),
            name: 'onlineQuiz.result.topScore',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/topScoreResult')),
            meta: {middleware: auth}
        },
        {
            path: '/online_quiz/:quizId',
            name: 'onlineQuiz.konkoorView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/ViewTypes/Konkoor')),
            meta: {middleware: auth}
        },
        {
            path: '/online_quiz/:quizId/:questNumber',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/ViewTypes/AlaaView')),
            meta: {middleware: auth}
        },
        {
            path: '/quest/:id',
            name: 'quest.edit',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: auth}
        },
        {
            path: '/quest/create',
            name: 'quest.create',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: auth}
        },
        {
            path: encodeURI('/آزمون_های_سه_آ'),
            name: 'user.onlineQuiz.list',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: auth}
        },
        {
            path: '/exams-editor/',
            name: 'onlineQuiz.exams',
            component: () => lazyLoadView(import('@/pages/admin/exam/Manage')),
            meta: {middleware: auth}
        },
        {
            path: '/online_quiz/:quizId/:questNumber/exams',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/pages/admin/exam/Manage'))
        },
        {
            path: '/user-info',
            name: 'user-info',
            component: () => lazyLoadView(import('@/components/UserInfoForm')),
            meta: {middleware: auth}
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: auth}
        }
    ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index + 1);
        subsequentMiddleware({...context, next: nextMiddleware});
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});

export default router
