/*
    封装一个类似express的路由
*/

const myexpress = require('./myexpress');

const app = new myexpress();

app.get('/', (req, res) => {
    res.send('get/');
});
app.get('/login', (req, res) => {
    res.render('login', {}, (err, data) => {
        res.send(data);
    });
});
app.post('/dologin', (req, res) => {
    res.render('dologin', {name: 'testUser'}, (err, html) => {
        res.send(html);
    })
});

app.listen(3000);
