var express = require('express')
var router = express.Router()

var jwt = require('jsonwebtoken');
require('dotenv').config()



module.exports=(req,res,next)=>{

    try{
        
        var token = req.headers.tokenid.split(" ")[1]
        var decode= jwt.verify(token, process.env.SECRET_KEY)
        req.userinfo=decode;
        next()


    }catch(err){
        res.status(401).json({
            error:"Invalid token"
        })
    }
}