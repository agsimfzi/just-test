'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Article.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });

  Article.associate = models => {
    Article.belongsTo(models.Category, {
      as: 'category',
      foreignKey: 'categoryId'
    })

    Article.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    })
  }

  return Article;
};