const { DataTypes, Sequelize, Model } = require('sequelize');

//nombre de la tabla
const CATEGORY_TABLE = 'categories';

//esquema de la tabla en la base datos
const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },

};

class Category extends Model {
  static assocciate(models) {
    this.hasMany(models.Contact,{
      as: 'contacts',
      foreignKey: 'categoryId'
    })

  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Category',
      timestamps: false,
    };
  }
}



//exportamos la tabla, el esquema y el modelo
module.exports = { CATEGORY_TABLE, CategorySchema, Category};
