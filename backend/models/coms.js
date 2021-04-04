'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Coms extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Coms.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,

                },
                onDelete: 'CASCADE',
            });
            models.Coms.belongsTo(models.Post, {
                foreignKey: {
                    allowNull: false,

                },
                onDelete: 'CASCADE'
            });
        }
    };
    Coms.init({
        userId: DataTypes.INTEGER,
        postId: DataTypes.INTEGER,
        by: DataTypes.STRING,
        text: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Coms',
    });
    return Coms;
};