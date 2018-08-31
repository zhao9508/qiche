//引用模块
var express = require("express");
var session = require('express-session');
var mongoose = require("mongoose");
//路由
var common_router = require("./router/common-router.js");
var admin_router = require("./router/admin-router.js");

var open = require("open");
//创建APP
var app = express();
//mongoose在链接数据库，此时这两条语句要写在app.js中而不是每个模块中
//因为mongoose底层是在帮我们监听是不是在连接数据。在需要使用mongoose实例的地方，请重新require它。而不要connect它！
mongoose.connect('mongodb://localhost:27017/qiche');

//设置默认模板引擎
app.set("view engine","ejs");
app.set("views","views");

//设置session
//使用一个中间件，就是session中间件。这个中间件必须排在第一个
app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'kaola', //加密字符串，我们下发的随机乱码都是依靠这个字符串加密的
    resave: false,
    saveUninitialized: true
}));

//路由清单
app.get ("/"                             ,common_router.showIndex);
app.post("/checklogin"                   ,common_router.checklogin);
app.get ("/admin"                        ,admin_router.showAdmin);
app.post("/admin/changepassword"         ,admin_router.changepassword);

app.get ("/admin/course"                 ,admin_router.showAdminCourse);
app.post("/admin/zuche/add"              ,admin_router.addCourse);
app.get ("/admin/zuche/all"              ,admin_router.getallcourse);
app.post("/admin/zuche/change"           ,admin_router.changecourse);
app.post("/admin/zuche/delete"           ,admin_router.deletecourse);

app.get ("/admin/bm"                     ,admin_router.showAdminBm);
app.post("/admin/bm/add"                 ,admin_router.addbm);
app.get("/admin/bm/all"                  ,admin_router.getallbm);
app.post("/admin/bm/change"              ,admin_router.changebm);
app.post("/admin/bm/delete"              ,admin_router.deletebm);
app.get ("/admin/1"                      ,admin_router.showAdminAd);
app.get ("/admin/2"                      ,admin_router.showAdmindz);
app.get ("/admin/3"                      ,admin_router.showAdminch);
app.get ("/admin/4"                      ,admin_router.showAdmindf);
app.get ("/admin/5"                      ,admin_router.showAdminyq);
app.get ("/admin/6"                      ,admin_router.showAdmin0);
app.get ("/admin/7"                      ,admin_router.showAdmin1);
app.get ("/admin/8"                      ,admin_router.showAdmin2);
app.get ("/admin/leibie"                 ,admin_router.showAdminLeibie);
app.post("/admin/leibie/add"             ,admin_router.addLeibie);           //增加新课程
app.get ("/admin/leibie/all"             ,admin_router.getallLeibie);        //Ajax的接口，得到所有课程
app.post("/admin/leibie/change"          ,admin_router.changeLeibie);        //Ajax的接口，改变课程
app.post("/admin/leibie/delete"          ,admin_router.deleteLeibie);        //Ajax的接口，删除课程

app.get ("/admin/qiche"                  ,admin_router.showAdminQiche);
app.post("/admin/qiche/add"              ,admin_router.addQiche);           //增加新课程
app.get ("/admin/qiche/all"              ,admin_router.getallQiche);        //Ajax的接口，得到所有课程
app.post("/admin/qiche/change"           ,admin_router.changeQiche);        //Ajax的接口，改变课程
app.post("/admin/qiche/delete"           ,admin_router.deleteQiche);        //Ajax的接口，删除课程

app.get ("/admin/guihuan/"               ,admin_router.showAdminguihuan);
app.get ("/admin/tongji/"                ,admin_router.showAdmintongji);
app.post("/qdzc"                         ,admin_router.qdzc);
app.post("/qdzcc"                        ,admin_router.qdzcc);
app.post("/admin/collection/add"         ,admin_router.addcollection);
app.get("/admin/collection/all"          ,admin_router.getallcollection);
app.use ("/public"                       ,express.static("public"));
app.get ("/*"                            ,common_router.show404);

//监听
app.listen(3005);