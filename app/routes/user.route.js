const{
    getAll,
    create, 
    update,
    remove,
    assignRole
} = require("../controller/user.controller");

const {validateToken} = require("../controller/auth.controller")
const course = (app)=>{
    app.get("/api/user",validateToken,getAll)
    app.post("/api/user/assignRole",validateToken,assignRole)
    app.post("/api/user",validateToken,create)
    app.put("/api/user",validateToken,update)
    app.delete("/api/user",validateToken,remove)
}
module.exports = course;