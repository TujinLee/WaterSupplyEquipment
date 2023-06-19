import { defineConfig } from 'umi';
import { routes } from './src/common/routers';



export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: routes,
  title: "山东华立",
  theme: {
    'primary-color': '#E84747',
  },
  locale:{
    default: 'zh-CN',
  },
  dynamicImport:{

  },
  // chunks: ['umi'],
  // chainWebpack: function (config, { webpack }) {
  //   config.merge({
  //     optimization: {
  //       splitChunks: {
  //         chunks: 'all',
  //         minSize: 30000,
  //         minChunks: 3,
  //         automaticNameDelimiter: '.',
  //         cacheGroups: {
  //           vendor: {
  //             name: 'vendors',
  //             test({ resource }) {
  //               return /[\\/]node_modules[\\/]/.test(resource);
  //             },
  //             priority: 10,
  //           },
  //         },
  //       },
  //     }
  //   });
  // },
  favicon: '/static/favicon.ico',
  proxy: {
    '/api': {
      target: 'http://122.4.216.133:8899/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
    '/fileApi': {
      target: 'http://122.4.216.133:8899/file_upload',
      changeOrigin: true,
    },
  },
  manifest:{
    basePath: "/",
  }
  // styles:[
  //   'https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.1/swiper-bundle.css'
  // ],
  // scripts:[
  //   'https://cdnjs.cloudflare.com/ajax/libs/ant-design-icons/4.2.2/index.umd.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/antd/4.8.2/antd.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/classnames/2.2.6/index.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/react/16.12.0/umd/react.production.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.12.0/umd/react-dom.production.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/react-slick/0.27.12/react-slick.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/Swiper/6.4.1/swiper-bundle.min.js',
  // ],
  // headScripts: [
  //   `https://webapi.amap.com/maps?v=1.4.15&key=9266811a51859205cb7052159697dd03`,
  // ],
});
