import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Category from './views/Category';
import Cart from './views/Cart';
import Dressings from './views/Dressings';
import Dressing from './views/Dressing';
import store from './store.js';

Vue.use(Router);

export const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/category/:categoryName',
      name: 'category',
      component: Category
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import(/* webpackChunkName: "about" */ './views/Products.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dressings',
      name: 'dressings',
      component: Dressings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dressing/:basketId',
      name: 'dressing',
      component: Dressing,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('getCurrentUser').then(() => {
      const isLoggedIn = store.getters.isLoggedIn;
      if (isLoggedIn) {
        next();
      }
      if (!isLoggedIn) {
        next('/login');
      }
    });
  } else {
    next();
  }
});
