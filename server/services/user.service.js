   const boom = require('@hapi/boom');
const { models } = require('../../server/libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {}

  async find() {
    const users = await models.User.findAll();
    return users;
  }

  async findOne(id) {
    console.log(id);
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound(`user with id ${id} not exist`);
    }
    return user;
  }


  //Function  used in login route

  async findByEmail(email) {

    const user = await models.User.findOne({
      where: { email },
    });

    if (!user) {
      throw boom.conflict(`User with email: ${email} not exist`);
    }

    return user;
  }

  async create(data) {
    const users = this.find();
    const user = (await users).find((user) => data.email === user.email);

    if (user) {
      throw boom.conflict(`User with email: ${data.email} already exists`);
    }

    const hashPassword = await bcrypt.hash(data.password, 10);
    const newData = {
      ...data,
      password: hashPassword,
    };
    const newUser = await models.User.create(newData);
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const updateUser = await user.update(data);
    return updateUser;

    // const index = this.users.findIndex((el) => el.id === id);
    // if (index === -1) {
    //   throw boom.notFound(`Category with id ${id} not exist`);
    // }
    // const user = this.users[index];
    // this.users[index] = { ...user, ...data };
    // return this.users[index];
  }

  async delete(id) {
    const user = this.findOne(id);
    (await user).destroy();
    return `user with id: ${id}, was deleted`;

    // const index = this.users.findIndex((el) => el.id === id);
    // if (index === -1) {
    //   throw boom.notFound(`user with id ${id} not exist`);
    // }
    // this.users.splice(index, 1);
    // return {
    //   id,
    //   message: `element with ${id} was deleted`,
    // };
  }
}

module.exports = UserService;
