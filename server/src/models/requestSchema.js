const mongoose = require('mongoose')



const requestSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    wifiName : {
        type : String,
        trim : true
    },
    password : {
        type : String,
        minlength : [8, "password must contain minimum 8 characters..."],
        trim : true
    },
    status : {
        type : String,
        trim : true,
        required : true
    },
    completed : {
        type : Boolean
    },
    owner : {
        type : mongoose.Types.ObjectId
    }
},{
    timestamps : true
})

const Request = mongoose.model('Request', requestSchema)
module.exports = Request