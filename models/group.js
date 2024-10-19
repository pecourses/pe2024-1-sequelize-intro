'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Group.hasMany(models.User, {
        foreignKey: {
          name: 'groupId',
          // allowNull: false,
        },
        onUpdate: 'CASCADE', // sync
        onDelete: 'RESTRICT', // sync
      });
    }
  }
  Group.init(
    {
      title: DataTypes.STRING,
      enteredAt: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: 'Group',
    }
  );
  return Group;
};
