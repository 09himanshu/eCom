/**
 * This file will have all the logic that is needed for the processing of request
 */

const db = require('../models');
const Category = db.category;

exports.create = (req, res) => {
    /**
     * Try to create the category object request
     */
    const categories = {
        name: req.body.name,
        description : req.body.description
    }

    // Store this in the db
    Category.create(categories).then(category => {
        res.status(201).send(category);
    }).catch(err => {
        res.status(500).send({message: `Some error occur at category create controller ${err}`});
    })
}

/**
 * Hnadler for getting all the categories
 */

exports.findAll = (req, res) => {
    /**
     * I need to intercept the query params and use it
     */
    const name = req.query.name;
    /**
     * If a get a query params, which is is name I should apply the filter 
     * else no filter
     */
    let promise;
    if(name) {
        promise = Category.findAll({
            where: {name}
        });
    } else {
        promise = Category.findAll();
    }
    promise.then(categories => {
        res.status(200).send(categories);
    }).catch( err => {
        res.status(500).send({message: `Error occur at category.findAll ${err}`});
    });
}

/**
 * Handler for getting the categories baed on the id
 */

exports.findOne = (req, res) => {
    const id = req.params.id;
    Category.findByPk(id).then(category => {
        res.status(200).send(category);
    }).catch(err => {
        res.status(200).send({message: `Error coour at fnidByPk category ${err}`});
    })
}

/**
 * Provide support for updating the category
 */

exports.update = (req, res) => {
    // I need to parse the request body
    const categories = {
        name: req.body.name,
        description : req.body.description
    }
    /**
     * I need to know which category has to be updated
     */

    const id = req.params.id;
    /**
     * It's time to update the category
     */
    Category.update(categories, {
        where: {id},
        returning: true
    }).then(() => {
        Category.findByPk(id).then(update => {
            res.status(200).send(update);
        }).catch(err => {
            res.status(500).send({message: `Error occur at update ${err}`});
        })
    }).catch(err => {
        res.status(500).send({message: `Error occur at update ${err}`});
    })
}

/**
 * Deleting the Category
 */
exports.delete = (req, res) => {
    const id = req.params.id;
    Category.destroy({ 
        where: {id} 
    }).then(() => {
        res.status(200).send({message: `Category deleted successfully`});
    }).catch(err => {
        res.status(500).send({message: `Server error occur at delete ${err}`});
    })
}
 