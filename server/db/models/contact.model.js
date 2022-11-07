const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model')


//nombre de la tabla
const CONTACT_TABLE = 'contact';

//esquema de la tabla en la base datos
const ContactSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  contactName: {
    allowNull: false,
    field: 'contact_name',
    type: DataTypes.STRING,
    unique: true,
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  isFavorite: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'is_favorite',
  },

  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },

  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },

};


class Contact extends Model {
  static assocciate(models) {
    this.belongsTo(models.Category, {as: 'category'})
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: CONTACT_TABLE,
      modelName: 'Contact',
      timestamps: false,
    };
  }
}

//exportamos la tabla, el esquema y el modelo
module.exports = { CONTACT_TABLE, ContactSchema, Contact };
