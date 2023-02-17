const {validateToken} = require("../controller/auth.controller")
const category = (app)=>{
    const categoryController = require("../controller/category.controller");
    app.get("/api/category",validateToken,categoryController.getList);
    app.get("/api/category/:id",validateToken,categoryController.getList);
    app.post("/api/category",validateToken,categoryController.createList);
    app.put("/api/category",validateToken,categoryController.updateList);
    app.delete("/api/category",validateToken,categoryController.removeList);
}
module.exports = category;