import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/404.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/home.vue')
  },
  {
    path: '/bmo',
    name: 'bmo',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/bmo.vue')
  },
  {
    path: '/calendarevent/',
    name: 'calendarevent',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/calendarevent.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/contact.vue')
  },
  {
    path: '/details/:Pid',
    name: 'details',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/details.vue')
  },
  {
    path: '/presidium',
    name: 'presidium',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/presidium.vue')
  },
  {
    path: '/experts',
    name: 'experts',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/experts.vue')
  },
  {
    path: '/details/:Pid/test',
    name: 'testVebinar',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/testVebinar.vue')
  },
  {
    path: '/in-login',
    name: 'inLogin',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/inLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/register.vue')
  },
  {
    path: '/another_domen_auth/:auth_token',
    name: 'another_domen_auth',
    meta: { layout: 'empty' },
    component: () => import(/* webpackChunkName: "about" */ '../views/another_domen_auth.vue')
  },
  {
    path: '/lc-events',
    name: 'lc-events',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Events.vue')
  },
  {
    path: '/lc-vebinar',
    name: 'lc-vebinar',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Vebinar.vue')
  },
  {
    path: '/lc-courses',
    name: 'lc-courses',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Courses.vue')
  },
  {
    path: '/lc-mysertificate',
    name: 'lc-mysertificate',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/MySertificate.vue')
  },
  {
    path: '/lc-profile',
    name: 'lc-profile',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Profile.vue')
  },
  {
    path: '/lc-seecourse',
    name: 'lc-seecourse',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/SeeCourse.vue')
  },
  {
    path: '/lc-static',
    name: 'lc-static',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Static.vue')
  },
  {
    path: '/lc-updateevents/:Pid',
    name: 'lc-updateevents',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/UpdateEvents.vue')
  },
  {
    path: '/lc-updatevebinar/:Pid',
    name: 'lc-updatevebinar',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/UpdateVebinar.vue')
  },
  {
    path: '/lc-updatecourse/:Pid',
    name: 'lc-updatecourse',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/UpdateCourse.vue')
  },
  {
    path: '/lc-updateuser/:Pid',
    name: 'lc-updateuser',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/UpdateUser.vue')
  },
  // {
  //   path: '/lc-courses/:Pid',
  //   name: 'lc-courses',
  //   meta: {
  //     layout: 'main',
  //     requiresAuth: true
  //   },
  //   component: () => import(/* webpackChunkName: "about" */ '../lc/Courses.vue')
  // },
  {
    path: '/lc-users',
    name: 'lc-users',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Users.vue')
  },
  {
    path: '/lc-updateevents/:Pid/test',
    name: 'lc-test',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () => import(/* webpackChunkName: "about" */ '../lc/Test.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})
export default router
