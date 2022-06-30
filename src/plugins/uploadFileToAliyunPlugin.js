const uploadFile = require('../utils/uploadFile.js')
/**
 * 上传图片到阿里云webpack插件
 */
class uploadFileToAliyunPlugin {
  // 要上传的文件夹
  static defaultOptions = {
    folderPath: ''
  }

  constructor (options = {}) {
    this.options = {
      ...uploadFileToAliyunPlugin.defaultOptions,
      ...options
    }
  }

  // 在插件函数的 prototype 上定义一个 `apply` 方法，以 compiler 为参数。
  apply (compiler) {
    // 指定一个挂载到 webpack 自身的事件钩子。
    compiler.hooks.afterEmit.tapAsync(
      'uploadFileToAliyunPlugin',
      (compilation, callback) => {
        // 调用上传文件接口
        uploadFile.uploadFolderToAliOSS(this.options.folderPath).then(() => callback())
      }
    )
  }
}

module.exports = uploadFileToAliyunPlugin
