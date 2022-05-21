const express = require('express');
const config = require('./config/server.config');
const bodyParser = require('body-parser');
const db = require('./models');

const app = express();
app.use(bodyParser.json());


/**
 * Setup the relationship between category and products
 */
const Category = db.category;
const Product = db.product;
const Role = db.role;

Category.hasMany(Product)  // I : M relationship


/**
 * Create database connection
 */
db.sequelize.sync({force: true}).then(() => {
    console.log(`Database Connected`);
    init();
}).catch(err => {
    console.log(`Error occur at database connection ${err}`);
});

/**
 * This function should be executed at the begining of the app start
 */
function init() {
    /**
     * create some initial categories
     */
    let categories = [
        {
            name : "Electronics",
            description: "This category will contain all electronics products",
        }, {
            name : "Kitchen Items",
            description: "This category will contain all kitchen related products",
        }
    ]

    Category.bulkCreate(categories).then(() => {
        console.log(`Categories are added`);
    }).catch(err => {
        console.log('err happen',err);
    })

    /**
     * Create the roles
     */
    Role.create({
        id:1,
        name: "customer"
    });

    Role.create({
        id:2,
        name: "admin"
    });

}
/**
 * Route folder address
 * Initialize the routes
 */
require('./routes/category.routes')(app);
require('./routes/products.routes')(app);
require('./routes/signup.routes')(app);
require('./routes/cart.routes')(app);

/**
 * Server listen on port
 */
app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
});