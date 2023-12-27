import { Authenticated, Permissions } from './middleware/middleware.js'
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
    // children.push({
    //   name: baseRouteName + '.' + item.mode,
    //   path: item.path,
    //   component: () => import('../pages/' + componentPath.replace(removedFirstPart[0] + '/', '')),
    //   meta: {
    //     middlewares: [
    //       Permissions.hasPermission(permissions[index])
    //     ]
    //   }
    // })

    children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import('../pages/' + componentPath.replace(removedFirstPart[0] + '/', '') + '.vue') })

    // Even this is not working
    // children.push({ name: baseRouteName + '.' + item.mode, path: item.path, component: () => import(removedFirstPart[0] + '/' + componentPath.replace(removedFirstPart[0] + '/', '')) })
  })
  return {
    path,
    component: () => import('src/layouts/AdminLayout.vue'),
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
    path: 'questionReport',
    baseRouteName: 'Admin.QuestionReport',
    componentPath: 'pages/Admin/QuestionReport',
    breadcrumbs: { title: 'گزارش خطا سوال' },
    permissions: ['optionIndex', 'optionStore', 'optionShow', 'optionUpdate']

  },
  {
    path: 'QuestionTarget',
    baseRouteName: 'Admin.QuestionTarget',
    componentPath: 'pages/Admin/QuestionTarget.vue',
    breadcrumbs: { title: 'اهداف سوال' },
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
    name: 'Home',
    component: () => import('layouts/MainLayout.vue'),
    breadcrumbs: { title: 'خانه', loading: false, icon: 'home', route: { name: 'dashboard' } },
    layoutConfig: {
      layoutHeaderVisible: true,
      layoutHeaderType: 'panel',
      layoutLeftDrawerVisible: true,
      layoutLeftSideBarType: 'panel',
      layoutView: 'lHh Lpr lff',
      layoutHeader: true,
      layoutHeaderReveal: false,
      layoutHeaderElevated: false,
      layoutHeaderBordered: false,
      layoutLeftDrawer: true,
      layoutLeftDrawerOverlay: false,
      layoutLeftDrawerElevated: false,
      layoutLeftDrawerBordered: false,
      layoutLeftDrawerWidth: 325,
      layoutLeftDrawerBehavior: 'default',
      layoutRightDrawer: false,
      layoutFooter: false,
      layoutHeaderCustomClass: '',
      layoutLeftDrawerCustomClass: 'main-layout-left-drawer'
    },
    children: [
      {
        path: '',
        name: 'HomePage',
        layoutConfig: {
          layoutHeader: true,
          layoutHeaderVisible: true,
          layoutHeaderType: 'default',
          layoutLeftDrawer: true,
          layoutLeftDrawerVisible: false,
          layoutFooter: true,
          layoutFooterVisible: true
        },
        component: () => import('src/pages/HomePage.vue')
      },
      {
        path: 'landing',
        name: 'Landing',
        component: () => import('src/layouts/LandingLayout.vue'),
        children: [
          // {
          //   path: ':landing_name',
          //   meta: {
          //     hasDynamicSettingWithParams: true
          //   },
          //   name: 'Public.Landing',
          //   component: () => import('src/pages/Public/Landings/Landing.vue')
          // },
          {
            path: '3a_comprehensive_exams',
            name: 'Landing.3aComprehensiveExams',
            layoutConfig: {
              layoutHeader: false,
              layoutHeaderType: 'default',
              layoutLeftDrawer: false,
              layoutFooter: false
            },
            component: () => import('src/pages/Public/Landings/3aComprehensiveExams.vue')
          },
          {
            path: '3a_exams',
            name: 'Landing.3aExams',
            layoutConfig: {
              layoutHeader: false,
              layoutLeftDrawer: false,
              layoutFooter: true
            },
            component: () => import('src/pages/User/landing/landing.vue')
          }
        ]
      },
      {
        path: 'product',
        name: 'Public.Product',
        layoutConfig: {
          layoutView: 'lHh Lpr fff',
          layoutHeader: true,
          layoutHeaderVisible: true,
          layoutHeaderType: 'default',
          layoutHeaderReveal: false,
          layoutHeaderElevated: false,
          layoutHeaderBordered: false,
          layoutLeftDrawer: true,
          layoutLeftSideBarType: 'main',
          layoutLeftDrawerVisible: false,
          layoutLeftDrawerOverlay: false,
          layoutLeftDrawerElevated: false,
          layoutLeftDrawerBordered: false,
          layoutLeftDrawerWidth: 325,
          layoutLeftDrawerBehavior: 'default',
          layoutRightDrawer: false,
          layoutFooter: true,
          // showHamburgerBtn: true,
          layoutFooterVisible: true,
          layoutHeaderCustomClass: '',
          layoutBreadcrumbsElements: [],
          layoutBreadcrumbs: {
            separator: 'home'
          },
          layoutLeftDrawerCustomClass: 'main-layout-left-drawer',
          layoutPageContainerCustomClass: 'main-layout-container'
        },
        component: () => import('src/layouts/bareLayout.vue'),
        children: [
          {
            name: 'Public.Product.Show',
            path: ':id',
            meta: {
              hasDynamicSetting: true
            },
            component: () => import('src/pages/Public/Product/Show.vue')
          }
        ]
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('src/pages/User/exam/List.vue'),
        breadcrumbs: { title: 'پیشخوان' },
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'panel',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'panel'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('src/pages/Auth/Login.vue')
      },
      {
        path: 'subscription',
        name: 'subscription',
        component: () => import('src/pages/User/Subscription.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'default',
          layoutLeftDrawerVisible: false,
          layoutLeftSideBarType: 'default'
        }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('src/layouts/UserPanelLayouts/UserPanelBareLayout.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'default',
          layoutLeftDrawerVisible: false,
          layoutLeftSideBarType: 'default',
          layoutLeftDrawerOverlay: true
        },
        meta: {
          middlewares: [Authenticated]
        },
        children: [
          {
            path: '',
            name: 'User.First.Layout',
            layoutConfig: {
              layoutLeftDrawer: true,
              layoutLeftDrawerVisible: false
            },
            component: () => import('src/layouts/UserPanelLayouts/UserPanelLayout.vue'),
            children: [
              {
                path: 'profile',
                name: 'User.Profile',
                component: () => import('src/pages/User/profile/profile.vue')
              },
              {
                path: 'dashboard',
                name: 'User.Dashboard',
                component: () => import('src/pages/User/Dashboard/Dashboard.vue')
              },
              {
                path: 'my-orders',
                name: 'User.MyOrders',
                component: () => import('src/pages/User/MyOrders/MyOrders.vue'),
                breadcrumbs: { title: 'سفارش های من' }
              },
              {
                path: 'user_exam_list',
                name: 'User.Exam.List',
                layoutConfig: {
                  layoutHeaderVisible: true,
                  layoutHeaderType: 'default'
                },
                component: () => import('src/pages/User/exam/List.vue')
              },
              {
                path: 'ticket',
                component: () => import('src/layouts/bareLayout.vue'),
                name: 'User.Ticket',
                children: [
                  {
                    path: '',
                    name: 'User.Ticket.Index',
                    component: () => import('src/pages/User/Ticket/Index.vue')
                  },
                  {
                    path: ':id',
                    name: 'User.Ticket.Show',
                    component: () => import('src/pages/User/Ticket/Show.vue')
                  },
                  {
                    path: 'create',
                    name: 'User.Ticket.Create',
                    component: () => import('src/pages/User/Ticket/Create.vue')
                  }
                ]
              },
              {
                path: '/onlineQuiz/results/:exam_id/:user_exam_id',
                name: 'user.exam.results',
                component: () => import('src/pages/User/exam/Result.vue')
              }
            ]
          },
          {
            path: 'download_exam/:examId',
            name: 'User.Download',
            layoutConfig: {
              layoutBreadcrumbs: {
                separator: 'isax:arrow-right-3'
              },
              layoutBreadcrumbsElements: [
                {
                  title: 'صفحه اصلی',
                  route: {
                    name: 'HomePage'
                  }
                },
                {
                  title: 'آزمون ها',
                  route: {
                    name: 'User.Exam.List'
                  }
                },
                { title: 'دانلود آزمون' }
              ]
            },
            component: () => import('src/layouts/boxedLayout.vue'),
            children: [
              {
                name: 'User.Exam.Download',
                path: '',
                component: () => import('pages/User/exam/Download/Download.vue')
              },
              {
                name: 'User.SoalaaExam.Download',
                path: ':user_exam_id',
                component: () => import('pages/User/exam/Download/Download.vue')
              }
            ]
          },
          {
            path: 'exam/create',
            name: 'User.Create',
            component: () => import('src/layouts/boxedLayout.vue'),
            children: [
              {
                path: '',
                name: 'User.Create.Exam',
                layoutConfig: {
                  layoutBreadcrumbs: {
                    separator: 'isax:arrow-right-3'
                  },
                  layoutBreadcrumbsElements: [
                    {
                      title: 'صفحه اصلی',
                      route: {
                        name: 'HomePage'
                      }
                    },
                    {
                      title: 'آزمون ها',
                      route: {
                        name: 'User.Exam.List'
                      }
                    },
                    { title: 'ساخت آزمون' }
                  ]
                },
                component: () => import('src/pages/User/exam/Create/Create.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'component',
        name: 'component',
        component: () => import('src/pages/component.vue'),
        breadcrumbs: { title: 'component' },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: 'admin',
        component: () => import('src/layouts/AdminLayout.vue'),
        meta: {
          middlewares: [Authenticated]
        },
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'panel',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'panel'
        },
        children: [
          {
            path: 'exam',
            component: () => import('src/layouts/bareLayout.vue'),
            breadcrumbs: { title: 'آزمون', loading: false },
            meta: {
              middlewares: [
                Authenticated
              ]
            },
            children: [
              {
                name: 'Admin.Exam.Index',
                path: '',
                component: () => import('src/pages/Admin/exam/index.vue'),
                breadcrumbs: { title: 'لیست آزمون ها', loading: false },
                middlewares: [
                  Permissions.hasPermission('examIndex')
                ]
              },
              {
                name: 'Admin.Exam.Create',
                path: 'create',
                component: () => import('src/pages/Admin/exam/Create.vue'),
                middlewares: [
                  Permissions.hasPermission('examStore')
                ]
              },
              {
                name: 'Admin.Exam.Create.AttachQuestion',
                path: 'create/attachQuestion',
                component: () => import('src/pages/Admin/exam/Create/ExamCreatePanel.vue'),
                breadcrumbs: { title: 'صفحه ساخت آزمون', loading: false },
                middlewares: [
                  Permissions.hasPermission('examStore')
                ]
              },
              {
                name: 'Admin.Exam.Show',
                path: ':id',
                component: () => import('src/pages/Admin/exam/Show.vue'),
                breadcrumbs: { title: 'مشاهده آزمون' },
                middlewares: [
                  Permissions.hasPermission('examShow')
                ]
              },
              {
                name: 'Admin.Exam.MoreActions',
                path: ':id/moreActions',
                component: () => import('src/pages/Admin/exam/MoreActions.vue'),
                breadcrumbs: { title: 'عملیات دیگر', loading: false },
                middlewares: [
                  Permissions.hasOneOfThese(['examquestionFile', 'examquestionBookletUpload', 'examquestionBooklet', 'examquestionZirgoroohCopyzirgorooh'])
                ]
              },
              {
                name: 'Admin.Exam.Edit',
                path: ':id/edit',
                component: () => import('src/pages/Admin/exam/Edit.vue'),
                breadcrumbs: { title: 'ویرایش آزمون' },
                middlewares: [
                  Permissions.hasPermission('examUpdate')
                ]
              },
              {
                name: 'Admin.Exam.AllResults',
                path: 'results/:id',
                component: () => import('src/pages/Admin/exam/results.vue'),
                middlewares: [
                  Permissions.hasOneOfThese(['examreportIndexParticipants', 'examreportIndexLessons'])
                ]
              },
              {
                name: 'Admin.Exam.Categories',
                path: ':exam_id/category',
                component: () => import('src/pages/Admin/exam/ExamCategoryList.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionShowcategorires')
                ]
              },
              {
                name: 'Admin.Exam.Categories.SubCategories',
                path: ':exam_id/category/:category_id/sub-category',
                component: () => import('src/pages/Admin/exam/ExamSubCategoryList.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionShowcategorires')
                ]
              },
              {
                path: ':exam_id/sub-category/:subcategory_id/questions/:page',
                name: 'Admin.Exam.SubCategory.Questions',
                component: () => import('src/pages/Admin/exam/SubCategoryQuestions.vue'),
                middleware: [
                  Permissions.hasPermission('examquestionAttachShow')
                ]
              },
              {
                name: 'Admin.Exam.video.set',
                path: 'video/set/examId/:examId/subcategory/:subcategory_id',
                component: () => import('src/pages/Admin/exam/SetVideo.vue'),
                middlewares: [
                  Permissions.hasPermission('examquestionVideos')
                ]
              },
              {
                path: '/results/mbti_bartle/:exam_id/:user_exam_id',
                name: 'mbtiBartle.result',
                component: () => import('src/pages/User/exam/Result/MBTI_Bartle_result.vue'),
                meta: {
                  middlewares: [Authenticated]
                }
              }
            ]
          },

          {
            path: 'question',
            breadcrumbs: { title: 'سوالات', loading: false },
            component: () => import('src/layouts/bareLayout.vue'),
            meta: {
              middlewares: [Authenticated]
            },
            children: [
              {
                path: '',
                name: 'Admin.Question.Bank',
                component: () => import('src/pages/Admin/Question/QuestionBank/QuestionBank.vue'),
                meta: { middlewares: [Authenticated] }
              },
              {
                path: 'list',
                name: 'Admin.Question.Factory',
                component: () => (import('src/pages/Admin/Question/QuestionFactory.vue')),
                meta: {
                  middlewares: [
                    Authenticated,
                    Permissions.hasPermission('questionIndex')
                  ]
                }
              },
              {
                path: 'create',
                breadcrumbs: { title: 'ساخت سوال', loading: false },
                component: () => import('src/layouts/QuestionLayouts/CreateQuestionLayout.vue'),
                meta: {
                  middlewares: [
                    Authenticated,
                    Permissions.hasPermission('examquestionAttach')
                  ]
                },
                children: [
                  {
                    path: 'text',
                    name: 'Admin.Question.Create.Text',
                    breadcrumbs: { title: 'سوال متنی', loading: false },
                    component: () => import('src/layouts/bareLayout.vue'),
                    children: [
                      {
                        path: 'mbti',
                        name: 'Admin.Question.Create.Text.MBTI',
                        breadcrumbs: { title: 'ام بی تی آی', loading: false },
                        component: () => import('src/pages/Admin/Question/MBTIQuestion/MBTIQuestion.vue')
                      },
                      {
                        path: 'descriptive',
                        name: 'Admin.Question.Create.Text.Descriptive',
                        breadcrumbs: { title: 'تشریحی', loading: false },
                        component: () => import('src/pages/Admin/Question/DescriptiveQuestion/DescriptiveQuestion.vue')
                      },
                      {
                        path: 'multipleChoice',
                        name: 'Admin.Question.Create.Text.MultipleChoice',
                        breadcrumbs: { title: 'تستی', loading: false },
                        component: () => import('src/pages/Admin/Question/MultipleChoiceQuestion/MultipleChoiceQuestion.vue')
                      },
                      {
                        path: 'groupQuestion',
                        name: 'Admin.Question.Create.Text.GroupQuestion',
                        breadcrumbs: { title: 'سوالات گروهی', loading: false },
                        component: () => import('src/pages/Admin/Question/GroupQuestion/GroupQuestion.vue')
                      }
                    ]
                  },
                  {
                    path: 'image/:questionType',
                    name: 'Admin.Question.Create.Image',
                    breadcrumbs: { title: 'آپلود عکس', loading: false },
                    component: () => (import('src/pages/Admin/Question/CreateImage.vue')),
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
                component: () => (import('src/pages/Admin/Question/ShowQuestion.vue')),
                meta: {
                  // middlewares: [
                  //   Authenticated,
                  //   Permissions.hasPermission('questionShow')
                  // ]
                }
              },
              {
                path: ':question_id/edit',
                name: 'Admin.Question.Edit',
                breadcrumbs: { title: 'ویرایش سوال', loading: false },
                component: () => (import('src/pages/Admin/Question/EditQuestion.vue')),
                meta: {
                  // middlewares: [
                  //   Permissions.hasPermission('questionUpdate')
                  // ]
                }
              }
            ]
          },

          {
            path: 'category',
            component: () => import('src/layouts/bareLayout.vue'),
            meta: {
              middlewares: [Authenticated]
            },
            children: [
              {
                name: 'Admin.Category.Index',
                path: '',
                component: () => import('src/pages/Admin/category/Index.vue'),
                middlewares: [
                  Permissions.hasPermission('categoryIndex')
                ]
              },
              {
                name: 'Admin.Category.Create',
                path: 'create',
                component: () => import('src/pages/Admin/category/Create.vue'),
                middlewares: [
                  Permissions.hasPermission('categoryCreate')
                ]
              },
              {
                name: 'Admin.Category.Show',
                path: ':id',
                component: () => import('src/pages/Admin/category/Show.vue'),
                middlewares: [
                  Permissions.hasPermission('categoryShow')
                ]
              },
              {
                name: 'Admin.Category.Edit',
                path: ':id/edit',
                component: () => import('src/pages/Admin/category/Edit.vue'),
                middlewares: [
                  Permissions.hasPermission('categoryUpdate')
                ]
              }
            ]
          },

          {
            path: '/subCategory',
            component: () => import('src/layouts/bareLayout.vue'),
            meta: {
              middlewares: [Authenticated]
            },
            children: [
              { name: 'Admin.subCategory.Index', path: '', component: () => import('src/pages/Admin/subCategory/Index.vue') },
              { name: 'Admin.subCategory.Show', path: ':id', component: () => import('src/pages/Admin/subCategory/Show.vue') },
              { name: 'Admin.subCategory.Edit', path: ':id/edit', component: () => import('src/pages/Admin/subCategory/Edit.vue') },
              { name: 'Admin.subCategory.Create', path: 'create', component: () => import('src/pages/Admin/subCategory/Create.vue') }
            ]
          },
          ...allEntityCrudRouteObjects,

          {
            name: 'Admin.KnowledgeTree.tree',
            path: 'knowledge-tree',
            component: () => import('src/pages/Admin/KnowledgeTree/index.vue'),
            breadcrumbs: { title: 'درخت دانش' }
          },

          {
            name: 'Admin.SubjectTree.tree',
            path: 'subject-tree',
            component: () => import('src/pages/Admin/SubjectTree/index.vue'),
            breadcrumbs: { title: 'درخت تگ موضوعی' }
          },

          {
            path: 'ticket',
            component: () => import('src/layouts/bareLayout.vue'),
            meta: {
              middlewares: [Authenticated]
            },
            name: 'Admin.Ticket',
            children: [
              {
                path: '',
                name: 'Admin.Ticket.Index',
                component: () => import('src/pages/Admin/Ticket/Index.vue')
              },
              {
                path: ':id',
                name: 'Admin.Ticket.Show',
                component: () => import('src/pages/Admin/Ticket/Show.vue')
              },
              {
                path: 'create',
                name: 'Admin.Ticket.Create',
                component: () => import('src/pages/Admin/Ticket/Create.vue')
              }
            ]
          },
          { name: 'Admin.Settings', path: 'settings', component: () => import('src/pages/Admin/Settings.vue'), breadcrumbs: { title: 'تنظیمات' } }
        ]
      },

      {
        path: '/onlineQuiz/results/:exam_id/:user_exam_id',
        name: 'user.exam.results',
        component: () => import('src/pages/User/exam/Result.vue'),
        middleware: [Authenticated]
      },
      {
        path: '/onlineQuiz/alaaView/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView',
        component: () => import('src/pages/User/exam/participate/AlaaView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/alaaView/retake/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView.retake',
        component: () => import('src/pages/User/exam/participate/AlaaView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/alaaView/personal/:quizId/:questNumber',
        name: 'onlineQuiz.alaaView.personal',
        component: () => import('src/pages/User/exam/participate/AlaaView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/konkoorView/:quizId',
        name: 'konkoorView',
        component: () => import('src/pages/User/exam/participate/konkoorView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/konkoorView/:quizId',
        name: 'onlineQuiz.konkoorView',
        component: () => import('src/pages/User/exam/participate/konkoorView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/konkoorView/retake/:quizId',
        name: 'onlineQuiz.konkoorView.retake',
        component: () => import('src/pages/User/exam/participate/konkoorView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/onlineQuiz/konkoorView/personal/:quizId',
        name: 'onlineQuiz.konkoorView.personal',
        component: () => import('src/pages/User/exam/participate/konkoorView.vue'),
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'quiz',
          layoutLeftDrawerVisible: true,
          layoutLeftSideBarType: 'quiz'
        },
        meta: {
          middlewares: [Authenticated]
        }
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('src/pages/Cart/Cart.vue'),
        // meta: {
        //   middlewares: [
        //     Permissions.hasPermission('examStore')]
        // },
        layoutConfig: {
          layoutHeaderVisible: true,
          layoutHeaderType: 'default',
          layoutLeftDrawerVisible: false
        }
      },
      {
        path: '/order/:orderId/thankYou',
        name: 'thankYouPage',
        component: () => import('src/pages/ThankYouPage/ThankYouPage.vue'),
        // meta: {
        //   middlewares: [
        //     Permissions.hasPermission('examStore')]
        // },
        layoutConfig: {
          layoutHeaderVisible: false,
          layoutLeftDrawerVisible: false
        }
      }
    ]
  },
  {
    path: '/admin/exam/:quizId/:lessonId/print',
    name: 'Admin.Exam.Lessons.PrintQuestions',
    component: () => import('src/pages/Admin/Question/QuestionExport/preview.vue'),
    middleware: []
  },
  // are u mr Esmaeili ? '' : dont touch this route
  {
    path: '/debug',
    name: 'debug',
    component: () => import('src/pages/Auth/test.vue'),
    meta: {
      middlewares: [Authenticated]
    }
  },
  {
    path: '/onlineQuiz/mbti_bartle/:quizId/:questNumber',
    name: 'onlineQuiz.mbtiBartle',
    component: () => import('src/pages/User/exam/participate/MBTI_Bartle.vue'),
    meta: {
      middlewares: [Authenticated]
    }
  },
  {
    path: '/user-info',
    name: 'user-info',
    component: () => import('src/pages/User/UserInfoForm.vue'),
    meta: {
      middlewares: [Authenticated]
    }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component:
      () => import('src/pages/Error404.vue')
  }
]

export default routes
