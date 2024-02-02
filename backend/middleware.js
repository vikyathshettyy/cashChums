const { JWT_SECRET } = require('./config');

const jwt = require('jsonwebtoken')


function authMiddleware(req,res,next) {
    try{
        const authheader = req.headers.authorization;
        if(!authheader || !authheader.startsWith('Bearer ')) {
            res.status(403).json({
                message:"incorrect headers",
               
            })
            return;
        }
        const authorization = req.headers.authorization.split(' ');
        const payload = jwt.verify(authorization[1],JWT_SECRET);
        
        req._id = payload;
        
        next();

    }
    catch(e) {
        res.status(401).json({message: 'User not authenticated'})
        console.log(e);
        return;

    }
}

module.exports = {
    authMiddleware
}