const Requests = require('../models/requestSchema');
const BroadbandCustomer = require('../models/broadbandCustomerSchema');




exports.createRequest = async ( req, res ) => {
    try {
        const request = new Requests({
            ...req.body,
            "owner" : req.broadbandCustomer._id
        })

        if( request.wifiName && request.password ) {
            request.description = "Request for WIFI SSID and Password changing..."
        }else if ( request.wifiName ) {
            request.description = "Request for WIFI SSID changing..."
        }else if ( request.password ) {
            request.description = "Request for WIFI Password changing..."
        }

        request.status = "Processing..."
        request.username = req.broadbandCustomer.username;

        await request.save();
        res.status(201).send(request)
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

exports.fetchAllbroadbandCustomerRequests = async ( req, res ) => {
    try {
        const requests = await Requests.find({ 'owner' : req.broadbandCustomer._id });
        res.send(requests);

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.fetchAllRequests = async ( req, res ) => {
    try {
        const  requests = await Requests.find({});
        if ( requests ) {
            const allRequest = requests.filter((request) => (request.status === "Processing...") ? request.status = "Pending..."  : request.status ) ;
            return res.send(allRequest);
        }
        res.send();

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.resolveRequest = async ( req, res ) => {
    try {
        const request = await Requests.findById({ '_id' : req.body.id });

        if( !request ) {
            res.status(400).send({ error : 'Request not found...!!' });
        }

        if( !req.body.completed ){
            request.status = "Rejected";
            request.completed = false;
        }else {
            request.status = "Accepted";
            request.completed = true;
        }

        await request.save()
        res.send(request)

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}