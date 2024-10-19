'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Subject.belongsToMany(models.User, {
        through: 'StudentSubjects',
        foreignKey: 'subjectId',
      });
    }
  }
  Subject.init(
    {
      title: DataTypes.STRING,
      hours: DataTypes.SMALLINT,
    },
    {
      sequelize,
      modelName: 'Subject',
    }
  );
  return Subject;
};
