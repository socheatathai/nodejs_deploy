const {validateToken} = require("../controller/auth.controller")
const student = (app)=>{
    const route = require("express").Router();
    const studentController = require("../controller/student.controller")
    route.get("/api/student",validateToken,studentController.getList)
    route.get("/api/student/:id",validateToken,studentController.getListById)
    route.post("/api/student",validateToken,studentController.createList)
    route.put("/api/student",validateToken,studentController.updateList)
    route.delete("/api/student",validateToken,studentController.removeList)
    app.use(route); // return student
}
module.exports = student;