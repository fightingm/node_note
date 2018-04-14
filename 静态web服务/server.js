/*
创建一个web服务，包含以下功能
1.输入不同的路由渲染不同的页面
2.当路由匹配不到的时候渲染404页面
3.针对不同的文件类型返回不同的Content-type
*/

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer(async (req, res) => {
    const reqUrl = req.url;
    if(reqUrl !== '/favicon.ico') {
        const urlParse = url.parse(reqUrl);
        let pathName = urlParse.pathname;
        if(pathName === '/') pathName = '/index.html';
        const extName = path.extname(pathName);
        // 读取对应的页面
        try {
            const file = await loadFile(`.${pathName}`);
            const contentType = await loadContentType(extName);
            res.writeHead(200, {"Content-Type": `${contentType}; charset=utf-8`});
            res.write(file);
            res.end();
        } catch (error) {
            console.log(error);
            const file = await loadFile(`./404.html`);
            res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
            res.write(file);
            res.end();
        }
    }else {
        res.end();
    }
}).listen(8001);

// 加载文件
function loadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(data);
        })
    })
}
// 加载contentType
function loadContentType(ext) {
    return new Promise((resolve, reject) => {
        fs.readFile('./contentType.json', (err, data) => {
            if(err) {
                reject(err);
            }
            resolve(JSON.parse(data)[ext]);
        })
    })
}