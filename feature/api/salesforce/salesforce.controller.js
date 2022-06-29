const Axios = require('axios');

const User = require('../../../models/salesforce/user.js');

require('dotenv').config();

module.exports = {
    create_user: async function (req, res) {
        let { name, email, password, confirmPassword } = req.body;

        if (!name || !email || !password || !confirmPassword) {
            console.log("VALIDATION FAILED: Invalid Request Body");

            return res.sendStatus(400).send('Bad Request: Name, Email and Password Required.');
        } else if (password !== confirmPassword) {
            console.log("VALIDATION FAILED: Passwords are different");

            return res.sendStatus(400).send('Bad Request: Passwords need to match.');
        } 

        try {
            let user = await new User({ 
                'email__c': email,
                'name': name,
                'password__c': password
            }).save();

            return res.sendStatus(200);
        } catch (error) {
            console.log('User Creation Failed: ', error);
        
            return res.sendStatus(500).send("Error creating the user. Check if the email is already in use.");
        }
    },
};