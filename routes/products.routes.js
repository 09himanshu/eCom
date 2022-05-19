/**
 * All category routes logics are written here
 */

const controller = require("../controllers/product.controller");
const {validate, jwt} = require('../middlewares');

module.exports = (app) => {

    // Route for creating the list of all the products
    app.post('/eCom/api/v1/products', [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin,validate.validateProduct], controller.create);

    // Route for getting the list of all products
    app.get('/eCom/api/v1/products', controller.findAll);

    // Route for getting the list of  products based on id
    app.get('/eCom/api/v1/products/:id', controller.findOne);

    // Route for updating the list of  products
    app.put('/eCom/api/v1/products/:id', [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin,validate.validateProduct], controller.update);

    // Route for deleting the product 
    app.delete('/eCom/api/v1/products/:id',  [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin] ,controller.delete);
}