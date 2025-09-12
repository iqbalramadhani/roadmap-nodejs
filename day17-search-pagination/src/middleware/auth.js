const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1]; // bearer token    

    if(!token){
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "SECRET_KEY");        
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
}

module.exports = auth;