function admin(req, res, next){
    if(req.user.role !== "admin"){
        return res.status(403).json({ message: "Access denied. Only admin can access this route." });
    }

    next();
}

module.exports = admin;