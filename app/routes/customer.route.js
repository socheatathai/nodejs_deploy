const customer =(app)=>{
    const customerController = require("../controller/customer.controller");
    app.get("/api/customer",customerController.getList)
    app.get("/api/customer/:id",customerController.getListByID)
    app.post("/api/customer",customerController.createList)
    app.delete("/api/customer",customerController.removeList)
}
module.exports = customer; 