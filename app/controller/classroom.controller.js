const database = require("../config/mysql.config");
const {isEmpty} = require("../config/helper")
const getList = (req,res)=>{
    database.query("SELECT * FROM classroom ",(err,result)=>{
        if(!err){
            res.json({
                title :"class room ",
                list : result
            })
        }else{
            res.json({
                error : true,
                message : message
            })
        }
    })
}
const getListByID = (req,res)=>{
    var sql = "SELECT * FROM classroom WHERE classroom_id = ?";
    database.query(sql,[req.params.id],
        (err,result)=>{
            if(!err){
                res.json({
                    list : result
                })

            }else{
                res.json({
                    error : "get list require  ",
                    err : err
                })
            }
        }
    )
    
    
}
const createList = (req,res)=>{
    var message = {};
    var body = req.body;
    const {classroom_id,course_id,teacher_id,course_price,course_gendertion} = req.body;
    if(body){
        if(isEmpty(teacher_id)){
            message.teacher_id = "teacher_id require"
        }else if(isEmpty(course_id)){
            message.course_id = "course id require"
        }else if(isEmpty(course_price)){
            message.course_price = "course_price require "
        }else if(isEmpty(course_gendertion)){
            message.course_gendertion = "course_gendertion require"
        }
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        
        var sql = "INSERT INTO classroom (course_id,teacher_id,course_price,course_gendertion) VALUES (?,?,?,?)"
        database.query(sql,[course_id,teacher_id,course_price,course_gendertion],
            (err,result,field)=>{
                if(!err){
                    if(result.affectedRow != 0){
                        res.json({
                            message : "insert successfully",
                            list : result,
                            field : field
                        })
                    }
                }else{
                    res.json({
                        err : err,
                        error : "error"
                    })

                }
            })
    }
}
const updateList = (req,res)=>{
// `classroom_id`, `course_id`, `teacher_id`,
// `course_price`, `course_gendertion`, 
    var message = "";
    var body = req.body;
    const {course_id,teacher_id,course_price,course_gendertion,classroom_id,status} = req.body;
    if(body){
        if(isEmpty(course_id)){
            message.course_id = "course_id required"
        }else if(isEmpty(teacher_id)){
            message.teacher_id = "teacher_id required"
        }else if(isEmpty(course_price)){
            message.course_price = "course_price required"
        }else if(isEmpty(course_gendertion)){
            message.course_gendertion = "course_gendertion required"
        }
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        var sql = "UPDATE classroom SET course_id = ? , teacher_id = ? , course_price = ? , course_gendertion = ? , status = ? WHERE classroom_id = ?";
        database.query(sql,[course_id,teacher_id,course_price,course_gendertion,classroom_id,status],
            (err,result)=>{
                if(!err){
                    if(result.affectedRow != 0){
                        res.json({
                            message : "update successfully",
                            list : result
                        })
                    }
                }else{
                    res.json({
                        err : true,
                        error : err
                    })
                }
            })
    }
}
const removeList = (req,res)=>{
    var message = {};
  var body = req.body;
  if (body) {
    if (isEmpty(body.classroom_id)) {
      message.classroom_id = 'param classroom_id require!';
    }
  }
  if (Object.keys(message).length > 0) {
    res.json({
      error: true,
      message: message,
    });
  } else {
    let sql = ' DELETE FROM classroom WHERE classroom_id = ? ';
    database.query(sql, [body.classroom_id], (err, rows) => {
      if (err) {
        res.json({ error: err });
      } else {
        if (rows.affectedRows > 0) {
          res.json({ message: 'Delete successfully!' });
        } else {
          res.json({ error: 'Invalid classroom_id' });
        }
        
      }
    });
  }
}
module.exports = {
    getList,
    getListByID,
    createList,
    updateList,
    removeList
}