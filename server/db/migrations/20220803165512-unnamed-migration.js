const { CATEGORY_TABLE } = require('../models/category.model');
const { DataTypes } = require('sequelize');
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CATEGORY_TABLE, 'name', {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    });
  },

  async down() {},
};
