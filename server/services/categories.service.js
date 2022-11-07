const boom = require('@hapi/boom');
const { models } = require('../../server/libs/sequelize');
// const {sequelize} = require('../libs/sequelize');

class CategoryService {
  constructor() {}

  async find() {
    const categories = await models.Category.findAll({
      include: 'contacts'
    });
    return categories;
    // const [data] = await sequelize.query('SELECT * FROM task');
    // return data;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if(!category){
      throw boom.notFound(`Category with id: ${id} not found`)
    }
    return category;

    // const category = this.elements.find((el) => id === el.id);
    // if (!category) {
    //   throw boom.notFound(`Category with id ${id} not exist`);
    // }
    //return category;
  }

  async create(data) {
    const categories = this.find();
    const category = (await categories).find((contact) => data.name === contact.name);
    if (category) {
      throw boom.conflict(`Category named: ${data.name} already exists`);
    }
    const newCategory = await models.Category.create(data);
    return newCategory;
    // const newCategory = this.elements.push(data);
    // return newCategory;
  }

  async update(id, data) {

    const category = await this.findOne(id)
    const newCategory = await category.update(data)
    return newCategory

    // const index = this.elements.findIndex((el) => el.id === id);
    // if (index === -1) {
    //   throw boom.notFound(`Category with id ${id} not exist`);
    // }
    // const category = this.elements[index];
    // this.elements[index] = { ...category, ...data };
    // return this.elements[index];
  }

  async delete(id) {

    const category = await this.findOne(id);
    category.destroy()

    return `Category with id: ${id}, was deleted`
  }
}

module.exports = CategoryService;
