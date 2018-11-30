import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home.vue'
import Login from '../components/login/Login.vue'
Vue.use(Router)
const router = new Router({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/login', component: Login }
  ]
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to.path)
  // 如果是跳到登陆页,不做处理,任何人都可以访问登陆页
  if (to.path === '/login') {
    return next()
  } else {
    const token = localStorage.getItem('token')
    if (token) {
      // 如果登陆过,放行
      next()
    } else {
      next('/login')
    }
  }
  // 如果不是登陆页,先判断是否登录过
})
export default router
