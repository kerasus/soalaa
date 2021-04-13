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
        // auth page
        {
            path: '/login',
            name: 'login',
            component: () => lazyLoadView(import('@/pages/auth/Login'))
        },
        // dashboard page
        {
            path: '/',
            name: 'dashboard',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: [auth, completeInfo]}
        },

        // user pages
        {
            path: '/user-info',
            name: 'user-info',
            component: () => lazyLoadView(import('@/pages/user/UserInfoForm')),
            meta: {middleware: auth}
        },
        {
            path: '/faq',
            name: 'faq',
            component: () => lazyLoadView(import('@/pages/CommonQuestions')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/user_exam_list',
            name: 'user.exam.list',
            component: () => lazyLoadView(import('@/pages/user/exam/List')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/alaaView/:quizId/:questNumber',
            name: 'onlineQuiz.alaaView',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/AlaaView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/konkoorView/:quizId',
            name: 'onlineQuiz.konkoorView',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/KonkoorView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/bubblesheetView/:quizId',
            name: 'onlineQuiz.bubblesheet-view',
            component: () => lazyLoadView(import('@/pages/user/exam/participate/BubbleSheetView')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/results/:exam_id/:user_exam_id',
            name: 'user.exam.results',
            component: () => lazyLoadView(import('@/pages/user/exam/Result')),
            meta: {middleware: [auth, completeInfo]}
        },

        // admin pages
        {
            path: '/quest/create',
            name: 'quest.create',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quest/edit/:id',
            name: 'quest.edit',
            component: () => lazyLoadView(import('@/pages/admin/question/CreateOrEdit')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/exams',
            name: 'onlineQuiz.exams',
            component: () => lazyLoadView(import('@/pages/admin/exam/Manage')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/exams/lessons/:quizId',
            name: 'onlineQuiz.exams.lessons',
            component: () => lazyLoadView(import('@/pages/admin/exam/lessons')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/onlineQuiz/exams/lessons/:quizId/:lessonId',
            name: 'onlineQuiz.exams.lessons.details',
            component: () => lazyLoadView(import('@/pages/admin/exam/lessonDetails')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/quiz/edit/:quizId',
            name: 'quiz.edit',
            component: () => lazyLoadView(import('@/pages/admin/question/QuestionsOfExam')),
            meta: {middleware: [auth, completeInfo]}
        },
        {
            path: '/video/set',
            name: 'video.set',
            component: () => lazyLoadView(import('@/pages/admin/VideoSet/SetVideo')),
            meta: {middleware: [auth, completeInfo]}
        },

        // // dev pages
        // {
        //     path: '/quiz/edit-all',
        //     name: 'quiz.allQuestions',
        //     component: () => lazyLoadView(import('@/components/QuizEditor/AllQuestions')),
        //     meta: {middleware: [auth, completeInfo]}
        // },
        {
            path: '/tree/edit',
            name: 'tree.edit',
            component: () => lazyLoadView(import('@/components/tree')),
            meta: {middleware: [auth, completeInfo]}
        },
        // {
        //     path: '/debug',
        //     name: 'debug',
        //     component: () => lazyLoadView(import('@/components/debug')),
        //     meta: {middleware: [auth, completeInfo]}
        // },


        // NotFound page
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
