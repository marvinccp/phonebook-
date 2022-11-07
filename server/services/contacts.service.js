const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres'
const { models } = require('../../server/libs/sequelize');

class ContactsService {
  constructor() {
    // this.contacts = [ // contacts objects ];
  }

  async find() {
    const contacts = await models.Contact.findAll();
    return contacts;
    // const client = await getConnection()
    // const response = await client.query('SELECT * FROM task')
    // return response.rows
  }

  async findOne(id) {

    const contact = await models.Contact.findByPk(id)
    if(!contact){
      throw boom.notFound(`Contact with id ${id} not found`);
    }
    return contact;
    // const contact = this.contacts.find((el) => id === el.id);
    // if (!contact) {
    //   throw boom.notFound(`Contact with id ${id} not exist`);
    // }
    // return contact;
  }

  async create(data) {

    const newContact = await models.Contact.create(data)
    return newContact
    // const newContact = this.contacts.push(data);
    // return newContact;
  }

  async update(id, data) {



    const contact = await this.findOne(id)
    const updateContact = contact.update(data)
    return updateContact

    // const index = this.contacts.findIndex((el) => el.id === id);
    // if (index === -1) {
    //   throw boom.notFound(`Category with id ${id} not exist`);
    // }
    // const contact = this.contacts[index];
    // this.contacts[index] = { ...contact, ...data };
    // return this.contacts[index];
  }

  async delete(id) {

    const contact = this.findOne(id);
    (await contact).destroy()
    return ` Contact with id ${id}, was deleted`

  //   const index = this.contacts.findIndex((el) => el.id === id);
  //   if (index === -1) {
  //     throw boom.notFound(`Contact with id ${id} not exist`);
  //   }
  //   this.contacts.splice(index, 1);
  //   return {
  //     id,
  //     message: `element with ${id} was deleted`,
  //   };
  }
}

module.exports = ContactsService;
