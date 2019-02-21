import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/error/404'), hidden: true },
  { path: '/401', component: () => import('@/views/error/401'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  
  {
    path: '/base',
    component: Layout,
    name: 'Base',
    children: [{
      path: '/base',
      component: () => import('@/views/base/index'),
      meta: {
        title: '规则设置',
        icon: 'nested'
      },
    }],
  },

  {
    path: '/menber',
    component: Layout,
    // redirect: '/menber/user',
    name: 'Menber',
    meta: {
      title: '人员管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/menber/user'), // Parent router-view
        name: 'User',
        meta: { title: '用户' },
        children: [
          {
            path: 'list',
            component: () => import('@/views/menber/user/list/index.vue'),
            name: 'AddList',
            meta: { title: '用户列表' }
          },
          {
            path: 'add',
            component: () => import('@/views/menber/user/add/index.vue'),
            name: 'AddUser',
            meta: { title: '添加用户' }
          }
        ]
      },
      {
        path: 'admin',
        component: () => import('@/views/menber/admin'),
        meta: { title: '管理员' }
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    name: 'Store',
    meta: {
      title: '店铺管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/store/list/index'), // Parent router-view
        name: 'StoreList',
        meta: { title: '店铺列表' },
      },
      {
        path: 'add',
        component: () => import('@/views/store/add/index'),
        name: 'StoreAdd',
        meta: { title: '添加店铺' }
      },
      {
        path: 'update',
        component: () => import('@/views/store/update/index'),
        name: 'StoreUpdate',
        meta: { title: '修改店铺' },
        hidden: true
      }
    ]
  },

  
  {
    path: '/menu',
    component: Layout,
    name: 'Menu',
    meta: {
      title: '菜单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/menu/list/index'), // Parent router-view
        name: 'MenuList',
        meta: { title: '菜单列表' },
      },
      {
        path: 'add',
        component: () => import('@/views/menu/add/index'),
        name: 'MenuAdd',
        meta: { title: '添加菜单' }
      },
      {
        path: 'update',
        component: () => import('@/views/menu/update/index'),
        name: 'MenuUpdate',
        meta: { title: '修改菜单' },
        hidden: true
      }
    ]
  },

  {
    path: '/book',
    component: Layout,
    name: 'Book',
    meta: {
      title: '订单管理',
      icon: 'nested'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/book/list/index'), // Parent router-view
        name: 'MenuList',
        meta: { title: '订单列表' },
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
