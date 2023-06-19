/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

export const proxy = {
  '/api': {
    target: 'http://122.4.216.133:8888/',
    changeOrigin: true,
    pathRewrite: { '^': '' },
  },
  '/fileApi': {
    target: 'http://122.4.216.133:8888/file_upload',
    changeOrigin: true,
  },
};
