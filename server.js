'use strict';
const express = require('express')
const app = express();
const config = require('./system/config')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
const cloudinary = require('cloudinary')
const jwt = require('jwt-simple')
const middlepart = multiparty()
const passport = require('passport')
require('./system/database')(config) //databse conection
require('./system/cloudinary')(cloudinary, config) //cloudinary conf
/* */
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(passport.initialize())
/* */
require('./system/passport')(passport, config) //passport conf
require('./system/routes')(app, passport, jwt, multiparty) //routes conf
/**/
    
app.listen(config.PORTSERVER, config.IPSERVER, () => {
    console.log("Server Running on " , config.PORTSERVER)
})
/**/


