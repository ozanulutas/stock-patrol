import AdminLayout from '../layouts/AdminLayout.vue'
import PublicLayout from '../layouts/PublicLayout.vue'

export default [
  {
    path: "",
    component: PublicLayout,
    children: [
      {
        path: '/',
        name: 'HomePage',
        component: () => import('../views/HomePage.vue')
      },
      {
        path: '/symbol/:symbol',
        name: 'SymbolPage',
        component: () => import('../views/SymbolPage.vue')
      },
    ]
  },
  {
    path: "",
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/admin',
        name: 'AdminPage',
        component: () => import('../views/AdminPage.vue'),
      }
    ]
  },
]