import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/estadio1.vue'),
      },
      {
        path: '/criadorDeEstadio',
        component: () => import('pages/criadorDeEstadio.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.)',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
