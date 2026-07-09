import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ 
      path: '', component: () => import('pages/estadio1.vue') },
      {
      path: '/estadio2', component: () => import('pages/estadio2.vue') 
      },
      {
      path: '/criadorDeEstadioBasico', component: () => import('pages/criadorDeEstadioBasico.vue') 
      }
  ],
  },

  {
    path: '/:catchAll(.)',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;