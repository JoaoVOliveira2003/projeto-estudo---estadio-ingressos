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
      {
        path: '/criadorDeEvento',
        component: () => import('pages/criadorDeEvento.vue'),
      },
      {
        path: '/listaDeEventos',
        component: () => import('pages/listaDeEventos.vue'),
      },
      {
        path: '/evento/:cod_evento',
        name: 'evento',
        component: () => import('pages/evento.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.)',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
