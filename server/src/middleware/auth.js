const jwt = require('jsonwebtoken')
const Operator = require('../models/operatorSchema')


const auth = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const operatorId = jwt.verify(token, process.env.JWT_KEY);
        const operator = await Operator.findOne({ '_id' : operatorId, 'tokens.token' : token });

        if( !operator ) {
            throw new Error();
        }
        req.operator = operator;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error : `please authenticate...`})
    }
}


module.exports = auth