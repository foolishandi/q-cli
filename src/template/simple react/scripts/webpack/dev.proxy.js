module.exports = {
  // 静态资源文件夹
  assetsSubDirectory: 'static',
  // 发布路径
  assetsPublicPath: '/',

  // 代理配置表，在这里可以配置特定的请求代理到对应的API接口
  // 使用方法：https://vuejs-templates.github.io/webpack/proxy.html
  proxyTable: {
    // 例如将'localhost:8080/api/xxx'代理到'https://wangyaxing.cn/api/xxx'
    '/api': {
      target: 'https://...', // 接口的域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
    },
    // 例如将'localhost:8080/img/xxx'代理到'https://cdn.wangyaxing.cn/xxx'
    '/img': {
      target: 'https://...', // 接口的域名
      secure: false, // 如果是https接口，需要配置这个参数
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      pathRewrite: {'^/img': ''}, // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
    },
  },
  // Various Dev Server settings
  host: 'localhost', // can be overwritten by process.env.HOST
  port: 4000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
};
