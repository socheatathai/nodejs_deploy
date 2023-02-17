const teacher = (app) =>{
    const route = require("express").Router();
    const TeacherController = require("../controller/teacher.controller");
    route.get("/api/teacher",TeacherController.getList);
    route.get("/api/teacher/:id",TeacherController.getListByID);
    route.post("/api/teacher",TeacherController.createList);
    route.put("/api/teacher",TeacherController.updateList);
    route.delete("/api/teacher",TeacherController.deleteList);
    app.use(route); // return app 
}
module.exports = teacher;