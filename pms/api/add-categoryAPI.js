var express = require('express');
var router = express.Router();
var passCatModel = require('../modules/password_category');
var checkAuth = require('./middleware/auth')
var categoryCon= require('./controller/category')


router.get('/view-category',checkAuth,categoryCon.viewCategory)

router.post('/add-category',checkAuth,categoryCon.addCategory)

router.delete('/delete-category',checkAuth, categoryCon.dateleCategory)

module.exports=router;