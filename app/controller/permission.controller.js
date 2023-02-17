const db = require("../config/mysql.config");
const {isEmpty} = require("../config/helper")

const getAll = (req, res) => {
    var sql = "SELECT * FROM permission";
    db.query(sql,(err,resule)=>{
        if(!res.err){
            res.json({
                list : resule
            })
        }else{
            res.json({
                error : true,
                message : err
            })
        }
    })
};

const create = (req,res) => {
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }else if(isEmpty(body.code)){
            message.code = "param code require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            name,code,description
        } = req.body;
        var sql = "INSERT INTO permission (`name`,`code`,`discription`) VALUES (?,?,?)";
        db.query(sql,[name,code,description],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Insert success"
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
};

const update = (req,res) => {
    var message = {};
    var body = req.body;
    if(body){
        if(isEmpty(body.name)){
            message.name = "param name require!"
        }else if(isEmpty(body.code)){
            message.code = "param code require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        const {
            name,code,description
        } = req.body;
        var sql = "UPDATE permission SET `name` = ? ,`code` = ? ,`discription` = ?";
        db.query(sql,[name,code,description],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Update success"
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
};
const remove = (req,res) => {
    var body = req.body
    var message = {};
    if(body){
        if(isEmpty(body.id)){
            message.id = "param id require!"
        }
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("DELETE FROM permission WHERE id = ?",[body.id],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Remove success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
};
const assignRolePermission = (req,res) => {
    var {role_id,permission_id} = req.body;
    if(body){
        if(isEmpty(role_id)){
            message.role_id = "param role_id require!"
        }
        if(isEmpty(permission_id)){
            message.permission_id = "param permission_id require!"
        }
       
    }
    if(Object.keys(message).length > 0 ){
        res.json({
            error : true,
            message : message
        })
    }else{
        db.query("INSERT INTO role_permission (`role_id`,`permission_id`) VALUES (?,?) ",[role_id,permission_id],(err,result)=>{
            if(!err){
                if(result.affectedRows != 0){
                    res.json({
                        message : "Inset success"
                    })
                }
            }else{
                res.json({
                    error : true,
                    message :err
                })
            }
        })
    }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  assignRolePermission
};