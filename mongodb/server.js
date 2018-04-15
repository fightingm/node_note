/*
    node连接mongodb
*/
const myexpress = require('./myexpress');
const { MongoClient } = require('mongodb');
// 数据库地址
const dburl = "mongodb://localhost:27017/";

const app = new myexpress();

//创建一个test数据库
MongoClient.connect(dburl+'test', function(err, db) {
    if (err) throw err;
    console.log("数据库已创建!");
    const dbase = db.db("test");
    dbase.createCollection('user', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});

// 增加一条数据
app.get('/add', (req, res) => {
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        // 获取到test数据库
        const dbo = db.db("test");
        const users = [
            {"name": "dxx", "age": 22},
            {"name": "xkm", "age": 22}
        ];
        dbo.collection("user").insertMany(users, (err, result) => {
            if(err) {
                console.log("数据插入失败");
                return;
            }
            res.send('添加成功');
            db.close();
        });
    });
});
// 删除
app.get('/del', (req, res) => {
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        // 获取到test数据库
        const dbo = db.db("test");
        const oneUser = {"name": "xkm"}
        dbo.collection("user").deleteOne(oneUser, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            res.send('删除成功');
            db.close();
        });
    });
});
// 修改
app.get('/update', (req, res) => {
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        // 获取到test数据库
        const dbo = db.db("test");
        const oneUser = {"name": "xkm"};
        const updateObj = {$set: {"age": 23}};
        dbo.collection("user").updateOne(oneUser, updateObj, (err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            res.send('修改成功');
            db.close();
        });
    });
});
// 查询
app.get('/', (req, res) => {
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        // 获取到test数据库
        const dbo = db.db("test");
        dbo.collection("user").find().toArray((err, result) => {
            if(err) {
                console.log(err);
                return;
            }
            res.render('users', {users: result}, (error, html) => {
                res.send(html);
            });
            db.close();
        })
    });
});

app.listen(8000);