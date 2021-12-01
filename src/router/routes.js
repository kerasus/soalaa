import { auth } from './middleware/middleware'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/User/exam/List'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: '/user_exam_list',
        name: 'user.exam.list',
        component: () => import('pages/User/exam/List'),
        middleware: [auth]
      },
      {
        path: '/onlineQuiz/results/:exam_id/:user_exam_id',
        name: 'user.exam.results',
        component: () => import('pages/User/exam/Result'),
        middleware: [auth]
      },
      {
        path: '/exam',
        name: 'exam',
        component: () => import('pages/Admin/exam/index'),
        meta: {
          middlewares: [auth]
        },
        children: [
          {
            path: '',
            name: 'list',
            component: () => import('pages/Admin/exam/list'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: 'create',
            name: 'create',
            component: () => import('pages/Admin/exam/edit/editExam'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: ':examId/edit',
            name: 'edit',
            component: () => import('pages/Admin/exam/edit/editExam'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: '/exam/results/:examId',
            name: 'exam.results',
            component: () => import('pages/Admin/exam/results'),
            meta: { middleware: [auth] }
          },
          {
            path: ':examId',
            name: 'show',
            component: () => import('pages/Admin/exam/edit/editExam'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: ':examId/edit-exam-report',
            name: 'edit-exam-report',
            component: () => import('pages/Admin/exam/edit/editExamReport'),
            meta: {
              middlewares: [auth]
            }
          },
          {
            path: ':exam_id/coefficient/edit',
            name: 'coefficient.edit',
            component: () => import('src/pages/Admin/subGroup/editCoefficients.vue'),
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
          },
          {

            path: '/sub_category/edit',
            name: 'subCategory.edit',
            component: () => import('pages/Admin/subCategory/LessonsList'),
            meta: { middlewares: [auth] }
          },
          {
            path: '/questions',
            name: 'question-bank',
            component: () => import('pages/Admin/Question/QuestionBank/list'),
            meta: { middlewares: [auth] }
          },
          {
            path: '/onlineQuiz/exams/lessons/:quizId/:quizTitle',
            name: 'onlineQuiz.exams.lessons',
            component: () => import('src/pages/Admin/exam/lessons.vue'),
            meta: {
              middlewares: [auth]
            }
          }
        ]
      },
      {
        path: '/category',
        name: 'categoryList',
        component: () => import('pages/Admin/category/list')
      },
      {
        path: '/onlineQuiz/alaaView/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView',
        component: () => import('pages/user/exam/participate/AlaaView'),
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
  // are u mr Esmaeili ? '' : dont touch this route
  {
    path: '/debug',
    name: 'debug',
    component: () => import('pages/Auth/test.vue'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/results/mbti_bartle/:exam_id/:user_exam_id',
    name: 'mbtiBartle.result',
    component: () => import('pages/User/exam/Result/MBTI_Bartle_result'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    path: '/onlineQuiz/mbti_bartle/:quizId/:questNumber',
    name: 'onlineQuiz.mbtiBartle',
    component: () => import('pages/User/exam/participate/MBTI_Bartle'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    // path: '/konkoorView/:quizId',
    path: '/konkoorView',
    name: 'konkoorView',
    component: () => import('pages/User/exam/participate/konkoorView1'),
    // component: () => import('src/components/Menu/topMenu/onlineQuizTopMenu'),
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
  // TODO following routes should be remove
  {
    path: '/test',
    name: 'onlineQuiz.alaaView',
    component: () => import('pages/Auth/test'),
    meta: {
      middlewares: [auth]
    }
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
  () => import('pages/Error404.vue')
  }
]

export default routes
