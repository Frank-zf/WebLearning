var express = require('express'); //加载express模块
var app = express(); //启动一个web服务器，将实例赋予给app变量
var port = process.env.PORT || 3111; //从命令行中设置port口，默认是3000
app.listen(port); //监听端口
console.log('Sever started successfully on port ' + port);

app.set('views', './views'); //设置视图的根目录
app.set('view engine', 'jade'); //设置默认的模版引擎
var path = require('path'); //处理样式、脚本文件等路径等对象
app.use(express.static(path.join(__dirname, 'public'))) //静态资源的获取，__dirname当前文件目录
/**
 * 解析请求的消息体
 */
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //返回一个只解析json的中间件，最后保存的数据都放在req.body对象上
app.use(bodyParser.urlencoded({
    extended: true
})); //返回的对象为任意类型


app.get('/', (req, res) => {
    res.render('aClient');
})
app.post('/login', (req, res) => {
    var user = JSON.parse(req.body.user);
    console.log(user.name);
    //设置cookie
    // res.cookie('user', {
    //     'name': user.name,
    //     'password': user.password
    // }, {
    //     maxAge: 6000
    // });
    res.cookie('user', '123', {
        maxAge: 6000
    });
    res.send("success")
})
