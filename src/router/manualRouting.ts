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
      { path: 'newJob', name: 'new-job', component: NewJob },
      { path: 'pastJobs', name: 'past-jobs', component: PastJobs },
      { path: 'profile', name: 'profile', component: Profile },
      { path: 'dashboard', name: 'dashboard', component: Dashboard },
      { path: 'job/success', name: 'success', component: SummaryPage },
      { path: '**', redirect: '/' },
    ],
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
