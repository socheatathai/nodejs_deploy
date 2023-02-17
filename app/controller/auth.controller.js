const database = require("../config/mysql.config");
const {isEmpty,config} = require("../config/helper")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const validateToken = (req,res,next) =>{
    var authHeader = req.headers["authorization"]
    // console.log(authHeader)
    if(authHeader){
        authHeader = authHeader.split(" ");
        var token = authHeader[1]
        jwt.verify(token,config.local_token,(err,obj_info)=>{
            if(!err){
                // console.log(authHeader[1])
                // console.log(obj_info)
                req.user = obj_info.user
                next();
            }else{
                res.json({
                    error : true,
                    message : "invalid token"
                })

            }
        })
    }else{
       // error
       res.json({
        error : true,
        message : "token required..."
    })
    }
    
}


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
        // sqlChecking is check duplicate account
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
const generateToken = (obj_info)=>{
    return jwt.sign(obj_info,config.local_token,{expiresIn:"1h"})
}
const login = (req,res)=>{
    // const { username,password } = req.body;
    // var message = {};
    // if(isEmpty(username)){
    //     message.username = "Pls fill username"
    // }
    // if(isEmpty(password)){
    //     message.password = "Pls fill password"
    // }else if(password.length <= 4 ){
    //     message.password = " password most be between 4-24 characters "
    // }
    // if(Object.keys(message).length > 0){
    //     res.json({
    //         error : true,
    //         message : message
    //     })
    // }else{
    //     // var sql = "SELECT * FROM user WHERE username = ?";
    //     var sql = "SELECT u.user_id , u.password, u.username, l.name  as role_name, u.tel, u.email,u.create_at FROM user as u ";
    //     sql += " INNER JOIN ueser_role as ur on u.user_id = ur.user_id"
    //     sql += " INNER JOIN role as l on ur.role_id = l.id"
    //     sql += " WHERE u.username = ? AND u.status = 1";
    //     database.query(sql,[username],(err,result)=>{
    //         if(!err){
    //             if(result.length == 0){
    //                 res.json({
    //                     error : true,
    //                     message:"username does not exit"
    //                 })
    //             }else{
    //                 // condition check password
    //                 var dataPassword = result[0].password;
    //                 dataPassword = bcrypt.hashSync(dataPassword,10);
    //                 if(bcrypt.compareSync(password,dataPassword)){
    //                     var data = result[0];
    //                     data.password = "****" // password hide ****
    //                     var sqlPermission = "SELECT "+
    //                     " p.code " +
    //                     " FROM user as u  " +
    //                     " INNER JOIN ueser_role as ur on u.user_id = ur.user_id " +
    //                     " INNER JOIN role as r on ur.role_id = r.id " +
    //                     " INNER JOIN role_permission as rp on r.id = rp.role_id " +
    //                     " INNER JOIN permission as p on rp.permission_id = p.id " +
    //                     " WHERE u.username = ? ; " 
    //                     database.query(sqlPermission,[data.username],(errPer,resultPer)=>{
    //                         if(!errPer){
    //                             const accessToken = generateToken({user : data,Permissions:resultPer});
    //                             res.json({
    //                                 error : true,
    //                                 message:"login success",
    //                                 accessToken : accessToken,
    //                                 user : data,
    //                                 Permissions :resultPer
    //                             })
    //                         }else{
    //                             res.json({
    //                                 error : true,
    //                                 message:"error permission..."
    //                             })
    //                         }
    //                     })

    //                     //================
    //                     const accessToken = generateToken({user : data});
    //                     res.json({
    //                         error : true,
    //                         message:"login success",
    //                         accessToken : accessToken,
    //                         user : data
    //                     })
    //                 }else{
    //                     res.json({
    //                         error : true,
    //                         message:"password incorrect..."
    //                     })
    //                 }
    //             }
    //         }
    //     })
    // }
    const {
        username,
        password
    } = req.body;
    var message = {};
    if(isEmpty(username)){
        message.username = "Please fill in username";
    }
    if(isEmpty(password)){
        message.password = "Please fill in password";
    }else if(password.length < 4 ){
        message.password = "Password must be between 4-24 characters";
    }

    if(Object.keys(message).length > 0){
        res.json({
            error : true,
            message : message
        })
    }else{
        // - check username is exist
        var sql = "SELECT u.user_id , u.password, u.username, l.name  as role_name, u.tel, u.email,u.create_at FROM user as u ";
        sql += " INNER JOIN ueser_role as ur on u.user_id = ur.user_id"
        sql += " INNER JOIN role as l on ur.role_id = l.id"
        sql += " WHERE u.username = ? AND u.status = 1"
        database.query(sql,[username],(err,result)=>{
            if(!err){
                if(result.length == 0){
                    res.json({
                        error:true,
                        message : "Username does not exist!"
                    })
                }else{
                    // check password
                    var dataPassword = result[0].password; // pass from table
                    dataPassword = bcrypt.hashSync(dataPassword,10);
                    if(bcrypt.compareSync(password,dataPassword)){ ///123456 , "djal;djfqoiujpoalsjdf;laj;dlsfjal;dfj"
                        var data = result[0];
                        // delete data.password;
                        data.password = "****" // password hide ****
                        var sqlPermission = "SELECT "+
                        " p.code " +
                        " FROM user as u  " +
                        " INNER JOIN ueser_role as ur on u.user_id = ur.user_id " +
                        " INNER JOIN role as r on ur.role_id = r.id " +
                        " INNER JOIN role_permission as rp on r.id = rp.role_id " +
                        " INNER JOIN permission as p on rp.permission_id = p.id " +
                        " WHERE u.username = ? ; " 
                        database.query(sqlPermission,[data.username],(err1,result1)=>{
                            if(!err1){
                                var permission = result1.map((item,index)=>{
                                    return item.code
                                })
                                const access_token = generateToken({user:data,permission:permission})
                                res.json({
                                    message : "Login success!",
                                    access_token : access_token,
                                    user:data,
                                    permission : permission
                                })
                            }else{
                                res.json({
                                    error:true,
                                    message : err1
                                })
                            }
                            
                        })
                        
                        
                    }else{
                        res.json({
                            error:true,
                            message : "Password incorrect!"
                        })
                    }
                }
            }else{
                res.json({
                    error:true,
                    message :err
                })
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
    changeStatusUser,
    validateToken
}