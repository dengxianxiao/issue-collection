const OSS = require('ali-oss')
const fs = require('fs')
const aliyunConfig = require('../config/aliyun.local.js')
const store = new OSS({
  region: 'oss-cn-guangzhou',
  accessKeyId: aliyunConfig.accessKeyId,
  accessKeySecret: aliyunConfig.accessKeySecret,
  bucket: 'dxx-images'
})

/**
 * 上传文件到阿里云
 * @param {String} fileName 文件名称
 * @param {String} filePath 文件路径
 */
async function uploadFileToAliOSS (fileName, filePath) {
  try {
    await store.putStream(fileName, fs.createReadStream(filePath))
    return true
  } catch (error) {
    console.error(`${fileName}文件上传失败，请检查文件`)
    return false
  }
}

/**
 * 判断文件是否存在
 * @param {String} fileName 文件名称
 */
async function isExistObject (fileName) {
  try {
    await store.head(fileName)
    return true
  } catch (error) {
    return false
  }
}

/**
 * 上传文件夹内容到阿里云，上传成功后删除文件
 * @param {String} dirPath 文件夹地址
 */
async function uploadFolderToAliOSS (dirPath) {
  const files = fs.readdirSync(dirPath)
  const uploadErrorFiles = []
  console.log(files)
  for (const fileName of files) {
    const filePath = dirPath + fileName
    const isExit = await isExistObject(fileName)
    // 如果文件不存在，上传后删除；如果存在，直接删除
    if (!isExit) {
      const isSuccess = await uploadFileToAliOSS(fileName, filePath)
      if (isSuccess) {
        fs.unlinkSync(filePath)
      } else {
        uploadErrorFiles.push(fileName)
      }
    } else {
      fs.unlinkSync(filePath)
    }
  }
  // 没有上传失败的图片则删除文件夹
  if (!uploadErrorFiles.length) {
    fs.rmdirSync(dirPath)
  }
}

module.exports = {
  uploadFolderToAliOSS,
  uploadFileToAliOSS
}
