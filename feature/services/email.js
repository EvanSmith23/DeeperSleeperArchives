"use strict";
const nodemailer = require("nodemailer");

require('dotenv').config();

module.exports = {
  sendOffEmail: async (email, localPath, token) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    
      // send mail with defined transport object
      let info = await transporter.sendMail({
          from: 'Microsite Notifications <' + process.env.EMAIL + '>',
          to: email,
          subject: "You have been granted access to a Microsite account", // Subject line
          text: "Confirm Your Microsite Account", // plain text body
          html: "<p>Hello,</p><p>You have been granted a microsite account, please click this link to confirm your account: <a href='https://cx-shield.herokuapp.com/" + localPath + token + "'>Confirm Your Account</a><p>Sincerely,</p>The CX Engineering Team<p></p><p>This message was sent from a notification-only email address that does not accept incoming email. Please do not reply to this message.</p>", // html body
      });

      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.log(error);
    }
  },
};
