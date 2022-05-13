const mongoose = require('mongoose')
const dbconnect = require('../db')

//Call the db to connect the mongo db
dbconnect()

// Complaint Schema
const ComplaintSchema = mongoose.Schema({
   
    
    unit: {
        type: String
    },
    subdivision: {
        type: String
    },
    circle: {
        type: String
    },
    mandal: {
        type: String
    },
    village: {
        type: String
    },
    villagee: {
        type: String
    },
    FIR: {
        type: String
    },
    crime: {
        type: String
    },
    law: {
        type: String
    },
    mandall: {
        type: String
    },
    accname: {
        type: String
    },
    addhar: {
        type: String
    },
    seized: {
        type: String
    },
    quantity: {
        type: String
    },
    kgs: {
        type: String
    },
    details: {
        type: String
    }
});

const Complaint = module.exports = mongoose.model('Complaint', ComplaintSchema);

module.exports.registerComplaint = function (newComplaint, callback) {
    newComplaint.save(callback);
}

module.exports.getAllComplaints = function(callback){
    Complaint.find(callback);
  }