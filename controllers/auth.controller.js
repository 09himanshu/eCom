/**
 * This controllers file will be used for authentication and authorization
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/server.config');
const db = require('../models');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
/**
 * Handler for signup
 */
exports.signup = (req, res) => {
    const detail = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        roles: req.body.roles
    }

    // Persist this user object in the db
    User.create(detail).then(user => {
        console.log("User created");
        // Provide the correct role to the user
        if(req.body.roles) {
            // I need to first have the Roles created in the system

            // I need to check if the desire roles match with the supported roles
            Role.findAll({
                where : { name: {[Op.or] : req.body.roles}}
            }).then(roles => {
                // Set the roles with user
                user.setRoles(roles).then( () => {
                    console.log('Registration complete');
                    res.status(201).send({message: `User successfully registred`})
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                console.log('Registration complete');
                res.status(201).send({message: `User successfully registred`})
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(500).send({message: `Error occur at signup ${err}`});
    })
}

/**
 * Handler for signin
 */

exports.signin = (req, res) => {
    // check if the user exists 
    User.findOne({
        where : {email: req.body.email}
    }).then(user => {
        if(!user) {
            res.status(404).send({message: `User not found`});
            return;
        }

        // verify password
        let isValid = bcrypt.compareSync(req.body.password, user.password);
        if(!isValid) {
            res.status(401).send({message: `Invalid password`});
        }

        // Need to generate the access token
        let token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 300 
        })

        // I want to provides the roles assigned to user in the response
        let authorities = [];
        user.getRoles().then(roles => {
            for(let i = 0; i < roles.length; i++) {
                authorities.push("Role_"+roles[i].name.toUpperCase());
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                token: token,
            })
        });   
    }).catch(err => {
        res.status(500).send({message: `Error occur at signin ${err}`})
    })
}
