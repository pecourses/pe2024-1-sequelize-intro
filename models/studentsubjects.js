'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentSubjects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  StudentSubjects.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'User',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      subjectId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Subject',
          key: 'id',
        },
        allowNull: true,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      },
      mark: DataTypes.REAL,
    },
    {
      sequelize,
      modelName: 'StudentSubjects',
    }
  );
  return StudentSubjects;
};
