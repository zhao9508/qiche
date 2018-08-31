//类，mongoose使用的类，管理员类
var mongoose = require("mongoose");
var crypto = require("crypto");

//创建schema
var adminSchema = mongoose.Schema({
    "username" : String,
    "password" : String
});
//静态方法，通过用户名查询
adminSchema.statics.findByUsername = function(username,callback){
    this.find({"username":username},function(err,results){
        //向上层返回
        callback(err,results);
    });
};

//更改管理员密码
adminSchema.statics.changepassword = function(user,pw,callback){
    this.find({"username" : user},function(err,results){
        if(err){
            callback("服务器错误！请检查输入的内容！");
            return;
        }
        if(results.length == 0){
            //-1表示你要更改的学生学号，我没有找到
            callback("没有找到这个学号");
        }else{
            theadmin  = results[0];
            var sha256 = crypto.createHash("sha256");
            //加密字符串，digest表示进一步处理为hex十六进制
            theadmin.password = sha256.update(pw).digest("hex");
            theadmin.save();
            callback("成功修改！");
        }
    });
};

//创建模型
var Admin = mongoose.model("admin",adminSchema);

//整个模块向外暴露一个东西
module.exports = Admin;