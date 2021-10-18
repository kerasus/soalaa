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
      {
        path: '/sub_category/edit',
        name: 'subCategory.edit',
        component: () => import('pages/Admin/subCategory/LessonsList'),
        meta: { middlewares: [auth] }
      },
      // user list
      // admin list
      {
        path: 'exams',
        name: 'onlineQuiz.exams',
        component: () => import('pages/Admin/exam/Manage'),
        meta: {
          middlewares: [auth]
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/Login.vue')
  },
  {
    path: '/editCoefficients',
    name: 'coefficient.edit',
    component: () => import('src/pages/Admin/subGroup/editCoefficients.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/lessonsList',
    name: 'onlineQuiz.exams.lessons',
    component: () => import('src/pages/Admin/exam/lessons.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('pages/Auth/test.vue'),
    meta: {
      middlewares: [auth]
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
