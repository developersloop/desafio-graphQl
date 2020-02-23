// Update with your config settings.

module.exports = {
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'develop',
    password : '@Dualcore1',
    database: 'desafio-cap-04',
  
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
