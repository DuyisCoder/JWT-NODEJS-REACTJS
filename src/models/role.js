'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Create Relationship
      Role.belongsToMany(models.Group, { through: 'GroupRole' });
    }
  };
  // Object Relationl Mapping
  Role.init({
    url: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};