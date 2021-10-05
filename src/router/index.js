import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'
import store from '../store/index.js'
import Login from '../components/Login.vue'

const CoachList = defineAsyncComponent(() => import('../components/CoachList.vue')) 
const FeedbackList = defineAsyncComponent(() => import('../components/FeedbackList.vue')) 
const ContactCoach = defineAsyncComponent(() => import('../components/ContactCoach.vue')) 
const Register = defineAsyncComponent(() => import('../components/Register.vue')) 
const CoachDetails = defineAsyncComponent(() => import('../components/CoachDetails.vue')) 
const NopageFound = defineAsyncComponent(() => import('../components/NopageFound.vue')) 

const routes = [
  {
    path: '/',
    name:'default',
    redirect: '/auth'
  },
  {
    path: '/coachList',
    name: 'CoachList',
    component: CoachList
  },
  {
    path: '/feedbackList',
    name: 'FeedbackList',
    component: FeedbackList,
    beforeEnter(_,__,next) {
      if(store.getters.isLoggedIn)
        next();
      else
        next('/auth')
    }
  },
  {
    path: '/coachList/:ContactCoach',
    name: 'ContactCoach',
    component: ContactCoach
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter(_,__,next) {
      if(store.getters.isLoggedIn)
        next();
      else
        next('/auth')
    }
  },
  {
    path: '/coachDetails/:CoachId',
    name: 'CoachDetails',
    component: CoachDetails
  },
  {
    path: '/auth',
    name: 'Login',
    component: Login
  },
  {
    path: '/:any',
    name: 'NopageFound',
    component: NopageFound
  },
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
