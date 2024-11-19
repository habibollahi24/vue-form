import { createRouter, createWebHistory } from 'vue-router';

import FormBuilder from './pages/FormBuilder.vue';
import AllForms from './pages/AllForms.vue';

const routes = [
  { path: '/', name: 'FormBuilder', component: FormBuilder },
  { path: '/forms', name: 'AllForms', component: AllForms },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
