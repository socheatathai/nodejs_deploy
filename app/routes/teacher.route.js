const {validateToken} = require("../controller/auth.controller")
const teacher = (app) =>{
    const route = require("express").Router();
    const TeacherController = require("../controller/teacher.controller");
    route.get("/api/teacher",validateToken,TeacherController.getList);
    route.get("/api/teacher/:id",validateToken,TeacherController.getListByID);
    route.post("/api/teacher",validateToken,TeacherController.createList);
    route.put("/api/teacher",validateToken,TeacherController.updateList);
    route.delete("/api/teacher",validateToken,TeacherController.deleteList);
    app.use(route); // return app 
}
module.exports = teacher;