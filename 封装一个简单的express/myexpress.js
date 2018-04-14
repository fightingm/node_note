

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

module.exports = class myexpress{
    constructor() {
        this.init();
        // 用来存放get请求
        this._get = {};
        // 用来存放post请求
        this._post = {};
        // 表示模板所在文件夹
        this.views = './views';
        // 表示静态目录所在的文件夹
        this.staticPath = './public';
    }
    init() {
        this.server = http.createServer(async (req, res) => {
            const parseUrl = url.parse(req.url, true);
            const { pathname } = parseUrl;
            const method = req.method.toLowerCase();
            // 获取到对应路由的回调函数
            const cb = this[`_${method}`][pathname];
            // 给res增加send和render方法
            this.setRes(res);
            // 如果对应路由有处理函数，就直接处理
            if(cb) {
                cb(req, res);
            }else {
            // 如果没有对应的路由处理，就去静态资源目录里面找
                const extName = path.extname(pathname);
                try {
                    const file = await this.loadStaticFile(pathname);
                    const fileType = await this.loadContentType(extName);
                    res.writeHead(200, {"Content-Type": `${fileType}; charset=utf-8`});
                    res.end(file);
                } catch (err) {
                    res.writeHead(404);
                    res.end("404");
                }
            }
        });
    }
    // 读取静态资源文件
    loadStaticFile(path) {
        const {staticPath} = this;
        return new Promise((resolve, reject) => {
            fs.readFile(`${staticPath}${path}`, (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(data);
            })
        })
    }
    // 读取文件类型
    loadContentType(ext) {
        return new Promise((resolve, reject) => {
            fs.readFile('./contentType.json', (err, data) => {
                if(err) {
                    reject(err);
                }
                resolve(JSON.parse(data)[ext]);
            })
        })
    }
    // 设置res
    setRes(res) {
        const {views} = this;
        res.send = function(data) {
            res.writeHead(200, {"Content-Type": 'text/html; charset=utf-8'});
            res.end(data);
        }
        res.render = function(path, data, callback) {
            fs.readFile(`${views}/${path}.hbs`, (err, html) => {
               const renderData = handlebars.compile(html.toString())(data);
               callback(err, renderData);
            });
        }
    }
    // 存放get路由
    get(path, cb) {
        this._get[path] = cb;
    }
    // 存放post路由
    post(path, cb) {
        this._post[path] = cb;
    }
    // 设置监听端口
    listen(port) {
        this.server.listen(port)
    }
}
