/**
 * This file will contain the schema for products
 */

module.exports = (sequelize,Sequelize) => {
    const Product = sequelize.define('product', {
        name: {
            type: Sequelize.STRING,
            alloNull: false
        },
        description: {
            type: Sequelize.STRING,
            alloNull: false
        },
        cost: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Product;
}