const liveStatus = require('../utils/broadbandCustomerStatus');
const BroadbandCustomer = require('../models/broadbandCustomerSchema')
const fiberzonData = require('../webscrap/fiberzone/fiberzone');


exports.login = async ( req, res ) => {
    try {
        const broadbandCustomer = await BroadbandCustomer.findOne({ "phone" : req.body.phone });
        
        if( !broadbandCustomer ){
            return res.status(404).send({error : `User not registered...`});
        }
        const passwordMatch = ( broadbandCustomer.password === req.body.password );

        if( !passwordMatch ){
            return res.status(406).send({error : `Password is incorrect...`});
        }

        const token = await broadbandCustomer.genarateAuthToken();
        await broadbandCustomer.save()
        res.send({ broadbandCustomer, token })
    } catch (error) {
        res.status(500).send()
        console.log(error)
    }
}

exports.logout = async ( req, res ) => {
    try {
        req.broadbandCustomer.tokens = req.broadbandCustomer.tokens.filter((token) => token.token != req.token)
        await req.broadbandCustomer.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

exports.logoutAll = async ( req, res ) => {
    try {
        req.broadbandCustomer.tokens = [];
        await req.broadbandCustomer.save();
        res.send()
    } catch (error) {
        res.status(500).send()
    }
}

exports.addBroadbandCustomer = async ( req, res ) => {
    try {
        const broadbandCustomerExist = await BroadbandCustomer.findOne({ 'phone' : req.body.phone })

        if( broadbandCustomerExist ){
            return res.status(406).send({ error : 'broadbandCustomer alredy exist..!!'});
        }

        // Check the broadbandCustomer isp is "fiberzone"
        if(req.body.isp.name === 'fiberzone') {
            const broadbandCustomer = new BroadbandCustomer({
                ...req.body,
                "owner" : req.operator._id
            })
            
            // Fetch the broadbandCustomer information from "fiberzon.in"
            const dataInfo = await fiberzonData(broadbandCustomer.isp.username, broadbandCustomer.isp.password)
          
            if(dataInfo.error) {
                return res.status(401).send(dataInfo)
            }

            broadbandCustomer.username = dataInfo.Name ? dataInfo.Name : "";
            broadbandCustomer.address = dataInfo.Address ? dataInfo.Address : "";
            if( dataInfo.Email !== "NULL" ) broadbandCustomer.email = dataInfo.Email;
            broadbandCustomer.isp.activationDate = dataInfo.ActivationDate ? dataInfo.ActivationDate : "";
            broadbandCustomer.dateofBirth = ( dataInfo.DateofBirth !== "NULL" ) ? dataInfo.DateofBirth : "";

            // Filtering dataInfo
            delete dataInfo.Name;
            delete dataInfo.CustomerName;
            delete dataInfo.LoginId;
            delete dataInfo.Email;
            delete dataInfo.PendingAmount;
            delete dataInfo.MobileNo;
            delete dataInfo.DateofBirth;
            delete dataInfo.ActivationDate;
            
           
            await broadbandCustomer.save()
            res.status(201).send({dataInfo, broadbandCustomer})
            // res.status(201).send( broadbandCustomer)
        }
        else {
            res.status(400).send('Please provide a fiberzone customer details...!!')
        }

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}


exports.fetchBroadbandCustomer = async ( req, res ) => {
    try {
        console.log('working')
        const broadbandCustomer = await BroadbandCustomer.findOne({ '_id' : req.params.id, 'owner' : req.broadbandCustomer._id })

        if( !broadbandCustomer ) {
            return res.status(404).send({ error  : `broadbandCustomer is not exist..` })
        }

        // Fetch the broadbandCustomer information from "fiberzon.in"
        const dataInfo = await fiberzonData(broadbandCustomer.isp.username, broadbandCustomer.isp.password)
          
        if(dataInfo.error) {
            return res.status(401).send(dataInfo)
        }

        // Filtering dataInfo
        delete dataInfo.Name;
        delete dataInfo.CustomerName;
        delete dataInfo.LoginId;
        delete dataInfo.Email;
        delete dataInfo.PendingAmount;
        delete dataInfo.MobileNo;
        delete dataInfo.DateofBirth;
        delete dataInfo.ActivationDate;
        

        res.send({ dataInfo, broadbandCustomer })

    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

exports.fetchAllBroadbandCustomers = async ( req, res ) => {
    try {
        const broadbandCustomers = await BroadbandCustomer.find({ 'owner' : req.operator._id })

        if( !broadbandCustomers ) {
            return res.status(404).send({ error  : 'broadbandCustomer is not exist..' })
        }
    
        const broadbandCustomersStatus = await liveStatus(broadbandCustomers);
        // console.log(`live: ${broadbandCustomersStatus}`)
        res.send( broadbandCustomersStatus );

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

exports.filterBroadbandCustomers = async ( req, res ) => {
    try {
        
       const page = parseInt(req.query.page) - 1 || 0;
       const limit = parseInt(req.query.limit) || 5;
       const search = req.query.search || "";
       const sort = req.query.sort ?  req.query.sort.split(":") : [];
       const ISP = req.query.isp ? req.query.isp.split(",") : [];
       const port = req.query.port ? req.query.port.split(",") : []

       const ISPOptions = [
        "fiberzone",
        "keralavison",
        "bsnl"
       ];

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
        sortBy["isp.activationDate"] = 'desc';
       }

    // Match username using case-insensitive search
        const query = {
            username: { $regex: search, $options: "i" }
        };
        
    // If ISP array contains specific names, match those names using $in.
        if (ISP && ISP.length > 0) {
            query["isp.name"] = { $in: ISP };
        }

    // If port array contains specific port numbers, match those ports using $in.
        if(port && port.length > 0) {
            query["signal.port"] = { $in: port }
        }

       const broadbandCustomers = await BroadbandCustomer.find(query)
                .sort(sortBy)
                .skip( page * limit )
                .limit(limit)
       
        const total = await BroadbandCustomer.countDocuments( query );

        const response = {
            error : false,
            total,
            page : page + 1,
            limit,
            ISP : ISPOptions,
            broadbandCustomers
        }

        res.send(response);

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}

exports.editBroadbandCustomer = async ( req, res ) => {
    try {
        const broadbandCustomer = await BroadbandCustomer.findOne({ '_id' : req.body.broadbandCustomerId });
        delete req.body.broadbandCustomerId;

        if( !broadbandCustomer ) {
            return res.status(404).send({ error : 'broadbandCustomer is not exist.. '})
        }

        const allowedUpdates = ["username", "phone", "address", "email", "isp", "signal", "modem"]
        const requestedUpdates = Object.keys(req.body)
        const updatePosibility = requestedUpdates.every((update) => allowedUpdates.includes(update))

        if( !updatePosibility ) {
            return res.status(406).send({ error : `Invalid updates...` });
        }
        
        requestedUpdates.forEach(( update ) => broadbandCustomer[update] = req.body[update]);
        console.log(broadbandCustomer)
        await broadbandCustomer.save()
        res.send(broadbandCustomer)

    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
}



exports.RemoveBroadbandCustomer = async ( req, res ) => {
    try {
        const broadbandCustomer = await BroadbandCustomer.findOne({ '_id' : req.body.broadbandCustomerId });

        if( !broadbandCustomer ) {
           return res.status(404).send({ error : 'BroadbandCustomer not found..!!' });
        }

        await BroadbandCustomer.findByIdAndDelete({ '_id' : req.body.broadbandCustomerId });
        res.send(`broadbandCustomer ${broadbandCustomer.username} has been removed...`)

    } catch (error) { 
        res.status(500).send(error);
        console.log(error);
    }
}






