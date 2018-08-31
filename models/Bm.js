//类，mongoose使用的类，管理员类
var mongoose = require("mongoose");

//这个模型返回一个构造函数
var bmSchema = mongoose.Schema({
    "cid" : Number,
    "name" : String,
    "zj" : Number,
    "zt" : String,
    "sc" : Number,
    "gui":Number,
    "je" : Number,
    "people" : String,
    "pay" : Number,
    "shu" : Number,
    "names" : String
});

//静态方法：增加学生
bmSchema.statics.add = function(json,callback){
    this.create(json,function(err,r){
        callback(err,r);
    });
};

//静态方法：得到全部课程
bmSchema.statics.getAll = function(callback){
    this.find({}).sort({"cid":1}).exec(function(err,results){
        for (var i = 0 ;i<results.length;i++){
            if(results[i].zt == "未租出"){
                results[i].shu = 7;
                results[i].save();
                // console.log(1)
            }else if(results[i].zt == "已租出"){
                results[i].shu = 8;
                results[i].save();
            }
        }
        callback(results);
    });
};

//静态方法：修改学生。接受一个新学生的JSON，覆盖原学生，_id不更改
bmSchema.statics.change = function(newJSON){
    this.find({"_id" : newJSON["_id"]},function(err,results){
        results[0].name = newJSON.name;
        results[0].zj = newJSON.zj;
        results[0].zt = newJSON.zt;
        results[0].save();
    })
};
bmSchema.statics.getAllpeople = function(callback){
    this.find({}).sort({"cid":1}).exec(function(err,results){
        // console.log(results);
        callback(results);
    });
};
//静态方法：删除学生，接受一个_cid数组为参数，删除这个数组里面的所有项
bmSchema.statics.delete = function(arr,callback){
    var _arr = [];
    arr.forEach(function(item){
        _arr.push({"_id" : item});
    });

    //删除_id为这个，或者那个的。所以用$or引导！
    this.remove({$or : _arr},function(err,r){
        callback(err,r.n);
    });
};
bmSchema.statics.zuchu = function(arr,sc,zj,je,select,pay,callback){
    // console.log(select);
    var _arr = [];
    arr.forEach(function(item){
        // console.log(item);
        _arr.push({"_id" : item});
    });
    // console.log(_arr);
    //删除_id为这个，或者那个的。所以用$or引导！
    this.update({$or : _arr},{$set:{sc:sc,zj:zj,je:je,people:select,pay:pay,zt:"已租出"}},function(err,r){
        callback(err,r.n);
    });
};

bmSchema.statics.guihuan = function(arr,callback){
    // console.log(select);
    var _arr = [];
    // console.log(arr);
    arr.forEach(function(item){
        // console.log(item);
        _arr.push({"_id" : item});
    });
    // console.log(_arr);
    //删除_id为这个，或者那个的。所以用$or引导！
    this.update({$or : _arr},{$set:{gui:1,zt:"未租出"}},function(err,r){
        callback(err,r.n);
    });
};

//根据schema创建模型！
var Bm = mongoose.model("bm",bmSchema);

//暴露！
module.exports = Bm;