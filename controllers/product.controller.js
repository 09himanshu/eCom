/**
 * This is the controller class for the product resources
 */

const db = require('../models');
const Product = db.product;

/**
 * Handler for creating products
 */
exports.create = (req, res) => {
    /**
     * Get the request body
     */
    const prod = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        categoryId: req.body.categoryId
    }
    /**
     * Store the product in DB
     */
    Product.create(prod).then(products => {
        res.status(201).send(products);
    }).catch(err => {
        res.status(500).send({message: `Error occur at product controller ${err}`});
    });
}


/**
 * Handler for getting all the products
 */

exports.findAll = (req, res) => {
    const name= req.query.name;
    let promise;
    if(name) {
        promise = Product.findAll({
            where: {name}
        });
    } else {
        promise = Product.findAll();
    }
    promise.then( prod => {
        res.status(200).send(prod)
    }).catch(err => {
        res.status(500).send({message: `error occur at getAll product ${err}`});
    });
}
/**
 * Handler for get product based on id
 */
exports.findOne = (req, res) => {
    const id = req.params.id;
    Product.findByPk(id).then(prod => {
        res.status(200).send(prod);
    }).catch(err => {
        res.status(500).send({message: `Error occur at ${err}`});
    })
}

/**
 * Handler for update
 */
exports.update = (req, res) => {
    // product object
    const prod = {
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost
    }
    const id = req.params.id;
    Product.update(prod, {
        where: {id},
        returning: true
    }).then(() => {
        Product.findByPk(id).then(update => {
            res.status(200).send(update);
        }).catch(err => {
            res.status(500).send({message: `Server error occur at ${err}`})
        })
    }).catch(err => {
        res.status(500).send({message: `Server error occur at  ${err}`})
    })
}


/**
 * Handler for Delete
 */

exports.delete = (req, res) => {
    const id = req.params.id;
    Product.destroy({
        where: {id}
    }).then(() => {
        res.status(202).send({message: `Successfully deleted the product`});
    }).catch(err => {
        res.status(500).send({message: `Error occur at product delete ${err}`});
    })
}