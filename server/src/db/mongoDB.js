const mongoose = require('mongoose');


const startDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("successfully connected to the Mediazone DataBase .....");
    } catch (error) {
        console.log(error)
    }
}

startDB();