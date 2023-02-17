const mysql = require("mysql");
// const database = mysql.createConnection({
//     host : "localhost",
//     database : "node_api",
//     user : "root",
//     password :""
// })
const database = mysql.createConnection({
    host : "bn656ecofjplzmvalpld-mysql.services.clever-cloud.com",
    database : "bn656ecofjplzmvalpld",
    user : "urjmwst60uax04ss",
    password :"urjmwst60uax04ss"
})
database.connect();
module.exports = database;