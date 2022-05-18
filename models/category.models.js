/**
 *This file will contains the schema defination for the category resource
 We would to exports this schema to be called from other module

*/

module.exports = (sequelize,Sequelize) => {
    const Category = sequelize.define('category', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }, 
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    })
    return Category;
}