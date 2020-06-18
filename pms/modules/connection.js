

    const mongoose = require('mongoose');

    require('dotenv').config()
    var dburl = process.env.DB_URL
    var conn=mongoose.connect(dburl, { useNewUrlParser: true, useCreateIndex: true });
