module.exports = {
   // 公共路径(必须有的)
   publicPath: "./",
   // 输出文件目录
   outputDir: "dist",
   // 静态资源存放的文件夹(相对于ouputDir)
   assetsDir: "static",
   // eslint-loader 是否在保存的时候检查
   lintOnSave:false,
   //打包后小些
   runtimeCompiler: false,
   productionSourceMap: true, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
   devServer: {
     // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
      proxy: {
        '/api': {
            target: 'https://xingkong.gqt.gcu.edu.cn/map/api/',// 你要请求的后端接口ip+port
            changeOrigin: true, //设置true后可以使target是域名
            ws: true,// 开启webSocket
            pathRewrite: {
              '^/api': '' 
          }
        }
    }
    }
  }
