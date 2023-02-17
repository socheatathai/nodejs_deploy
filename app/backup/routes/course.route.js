const course = (app)=>{
    const courseController = require("../controller/course.controller")
    app.post("/api/course",courseController.getList);
    app.get("/api/course/:id",courseController.getListByID);
    app.post("/api/course",courseController.createList);
    app.put("/api/course",courseController.updateList);
    app.delete("/api/course",courseController.removeList);
}
module.exports = course;