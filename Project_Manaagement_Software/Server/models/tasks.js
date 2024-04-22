'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  tasks.init({
    task_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    project_id: DataTypes.INTEGER,
    task_name: DataTypes.STRING,
    task_details: DataTypes.TEXT,
    estimate_time: DataTypes.TIME,
    status: DataTypes.ENUM('Open','Close'),
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tasks',
  });
  return tasks;
};