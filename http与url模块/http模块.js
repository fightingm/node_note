const http = require('http');

http.createServer((req, res) => {
        console.log('test', req.url);
        res.writeHead(200, {"Content-Type": "text/html, charset='utf-8'"});
        res.write('hello world');
        res.end();
}).listen(8001);