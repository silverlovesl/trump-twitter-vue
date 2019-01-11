import Vue from 'vue';
import Router from 'vue-router';

function loadView(componentName: string) {
  return () => import(`@/views/${componentName}.vue`);
}

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('TWHome'),
    },
    {
      path: '/home',
      name: 'home',
      component: loadView('TWHome'),
    },
    {
      path: '/emotion',
      name: 'emotion',
      component: loadView('TWEmotion'),
    },
  ],
});
