const connection = require('./connection');
export const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : connection.host,
      user : connection.user,
      password : connection.password,
      database : connection.database
    }
  });