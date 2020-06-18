var productModel = require('../../modules/product')



exports.addNewProducts=function (req, res, next) {

    console.log(req.userinfo)
    var productname = req.body.productname
    var price = req.body.price
    var qty = req.body.qty
    var image = req.file.path

    var saveproduct = new productModel({ productName: productname, price: price, quantity: qty,image:req.file.path})
    saveproduct.save()
        .then(data => {
            res.status(201).json({
                message: 'product inseter successfully',
                result: data
            })
        })
        .catch(err=>{
            res.json(err);
        })
}

exports.getAllProduct= (req, res, next) =>{
    var viewproduct = productModel.find({})

    viewproduct.exec()
        .then(data => {
            res.status(200).json({
                message: 'Product got it',
                result: data
            })
        })
        .catch(err=>{
            res.json(err)
        })
}