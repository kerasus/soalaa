import Vue from 'vue'
import VueRouter from 'vue-router'
import lazyLoadView from '@/router/LazyLoadView'
import auth from '@/middleware/auth'
import completeInfo from '@/middleware/completeInfo'
import store from '@/store/store'

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
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/tree/edit',
            name: 'tree.edit',
            component: () => lazyLoadView(import('@/components/tree')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quiz/edit-all',
            name: 'quiz.allQuestions',
            component: () => lazyLoadView(import('@/components/QuizEditor/AllQuestions')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه'),
            name: 'onlineQuiz.result',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/personalResult')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/آزمون_آنلاین/پاسخ_برگ'),
            name: 'onlineQuiz.result.pasokhbarg',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/pasokhBarg')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه/ریز درس_ها'),
            name: 'onlineQuiz.result.lessonDetails',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/statisticResult')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/آزمون_آنلاین/کارنامه/نتایج_نفرات_برتر'),
            name: 'onlineQuiz.result.topScore',
            component: () => lazyLoadView(import('@/components/OnlineQuiz/Quiz/resultTables/topScoreResult')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/online_quiz-bubblesheet/:quizId',
            name: 'onlineQuiz.bubblesheet-view',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/BubbleSheetView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/online_quiz/:quizId',
            name: 'onlineQuiz.konkoorView',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/KonkoorView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/online_quiz/:quizId/:questNumber',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/AlaaView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quiz/edit/:quizId',
            name: 'quiz.edit',
            component: () => lazyLoadView(import('@/pages/admin/question/QuestionsOfExam')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quest/create',
            name: 'quest.create',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/subcategory/set',
            name: 'video.set',
            component: () => lazyLoadView(import('@/pages/admin/VideoSet/SetVideo')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quest/:id',
            name: 'quest.edit',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/آزمون_های_سه_آ'),
            name: 'user.exam.list',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/نتایج_آزمون/:user_exam_id/:exam_id'),
            name: 'user.exam.results',
            component: () => lazyLoadView(import('@/pages/user/exam/Result')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/نتایج_آزمون'),
            name: 'user.exam.results.test',
            component: () => lazyLoadView(import('@/pages/user/exam/Result')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/exams-editor/',
            name: 'onlineQuiz.exams',
            component: () => lazyLoadView(import('@/pages/admin/exam/Manage')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/تکمیل_اطلاعات',
            name: 'user-info',
            component: () => lazyLoadView(import('@/pages/user/UserInfoForm')),
            meta: {middleware: auth}
        },
        {
            path: '/debug',
            name: 'debug',
            component: () => lazyLoadView(import('@/components/debug')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: encodeURI('/سوالات_متداول'),
            name: 'common-questions',
            component: () => lazyLoadView(import('@/pages/CommonQuestions')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '*',
            name: 'NotFound',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: [auth, completeInfo]}
        },
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
            store
        };
        const nextMiddleware = nextFactory(context, middleware, 1);

        return middleware[0]({...context, next: nextMiddleware});
    }

    return next();
});

export default router
