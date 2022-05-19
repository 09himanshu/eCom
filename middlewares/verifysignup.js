/**
 * Validation for the duplicate email or username
 */

const db = require("../models");
const user = db.user;
const Role = db.Role;


const checkUsername = (req, res, next) => {

    // check if the user provide the username or not
    if(!req.body.username) {
        return res.status(400).send({message: `Username is not provided`});
    }

    // check if the user provide the username or not
    if(!req.body.email) {
        return res.status(400).send({message: `email is not provided`});
    }

    // check for email
    user.findOne({
        where : { email: req.body.email}
    }).then(user => {
        if(user) {
            return res.status(400).send({message: `email is already registered`});
        }
        next();
    }); 
}


/**
 * Validator for correct roles
 */
const validateRole = (req, res, next) => {
    if(req.body.roles) {
        // I need to iterate through the roles provided by the customers

        for(let i = 0; i < req.body.roles.length; i++) {
            // if the req.body.roles[i] is not present in the allowed list of roles
            if(!Role.includes(req.body.roles[i])) {
                res.status(400).send({message: `Failed ! Role doesn;t exist ${req.body.roles[i]}`});
                return;
            }
        }
    }
    next();
}

const verifySign = {
    checkUsername : checkUsername,
    validateRole: validateRole
}

module.exports = {
    verifySign
}