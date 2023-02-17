const auth = (app)=>{
    const authController = require("../controller/auth.controller");
    app.post("/api/createUser",authController.createUser);
    app.post("/api/login",authController.login);
    app.post("/api/changeStatusUser",authController.changeStatusUser);
}
module.exports = auth;