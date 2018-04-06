const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html, charset='utf-8"});

    if(req.url !== '/favicon.ico') {
        // 第一个参数表示要解析的url，第二个参数表示是否把get传值解析成对象的形式
        const result = url.parse(req.url, true);
        const { pathname, query } = result;
        res.write(`pathname: ${pathname} `);
        res.write(`name: ${query.name} age: ${query.age}`);
    }
    res.end();
}).listen(8001);