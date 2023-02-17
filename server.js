const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken")
const {config}= require("./app/config/helper")
const cors = require("cors");
app.use(bodyParser.json()); // config to know json
app.get("/",(req,res)=>{
    res.json({
        title : "default node api "
    })
})
app.use(cors({
    origin:'*'
}));



//import routes
require("./app/routes/teacher.route")(app);
require("./app/routes/student.route")(app); 
require("./app/routes/customer.route")(app);
require("./app/routes/course.route")(app);
require("./app/routes/category.route")(app);
require("./app/routes/classroom.route")(app);
require("./app/routes/studentClass.route")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/role.routes")(app);
require("./app/routes/permission.route")(app);
require("./app/routes/user.route")(app);






const port = process.env.PORT || 3001;// auto change port if duplicate
app.listen(port,()=>{
    console.log("server run on port : http://localhost:"+port);
})