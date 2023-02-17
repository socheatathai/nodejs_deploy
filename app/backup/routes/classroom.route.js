const classroom = (app)=>{
    const classroomController = require("../controller/classroom.controller");
    app.get("/api/classroom",classroomController.getList);
    app.get("/api/classroom",classroomController.getListByID);
    app.post("/api/classroom",classroomController.createList);
    app.put("/api/classroom",classroomController.updateList);
    app.delete("/api/classroom",classroomController.removeList);
}
module.exports = classroom;