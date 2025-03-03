const jwt = require('jsonwebtoken')
const BroadbandCustomer = require('../models/broadbandCustomerSchema')


const auth = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const broadbandCustomerId = jwt.verify(token, process.env.JWT_KEY);
        const broadbandCustomer = await BroadbandCustomer.findOne({ '_id' : broadbandCustomerId, 'tokens.token' : token });

        if( !broadbandCustomer ) {
            throw new Error();
        }
        req.broadbandCustomer = broadbandCustomer;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error : `please authenticate...`})
    }
}


module.exports = auth