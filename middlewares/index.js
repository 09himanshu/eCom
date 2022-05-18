const validate = require('./requestValidator');
const authValidate = require('./verifysignup');
const jwt = require('./authJWT');

module.exports = {
    validate,
    authValidate,
    jwt
}