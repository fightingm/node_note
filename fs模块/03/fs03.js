
const fs = require('fs');

// createReadStream 创建读取流 
// 当读取文件较小时使用readFile
// const readStream = fs.createReadStream('1.md');

// let data = '';
// let count = 0;
// // 正在读取
// readStream.on('data', chunk => {
//     data += chunk;
//     count ++;
// });

// // 读取完成
// readStream.on('end', () => {
//     console.log(data);
//     console.log(count);
// });
// // 读取失败
// readStream.on('error', err => {
//     console.log(err);
// });

// createWriteStrm 创建写入流
// 当写入内容较小时使用writeFile或者appendFile

// 创建一个写入流，写入到2,md
// const writeStream = fs.createWriteStream('2.md');

// // 写入
// writeStream.write('test md', 'utf8');
// // 停止写入 ，在这之后再调用write方法会报错
// writeStream.end();

// // 写入完成
// writeStream.on('finish', () => {
//     console.log('写入完成');
// });
// // 写入失败
// writeStream.on('error', err => {
//     console.log(err);
// });

//pipe 一边读一边写
// fs.createReadStream('2.md').pipe(fs.createWriteStream('4.md'));
const readStream = fs.createReadStream('2.md');
const writeStream = fs.createWriteStream('5.md');
readStream.on('data', chunk => {
    writeStream.write(chunk, 'utf8');
});
readStream.on('end', () => {
    writeStream.end();
})
