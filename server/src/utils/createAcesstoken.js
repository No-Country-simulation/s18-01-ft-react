const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

function createAccess(payload) {
    return new Promise(function (resolve, reject) {
        jwt.sign(
            { payload: payload },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            function (err, token) {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}

module.exports = { createAccess };