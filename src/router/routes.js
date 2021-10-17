import { auth } from './middleware/middleware'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          middlewares: [auth]
        }
      },
      // user list
      // admin list
      {
        path: 'exams',
        name: 'onlineQuiz.exams',
        component: () => import('pages/Admin/OnlineQuiz/ExamList')
      },
      {
        path: '/question/mbti/create',
        name: 'question.mbti.create',
        component: () => (import('pages/Admin/Question/newMBTIpage'))
      },
      {
        path: '/question/create',
        name: 'question.create',
        component: () => (import('pages/Admin/Question/CreateNewQuestion'))
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/Login.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
