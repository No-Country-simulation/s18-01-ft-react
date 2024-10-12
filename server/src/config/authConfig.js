const dotenv = require('dotenv');
const { auth } = require('express-openid-connect');

dotenv.config();

const authConfig = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_CLIENT_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  }

module.exports = auth(authConfig)