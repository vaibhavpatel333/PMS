var passCateModel = require('../../modules/add_password');



exports.findbyid = function (req, res, next) {
    var id = req.params.id
    console.log(id)
    passCateModel.findById(id)
        .select("password_category project_name password_detail")
        .populate('password_category')
        .then(data => {
            res.status(200).json({
                message: "Password Details got it",
                result: data
            })
        })
        .catch(err => {
            res.json(err);
        })
}


exports.getAllPassDetails = function (req, res, next) {

    // var viewPassDetails = passCateModel.find({},{password_category:1,project_name:1,password_detail:1});

        passCateModel.find()
        .select("password_category project_name password_detail")
        .populate('password_category')
        .then(data => {
            res.status(200).json({
                message: "Password Details got it",
                result: data
            })
        })
        .catch(err => {
            res.json(err);
        })
}

exports.addNewPassDetails= function (req, res, next) {
    var passCate = req.body.passcate
    var projectName = req.body.projectname
    var passDetail = req.body.passdetail

    var savePassDetails = new passCateModel({ password_category: passCate, project_name: projectName, password_detail: passDetail });
    savePassDetails.save()
        .then(data => {
            res.status(201).json({
                message: "Password Detaails Insterted Successfully Inserted",
                result: data
            })
        })
        .catch(err => {
            res.json(err)
        })
}