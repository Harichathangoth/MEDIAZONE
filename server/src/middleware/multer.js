const multer = require('multer')

const avatarMulter =  multer({
    limits : {
        fileSize : 16000000
    },
    fileFilter( req, file, CB ) {
        if( !file.originalname.match(/\.(png|jpg|jpeg)$/) ){
            return CB(new Error(`Please upload a image file...`));
        }
        CB(undefined, true)
    }
})

module.exports = {
    avatarMulter
}