var express = require('express')
var router = express.Router()
var productModel = require('../modules/product')
var multer  = require('multer')
var checkAuth = require('./middleware/auth')
var ctrlProduct=require('./controller/product')


     var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './public/upload/')
        },
      filename: function (req, file, cb) {
        cb(null,+Date.now()+file.originalname)
      }
})

const filefilter = (req, file, cb)=>{

    if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
        cb(null,true)
    } else{
        cb(null,false)
    }
}

var upload = multer({
    storage:storage,limits:{fileSize: 1024*1024*5}, fileFilter:filefilter })


router.get('/view-product', checkAuth, ctrlProduct.getAllProduct)

router.post('/add-product',upload.single('photo'),checkAuth,ctrlProduct.addNewProducts )



module.exports = router