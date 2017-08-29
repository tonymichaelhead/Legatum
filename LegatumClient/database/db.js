const knex = require('knex')({
  clinet: 'mariadb',
  connection: {
    host: 'host',
    user: 'user',
    password: 'password',
    databse: 'database',
    charset: 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);

const modelRENAMEME = bookshelf.Model.extend({
  tableName: 'tableName'
})

