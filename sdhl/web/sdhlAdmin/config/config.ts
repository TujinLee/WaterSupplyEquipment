// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  // locale: {
  //   // default zh-CN
  //   default: 'zh-CN',
  //   antd: true,
  //   // default true, when it is true, will use `navigator.language` overwrite default
  //   baseNavigator: true,
  // },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/user/login',
            },
            {
              path: '/home',
              name: '首页配置',
              icon: 'HomeOutlined',
              authority: ['superAdmin', 'admin', 'homeCofig'],
              routes: [{
                path: '/home/banner',
                name: 'Banner图',
                component: './Home/BannerPicture',
                authority: ['superAdmin', 'admin', 'homeCofig'],
              }, {
                path: '/home/introduction',
                name: '产品介绍文案',
                component: './Home/Introduction',
                authority: ['superAdmin', 'admin', 'homeCofig'],
              }],
            },
            {
              path: '/product',
              name: '产品中心',
              icon: 'ProfileOutlined',
              authority: ['superAdmin', 'admin', 'product'],
              routes: [{
                path: '/product/admin',
                name: '产品管理',
                component: './Product/Admin',
                authority: ['superAdmin', 'admin', 'product'],
              }],
            },
            {
              path: '/project',
              name: '工程案例',
              icon: 'ProfileOutlined',
              authority: ['superAdmin', 'admin', 'project'],
              routes: [{
                path: '/project/list',
                name: '项目列表',
                component: './ProjectCases/List',
                authority: ['superAdmin', 'admin', 'project'],
              }],
            },
            {
              path: '/news',
              name: '资讯中心',
              icon: 'ProfileOutlined',
              authority: ['superAdmin', 'admin', 'news'],
              routes: [{
                path: '/news/list',
                name: '资讯列表',
                component: './NewsCenter/NewsList',
                authority: ['superAdmin', 'admin', 'news'],
              }],
            },
            {
              path: '/about',
              name: '关于我们',
              icon: 'ProfileOutlined',
              authority: ['superAdmin', 'admin', 'recruit'],
              routes: [{
                path: '/about/recruit',
                name: '人才招聘',
                component: './Recruit',
                authority: ['superAdmin', 'admin', 'recruit'],
              }],
            },
            {
              path: '/authority',
              name: '权限管理',
              icon: 'ProfileOutlined',
              authority: ['superAdmin'],
              routes: [{
                path: '/authority/members',
                name: '成员管理',
                component: './AuthorityManagement/Members',
                authority: ['superAdmin'],
              }],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: {
    '/api': {
      target: 'http://122.4.216.133:8888/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/file_upload': {
      target: 'http://122.4.216.133:8888/file_upload',
      changeOrigin: true,
      pathRewrite: { '^/file_upload': '' },
    },
  },
  manifest: {
    basePath: '/',
  },
});
