const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token, "cordkart", async (err, decoded) => {
            if (decoded) {
                req.userID = decoded.userID;
                next()
            } else {
                res.send({ "msg": "Something went wrong" })
            }
        })
    } else {
        res.send({ "msg": "Please Login" })
    }
}

module.exports = {
    auth
}