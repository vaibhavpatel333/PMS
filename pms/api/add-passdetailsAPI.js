var express = require('express')
var router = express.Router();
var passCateModel = require('../modules/add_password');
var viewPassDetails = passCateModel.find()
var checkAuth = require('./middleware/auth')

var ctrlPassDetails = require('./controller/passDetails')


router.get('/view-passdetails', checkAuth, ctrlPassDetails.getAllPassDetails)

router.post('/add-passdetails', checkAuth, ctrlPassDetails.addNewPassDetails)

router.get('/passdetailsFindById/:id', checkAuth, ctrlPassDetails.findbyid)

module.exports = router