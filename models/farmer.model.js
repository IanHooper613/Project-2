const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Farmer extends Model {
    static associate (models) {
      // Associate the Farmer model to the Post model in a `hasMany` relationship
      // When an Farmer is deleted, also delete any associated Posts
      Farmer.hasMany(models.Product, { onDelete: 'cascade' })
    }
  }
  Farmer.init({ name: DataTypes.STRING, address: DataTypes.STRING }, { sequelize })

  return Farmer
}
