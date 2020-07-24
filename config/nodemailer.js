const nodemailer = require( 'nodemailer' );
//const config = require( './keys' );
require('dotenv').config();

let transporter = nodemailer.createTransport( {
    service: 'Outlook365',
    secure: true,
    auth: {
        // user: config.GMAIL.email,
        // pass: config.GMAIL.password
        user: process.env.email,
        pass: process.env.pass
    }
} );

module.exports = transporter;


//https://nodemailer.com/smtp/well-known/