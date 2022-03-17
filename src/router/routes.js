import { auth } from './middleware/middleware'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', icon: 'home', route: { name: 'dashboard' } },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/User/exam/List'),
        breadcrumbs: { title: 'پیشخوان' },
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: 'admin',
        component: () => import('layouts/AdminLayout.vue'),
        meta: {
          middlewares: [auth]
        },
        children: [
          {
            path: 'exam',
            component: () => import('layouts/AdminLayout.vue'),
            breadcrumbs: { title: 'آزمون', color: '', route: { name: 'Admin.Exam.Index' } },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Exam.Index', path: '', component: () => import('pages/Admin/exam/index'), breadcrumbs: { title: 'لیست آزمون ها' } },
              { name: 'Admin.Exam.Create', path: 'create', component: () => import('pages/Admin/exam/Create') },
              { name: 'Admin.Exam.Show', path: ':id', component: () => import('pages/Admin/exam/Show'), breadcrumbs: { title: 'مشاهده آزمون' } },
              { name: 'Admin.Exam.Edit', path: ':id/edit', component: () => import('pages/Admin/exam/Edit'), breadcrumbs: { title: 'ویرایش آزمون' } },
              { name: 'Admin.Exam.Upload', path: ':id/upload', component: () => import('pages/Admin/exam/Upload') },
              { name: 'Admin.Exam.AllResults', path: 'results/:id', component: () => import('pages/Admin/exam/results') },
              { name: 'Admin.Exam.Coefficient.Edit', path: ':id/coefficient/edit', component: () => import('src/pages/Admin/subGroup/editCoefficients.vue') },
              { name: 'Admin.Exam.Report.Edit', path: ':id/edit-exam-report', component: () => import('pages/Admin/exam/edit/editExamReport') },
              { name: 'Admin.Exam.Lessons', path: 'lessons/:quizId', component: () => import('src/pages/Admin/exam/lessons.vue') },
              { name: 'Admin.Exam.Lessons.List', path: 'lessons/:quizId/chart', component: () => import('src/pages/Admin/exam/lessonsChart.vue') },
              { name: 'Admin.Exam.video.set', path: '/video/set/:examId/:subcategory_id', component: () => import('src/pages/Admin/exam/VideoSet/SetVideo.vue') },

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
            path: '/question',
            component: () => import('layouts/AdminLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              {
                path: '',
                name: 'Admin.Question.Bank',
                component: () => import('pages/Admin/Question/QuestionBank/list'),
                meta: { middlewares: [auth] }
              },
              {
                path: 'list',
                name: 'Admin.Question.Factory',
                component: () => (import('pages/Admin/Question/NewQuestionFactory')),
                meta: {
                  middlewares: [auth]
                }
              },
              {
                path: 'create',
                name: 'Admin.Question.Create',
                component: () => (import('pages/Admin/Question/CreateNewQuestion')),
                meta: {
                  middlewares: [auth]
                }
              },
              {
                path: 'mbti/create',
                name: 'Admin.Question.MBTI.Create',
                component: () => (import('pages/Admin/Question/newMBTIpage')),
                meta: {
                  middlewares: [auth]
                }
              },
              {
                path: ':question_id/show',
                name: 'Admin.Question.Show',
                component: () => (import('pages/Admin/Question/CreateNewQuestion')),
                meta: {
                  middlewares: [auth]
                }
              },
              {
                path: ':question_id/edit',
                name: 'Admin.Question.Edit',
                component: () => (import('pages/Admin/Question/CreateNewQuestion')),
                meta: {
                  middlewares: [auth]
                }
              }
            ]
          },

          {
            path: 'category',
            component: () => import('layouts/AdminLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Category.Index', path: '', component: () => import('pages/Admin/category/Index') },
              { name: 'Admin.Category.Create', path: 'create', component: () => import('pages/Admin/category/Create') },
              { name: 'Admin.Category.Show', path: ':id', component: () => import('pages/Admin/category/Show') },
              { name: 'Admin.Category.Edit', path: ':id/edit', component: () => import('pages/Admin/category/Edit') }
            ]
          },

          {
            path: '/subCategory',
            component: () => import('layouts/AdminLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.subCategory.Index', path: '', component: () => import('pages/Admin/subCategory/Index') },
              { name: 'Admin.subCategory.Show', path: ':id', component: () => import('pages/Admin/subCategory/Show') },
              { name: 'Admin.subCategory.Edit', path: ':id/edit', component: () => import('pages/Admin/subCategory/Edit') },
              { name: 'Admin.subCategory.Create', path: 'create', component: () => import('pages/Admin/subCategory/Create') }
            ]
          },

          { name: 'Admin.KnowledgeTree.tree', path: 'knowledge-tree', component: () => import('pages/Admin/KnowledgeTree/index') },
          { name: 'Admin.Settings', path: 'settings', component: () => import('pages/Admin/Settings'), breadcrumbs: { title: 'تنظیمات' } }
        ]
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
        path: '/onlineQuiz/exams/lesson/:quizId/:lessonId',
        name: 'onlineQuiz.exams.lessons.details',
        component: () => import('pages/Admin/exam/LessonDetails'),
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
        path: '/onlineQuiz/alaaView/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView',
        component: () => import('pages/User/exam/participate/AlaaView'),
        meta: {
          middlewares: [auth]
        }
      },
      {
        path: '/onlineQuiz/konkoorView/:quizId',
        name: 'konkoorView',
        component: () => import('pages/User/exam/participate/konkoorView'),
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
    path: '/onlineQuiz/mbti_bartle/:quizId/:questNumber',
    name: 'onlineQuiz.mbtiBartle',
    component: () => import('pages/User/exam/participate/MBTI_Bartle'),
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
