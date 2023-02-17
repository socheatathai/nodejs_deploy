const student = (app)=>{
    const route = require("express").Router();
    const studentController = require("../controller/student.controller")
    route.get("/api/student",studentController.getList)
    route.get("/api/student/:id",studentController.getListById)
    route.post("/api/student",studentController.createList)
    route.put("/api/student",studentController.updateList)
    route.delete("/api/student",studentController.removeList)
    app.use(route); // return student
}
module.exports = student;