const db = require("../config/mysql.config")
const {isEmpty} = require("../config/helper")

const getAll = (req,res) => {
    var sql = "SELECT * FROM student_classroom";
    db.query(sql,(err,result)=>{
        if(!err){
            res.json({
                list : result
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
}

const create = (req,res) => {
    var {
        classroom_id // int
        ,student_id // int
        ,course_price // float 100$
        ,discount // float 50
        ,discount_type // DISCOUNT_PERCENT(10%) (C++ 40$ 50% 20$), DISCOUNT_PRICE(10$) (C++ 40$ 30$)
        ,price // float
        ,payement_price // float
        ,payment_method // varchar
        ,descritpion // varchar
    } = req.body;
    var message = {}
    if(isEmpty(classroom_id)){
        message.classroom_id = "param classroom_id required!"
    }else if(isEmpty(student_id)){
        message.student_id = "param student_id required!"
    }else if(isEmpty(course_price)){
        message.course_price = "param course_price required!"
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
        return
    }
    if(discount > 0){
        if(discount_type == "DISCOUNT_PERCENT"){
            price = price - (course_price * discount/100)
            // price = 100- (100*50/100) = 50$
        }else if(discount_type == "DISCOUNT_PRICE"){
            price = price - discount
            // price = 100- 15 = 85$
        }
    }
    var sql = " INSERT INTO student_classroom "+
    "(classroom_id"+
    ",student_id"+
    ",course_price"+ 
    ",discount"+
    ",discount_type"+
    ",price"+
    ",payement_price"+ 
    ",payment_method"+
    ",descritpion) "+
    " VALUES (?,?,?,?,?,?,?,?,?) ";
    db.query(sql,[classroom_id,student_id,course_price,discount,discount_type,price,payement_price,payment_method,descritpion],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err
            })
        }else{
            res.json({
                message : "Insert success!"
            })
        }
    })
}

const edit = (req,res) => {
    var {
        student_classroom_id //int
        ,classroom_id // int
        ,student_id // int
        ,course_price // float 100$
        ,discount // float 50
        ,discount_type // DISCOUNT_PERCENT(10%) (C++ 40$ 50% 20$), DISCOUNT_PRICE(10$) (C++ 40$ 30$)
        ,price // float
        ,payement_price // float
        ,payment_method // varchar
        ,descritpion // varchar
    } = req.body;
    var message = {}
    if(isEmpty(classroom_id)){
        message = "param classroom_id required!"
    }else if(isEmpty(student_id)){
        message = "param student_id required!"
    }else if(isEmpty(course_price)){
        message = "param course_price required!"
    }
    if(discount > 0){
        if(discount_type == "DISCOUNT_PERCENT"){
            price = price - (course_price * discount/100)
            // price = 100- (100*50/100) = 50$
        }else if(discount_type == "DISCOUNT_PRICE"){
            price = price - discount
            // price = 100- 15 = 85$
        }
    }
    var sql = " UPDATE student_classroom "+
    " SET classroom_id = ? "+
    ",student_id = ?"+
    ",course_price = ? "+ 
    ",discount = ?"+
    ",discount_type=?"+
    ",price = ?"+
    ",payement_price = ?"+ 
    ",payment_method = ?"+
    ",descritpion = ? "+
    " WHERE student_classroom_id = ? ";
    db.query(sql,[classroom_id,student_id,course_price,discount,discount_type,price,payement_price,payment_method,descritpion,student_classroom_id],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err
            })
        }else{
            res.json({
                message : "Update success!"
            })
        }
    })
}

const remove = (req,res) => {
    var {
        student_classroom_id
    } = req.body;
    db.query("DELETE FROM student_classroom WHERE student_classroom_id = ?",[student_classroom_id],(err,result)=>{
        if(err){
            res.json({
                error : true,
                message : err
            })
        }else{
            res.json({
                message : "Remove success"
            })
        }
    })
}

module.exports = {
    getAll,
    create,
    edit,
    remove
}