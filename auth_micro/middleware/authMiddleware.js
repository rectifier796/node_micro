import jwt from 'jsonwebtoken';

export const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(authHeader === null || authHeader === undefined){
        res.status(401).json({status:401,message:"Unauthorized"});
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token,process.env.JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({status: 401, message: "Unauthorized"});
        }

        req.user = payload;
        next();
    })
}