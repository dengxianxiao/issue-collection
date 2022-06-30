const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const UploadFileToAliyunPlugin = require('./src/plugins/uploadFileToAliyunPlugin')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  // outputDir: 'dist',
  // assetsDir: 'static',
  lintOnSave: true,
  configureWebpack: config => {
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      const uploadFileToAliyunPlugin = new UploadFileToAliyunPlugin({ folderPath: path.join(__dirname, './dist/cdnImg/') })
      plugins.push(uploadFileToAliyunPlugin)
    }
    // 配置别名
    Object.assign(config.resolve, {
      alias: {
        '@': path.resolve(__dirname, './src'),
        assets: path.resolve(__dirname, './src/assets'),
        plugins: path.resolve(__dirname, './src/plugins')
      }
    })
    return {
      plugins
    }
  },
  chainWebpack: config => {
    // cdn包
    config.externals({
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter'
    })
    // webpack5 移除了url-loader
    config
      .module
      .rule('images')
      .test(/\.(jpg|png|gif)$/)
      .set('parser', {
        dataUrlCondition: {
          maxSize: 4096 // 2k
        }
      })
      .set('generator', {
        filename: '[name].[hash].[ext]',
        publicPath: process.env.NODE_ENV === 'production' ? 'https://dxx-images.oss-cn-guangzhou.aliyuncs.com/' : 'cdnImg/', // cdn地址
        outputPath: 'cdnImg' // cdn图片
      })
      .end()

    // webpack4 以下使用url-loader
    // config
    //   .module
    //   .rule('images')
    //   .test(/\.(jpg|png|gif)$/)
    //   .use('url-loader')
    //   .loader('url-loader')
    //   .options({
    //     // 使文件大小小于此limit值(单位为byte)的文件转换为base64格式
    //     // 大于此limit的, 会执行options中的fallback配置项插件, fallback默认值为file-loader,
    //     // 而url-loader的options配置项也会被传递给file-loader
    //     limit: 4096,
    //     // 根据环境使用cdn或相对路径
    //     publicPath: 'https://oss.xx.com/img',
    //     // 将图片打包到dist/img文件夹下, 不配置则打包到dist文件夹下
    //     outputPath: 'cdnImg',
    //     // 配置打包后图片文件名
    //     name: '[name].[hash:8].[ext]'
    //   })
    //   .end()
  }
})
