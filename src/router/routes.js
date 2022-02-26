import { auth } from './middleware/middleware'

const routes = [
  {
    path: '/template',
    component: () => import('components/Template/TemplateBuilder')
  },
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'admin',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.KnowledgeTree.tree', path: 'knowledge-tree', component: () => import('pages/Admin/KnowledgeTree/index') },
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings') }
        ]
      },
      {
        path: '',
        name: 'dashboard',
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
        path: '/faq',
        name: 'faq',
        component: () => import('src/pages/CommonQuestions/list'),
        meta: {
          middleware: [auth]
        }
      },
      {
        path: 'exam',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.Exam.Index', path: '', component: () => import('pages/Admin/exam/index') },
          { name: 'Admin.Exam.Show', path: 'show/:id', component: () => import('pages/Admin/exam/Show') },
          { name: 'Admin.Exam.Edit', path: ':id/edit', component: () => import('pages/Admin/exam/Edit') },
          { name: 'Admin.Exam.Create', path: 'create', component: () => import('pages/Admin/exam/Create') },
          { name: 'Admin.Exam.Upload', path: 'upload/:id', component: () => import('pages/Admin/exam/Upload') },
          { name: 'exam.results', path: 'results/:id', component: () => import('pages/Admin/exam/results') },
          { name: 'edit-exam-report', path: ':id/edit-exam-report', component: () => import('pages/Admin/exam/edit/editExamReport') },
          { name: 'coefficient.edit', path: ':id/coefficient/edit', component: () => import('src/pages/Admin/subGroup/editCoefficients.vue') },
          { name: 'onlineQuiz.exams.lessons', path: 'lessons/:quizId/:quizTitle', component: () => import('src/pages/Admin/exam/lessons.vue') },
          // TODO => why here??!!
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
            path: '/subCategory',
            component: () => import('layouts/AdminLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.subCategory.Index', path: '', component: () => import('pages/Admin/subCategory/Index') },
              { name: 'Admin.subCategory.Show', path: 'show/:id', component: () => import('pages/Admin/subCategory/Show') },
              { name: 'Admin.subCategory.Edit', path: ':id/edit', component: () => import('pages/Admin/subCategory/Edit') },
              { name: 'Admin.subCategory.Create', path: 'create', component: () => import('pages/Admin/subCategory/Create') }
            ]
          },
          {
            path: '/questions',
            name: 'question-bank',
            component: () => import('pages/Admin/Question/QuestionBank/list'),
            meta: { middlewares: [auth] }
          },
          {
            path: '/results/mbti_bartle/:exam_id/:user_exam_id',
            name: 'mbtiBartle.result',
            component: () => import('pages/User/exam/Result/MBTI_Bartle_result'),
            meta: {
              middlewares: [auth]
            }
          }
        ]
      },
      {
        path: '/onlineQuiz/alaaView/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView',
        component: () => import('pages/User/exam/participate/AlaaView'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: 'category',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          { name: 'Admin.Category.Index', path: '', component: () => import('pages/Admin/category/Index') },
          { name: 'Admin.Category.Show', path: 'show/:id', component: () => import('pages/Admin/category/Show') },
          { name: 'Admin.Category.Edit', path: ':id/edit', component: () => import('pages/Admin/category/Edit') },
          { name: 'Admin.Category.Create', path: 'create', component: () => import('pages/Admin/category/Create') }
        ]
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
    path: '/onlineQuiz/mbti_bartle/:quizId/:questNumber',
    name: 'onlineQuiz.mbtiBartle',
    component: () => import('pages/User/exam/participate/MBTI_Bartle'),
    meta: {
      middlewares: [auth]
    }
  },
  {
    // path: '/konkoorView/:quizId',
    path: '/onlineQuiz/konkoorView/:quizId',
    name: 'konkoorView',
    component: () => import('pages/User/exam/participate/konkoorView'),
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
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
  () => import('pages/Error404.vue')
  }
]

export default routes
