// We are exporting a function that returns a Model class.
// This function will be called from the `/models/index.js` module
// created by the sequelize-cli
module.exports = function (sequelize, DataTypes) {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { len: [1] }
    },
    picture: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { len: [1] }
    }
  })

  // Add a static class method called `associate`. It will receive an object
  // with all of the Models as attributes -- e.g. models.Product and models.Farmer
  // This function will be called from the `/models/index.js` module created by
  // the sequelize-cli
  Product.associate = function (models) {
    // We're saying that a Product should belong to an Farmer
    // A Product can't be created without an Farmer due to the foreign key
    // constraint option `{ allowNull: false }`
    Product.belongsTo(models.Farmer, {
      foreignKey: { allowNull: false }
    })
    Product.belongsTo(models.Category, {
      foreignKey: { allowNull: false }
    })
  }

  return Product
}
