'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });

  Category.associate = models => {
    Category.hasMany(models.Article, {
      as: 'articles',
      foreignKey: 'categoryId'
    })

    Category.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  }

  return Category;
};