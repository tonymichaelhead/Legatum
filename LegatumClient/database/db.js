// Dependencies
const sequelize = require('sequelize');
const mysql = require('mysql2');

// MariaDB connection
// **************** You have to enter the connection string before running. DO NOT LEAVE IT IN THE FILE WHEN YOU ADD OR COMMIT!!!!!!!! ******************
const db = new sequelize('');

// Connection Authentication & Successfull connection
db
  .authenticate()
  .then( () => {
    console.log('Good connection as fuck');
  })
  .catch(err => {
    console.error('Error as fuck', err);
  });


// Users Table
const User = db.define('user', {
  user_id: { type: sequelize.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true },
  username: { type: sequelize.STRING, unique: true, allowNull: false },
  pub_key: { type: sequelize.STRING, unique: true, allowNull: false },
  ssn: { type: sequelize.INTEGER, unique: true, allowNull: false }
});

// Contracts Table
const Contract = db.define('contract', {
  hash: { type: sequelize.STRING, unique: true, allowNull: false },
  contract_id: { type: sequelize.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true },
  footprint: { type: sequelize.DATE, unique: true, allowNull: false, defaultValue: sequelize.NOW },
  block_id: { type: sequelize.STRING, unique: true, allowNull: false }
});

// Transactions Table
// const Transaction = db.define('transaction', {
//   transaction_id: { type: sequelize.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true },
//   user_idFK: { type: sequelize.INTEGER, references:{ model: User, key: user_id }, allowNull: false },
//   contract_idFK: { type: sequelize.INTEGER, references: { model: Contract, key: contract_id }, allowNull: false }
// });

// TESTING DB
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    user_id: 1,
    username: 'johndoe',
    pub_key: 'this is a test 1234342342342',
    ssn: 2345433
  });
});

Contract.sync({force: true}).then(() => {
  // Table created
  return Contract.create({
    hash: 'this is a test for hash',
    contract_id: 12312312123,
    footprint: '',
    block_id: 'akjkjsdkfjsdkfjssdfsd'
  });
});

module.exports = { };
