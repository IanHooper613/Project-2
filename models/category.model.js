const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate (models) {
      // Associate the farmer model to the Item model in a `hasMany` relationship
      // When an farmer is deleted, also delete any associated Items
      Category.hasMany(models.Product, { onDelete: 'cascade' })
    }
  }
  Category.init({ name: DataTypes.STRING, address: DataTypes.STRING }, { sequelize })

  return Category
}
