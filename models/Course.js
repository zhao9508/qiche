//类，mongoose使用的类，管理员类
var mongoose = require("mongoose");

//这个模型返回一个构造函数
var courseSchema = mongoose.Schema({
    "cid" : Number,
    "name" : String,
    "tel" : Number,
    "addr" : String,
    "num1" : Number,
    "num2" : String
});

//静态方法：增加学生
courseSchema.statics.add = function(json,callback){
    this.create(json,function(err,r){
        callback(err,r);
    });
};
//静态方法：得到全部课程
courseSchema.statics.getAll = function(callback){
    this.find({}).sort({"cid":1}).exec(function(err,results){
        // console.log(results);
        callback(results);
    });
};
//静态方法：修改学生。接受一个新学生的JSON，覆盖原学生，_id不更改
courseSchema.statics.change = function(newJSON){
    this.find({"_id" : newJSON["_id"]},function(err,results){
        results[0].name = newJSON.name;
        results[0].tel = newJSON.tel;
        results[0].addr = newJSON.addr;
        results[0].num1 = newJSON.num1;
        results[0].num2 = newJSON.num2;
        results[0].save();
    })
};

//静态方法：删除学生，接受一个_cid数组为参数，删除这个数组里面的所有项
courseSchema.statics.delete = function(arr,callback){
    var _arr = [];
    arr.forEach(function(item){
        _arr.push({"_id" : item});
    });

    //删除_id为这个，或者那个的。所以用$or引导！
    this.remove({$or : _arr},function(err,r){
        callback(err,r.n);
    });
};

//查询方法
courseSchema.statics.search = function(word,callback){
    console.log("我是Course类，我收到了模糊查询次" + word);
    this.find(
        {
            "$or" : [
                {"detail" : new RegExp(word)},
                {"name" : new RegExp(word)},
                {"teacher" : new RegExp(word)}
            ]
        }
    ).sort({"cid":1}).exec(
        function(err,results){
            callback(results);
        }
    );
};

courseSchema.statics.getAllpeople = function(callback){
    this.find({}).sort({"cid":1}).exec(function(err,results){
        // console.log(results);
        callback(results);
    });
};

//根据schema创建模型！
var Course = mongoose.model("Course",courseSchema);

//暴露！
module.exports = Course;