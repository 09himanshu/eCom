 /**
  * This will hold the schema for Cart
  */

module.exports = (sequelize, Sequelize) => {
    const Cart = sequelize.define('cart', {
        cost: {
            type: Sequelize.INTEGER,
        }
    });
    return Cart;
}