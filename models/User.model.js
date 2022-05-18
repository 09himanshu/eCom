/**
 * This will contain the schema details of the user
 */


module.exports = (sequelize,Sequelize) => {
    const User = sequelize.define("user",{
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });
    return User;
}