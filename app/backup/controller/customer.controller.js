const database = require("../config/mysql.config")
const getList = (req,res)=>{
    let sql = "SELECT * FROM customer;"
    database.query(sql,(err,result,field)=>{
        if(err){
            res.json({
                error : err
            })
        }else{
            res.json({
                customer : result,
                field : field
            })
        }
    })

}
const getListByID = (req,res)=>{
    let id = req.params.id;
    var sql = "SELECT * FROM customer WHERE id = ?";
    database.query(sql,[id],(err,result,field)=>{
        if(err){
            res.json({
                error : true,
                data_error : err
            })
        }else{
            res.json({
                customer : result
            })
        }
    })
    
}
const createList = (req,res)=>{
  //  `id`, `firstname`, `lastname`, 
  //  `gender`, `dob`, `tel`, `address_id`
    let { firstname,lastname,gender,dob,tel,address_id }= req.body;
    var message = "";
    if(firstname == null || firstname == ""){
        message = "first name required"
    }else if(lastname == null || lastname == ""){
        message = "last name required"
    }else if(tel == null || tel == ""){
        message = "telephone required"
    }else if(address_id == null || address_id == ""){
        message = "address id required"
    }
    if(message != ""){
        res.json({
            error : true,
            message : message
        })
    }else{
        var sql = "INSERT INTO customer (firstname,lastname,gender,dob,tel,address_id) VALUE (?,?,?,?,?,?)";
        database.query(sql,[firstname,lastname,gender,dob,tel,address_id],
            (err,result,field)=>{
                if(err){
                    res.json({
                        error : true,
                        message : err
                    })
                }else{
                    res.json({
                        message : "insert successfully",
                        field : field,
                        list : result
                    })
                }
            })
    }
}
const removeList = (req,res)=>{
    if(req.body.id == null || req.body.id == ""){
        res.json({
            error : true,
            message : "params id required"
        })
    }else{
        var sql = "DELETE FROM customer WHERE id = ?;";
        database.query(sql,[req.body.id],(err,result)=>{
            if(err){
                res.json({
                    error : true,
                    message : err
                })
            }else{
                res.json({
                    message : result.affectedRows != 0 ? "deleted successfully" : "customer id not found"
                })
            }
        })
    }
}
module.exports = {
    getList,
    getListByID,
    createList,
    removeList
};