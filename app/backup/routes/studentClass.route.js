const studentClass = (app)=>{
    const studentClassController = require("../controller/studentClass.controller");
    app.get("/api/studentClass",studentClassController.getList);
    app.get("/api/studentClass/:id",studentClassController.getListByID);
    app.post("/api/studentClass",studentClassController.createList);
    app.put("/api/studentClass",studentClassController.updateList);
    app.delete("/api/studentClass",studentClassController.removeList);
}
module.exports = studentClass;