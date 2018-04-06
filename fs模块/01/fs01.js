const fs = require('fs');

// 1. fs.stat 判断是文件还是目录
// isFile()方法判断是不是一个文件
// isDirectory()方法判断是不是一个目录
// 这里注意第一个参数要是基于node命令所在的目录

fs.stat('hello.js', (err, stats) => {
    if(err) {
        console.log(err);
        return false;
    };
    if(stats.isFile()) {
        console.log('是一个文件')
    }
    if(stats.isDirectory()) {
        console.log('是一个目录')
    }
});

// 2. fs.mkdir 创建一个目录
// 如果已存在该目录，会走err
fs.mkdir('css', err => {
    if(err) {
        console.log(err);
        return false;
    };
    console.log('创建目录成功');
});

// 3. fs.writeFile() 创建写入文件
/*
filename (String) 文件名称
data (String/Buffer) 写入的内容
options (Object) 写入参数
    encoding (String) 编码方式 默认utf8, 若data为buffer,设置为ignored
    mode (Number) 读写权限 默认438
    flag (String) 默认'w'
callback (Function) 回调
*/
// 如果不存在，创建并写入，存在则覆盖

fs.writeFile('1.md', 'test md', err => {
    if(err) {
        console.log(err);
        return false;
    };
    console.log('写入成功');
});

// 4. fs.appendFile 追加文件内容
// 如果文件不存在，创建并写入， 如果存在则追加
// 可以用来记录日志
fs.appendFile('2.md', 'test\n', err => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('追加文件成功');
});

// 5.fs.readFile 读取文件内容
// 默认输出的是buffer类型，可以用toString方法转换成string类型
fs.readFile('1.md', (err, data) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log(data.toString());
});

// 6. fs.readdir 读取目录
// 只会读取到第一层的文件和目录
fs.readdir('hello', (err,files) => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('???', files);
});

// 7. fs.rename 修改文件或者目录的名称
// 第一个参数必须是一个存在的目录或者文件
// 第二个参数如果文件或者目录不存在。会创建并命名
// 下面这个相当于剪切操作
fs.rename('3.md', 'hello/3.md', err => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('名称修改成功');
});

// 8. fs.rmdir 删除目录
// 被删除的目录里面不能有文件
fs.rmdir('hello/test', err => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('删除目录成功');
});

// 9. fs.unlink 删除文件
fs.unlink('hello.js', err => {
    if(err) {
        console.log(err);
        return false;
    }
    console.log('删除文件成功');
});