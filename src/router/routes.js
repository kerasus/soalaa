import { auth } from './middleware/middleware'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
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
            breadcrumbs: { title: 'آزمون', color: '', loading: false, route: { name: 'Admin.Exam.Index' } },
            meta: {
              middlewares: [auth]
            },
            children: [
              { name: 'Admin.Exam.Index', path: '', component: () => import('pages/Admin/exam/index'), breadcrumbs: { title: 'لیست آزمون ها', loading: false } },
              { name: 'Admin.Exam.Create', path: 'create', component: () => import('pages/Admin/exam/Create') },
              { name: 'Admin.Exam.Show', path: ':id', component: () => import('pages/Admin/exam/Show'), breadcrumbs: { title: 'مشاهده آزمون' } },
              { name: 'Admin.Exam.Edit', path: ':id/edit', component: () => import('pages/Admin/exam/Edit'), breadcrumbs: { title: 'ویرایش آزمون' } },
              { name: 'Admin.Exam.Upload', path: ':id/upload', component: () => import('pages/Admin/exam/Upload') },
              { name: 'Admin.Exam.AllResults', path: 'results/:id', component: () => import('pages/Admin/exam/results') },
              { name: 'Admin.Exam.Coefficient.Edit', path: ':id/coefficient/edit', component: () => import('src/pages/Admin/subGroup/editCoefficients.vue') },
              { name: 'Admin.Exam.Report.Edit', path: ':id/edit-exam-report', component: () => import('pages/Admin/exam/edit/editExamReport'), breadcrumbs: { title: 'ویرایش کارنامه', loading: false } },
              { name: 'Admin.Exam.Lessons', path: 'lessons/:quizId/:quizTitle', component: () => import('src/pages/Admin/exam/lessons.vue') },
              { name: 'Admin.Exam.Lessons.List', path: 'lessons/:quizId/chart', component: () => import('src/pages/Admin/exam/lessonsChart.vue') },
              { name: 'Admin.Exam.video.set', path: '/video/set/:examId/:subcategory_id/:quizTitle', component: () => import('src/pages/Admin/exam/VideoSet/SetVideo.vue') },

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
            breadcrumbs: { title: 'سوالات', loading: false },
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
                breadcrumbs: { title: 'ساخت سوال', loading: false },
                component: () => import('layouts/QuestionLayouts/CreateQuestionLayout.vue'),
                // component: () => import('layouts/AdminLayout.vue'),
                meta: {
                  middlewares: [auth]
                },
                children: [
                  {
                    path: 'text',
                    name: 'Admin.Question.Create.Text',
                    breadcrumbs: { title: 'سوال متنی', loading: false },
                    component: () => import('layouts/QuestionLayouts/CreateDefaultLayout.vue'),
                    // component: () => import('layouts/AdminLayout.vue'),
                    children: [
                      {
                        path: 'mbti',
                        name: 'Admin.Question.Create.Text.MBTI',
                        breadcrumbs: { title: 'ام بی تی آی', loading: false },
                        component: () => import('components/Question/QuestionPage/Create/textMode/questionTypes/MBTIQ/MBTIQTest.vue')
                      },
                      {
                        path: 'descriptive',
                        name: 'Admin.Question.Create.Text.Descriptive',
                        breadcrumbs: { title: 'تشریحی', loading: false },
                        component: () => import('components/Question/QuestionPage/Create/textMode/questionTypes/DescriptiveQ/DescriptiveQTest.vue')
                      },
                      {
                        path: 'multipleChoice',
                        name: 'Admin.Question.Create.Text.MultipleChoice',
                        breadcrumbs: { title: 'تستی', loading: false },
                        component: () => import('components/Question/QuestionPage/Create/textMode/questionTypes/MultipleChoiceQ/MultipleChoiceQTest.vue')
                      }
                    ]
                  },
                  {
                    path: 'image/',
                    name: 'Admin.Question.Create.Image',
                    breadcrumbs: { title: 'آپلود عکس', loading: false },
                    component: () => (import('pages/Admin/Question/CreateImage')),
                    children: [
                      {
                        path: 'mbti',
                        name: 'Admin.Question.Create.Image.MBTI',
                        breadcrumbs: { title: 'ام بی تی آی', loading: false },
                        component: () => import('pages/Admin/Question/CreateImage')
                      },
                      {
                        path: 'descriptive',
                        name: 'Admin.Question.Create.Image.Descriptive',
                        breadcrumbs: { title: 'تشریحی', loading: false },
                        component: () => import('pages/Admin/Question/CreateImage')
                      },
                      {
                        path: 'multipleChoice',
                        name: 'Admin.Question.Create.Image.MultipleChoice',
                        breadcrumbs: { title: 'تستی', loading: false },
                        component: () => import('pages/Admin/Question/CreateImage')
                      }
                    ]
                  }
                ]
              },
              {
                path: ':question_id',
                name: 'Admin.Question.Show',
                breadcrumbs: { title: 'مشاهده سوال', loading: false },
                component: () => (import('pages/Admin/Question/Show')),
                meta: {
                  middlewares: [auth]
                }
              },
              {
                path: ':question_id/edit',
                name: 'Admin.Question.Edit',
                breadcrumbs: { title: 'ویرایش سوال', loading: false },
                component: () => (import('pages/Admin/Question/Edit')),
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

          {
            name: 'Admin.KnowledgeTree.tree',
            path: 'knowledge-tree',
            component: () => import('pages/Admin/KnowledgeTree/index'),
            breadcrumbs: { title: 'درخت دانش' }
          },
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
