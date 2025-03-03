const express = require('express');
const cors = require('cors')
require('dotenv').config({path: `${__dirname} /../config/.env`})
require('./db/mongoDB')
const operatorRouter = require('./router/operatorRouter')
const broadbandRouter = require('./router/broadbandRouter')
const cableRouter = require('./router/cableRouter')

const app = express();
app.use(cors())
const port = process.env.PORT || 4000

app.use(express.json());

app.use(operatorRouter, broadbandRouter, cableRouter);



app.listen(port, () => {
    console.log(`Server is running on upon the port ${port}`);
})

 