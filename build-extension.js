const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 创建输出流
const output = fs.createWriteStream(path.join(__dirname, 'cookie-exporter-extension.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 } // 最大压缩级别
});

// 监听打包完成事件
output.on('close', function () {
  console.log(`Extension packaged successfully! Total size: ${archive.pointer()} bytes`);
});

// 监听打包错误事件
archive.on('error', function(err) {
  throw err;
});

// 将压缩包通过管道输出到文件
archive.pipe(output);

// 添加所有必需的文件和目录
const filesToAdd = [
  'manifest.json',
  'popup.html',
  'popup.css',
  'background.js',
  '_locales',
  'icons',
  'css',
  'js'
];

filesToAdd.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    if (fs.lstatSync(filePath).isDirectory()) {
      archive.directory(filePath, file);
    } else {
      archive.file(filePath, { name: file });
    }
  } else {
    console.warn(`Warning: ${file} not found`);
  }
});

// 完成打包
archive.finalize();