var jwt = require("jsonwebtoken");
const JWT_SECRET = 'thisisworkingnow';

const fetchuser = (req, res, next) => {
    // Get the user from jwt token and add id to req object

    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ error: "please use valid token to authenticate" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please use valid token to authenticate" });
    }
}


module.exports = fetchuser;