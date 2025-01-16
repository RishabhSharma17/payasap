const jwt = require('jsonwebtoken');
const {jwt_password} = require('../config');

const Authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    if(!token || !token.startsWith('Bearer ')){
        return res.status(401).json({error:"Missing or Invalid Token"});
    }

    const decoded = token.split(' ')[1];
    try
    {
        const user = jwt.verify(decoded,jwt_password);
        req.id = user.id;
        next();
    }
    catch(err){
        res.status(500).json({err});
        console.log(err);
    }
}

module.exports = {
    Authenticate
};