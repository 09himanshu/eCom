const controller = require('../controllers/cart.controller');
const {jwt} = require("../middlewares")

module.exports = (app) => {

    // Route for creating the cart
    app.post("/eCom/api/v1/carts",[jwt.jwtAuth.verifyToken], controller.create);

    app.put("/eCom/api/v1/carts/:id", [jwt.jwtAuth.verifyToken], controller.update);

    app.get("/eCom/api/v1/carts/:id",[jwt.jwtAuth.verifyToken], controller.getCart);
}