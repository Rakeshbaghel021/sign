const jwt = require("jsonwebtoken");
exports.verifyToken = async(req,res,next)=>{
    let token = req.headers.authorization;
    try {
        if(token){
            jwt.verify(token,"secret",(error,decoded)=>{
                if(error) return next(error);
                req.userId = decoded.userid;
                next()
                
            })
        } else{
            res.status(401).json({success:false,message:"Token not found"})
        }
    } catch (error) {
        next(error)
    }
}