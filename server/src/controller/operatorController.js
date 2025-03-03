const twilio = require("twilio");
const sharp = require('sharp');
const Operator = require('../models/operatorSchema');
const otpGenerate = require('../utils/OTP/otpGenerate');

let OTP;

// Twilio Credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

const client = twilio(accountSid, authToken);

exports.signUp = async ( req, res ) => {
    try {
        const operatorExist = await Operator.findOne({ 'phone' : req.body.phone })

        if( operatorExist ){
            return res.status(406).send({ error : 'Operator alredy exist..!!'});
        }

        const operator = new Operator( req.body )
        const token = await operator.genarateAuthToken()
        await operator.save()
        res.status(201).send({ operator, token })
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

exports.login = async ( req, res ) => {
    try {
        const operator = await Operator.findOne({ "phone" : req.body.phone });
        
        if( !operator ){
            return res.status(404).send({error : `User not registered...`});
        }
        const passwordMatch = ( operator.password === req.body.password );

        if( !passwordMatch ){
            return res.status(406).send({error : `Password is incorrect...`});
        }

        const token = await operator.genarateAuthToken();
        await operator.save()
        res.send({ operator, token })
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const operator = await Operator.findOne({ "phone" : req.body.phone });

        if( !operator ) {
            return res.status(404).send({error: 'Number is not registered...'})
        }

        const phoneNumber = `+91${req.body.phone}`;
        OTP = otpGenerate(6);
        console.log(OTP)
        const message = await client.messages.create({
            body: `Your OTP code for reset password is : ${OTP}
            -MEDIAZONE`,
            from: twilioPhoneNumber,
            to: "+919633756579",       
        });

        console.log(message)
        res.send({success: true, OTP})


    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

exports.logout = async ( req, res ) => {
    try {
        req.operator.tokens = req.operator.tokens.filter((token) => token.token != req.token)
        await req.operator.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

exports.logoutAll = async ( req, res ) => {
    try {
        req.operator.tokens = [];
        await req.operator.save();
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}

exports.profile = async ( req, res ) => {
    try {
        res.send(req.operator)
    } catch (error) {
        res.status(500).send(error)
    }
}

exports.profileUpdate = async ( req, res ) => {
    try {
        const allowedUpdates = ['username', 'password', 'phone', 'email'];
        const requestedUpdates = Object.keys(req.body);
        const updatePosibility = requestedUpdates.every((update) => allowedUpdates.includes(update));

        if( !updatePosibility ) {
            return res.status(400).send({ error : `Invaild updates...` });
        }

        requestedUpdates.forEach(( update ) => req.operator[update] = req.body[update] );
        await req.operator.save();
        res.send(req.operator);

    } catch (error) {
        res.status(500).send()
    }
}

exports.avatarUpload = async ( req, res ) => {
    try {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height : 250 }).png().toBuffer()
        req.operator.avatar = buffer
        await req.operator.save()
        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
}

exports.avatarRemove = async ( req, res ) => {
    try {
        req.operator.avatar = undefined;
        await req.operator.save()
        res.send();
    } catch (error) {
        res.status(500).send()
    }
}