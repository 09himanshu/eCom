/**
 * This file consists of middlewares for validating the request body
 */

const category = require('../models').category;

/**
 * Validate the request body for categories
 */
const validateCategory = (req,res, next) => {
    //check for name
    if(!req.body.name) {
        return res.status(404).send({message: `Name of the category is not provided`});
    }

    // check for description
    if(!req.body.description) {
        return res.status(404).send({message: `Description of the category is not provided`});
    }

    // Go the controller
    next();
}


/**
 * Validate the request body of product
 */

const validateProduct = (req, res, next) => {
    //check for name
    if(!req.body.name) {
        return res.status(404).send({message: `Name of the category is not provided`});
    }

    // check for description
    if(!req.body.description) {
        return res.status(404).send({message: `Description of the category is not provided`});
    }

    // check for dcost
    if(req.body.cost <= 0) {
        return res.status(404).send({message: `Cost doesn't seem to be in place`});
    } else if(!req.body.cost) {
        return res.status(404).send({message: `Cost of the product is not provided`});
    }

    // check categoryId
    if(req.body.categoryId) {
        // check if it's valid value
        category.findByPk(req.body.categoryId).then(category => {
            if(!category) {
                return res.status(400).send({message : `CategoryId is not valid`});
            }
            next();
        })
    } else {
        return res.status(400).send({message : `CategoryId is not provided`});
    }
}

module.exports = {
    validateCategory: validateCategory,
    validateProduct: validateProduct
}