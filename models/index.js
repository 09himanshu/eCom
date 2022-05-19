/**
 * This file will expose the functionalities of all the model files define under
 * the models directory
 */

const Sequelize = require('sequelize');
const config = require('../config/server.config');

const sequelize = new Sequelize(config.db, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: Number(config.pool.max),
        min: Number(config.pool.min),
        acquire: config.pool.acquire,
        idle: config.pool.idle,
    }
})

/**
 * I need to expose the sequelize and categories model
 */

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.category = require('./category.models')(sequelize,Sequelize); 
db.product = require('./product.models')(sequelize, Sequelize);
db.user = require('./User.model')(sequelize,Sequelize);
db.role = require('./Role.model')(sequelize,Sequelize);
db.Role = ["customer", "admin"];
db.cart = require('./cart.model')(sequelize, Sequelize);

/**
 * Many to many relationship between user and role
 */
db.role.belongsToMany(db.user, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.user.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
})

/**
 * Establish the relationship between cart and user
 * 1. user and cart : One to many
 * 2.cart and product : Many to Many
 */

db.user.hasMany(db.cart) 

db.product.belongsToMany(db.cart, {
    through: "cart_product",
    foreignKey: "productId",
    otherKey: "cartId"
});

db.cart.belongsToMany(db.product,{
    through: "cart_product",
    foreignKey: "cartId",
    otherKey: "productId"
})

module.exports = db;