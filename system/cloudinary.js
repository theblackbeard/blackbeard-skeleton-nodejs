module.exports = (cloudinary, config) => {
    cloudinary.config({
        cloud_name: config.CLOUDNAME,
        api_key: config.APIKEY,
        api_secret: config.APISECRET
    });
}