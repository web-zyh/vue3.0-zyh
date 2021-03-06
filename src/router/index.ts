import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from "vue-router";
import store from "../store/index";
import { removeItem } from "../utils/storage/storage";
import { ElNotification } from "element-plus";

const state = store.state as any;

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    meta: { title: "登录" },
    component: () => import("../pages/login/login.vue"),
  },
  {
    path: "/index.html",
    name: "首页",
    component: () => import("../pages/index/index.vue"),
    children: [
      {
        path: "/service.html",
        name: "service",
        meta: { title: "服务" },
        component: () => import("../pages/myservice/index.vue"),
      }
    ]
  }
];

const router = createRouter({
  // createWebHashHistory hash 路由
  // createWebHistory history 路由
  // createMemoryHistory 带缓存 history 路由
  history: createWebHistory(),
  routes,
});

// to:router即将进入的路由对象
// from:当前导航即将离开的路由
// next:Function,进行管道中的一个钩子，如果执行完了，则导航的状态就是 confirmed （确认的）；否则为false，终止导航。
router.beforeEach((to, from, next) => {
  if (to.path !== "/") {
    if (state.user.token) {
      // 如果本地有token验证就继续
      next();
    } else {
      // 否则路由初始到登录页
      ElNotification({
        title: "警告",
        message: "登录失败,请您输入有效的用户名及密码进行登录",
        type: "warning",
        duration: 5000
      });
      next({
        path: "/",
      });
    }
  } else {
    removeItem("token");
    next();
  }
});
export default router;
