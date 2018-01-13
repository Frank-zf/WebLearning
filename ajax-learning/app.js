/**
 * localhost:3000/staff //员工查询，创建，修改页面
 */
var express = require('express');//加载express模块
var app = express();//启动一个web服务器，将实例赋予给app变量
var port = process.env.PORT || 3000;//从命令行中设置port口，默认是3000
app.listen(port);//监听端口

var mongoose = require('mongoose');//引入mongoose模块，来连接本地数据库
var dbUrl = "mongodb://localhost:12345/staff";
mongoose.Promise = global.Promise;//Promise化mongodb的回调操作
mongoose.connect(dbUrl, { useMongoClient: true });

var path = require('path');//处理样式、脚本文件等路径等对象
app.use(express.static(path.join(__dirname, 'public')))//静态资源的获取，__dirname当前文件目录

app.set('views', './app/views/pages');//设置视图的根目录
app.set('view engine', 'jade');//设置默认的模版引擎

var bodyParser = require('body-parser');//解析请求的消息体
app.use(bodyParser.json());//返回一个只解析json的中间件，最后保存的数据都放在req.body对象上
app.use(bodyParser.urlencoded({ extended: true }));//返回的对象为任意类型

require('./config/routes')(app);//引用路由文件

/**
 * proxy代理
 */
var proxy = require('http-proxy-middleware');//引入代理中间件
var dataProxy = proxy('/data', { target: "http://www.imooc.com/", changeOrigin: true });//将服务器代理到http://www.imooc.com上，本地服务器为localhost:3000
app.use('/data/*', dataProxy);//data子目录下的都是用代理


console.log('Sever started successfully on port ' + port);