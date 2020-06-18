const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

require('./connection');

var conn = mongoose.Collection;
var passSchema = new mongoose.Schema({
    password_category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'password_categories', 
        required: true,
    },
    project_name: {
        type: String,
        required: true,
    },
    password_detail: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
passSchema.plugin(mongoosePaginate);
var passModel = mongoose.model('password_details', passSchema);
module.exports = passModel;