const CableCustomer = require('../models/cableCustomerSchema')

exports.addCableCustomer = async ( req, res ) => {
    try {
        const cableCustomerExist = await CableCustomer.findOne({ 'phone' : req.body.phone })

        if( cableCustomerExist ){
            return res.status(406).send({ error : 'cableCustomer alredy exist..!!'});
        }

        const cableCustomer = new CableCustomer({
            ...req.body,
            "owner" : req.operator._id
        })
        
        await cableCustomer.save()
        res.status(201).send(cableCustomer)

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}


exports.fetchCableCustomer = async ( req, res ) => {
    try {
        const cableCustomer = await CableCustomer.findOne({ '_id' : req.params.id, 'owner' : req.operator._id })

        if( !cableCustomer ) {
            return res.status(404).send({ error  : `CableCustomer is not exist..` })
        }

        res.send(cableCustomer)

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.fetchAllCableCustomers = async ( req, res ) => {
    try {
        const cableCustomers = await CableCustomer.find({ 'owner' : req.operator._id })

        if( !cableCustomers || cableCustomers == "" ) {
            return res.status(404).send({ error  : `CableCustomers is not exist..` })
        }
        
        res.send(cableCustomers)

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.filterCableCustomers = async ( req, res ) => {
    try {
        
       const page = parseInt(req.query.page) - 1 || 0;
       const limit = parseInt(req.query.limit) || 5;
       const search = req.query.search || "";
       const sort = req.query.sort ?  req.query.sort.split(":") : [];
       const port = req.query.port ? req.query.port.split(",") : []


    //    Sort data as per the query     
       let sortBy = {};
       
       if( sort.length > 0 ) {

        sort[0] === "port" ? sort[0] = "signal.port" : sort[0] ; 

        if(sort[1]) {
            sortBy[sort[0]] = sort[1];
        }else {
            sortBy[sort[0]] = 'asc';
        }
       } else {
        sortBy["cableProvider.activationDate"] = 'desc';
       }

    // Match username using case-insensitive search
        const query = {
            username: { $regex: search, $options: "i" }
        };
        
    // If port array contains specific port numbers, match those ports using $in.
        if(port && port.length > 0) {
            query["signal.port"] = { $in: port }
        }

       const cableCustomers = await CableCustomer.find(query)
                .sort(sortBy)
                .skip( page * limit )
                .limit(limit)
       
        const total = await CableCustomer.countDocuments( query );

        const response = {
            error : false,
            total,
            page : page + 1,
            limit,
            cableCustomers
        }

        res.send(response);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

exports.editCableCustomer = async ( req, res ) => {
    try {
        const cableCustomer = await CableCustomer.findOne({ '_id' : req.body.cableCustomerId })
        delete req.body.cableCustomerId;

        if( !cableCustomer ) {
            return res.status(404).send({ error : `CableCustomer is not exist...`})
        }

        const allowedUpdates = ["username", "phone", "address", "email", "cableProvider", "signal", "setTopBox"]
        const requestedUpdates = Object.keys(req.body)
        const updatePosibility = requestedUpdates.every((update) => allowedUpdates.includes(update))

        if( !updatePosibility ) {
            return res.status(406).send({ error : `Invalid updates...` });
        }
        
        requestedUpdates.forEach(( update ) => cableCustomer[update] = req.body[update]);
        await cableCustomer.save()
        res.send(cableCustomer)
        
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

exports.RemoveCableCustomer = async ( req, res ) => {
    try {
        const cableCustomer = await CableCustomer.findOne({ '_id' : req.body.cableCustomerId });

        if( !cableCustomer ) {
           return res.status(404).send({ error : 'CableCustomer not found..!!' });
        }

        await CableCustomer.findByIdAndDelete({ '_id' : req.body.cableCustomerId });
        res.send(`cableCustomer ${cableCustomer.username} has been removed...`)

    } catch (error) { 
        res.status(500).send(error);
        console.log(error);
    }
}

