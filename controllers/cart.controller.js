const db = require("../models");
const Cart = db.cart;
const Product = db.product;

/**
 * Handler for creating the cart request
 */
exports.create = (req, res) => {
    const cart = {
        userId : req.userId
    }

    // If the user has also provided the item ids while creating cart
    Cart.create(cart).then( cart => {
        res.status(201).send(cart);
    }).catch( err => {
        res.status(500).send({ message: `Some error occur at cart ${err}`});
    })
}

/**
 * Handler for updating the cart
 */
exports.update = (req, res) => {
    // Figure out the cart if it's present , which needs to be updated

    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart => {

        //  Add the product passes in the request body to the cart
        let productIds = req.body.productIds;
        Product.findAll({
            where: { id : productIds }
        }).then(products => {
            if(! products) {
                res.status(400).send({message: `Products trying to add doesn't exists`});
                return;
            }
            // Set these productsinside the Cart
            cart.setProducts(products).then(() => {
                // Take care of cost part
                let cost  = 0;
                let productsSelected = [];
                cart.getProducts().then(cartProduct => {
                    for(let i = 0; i < cartProduct.length; i++) {
                        productsSelected.push({
                            id: cartProduct[i].id,
                            name: cartProduct[i].name,
                            cost: cartProduct[i].cost,
                        });
                        cost = cost + cartProduct[i].cost;
                    }
                    // Ready to return the cart update response
                    res.status(200).send({
                        id: cart.id,
                        productsSelected: productsSelected,
                        cost: cost,
                    })
                })
            })
        })

    }).catch(err => {
        res.status(500).send({message: `Error while updating the cart ${err}`});
    })
}

/**
 * Search for a cart based on the cart Id
 */

exports.getCart = (req, res) => {
    const cartId = req.params.id;
    Cart.findByPk(cartId).then(cart => {
        let cost  = 0;
        let productsSelected = [];
        cart.getProducts().then(cartProduct => {
            for(let i = 0; i < cartProduct.length; i++) {
                productsSelected.push({
                    id: cartProduct[i].id,
                    name: cartProduct[i].name,
                    cost: cartProduct[i].cost,
                });
                cost = cost + cartProduct[i].cost;
            }
            // Ready to return the cart update response
            res.status(200).send({
                id: cart.id,
                productsSelected: productsSelected,
                cost: cost,
            })
        })
    })
}