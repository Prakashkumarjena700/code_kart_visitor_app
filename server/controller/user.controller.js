const { userModel } = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.userRegister = async (req, res) => {
    const { email, password, avatar, role } = req.body

    if (email == '' || password == '' || role == '') {
        return res.send('Please fill mandatory fields')
    } else {
        try {
            const user = await userModel.find({ email })
            if (user.length > 0) {
                res.send({ "msg": "Already have an account please login", "success": false })
            } else {
                bcrypt.hash(password, 9, async (err, hash) => {
                    if (err) {
                        res.send("Something went wrong")
                    } else {
                        const user = new userModel({ email, password: hash, avatar, role })
                        const userData = await user.save()
                        res.send({ "msg": "New user has been register", "success": true, 'user': userData })
                    }
                });
            }

        } catch (err) {
            console.log(err)
            res.send({ "msg": "Can't register", "success": false })
        }

    }
}

exports.userLogin = async (req, res) => {
    const { email, password } = req.body
    if (email == null || password == null) {
        res.send({ "msg": "Please all the required fields", "success": false })
    } else {
        try {
            const user = await userModel.findOne({ email })
            if (user) {
                bcrypt.compare(password, user.password, (err, result) => {
                    if (result) {
                        const token = jwt.sign({ userID: user._id }, "cordkart")
                        res.send({
                            "msg": "Login sucessful",
                            "success": true,
                            token,
                            user: user
                        })
                    } else {
                        res.send({ "msg": "Wrong crediential", "success": false })
                    }
                });
            } else {
                res.send({ "msg": "User not exiest please register", "success": false })
            }
        } catch (err) {
            res.send({ "msg": "Something Wrong", "success": false, err })
        }
    }
}