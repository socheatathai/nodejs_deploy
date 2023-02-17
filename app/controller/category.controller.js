const database = require("../config/mysql.config");
const isEmpty = require("../config/helper")
const getList = (req,res)=>{
   var sql ="SELECT *,DATE_FORMAT(create_at,'%d/%m/%Y') AS myDate FROM category";
   var category_id = null;
   // condition with parameter id
   if(req.params && req.params.id != null){
    sql += " WHERE category_id = ?";
    category_id = req.params.id;
   }
   database.query(sql,[category_id],(err,result)=>{
    if(!res.err){
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
const createList = (req,res)=>{
    // `category_id`, `name`, `parent`, `image`,
    //  `sort_order`, `status`, `create_at`, 
    //  `update_at`
    var message = "";
    var body = req.body;
    if(body){
        if(isEmpty)
        if(isEmpty(body.name)){
            message.name = "param name required"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error : true,
                message :message
            })
        }else{
            const {name,parent,image,sort_order,status} = req.body;
            var sql = "INSERT INTO category (name,parent,image,sort_order,status) VALUES (?,?,?,?,?)";
            database.query(sql,[name,parent,image,sort_order,status],
                (err,result)=>{
                   if(!err){
                    if(result.affectedRow != 0){
                        res.json({
                            message : "Insert successfully",
                            list : result,
                        }) 
                    }
                   }else{
                    res.json({
                        error   : true,
                        message : err
                    })
                   }
            })
        }
    }else{
        res.json({
            error  : "no body ",
            message : err
        })
    }   
}
const updateList = (req,res)=>{
    var message = "";
    var body = req.body;
    // var category_id = null;
    if(body){
        if(isEmpty(body.category_id)){
            message.name = "param category_id required"
        }
        if(isEmpty(body.name)){
            message.name = "param name required"
        }  
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message :message
        })
    }else{
        const {category_id,name,parent,image,sort_order,status,update_at} = req.body;
        var sql = " UPDATE category SET `name` = ? ,`parent` = ? ,`image` = ? ,`sort_order` = ? ,`status` = ? , update_at = NOW()  ";
        sql += "  WHERE category_id = ? "
        database.query(sql,[category_id,name,parent,image,sort_order,status,update_at],
            (err,result)=>{
               if(!err){
                if(result.affectedRow != 0){
                    res.json({
                        message : "update successfully",
                        list : result,
                    }) 
                }
               }else{
                res.json({
                    error   : true,
                    message : err
                })
               }
        })
    }
    

}
const removeList = (req,res)=>{
    var body = req.body;
    let message = "";
    if(body){
        if(isEmpty(body.category_id)){
            message.name = "param category_id required"
        }
        if(isEmpty(body.name)){
            message.name = "param name required"
        }
        if(Object.keys(message).length > 0){
            res.json({
                error : true,
                message :message
            })
        }else{
            sql = "DELETE FROM category WHERE category_id = ?"
            database.query(sql,[body.category_id],
                (err,result)=>{
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

    }else{
        res.json({
            error  : "no body ",
            message : err
        })
    }
}
module.exports = {
    getList,
    createList,
    updateList,
    removeList
}