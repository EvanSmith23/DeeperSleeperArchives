const Axios = require('axios');
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_DEV_CLIENT_ID);

require('dotenv').config();

module.exports = {
    sign_in: async function (req, res) {
        try {
            console.log(req.body.token)
            const { token }  = req.body;

            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_DEV_CLIENT_ID
            });

            console.log(ticket);

            const { name, email, picture } = ticket.getPayload();    

            res.sendStatus(201).json(user);
        } catch (err) {
            console.error(err);
        }
    },
}