const database = require("../config/mysql.config")
const getList = (req,res)=>{
    let sql = 'SELECT * FROM student';
    database.query(sql,(err,result)=>{
        if(!err){
            res.json({
                title : "get list data from sql",
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
const getListById = (req,res)=>{
 //   `student_id`, `firstname`, `lastname`, `gender`,
//   `tel`, `email`, `description`, `create_at`, `status`
    // let params = req.params;
        // let sql = "SELECT * FROM student WHERE student_id = ?";
        // database.query(sql,[req.params.id],(err,result)=>{
        //     if(!err){
        //         res.json({
        //             title : "get student by id successfully ",
        //             list : result
        //         })
        //     }else{
        //         res.json({
        //             error : true,
        //             message : err
        //         })
        //     }
        // })
        var params = req.params;
        if(params != null && params.id){
            sql = "SELECT * FROM student WHERE student_id = ?";
            database.query(sql,[params.id],(err,result,field)=>{
                if(!err){
                    res.json({
                        list : result,
                        field : field
                        
                    })
                }else{
                    res.json({
                        error : true,
                        message : err
                    })
                }
            })
        }else{
            res.json({
                error : true,
                message : "Param id require!"
            })
        }
    
}
const createList = (req,res)=>{
  const body = req.body;
  if(body){
    const {
        firstname,lastname,gender,tel,email,description,create_at,status
    } = body;
    var message = {};
    if(firstname == null || firstname == ""){
        message.firstname = "param first name require"
    }else if(lastname == null || lastname == ""){
        message.lastname = "param last name require"
    }
    if(Object.keys(message).length != 0){
        res.json({
            error : true,
            message: message
        })
    }else{
        let sql = "INSERT INTO student (firstname,lastname,gender,tel,email,description,create_at,status) VALUE(?,?,?,?,?,?,?,?)"
        database.query(sql,[firstname,lastname,gender,tel,email,description,create_at,status],
            (err,result)=>{
                if(!err){
                    res.json({
                        message : "Insert successfully"
                    })
                }else{
                    res.json({
                        error : true,
                        message :err
                    })
                }
            })
       }
   }
}
const updateList = (req,res)=>{
    //   `student_id`, `firstname`, `lastname`, `gender`,
//   `tel`, `email`, `description`, `create_at`, `status`
   
    const body = req.body;
    if(body){
        const {
            student_id,
            firstname,
            lastname,
            gender,
            tel,
            email,
            description
        } = body;
        var message = {}
        if(student_id == null || student_id == ""){
            message.student_id = "Param teacher id require";
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
            var sql = "UPDATE student SET firstname=?, lastname=?,gender = ?,tel=?, email=?, description=? WHERE student_id = ?"
            database.query(sql,[firstname,lastname,gender,tel,email,description,student_id],(err,result,field)=>{
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
const removeList = (req,res)=>{
    var body = req.body;
    if(body){
        if(body.student_id != null && body.student_id != ""){
            let sql = "DELETE FROM student WHERE student_id=?";
            database.query(sql,[body.student_id],(err,result,field)=>{
                if(!err){
                    res.json({
                        message : "deleted successfully",
                        field : field
                    })
                }else{
                    res.json({
                        error :true,
                        message : err
                    })
                }
            })
        }else{
            res.json({
                error :true,
                message : "student id require"
            })
        }
    }else{
        res.json({
            error : true,
            message : "student id require"
        })
    }
}
module.exports ={
    getList,
    getListById,
    createList,
    updateList,
    removeList
}