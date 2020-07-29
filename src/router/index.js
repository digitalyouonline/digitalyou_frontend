import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Browser from "../views/Browser.vue";
import Filebrowser from "../views/Filebrowser.vue";
import Meetings from "../views/Meetings.vue";
import Login from "../views/Login.vue"
import Callback from "../views/Callback.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/callback",
    name: "Callback",
    component: Callback
  },
  {
    path: "/browser",
    name: "Browser",
    component: Browser
  },
  {
    path: "/filebroser",
    name: "Filebrowser",
    component: Filebrowser
  },
  {
    path: "/meetings",
    name: "Meetings",
    component: Meetings
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  from.path
  const publicPages = ['/login','/callback']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('profile')

  if (authRequired && !loggedIn){
    return next('/login')
  }

  next()
})

export default router;
