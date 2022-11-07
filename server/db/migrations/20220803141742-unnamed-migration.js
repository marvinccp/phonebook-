const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model');
const { CONTACT_TABLE, ContactSchema } = require('../models/contact.model');
const { USER_TABLE, UserSchema } = require('../models/user.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(CONTACT_TABLE, ContactSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(CONTACT_TABLE);
    await queryInterface.dropTable(USER_TABLE);
  },
};
