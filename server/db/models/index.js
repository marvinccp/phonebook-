const { User, UserSchema } = require('./user.model')
const { Category, CategorySchema  } = require('./category.model')
const { Contact, ContactSchema } = require('./contact.model')

const setupModels = ( sequelize ) => {
  User.init(UserSchema, User.config(sequelize))
  Category.init(CategorySchema, Category.config(sequelize));
  Contact.init(ContactSchema, Contact.config(sequelize));

  
  Contact.assocciate(sequelize.models);
  Category.assocciate(sequelize.models);
}

module.exports = setupModels;