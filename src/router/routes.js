
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      },
      // user list
      {
        path: '',
        name: 'user.exam.list'
        // component: () => import('')
      },
      {
        path: '',
        name: 'faq'
        // component: () => import('')
      },
      // admin list
      {
        path: '',
        name: 'quest.create'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'tree.edit'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'onlineQuiz.exams'
        // component: () => ('#')
      },
      {
        path: '',
        name: 'quest.index'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'subCategory.edit'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'category.edit'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'subGroup.edit'
        // component: () => import('#')
      },
      {
        path: '',
        name: 'question.mbti.create'
        // component: () => import('#')
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
