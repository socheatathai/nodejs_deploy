const { json } = require("body-parser")
const database = require("../config/mysql.config")


const getList = (req,res)=>{
    database.query('SELECT * FROM `teacher`;',(err,result,field)=>{
        if(err){
            res.json({
                title : "get list teacher require",
                error : err,
            })
        }else{
            res.json({
                title : "get list teacher successfully",
                list : result,
                field : field // field database
            })
        }
    })
}
const getListByID = (req,res)=>{
   let sql = 'SELECT * FROM teacher WHERE teacher_id = ?';
  //  [req.params.id] get data from params
    database.query(sql,[req.params.id],(err,result,field)=>{
        if(err){
            res.json({
                title : "get list by id require",
                error : err
            })
        }else{
            res.json({
                title : "get list by id successfully",
                list : result,
                field : field
            })
        }
    })
   

}
const createList = (req,res)=>{
    var message = {};
    var body = req.body;
    //`teacher_id`, `firstname`, `lastname`,
    // `gender`, `tel`, `email`, `description`, `create_at`
    const { 
        teacher_id,firstname,lastname,gender,tel,email,description,create_at
    } = body;
        if(teacher_id == null || teacher_id == ""){
            message = "teacher id require"
        }else if(firstname == null || firstname == ""){
            message = "teacher first name require"
        }else if (lastname == null || lastname == ""){
            message = "teacher last name require"
        }else if(gender == null || gender == ""){
            message = "teacher gender require"
        }else if(tel == null || tel == ""){
            message = "teacher telephone require"
        }else if(email == null || email == ""){
            message = "teacher email require"
        }else if(description == null || description ==""){
            message = "description require"
        }else if (create_at == null || create_at == ""){
            message = "create at require"
        }
    if(message == ""){
        res,json({
            error : true,
            message : message
        })
    }else{
        var sql = 'INSERT INTO teacher (`firstname`, `lastname`,`gender`, `tel`, `email`, `description`, `create_at`) VALUE (?,?,?,?,?,?,?)';
        database.query(sql,[firstname,lastname,gender,tel,email,description,create_at,teacher_id],
            (err,result,field)=>{
               if(err){
                res.json({
                    title : "error true",
                    error : true,
                    message : err
                })
               }else{
                res.json({
                    title : "data from database",
                    message : "insert success",
                    list : result,
                    field : field
                })
               }
            })
    }
}
const updateList = (req,res)=>{
   // const body = req.body;
     //`teacher_id`, `firstname`, `lastname`,
    // `gender`, `tel`, `email`, `description`, `create_at`
    const body = req.body;
    if(body){
        const {
            teacher_id,
            firstname,
            lastname,
            gender,
            tel,
            email,
            description
        } = body;
        var message = {}
        if(teacher_id == null || teacher_id == ""){
            message.teacher_id = "Param teacher id require";
        }
        if(firstname == null || firstname == ""){
            message.firstname = "Param first name require";
        }
        if(lastname == null || lastname == ""){
            message.lastname = "Param last name require";
        }
        if(Object.keys(message).length != 0){
            res.json({
                error : true, 
                message : message
            })
        }else{
            var sql = "UPDATE teacher SET firstname=?, lastname=?,gender = ?,tel=?, email=?, description=? WHERE teacher_id = ?"
            database.query(sql,[firstname,lastname,gender,tel,email,description,teacher_id],(err,result,field)=>{
                if(!err){
                    res.json({
                        message : "Update successfully!",
                        list : result,
                        field : field
                    })
                }else{
                    res.json({
                        error:true,
                        message : err
                    })
                }
            })
        }

    }
}
const deleteList = (req,res)=>{
      var body = req.body;
      if(body){
        if(body.teacher_id != null && body.teacher_id != ""){
            var sql = "DELETE FROM teacher WHERE teacher_id = ?";
            database.query(sql,[body.teacher_id],(err,result)=>{
                if(!err){
                    res.json({
                        message : "delete successfully",
                        list : result
                    })
                }else{
                    res.json({
                        error : true,
                        message : err
                    })
                }
            })
        }else{
            json({
                error : true,
                message : "teacher id require"
            })
        }
      }else{
        res.json({
            error : true,
            message : "teacher id require"
        })
      }
}
module.exports = {
    getList,
    getListByID,
    createList,
    updateList,
    deleteList
}