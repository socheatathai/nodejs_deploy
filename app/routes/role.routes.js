const role =(app)=>{
    const route = require("express").Router();
    const roleController = require("../controller/role.controller");
    route.post("/api/role",roleController.getAll)
    route.post("/api/role/:id",roleController.create)
    route.post("/api/role",roleController.update)
    route.delete("/api/role",roleController.remove)
    route.post("/api/role/assignRolePermission",roleController.assignRolePermission)

    app.use(route)
}
module.exports = role; 