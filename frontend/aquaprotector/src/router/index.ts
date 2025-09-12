import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PredictiveModelView from '../views/PredictiveModelView.vue'
import EducationView from '../views/EducationView.vue' 

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/predictive-model',
      name: 'predictive-model',
      component: PredictiveModelView
    },
    { path: '/education', name: 'education', component: EducationView }
  ]
})

export default router
