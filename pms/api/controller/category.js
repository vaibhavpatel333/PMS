var passCatModel = require('../../modules/password_category');


// Get all category
exports.viewCategory = (req, res, next) => {
    var getPassCat = passCatModel.find({}, { passord_category: 1 });

    getPassCat.exec()
        .then(data => {
            res.status(200).json({
                message: 'Category list is got it.',
                result: data
            })
        })
        .catch(err => {
            res.json(err)
        })
}


// Add new Category

exports.addCategory = function (req, res, next) {

    var cateName = req.body.catename;
    var newcatename = new passCatModel({ passord_category: cateName });

    newcatename.save()
        .then(data => {
            res.status(201).json({
                message: "Category is Inserted Successfully",
                result: data
            })
        })
        .catch(err => {
            res.json(err)
        })
}


exports.dateleCategory = function (req, res, next) {

    var cateid = req.body.id;
    var deletecate = passCatModel.findByIdAndDelete(cateid)
    deletecate.exec()
        .then(data => {
            if (data === null) {
                res.json({
                    message: "Category is not found",
                    result: data
                })
            }
            else
                res.status(201).json({
                    message: "Category is deleted successfully",
                    result: data
                })
        })
        .catch(err => {
            res.json(err)
        })
}

