const { Client } = require('pg');

const getConnection = async () => {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'marvin',
    password: 'admin246',
    database: 'my_sbook',
  });
  await client.connect();
  return client;
};

module.exports = getConnection;
