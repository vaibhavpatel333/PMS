var express = require('express')
var router = express.Router()
var userModel = require('../modules/user')
const bcrypt = require('bcrypt');
var viewUserData = userModel.find({})
var jwt = require('jsonwebtoken');
var checkAuth = require('./middleware/auth')
require('dotenv').config()


router.get('/view-user', function (req, res, next) {

    viewUserData.exec()
        .then(data => {
            res.status(200).json({
                message: 'UserList got it',
                result: data
            })
        });
})

router.post('/signup', function (req, res, next) {
    var uname = req.body.uname
    var uemail = req.body.email
    var upassword = req.body.password
    var cpassword = req.body.cpassword


    if (upassword != cpassword) {
        res.json({
            message: "confirm password is not matched"
        })

    } else {

        bcrypt.hash(upassword, 10, function (err, hash) {                                    // encrypt your password 
            if (err) {
                res.json(err);
            }
            else {
                var saveUser = new userModel({
                    username: uname,
                    email: uemail,
                    password: hash
                });
                saveUser.save()
                    .then(data => {
                        res.status(201).json({
                            message: "User Registration done Successfully",
                            result: data
                        })
                    })
                    .catch(err => {
                        res.json(err)
                    })
            }
        });
    }
})


//login Api

router.post('/login', function (req, res, next) {
    var uname = req.body.uname
    var upassword = req.body.password


    userModel.find({ username: uname })
        .exec()
        .then(data => {
            console.log(data.length)
            if (data.length < 1) {
                res.json({ message: 'Username or Password is Invalid' })
            }
            else {                      
                if (bcrypt.compareSync(upassword, data[0].password)) {     //encrypted password compare  (if it is true)

                    var token = jwt.sign({                                // create token of username and id. store it in token var.
                        username: data[0].username,
                        id: data[0]._id
                    }, process.env.SECRET_KEY,
                        {
                            expiresIn: '1h'
                        }
                    )
                    
                    res.status(201).json({
                        message: 'user got it',
                        result: token,                                    //return token
                        data:data  //data

                    })

                }
                else {
                    res.status(404).json({ message: 'Username or Password is Invalid...' })
                }
            }
        })
        .catch(err => {
            res.json(err)
        })



})
module.exports = router;