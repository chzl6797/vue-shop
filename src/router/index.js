import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from 'views/login/Login'
import Home from 'views/home/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 如果跳转地址为/login,直接放行
  console.log()
  if (to.path === '/login') return next()

  // 获取token的值，如果token存在，则放行，不存在则跳转至登录页面
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
