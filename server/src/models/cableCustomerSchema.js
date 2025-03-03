const mongoose = require('mongoose');
const validator = require('validator')


const cableCustomerSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : [4, `Minimum 4 characters required`],
        trim : true
    },
    phone : {
        type : Number,
        required : true,
        unique : [true, `alreday exist...`],
        trim : true
    },
    address : {
        type : String,
        trim : true,
        default : ""
    },
    email : {
        type : String,
        unique : true,
        trim : true,
        lowercase : true,
        validate ( email ) {
            if( !validator.isEmail( email )) {
                throw new Error(`Email is not valid...`)
            }
        }
    },
    password : {
        type : String,
        required : true,
        trim : true,

    },
    tokens : [{
        token : {
            type : String,
            required : true,
            validator( token ){
                if(!validator.isJWT( token )){
                    throw new Error(`Invalid token...`)
                }
            } 
        }
    }],
    avatar : {
        type : Buffer
    },
    cableProvider : {
        name : {
            type : String,
            trim : true,
            default : ""
        },
        activationDate : {
            type : Date,
             default : ""
        }
    },
    signal : {
        opticalLayerColor : {
            type : String,
            trim : true,
            default : ""
        },
        opticalSignal : {
            type : Number,
            trim : true,
            default : 0
        },
        bendedSignal : {
            type : Number,
            trim : true,
            default : 0
        },
        port : {
            type : Number,
            trim : true,
            default : 0
        }
    },
    setTopBox : {
        brand : {
            type : String,
            trim : true,
            default : ""
        },
        model : {
            type : String,
            trim : true,
            default : ""
        },
        macAddress : {
            type : String,
            trim : true,
            default : ""
        },
        remoteType : {
            type : String,
            trim : true,
            default : ""
        }
    },
    owner : {
        type : mongoose.Types.ObjectId
    }
},{
    timestamps : true
})


const CableCustomer = mongoose.model('CableCustomer', cableCustomerSchema)
module.exports = CableCustomer
