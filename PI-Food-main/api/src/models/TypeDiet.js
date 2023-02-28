const { DataTypes } = require('sequelize');


module.exports = (Sequelize) => {
    Sequelize.define('typeDiet', {
        name: {
            type: DataTypes.STRING,
        }
    })
}