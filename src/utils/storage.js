dotenv = require('dotenv').config(); //Libreria para acceder a las variables del .env
const cloudinary = require('cloudinary');

const storage = ({stream}) => {
    cloudinary.config({
        cloud_name: process.env.CLDINARY_NAME,
        api_key: process.env.CLDINARY_APIKEY,
        api_secret: process.env.CLDINARY_SECRET
    })

    return new Promise ((resolve, reject) => {
        const buffer = cloudinary.v2.uploader.upload_stream((err, res) => {
            if(err){
                reject(err);
            }
            resolve(res);
        })
        stream.pipe(buffer);
    })
}

module.exports = storage;