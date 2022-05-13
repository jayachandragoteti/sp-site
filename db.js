const mongoose = require('mongoose')

function connect () {
    mongoose.set('useCreateIndex', true);
    mongoose.connect('mongodb+srv://admin:admin@159@cluster0.ejssd.mongodb.net/stationdb',{useNewUrlParser: true})
}

module.exports = connect