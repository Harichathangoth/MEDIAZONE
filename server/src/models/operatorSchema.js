const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const BroadbandCustomer = require('../models/broadbandCustomerSchema')


const operatorSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        minlength : [4, `Minimum 4 characters need for name..`],
        trim : true
    },
    phone : {
        type : Number,
        unique : [true, `already exist ...`],
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : [true, `already exist ...`],
        required : true,
        lowercase : true,
        minlength : [3, 'Minimum 3 characters required'],
        trim : true,
        validate ( email ) {
            if( !validator.isEmail(email) ){
                throw new Error('Email is not valid...')
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
    }
},{
    timestamps : true
})

operatorSchema.virtual('broadbandcustomer',{
    ref : 'BroadbandCustomer',
    localField : '_id',
    foreignField : 'owner'
})

// Generating new token

operatorSchema.methods.genarateAuthToken = async function () {
    const operator = this
    const token = jwt.sign({'_id' : operator._id.toString()}, process.env.JWT_KEY);
    operator.tokens = operator.tokens.concat({ token })
    return token
}

//Removing sensitive content from JSON response

operatorSchema.methods.toJSON =  function () {
    const operator = this;
    const operatorObject = operator.toObject();

    delete operatorObject.password
    delete operatorObject.tokens
    delete operatorObject.avatar

    return operatorObject;
}

const Operator = mongoose.model('Operator', operatorSchema)
module.exports = Operator



