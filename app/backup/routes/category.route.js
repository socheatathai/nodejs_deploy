const category = (app)=>{
    const categoryController = require("../controller/category.controller");
    app.get("/api/category",categoryController.getList);
    app.get("/api/category/:id",categoryController.getList);
    app.post("/api/category",categoryController.createList);
    app.put("/api/category",categoryController.updateList);
    app.delete("/api/category",categoryController.removeList);
}
module.exports = category;