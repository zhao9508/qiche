var path = require("path");
var formidable = require("formidable");
var Admin = require("../models/Admin.js");
var Course = require("../models/Course.js");
var Collection = require("../models/Collection.js");
var Bm = require("../models/Bm.js");
var crypto = require("crypto");
var fs = require("fs");
var url = require("url");

//管理员面板
exports.showAdmin = function(req,res){
    //使用这个页面需要登录！
    if(!(req.session.login && req.session.type == "admin")){
       res.send("本页面需要登录，请<a href=/>登录</a>");
       return;
    }
    res.sendFile(path.join(__dirname , "../views/admin.html"));
};

//更改管理员密码
exports.changepassword = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        // console.log(fields.user);
        // console.log(fields.pw);
        Admin.changepassword(fields.user, fields.pw,function(info){
            //将回调函数显示的信息，原封不动呈递给Ajax接口，会被jQuery alert出来。
            res.end(info);
        });
    });
};

//显示管理课程页面
exports.showAdminCourse = function(req,res){
    res.sendFile(path.join(__dirname , "../views/admin-course.html"));
};
exports.showAdminBm = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-bm",{
            "people" : arr
        })
    });
};
exports.showAdminAd = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-ad",{
            "people" : arr
        })
    });
};
exports.showAdmindz = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-dz",{
            "people" : arr
        })
    });
};
exports.showAdminch = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-ch",{
            "people" : arr
        })
    });
};
exports.showAdmindf = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-df",{
            "people" : arr
        })
    });
};
exports.showAdminyq = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-yq",{
            "people" : arr
        })
    });
};
exports.showAdmin0 = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-0",{
            "people" : arr
        })
    });
};
exports.showAdmin1 = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-1",{
            "people" : arr
        })
    });
};
exports.showAdmin2 = function(req,res){
    Course.getAllpeople(function(arr){
        res.render("admin-2",{
            "people" : arr
        })
    });
};
exports.showAdminguihuan = function(req,res){
    res.sendFile(path.join(__dirname , "../views/admin-guihuan.html"));
};
exports.showAdmintongji = function(req,res){
    res.sendFile(path.join(__dirname , "../views/admin-tongji.html"));
};

exports.showAdminQiche = function(req,res){
    res.sendFile(path.join(__dirname , "../views/admin-qiche.html"));
}
exports.showAdminLeibie = function(req,res){
    Bm.getAllpeople(function(arr){
        res.render("admin-leibie",{
            "people" : arr
        })
    });
};
//添加课程
exports.addCourse = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        // console.log(fields);
        Course.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
};

exports.addbm = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        // console.log(fields);
        Bm.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
};
exports.addcollection = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        // console.log(fields);
        Collection.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
};
//得到所有课程
exports.getallcourse = function(req,res){
    Course.getAll(function(results){
        res.json({"results" : results});
    })
};

exports.getallbm = function(req,res){
    Bm.getAll(function(results){
        res.json({"results" : results});
    })
};
exports.getallcollection = function(req,res){
    Collection.getAll(function(results){
        res.json({"results" : results});
    })
};
exports.qdzc = function(req,res){
    var form = new formidable.IncomingForm();
    //识别表单，用的是formidable插件
    form.parse(req, function(err, fields) {
        var needTozuchu = JSON.parse(fields.needTozuchu);
        var sc = fields.sc;
        var zj = fields.zj;
        var je = fields.je;
        var select = fields.select;
        var pay = fields.pay;
        Bm.zuchu(needTozuchu,sc,zj,je,select,pay,function(err,n){
            if(err){
                res.send("-1");
            }else{
                // console.log(n);
                res.send(n.toString());
            }
        });
    });
};

exports.qdzcc = function(req,res){
    var form = new formidable.IncomingForm();
    //识别表单，用的是formidable插件
    form.parse(req, function(err, fields) {
        var idArr = JSON.parse(fields.idArr);
        // console.log(idArr);
        Bm.guihuan(idArr,function(err,n){
            if(err){
                res.send("-1");
            }else{
                // console.log(n);
                res.send(n.toString());
            }
        });
    });
};

//更改课程
exports.changecourse = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        Course.change(fields,function(err,r){
            res.send("");
        });
    });
};

exports.changebm = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        Bm.change(fields,function(err,r){
            res.send("");
        });
    });
};

//删除课程
exports.deletecourse = function(req,res){
    //得到要删除的数组
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);

        //调用模块的方法
        Course.delete(needToDelete,function(err,n){
           if(err){
               res.send("-1");
           }else{
               res.send(n.toString());
           }
        });
    });
};

exports.deletebm = function(req,res){
    //得到要删除的数组
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);

        //调用模块的方法
        Bm.delete(needToDelete,function(err,n){
            if(err){
                res.send("-1");
            }else{
                res.send(n.toString());
            }
        });
    });
};

//添加课程
exports.addLeibie = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        // console.log(fields);
        Collection.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
}

//得到所有课程
exports.getallLeibie = function(req,res){
    leibie.getAll(function(results){
        res.json({"results" : results});
    })
}

//更改课程
exports.changeLeibie = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        leibie.change(fields,function(err,r){
            res.send("");
        });
    });
}

//删除课程
exports.deleteLeibie = function(req,res){
    //得到要删除的数组
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);

        //调用模块的方法
        leibie.delete(needToDelete,function(err,n){
            if(err){
                res.send("-1");
            }else{
                res.send(n.toString());
            }
        });
    });
}

//添加课程
exports.addQiche = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //保存！直接把fomidable拿到的表单JSON提交给数据库保存！不变形！
        console.log(fields);
        qiche.add(fields,function(err,r){
            if(err){
                res.send("提交失败！");
            }else{
                res.send("提交成功");
            }
        })
    });
}

//得到所有课程
exports.getallQiche = function(req,res){
    qiche.getAll(function(results){
        res.json({"results" : results});
    })
}

//更改课程
exports.changeQiche = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        qiche.change(fields,function(err,r){
            res.send("");
        });
    });
}

//删除课程
exports.deleteQiche = function(req,res){
    //得到要删除的数组
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields) {
        //HTTP请求的POST参数不能传数组，只能传递字符串。所以前台会把数组stringify
        //后台parse()
        var needToDelete = JSON.parse(fields.needToDelete);

        //调用模块的方法
        qiche.delete(needToDelete,function(err,n){
            if(err){
                res.send("-1");
            }else{
                res.send(n.toString());
            }
        });
    });
}