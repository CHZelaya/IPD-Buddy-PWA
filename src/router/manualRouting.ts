import { createRouter, createWebHistory } from 'vue-router';
//Layouts
import SplashLayout from '@/layouts/SplashLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

//Pages
import index from '@/pages/index.vue';
import NewJob from '@/pages/NewJob.vue';
import PastJobs from '@/pages/PastJobs.vue';
import Profile from '@/pages/Profile.vue';
import Dashboard from '@/pages/Dashboard.vue';
import SummaryPage from '@/pages/SummaryPage.vue';

const routes = [
  {
    path: '/',
    component: SplashLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: index,
      },
    ],
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      { path: 'newJob', name: 'new-job', component: NewJob, meta: { requiresAuth: true } },
      { path: 'pastJobs', name: 'past-jobs', component: PastJobs, meta: { requiresAuth: true } },
      { path: 'profile', name: 'profile', component: Profile, meta: { requiresAuth: true } },
      { path: 'dashboard', name: 'dashboard', component: Dashboard, meta: { requiresAuth: true } },
      {
        path: 'job/success',
        name: 'success',
        component: SummaryPage,
        meta: { requiresAuth: true },
      },
      { path: '/:catchAll(.*)', redirect: '/' },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation Guard

import { getAuth } from 'firebase/auth';

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/');
  } else {
    next();
  }
});

export default router;
