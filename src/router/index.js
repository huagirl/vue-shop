import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue';
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/login'

  },
  {
    path: '/login',
    component:Login
  },
  {
    path: '/home',
    redirect:'/welcome',
    component: Home,
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/users',
        component:Users
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to:将要访问的路径，
 //from:代表从哪个路径跳转而来
 //next:是一个函数，表示放行
  //无参：next():放行，有参：next("/login"):强制跳转

  //如果用户访问的是登录页，直接放行
  if (to.path === '/login') return next();
  //获取token
  const tokenStr = window.sessionStorage.getItem('token');
  //没有token,强制跳转到登录页
  if (!tokenStr) {
    return next('/login');
  } else {
    next();
  
  }
})

export default router
