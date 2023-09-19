const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subcontractor extends Model {}

Subcontractor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    skills: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    certifications: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Subcontractor',
  }
);

module.exports = Subcontractor;
