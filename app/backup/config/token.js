const validateToken = (req,res,next) =>{
    var authHeader = req.headers["authorization"]
    console.log(authHeader)
    if(authHeader){
        authHeader = authHeader.split(" ");
        console.log("========================")
        console.log(authHeader[1])
    }else{

    }
    next();
}
app.post("/api/staffList",validateToken,(req,res,next)=>{
    res.json({
        data: "information important",
        list: req.user
    })
})