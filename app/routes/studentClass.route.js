const {validateToken} = require("../controller/auth.controller")
const studentClass = (app)=>{    
    const studentClassController = require("../controller/studentClass.controller");
    app.get("/api/studentClass",validateToken,studentClassController.getAll);
    app.post("/api/studentClass/:id",validateToken,studentClassController.getAll);
    app.post("/api/studentClass",validateToken,studentClassController.create);
    app.put("/api/studentClass",validateToken,studentClassController.edit);
    app.delete("/api/studentClass",validateToken,studentClassController.remove);
}
module.exports = studentClass;