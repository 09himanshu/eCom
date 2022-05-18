/**
 * This file will be responsible for routing the request to the 
 * correct controllers methid
 */

const controller = require('../controllers/category.controller');
const {validate,jwt} = require('../middlewares');

module.exports = (app) =>{

    // Route for creating a new categories
    app.post('/eCom/api/v1/categories', [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin,validate.validateCategory], controller.create);

    // Route for getting all categories
    app.get('/eCom/api/v1/categories', controller.findAll);

    // Route for getting category based on id
    app.get('/eCom/api/v1/categories/:id', controller.findOne);

    // Route for updating the category
    app.put('/eCom/api/v1/categories/:id', [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin,validate.validateCategory] ,controller.update);

    // Route for deleting the category
    app.delete('/eCom/api/v1/categories/:id', [jwt.jwtAuth.verifyToken,jwt.jwtAuth.isAdmin] ,controller.delete);
}