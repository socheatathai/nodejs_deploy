const database = require("../config/mysql.config");
const {isEmpty} = require("../config/helper")
const getList = (req,res)=>{
    var body = req.body;
    let sqlWhere = ""
    message= "";
    if(body){

        // get course by id category_id
        var {category_id,text_search,status} = body;
        if(!isEmpty(category_id)){
             sqlWhere = " WHERE ca.category_id = " + category_id;
        }
        if(!isEmpty(text_search)){
            sqlWhere += " AND co.name LIKE '%"+text_search+"%' ";
        }
    }
    let sql = " SELECT "+
              "co.course_id,"+
              "co.name,"+
              "co.full_price,"+
              "DATE_FORMAT(co.create_at,'%d/%m/%Y %h : %i %p') as create_at,"+
              "co.category_id,"+
              "ca.name AS category_name "+  // if duplicate row (ca.name AS category_name )
              "FROM course as co "+
              "INNER JOIN category as ca ON co.category_id = ca.category_id"+sqlWhere;
    database.query(sql,(err,result)=>{
        if(!res.err){
            res.json({
                list : result
            })
        }else{
            res.json({
                err : true,
                message : err
            })
        }
    })
}
const getListByID = (req,res)=>{
    var id = req.params.id;
    var sql = "SELECT * FROM course WHERE course_id = ?";
    database.query(sql,[id],(err,result)=>{
        if(!res.err){
             res.json({
                list : result
             })
        }else{
            res.json({
                err: true,
                message : err
            })
        }
    })
}
const createList = (req,res)=>{
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.category_id)){
            message.course_id = "param category_id require"
        }
        if(isEmpty(body.name)){
            message.name = "param name require"
        }
        if(Object.keys(message).length > 0){
            res.json({
                err : true,
                message : message
            })
        }else{
            const {category_id,name,full_price,description,status}=body;
            // INSERT INTO `course`( `category_id`, `name`, `full_price`, `description`, `status`)
            // VALUES (2,'app',100,'testing',0,'','')
            var sql ="INSERT INTO `course`( `category_id`, `name`, `full_price`, `description`, `status`) VALUES(?,?,?,?,?)";
            database.query(sql,[category_id,name,full_price,description,status],
                (err,result)=>{
                    if(!err){
                        res.json({
                            message : "insert successfully"
                        })
                    }else{
                        res.json({
                            error : true,
                            message : err
                        })
                    }
                })
        }
    }else{
        res.json({
            error : "no body",
            message : err
        })
    }
}
const updateList = (req,res)=>{
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.category_id)){
            message.course_id = " param category_id require "
        }
        if(isEmpty(body.course_id)){
            message.course_id = " param course_id require "
        }
        if(isEmpty(body.name)){
            message.name = " param name require "
        }
        if (Object.keys(message).length > 0) {
            res.json({
                err: true,
                message: message
            })
        } else {
            const {
                course_id,category_id,name,full_price,description,status
            } = req.body;
            // `course_id`, `category_id`, `name`, `full_price`, `description`, `status`, `update_at`
            var sql = "UPDATE course SET `category_id` = ? , `name` = ?, `full_price` = ? , `description` = ?, `status` = ? , `update_at` = NOW() WHERE course_id = ? ";
            database.query(sql,[category_id,name,full_price,description,status,course_id],(err,result)=>{
                if(!err){
                    res.json({
                        message : "Update Successfully"
                    })
                }else{
                    res.json({
                        error : true,
                        message : err
                    })
                }
            })
        }
    } else {
        res.json({
            error : "no body",
            message : err
        })
    }
}
const removeList = (req,res)=>{
    var message = {};
    let body = req.body;
    if(body){
        if(isEmpty(body.course_id)){
            message.course_id = "param course id require"
        }
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        var sql = "DELETE FROM course WHERE course_id = ?";
        database.query(sql,[body.course_id],(err,result)=>{
            if(!err){
                if(result.affectedRow != 0){
                    res.json({
                        message : "remove successfully"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message : err
                })
            }
        })
    }
}
module.exports = {
    getList,
    getListByID,
    createList,
    updateList,
    removeList
}