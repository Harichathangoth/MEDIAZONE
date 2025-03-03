const fiberzonStatus = require("../webscrap/fiberzone/fiberzoneStatus");


const liveStatus = async ( broadbandCustomers ) => {
        const statusPromises  =  broadbandCustomers.map(async (broadbandCustomer) => {
        const loginStatus = await fiberzonStatus(broadbandCustomer.isp.username, broadbandCustomer.isp.password);
        if(loginStatus){
            // console.log(dataInfo)
            if(loginStatus === "IN"){
                console.log("working true")
                broadbandCustomer.status = true
            }else if(loginStatus == "OUT"){
                console.log("working false")
                broadbandCustomer.status = false
            }
        }
        console.log(broadbandCustomer)
        return broadbandCustomer;
    })

    const liveBroadbandCustomers = await Promise.all(statusPromises);
    return liveBroadbandCustomers;
}

module.exports = liveStatus