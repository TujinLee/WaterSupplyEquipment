export const routes = [
  {
    path: '/',
    // redirect: '/home',
    component: '@/layouts',
    routes: [
      {
        path: '/home',
        component: './Home',
        title: '山东华立首页',
      },
      {
        path: '/production',
        component: './Production',
        title: '产品中心',
      },
      {
        path: '/production/detail',
        component: './Production/Detail',
        title: '产品中心详情',
      },
      {
        path: '/projectCase',
        component: './ProjectCase',
        title: '工程案例'
      },
      {
        path: '/innovation',
        component: './Innovation',
        title: '研发创新'
      },
      {
        path: '/news',
        component: './News',
        title: '资讯中心',
      },
      {
        path: '/news/detail',
        component: './News/Detail',
        title: '资讯详情',
      },
      {
        path: '/service',
        component: './ServiceCenter',
        title: '服务中心'
      },
      {
        path: '/about',
        component: './AboutUs',
        title: '关于我们'
      },      
      { exact: true, path: '/', redirect: '/home' },
    ],
  },
]
