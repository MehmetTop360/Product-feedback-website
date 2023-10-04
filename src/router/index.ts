import { createRouter, createWebHistory } from 'vue-router'
import AddFeedback from '@/views/AddFeedback.vue'
import MainPage from '@/views/MainPage.vue'
import Details from '@/views/FeedbackDetail.vue'
import EditFeedback from '@/views/EditFeedback.vue'
import ErrorPage from '@/views/ErrorPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/add',
      name: 'AddFeedback',
      component: AddFeedback
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/editpage/:id',
      name: 'EditPage',
      component: EditFeedback
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: ErrorPage
    }
  ]
})

export default router
