import { auth, Permissions } from './middleware/middleware'
function getEntityCrudRouteObject (path, baseRouteName, componentPath, breadcrumbs, permissions) {
  const AllNeededRoutes = [
    { mode: 'Index', path: '' },
    { mode: 'Create', path: 'create' },
    { mode: 'Show', path: ':id' },
    { mode: 'Edit', path: ':id/edit' }
  ]
  const children = []
  const removedFirstPart = componentPath.split('/')
  // console.log('removedFirstPart', removedFirstPart[0])
  AllNeededRoutes.forEach((item, index) => {
    // Todo : find a way for 'pages/'
    children.push({
      name: baseRouteName + '.' + item.mode,
      path: item.path,
      component: () => import('pages/' + componentPath.replace(removedFirstPart[0] + '/', '')),
      meta: {
        middlewares: [
          Permissions.hasPermission(permissions[index])
        ]
      }
    })
    // Even this is not working
    // children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import(removedFirstPart[0] + '/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path,
    component: () => import('layouts/AdminLayout.vue'),
    breadcrumbs,
    children
  }
}
const entityCrudRouteConfigs = [
  {
    path: 'authorshipDates',
    baseRouteName: 'Admin.AuthorshipDates',
    componentPath: 'pages/Admin/AuthorshipDates',
    breadcrumbs: { title: 'تاریخ تالیف' },
    permissions: ['optionIndex', 'optionStore', 'optionShow', 'optionUpdate']
  },
  {
    path: 'questionAuthors',
    baseRouteName: 'Admin.QuestionAuthors',
    componentPath: 'pages/Admin/QuestionAuthors',
    breadcrumbs: { title: 'مرجع سوال' },
    permissions: ['optionIndex', 'optionStore', 'optionShow', 'optionUpdate']

  },
  {
    path: 'majors',
    baseRouteName: 'Admin.Majors',
    componentPath: 'pages/Admin/Majors',
    breadcrumbs: { title: 'مدیریت دسترسی ها' },
    permissions: ['optionIndex', 'optionStore', 'optionShow', 'optionUpdate']

  }
]
const allEntityCrudRouteObjects = [
  ...entityCrudRouteConfigs.map(item => getEntityCrudRouteObject(item.path, item.baseRouteName, item.componentPath, item.breadcrumbs, item.permissions))
]
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
        path: 'component',
        name: 'component',
        component: () => import('src/pages/component'),
        breadcrumbs: { title: 'component' },
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
            component: () => import('layouts/bareLayout.vue'),
            breadcrumbs: { title: 'آزمون', loading: false },
            meta: {
              middlewares: [
                auth
              ]
            },
            children: [
              {
                name: 'Admin.Exam.Index',
                path: '',
                component: () => import('pages/Admin/exam/index'),
                breadcrumbs: { title: 'لیست آزمون ها', loading: false },
                middlewares: [
                  Permissions.hasPermission('examIndex')
                ]
              },
              {
                name: 'Admin.Exam.Create',
                path: 'create',
                component: () => import('pages/Admin/exam/Create'),
                middlewares: [
                  Permissions.hasPermission('examStore')
                ]
              },
              {
                name: 'Admin.Exam.Create.AttachQuestion',
                path: 'create/attachQuestion',
                component: () => import('pages/Admin/exam/Create/ExamCreatePanel'),
                breadcrumbs: { title: 'صفحه ساخت آزمون', loading: false },
                middlewares: [
                  Permissions.hasPermission('examStore')
                ]
              },
              {
                name: 'Admin.Exam.Show',
                path: ':id',
                component: () => import('pages/Admin/exam/Show'),
                breadcrumbs: { title: 'مشاهده آزمون' },
                middlewares: [
                  Permissions.hasPermission('examShow')
                ]
              },
              {
                name: 'Admin.Exam.MoreActions',
                path: ':id/moreActions',
                component: () => import('pages/Admin/exam/MoreActions'),
                breadcrumbs: { title: 'عملیات دیگر', loading: false },
                middlewares: [
                  Permissions.hasOneOfThese(['examquestionFile', 'examquestionBookletUpload', 'examquestionBooklet', 'examquestionZirgoroohCopyzirgorooh'])
                ]
              },
              {
                name: 'Admin.Exam.Edit',
                path: ':id/edit',
                component: () => import('pages/Admin/exam/Edit'),
                breadcrumbs: { title: 'ویرایش آزمون' },
                middlewares: [
                  Permissions.hasPermission('examUpdate')
                ]
              },
              {
                name: 'Admin.Exam.AllResults',
                path: 'results/:id',
                component: () => import('pages/Admin/exam/results'),
                middlewares: [
                  Permissions.hasOneOfThese(['examreportIndexParticipants', 'examreportIndexLessons'])
                ]
              },
              {
                name: 'Admin.Exam.Categories',
                path: ':exam_id/category',
                component: () => import('pages/Admin/exam/ExamCategoryList.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionShowcategorires')
                ]
              },
              {
                name: 'Admin.Exam.Categories.SubCategories',
                path: ':exam_id/category/:category_id/sub-category',
                component: () => import('pages/Admin/exam/ExamSubCategoryList.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionShowcategorires')
                ]
              },
              {
                path: ':exam_id/sub-category/:subcategory_id/questions',
                name: 'Admin.Exam.SubCategory.Questions',
                component: () => import('pages/Admin/exam/SubCategoryQuestions'),
                middleware: [
                  Permissions.hasPermission('examquestionAttachShow')
                ]
              },
              {
                name: 'Admin.Exam.video.set',
                path: 'video/set/:examId/:subcategory_id',
                component: () => import('src/pages/Admin/exam/SetVideo.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionVideos')
                ]
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
            path: 'question',
            breadcrumbs: { title: 'سوالات', loading: false },
            component: () => import('layouts/bareLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              {
                path: '',
                name: 'Admin.Question.Bank',
                component: () => import('pages/Admin/Question/QuestionBank/QuestionBank'),
                meta: { middlewares: [auth] }
              },
              {
                path: 'list',
                name: 'Admin.Question.Factory',
                component: () => (import('pages/Admin/Question/QuestionFactory')),
                meta: {
                  middlewares: [
                    auth,
                    Permissions.hasPermission('questionIndex')
                  ]
                }
              },
              {
                path: 'create',
                breadcrumbs: { title: 'ساخت سوال', loading: false },
                component: () => import('layouts/QuestionLayouts/CreateQuestionLayout.vue'),
                meta: {
                  middlewares: [
                    auth,
                    Permissions.hasPermission('examquestionAttach')
                  ]
                },
                children: [
                  {
                    path: 'text',
                    name: 'Admin.Question.Create.Text',
                    breadcrumbs: { title: 'سوال متنی', loading: false },
                    component: () => import('layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'mbti',
                        name: 'Admin.Question.Create.Text.MBTI',
                        breadcrumbs: { title: 'ام بی تی آی', loading: false },
                        component: () => import('pages/Admin/Question/MBTIQuestion/MBTIQuestion.vue')
                      },
                      {
                        path: 'descriptive',
                        name: 'Admin.Question.Create.Text.Descriptive',
                        breadcrumbs: { title: 'تشریحی', loading: false },
                        component: () => import('pages/Admin/Question/DescriptiveQuestion/DescriptiveQuestion.vue')
                      },
                      {
                        path: 'multipleChoice',
                        name: 'Admin.Question.Create.Text.MultipleChoice',
                        breadcrumbs: { title: 'تستی', loading: false },
                        component: () => import('pages/Admin/Question/MultipleChoiceQuestion/MultipleChoiceQuestion.vue')
                      }
                    ]
                  },
                  {
                    path: 'image/:questionType',
                    name: 'Admin.Question.Create.Image',
                    breadcrumbs: { title: 'آپلود عکس', loading: false },
                    component: () => (import('pages/Admin/Question/CreateImage')),
                    meta: {
                      middlewares: [
                        Permissions.hasAllOfThese(['questionUpload', 'questionAttachStatementphoto', 'questionAttachAnswerphoto'])
                      ]
                    }
                  }
                ]
              },
              {
                path: ':question_id',
                name: 'Admin.Question.Show',
                breadcrumbs: { title: 'مشاهده سوال', loading: false },
                component: () => (import('pages/Admin/Question/ShowQuestion')),
                meta: {
                  middlewares: [
                    auth,
                    Permissions.hasPermission('questionShow')
                  ]
                }
              },
              {
                path: ':question_id/edit',
                name: 'Admin.Question.Edit',
                breadcrumbs: { title: 'ویرایش سوال', loading: false },
                component: () => (import('pages/Admin/Question/EditQuestion')),
                meta: {
                  middlewares: [
                    Permissions.hasPermission('questionUpdate')
                  ]
                }
              }
            ]
          },

          {
            path: 'category',
            component: () => import('layouts/bareLayout.vue'),
            meta: {
              middlewares: [auth]
            },
            children: [
              {
                name: 'Admin.Category.Index',
                path: '',
                component: () => import('pages/Admin/category/Index'),
                middlewares: [
                  Permissions.hasPermission('categoryIndex')
                ]
              },
              {
                name: 'Admin.Category.Create',
                path: 'create',
                component: () => import('pages/Admin/category/Create'),
                middlewares: [
                  Permissions.hasPermission('categoryCreate')
                ]
              },
              {
                name: 'Admin.Category.Show',
                path: ':id',
                component: () => import('pages/Admin/category/Show'),
                middlewares: [
                  Permissions.hasPermission('categoryShow')
                ]
              },
              {
                name: 'Admin.Category.Edit',
                path: ':id/edit',
                component: () => import('pages/Admin/category/Edit'),
                middlewares: [
                  Permissions.hasPermission('categoryUpdate')
                ]
              }
            ]
          },

          {
            path: '/subCategory',
            component: () => import('layouts/bareLayout.vue'),
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
          ...allEntityCrudRouteObjects,

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
          middlewares: [
            auth
          ]
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
      // {
      //   path: '/landing',
      //   name: 'landing',
      //   component: () => import('layouts/LandingLayout'),
      //   children: [
      //     {
      //       path: '',
      //       name: 'landing1',
      //       component: () => import('pages/User/landing/landing')
      //     }
      //   ]
      // },
      // {
      //   path: '/cart',
      //   name: 'cart',
      //   component: () => import('pages/Cart/Cart')
      // }

    ]
  },
  {
    path: '/admin/exam/:quizId/:lessonId/print',
    name: 'Admin.Exam.Lessons.PrintQuestions',
    component: () => import('pages/Admin/Question/QuestionExport/preview.vue'),
    middleware: []
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
