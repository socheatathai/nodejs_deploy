const database = require("../config/mysql.config");
const isEmpty = require("../config/helper")
const bcrypt = require("bcrypt")
const createUser = (req,res)=>{
    var {
        username,password,tel,email
    } = req.body;
    var message = {};
    if(isEmpty(username)){
        message.username = "Pls fill username"
    }
    if(isEmpty(password)){
        message.password = "Pls fill password"
    }else if(password.length <= 4 || password.length >= 24){
        message.password = " password most be between 4-24 characters "
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        password = bcrypt.hashSync(password,10);// in crypt password
        // sqlChinking is check duplicate account
        var sqlChecking = "SELECT COUNT (user_id) as total_record FROM user WHERE username = ?";
        database.query(sqlChecking,[username],(err,result)=>{
            if(!err){
                if(result[0] && result[0].total_record != 0){
                    res.json({
                        error : true,
                        message : "user already exist!"
                    })
                }else{
                    var sql = "INSERT INTO user (username,password,tel,email) VALUES (?,?,?,?)";
                    database.query(sql,[username,password,tel,email],(err,result)=>{
                    if(!err){
                        res.json({
                            message : "username create successfully"
                        })
                    }else{
                        res.json({
                            error : true,
                            message : err
                        })
                    }
                    })
                }
            }
        })
    }
}
const login = (req,res)=>{
    const { username,password } = req.body;
    var message = {};
    if(isEmpty(username)){
        message.username = "Pls fill username"
    }
    if(isEmpty(password)){
        message.password = "Pls fill password"
    }else if(password.length <= 4 ){
        message.password = " password most be between 4-24 characters "
    }
    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        var sql = "SELECT * FROM user WHERE username = ?";
        database.query(sql,[username],(err,result)=>{
            if(!err){
                if(result.length == 0){
                    res.json({
                        error : true,
                        message:"username does not exit"
                    })
                }else{
                    var dataPassword = result[0].password;
                    dataPassword = bcrypt.hashSync(dataPassword,10);
                    if(bcrypt.compareSync(password,dataPassword)){
                        var data = result[0];
                        data.password = "****" // password hide ****
                        res.json({
                            error : true,
                            message:"login success",
                            data : data
                        })
                    }else{
                        res.json({
                            error : true,
                            message:"password incorrect..."
                        })
                    }
                }
            }
        })
    }
}
const changeStatusUser = (req,res)=>{
    var user_id = req.body && req.body.user_id;
    var status = req.body && req.body.status;
    if(isEmpty(user_id)){
        res.json({
            error : true,
            message : "user id require"
        })
    }else if (isEmpty(status)){
        res.json({
            error : true,
            message : "status require"
        })
    }else{
        database.query("UPDATE user SET status = ? WHERE user_id = ?",[status,user_id],
        (err,result)=>{
            if(err){
                res.json({
                    error : true,
                    message : err
                })
            }else{
                res.json({
                    message : "user update status success"
                })
            }
        })
    }

}
module.exports = {
    createUser,
    login,
    changeStatusUser
}