const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')


const broadbandCustomerSchema = new mongoose.Schema({
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
    dateofBirth : {
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
        type : Boolean
    },
    status :{
        type : Boolean
    },
    isp : {
        name : {
            type : String,
            trim : true,
            default : ""
        },
        username : {
            type : String,
            trim : true,
            default : ""
        },
        password : {
            type : String,
            trim : true,
             default : ""
        },
        activationDate : {
            type : String,
             default : ""
        }
    },
    signal : {
        opticalLayerColor : {
            type : String,
            trim : true,
            default : "blue"
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
        liveSignal : {
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
    modem : {
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
            unique : true,
            trim : true,
        },
        wifiSSID : {
            type : String,
            trim : true,
            default : ""
        },
        wifiPassword : {
            type : String,
            trim : true,
            default : ""
        },
        frequency : {
            type : String,
            trim : true,
            default : ""
        },
        color : {
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

// Generating new token

broadbandCustomerSchema.methods.genarateAuthToken = async function () {
    const broadbandCustomer = this
    const token = jwt.sign({'_id' : broadbandCustomer._id.toString()}, process.env.JWT_KEY);
    broadbandCustomer.tokens = broadbandCustomer.tokens.concat({ token })
    return token
}

broadbandCustomerSchema.methods.toJSON = function () {
    const broadbandCustomer = this 
    const broadbandCustomerObject = broadbandCustomer.toObject()

    delete broadbandCustomerObject.password
    delete broadbandCustomerObject.tokens
    delete broadbandCustomerObject.avatar

    return broadbandCustomerObject
}

const BroadbandCustomer = mongoose.model('BroadbandCustomer', broadbandCustomerSchema)
module.exports = BroadbandCustomer