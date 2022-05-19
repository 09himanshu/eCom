// This file contains Signup routes 

const controller = require("../controllers/auth.controller");
const {validate, authValidate} = require("../middlewares");

module.exports = (app) => {

    // Signup users
    app.post("/eCom/api/v1/signup" , [authValidate.verifySign.checkUsername, authValidate.verifySign.validateRole] ,controller.signup);

    // Signin users
    app.post("/eCom/api/v1/signin", controller.signin);
}