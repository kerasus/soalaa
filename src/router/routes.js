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
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('pages/Admin/exam/index'),
        meta: {
          middlewares: [auth]
        },
        children: [
          {
            path: '',
            name: 'exam-list',
            component: () => import('pages/Admin/exam/list'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: 'edit-exam',
            name: 'edit-exam',
            component: () => import('pages/Admin/exam/edit/editExam'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: 'edit-exam-report',
            name: 'edit-exam-report',
            component: () => import('pages/Admin/exam/edit/editExamReport'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/question/mbti/create',
            name: 'question.mbti.create',
            component: () => (import('pages/Admin/Question/newMBTIpage')),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/question/list',
            name: 'question.list',
            component: () => (import('pages/Admin/Question/NewQuestionFactory')),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/question/:question_id/show',
            name: 'question.show',
            component: () => (import('pages/Admin/Question/CreateNewQuestion')),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/question/:question_id/edit',
            name: 'question.edit',
            component: () => (import('pages/Admin/Question/CreateNewQuestion')),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/question/create',
            name: 'question.create',
            component: () => (import('pages/Admin/Question/CreateNewQuestion')),
            meta: {
              middlewares: [auth]
            }
          }
        ]
      },
      {
        path: '/sub_category/edit',
        name: 'subCategory.edit',
        component: () => import('pages/Admin/subCategory/LessonsList'),
        meta: { middlewares: [auth] }
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
    path: '/login',
    name: 'login',
    component: () => import('pages/Auth/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('pages/Auth/test.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('pages/User/UserInfoForm'),
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
