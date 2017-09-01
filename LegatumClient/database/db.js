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
  user_id: { type: sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize.UUIDV4},
  username: { type: sequelize.STRING, unique: true, allowNull: false },
  pub_key: { type: sequelize.STRING, unique: true, allowNull: false },
  ssn: { type: sequelize.INTEGER, unique: true, allowNull: false }
});

// Contracts Table
const Contract = db.define('contract', {
  hash: { type: sequelize.STRING, unique: true, allowNull: false },
  contract_id: { type: sequelize.UUID,  allowNull: false, primaryKey: true, defaultValue: sequelize.UUIDV4 },
  block_id: { type: sequelize.STRING, unique: true, allowNull: false }
});



// Transactions Table
const Transaction = db.define('transaction', {
  transaction_id: { type: sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize.UUIDV4 },
  user_idFK: { type: sequelize.UUID, allowNull: false },
  contract_idFK: { type: sequelize.UUID, allowNull: false }
});

// Associations 
User.belongsToMany(Contract, {through: 'Transaction', foreignKey: 'user_idFK' })
Contract.belongsToMany(User, { through: 'Transaction', foreignKey: 'contract_idFK' })


// TESTING DB
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    username: 'johndoe',
    pub_key: 'this is a test 1234342342342',
    ssn: 2345433
  });
});

Contract.sync({force: true}).then(() => {
  // Table created
  return Contract.create({
    hash: 'this is a test for hash',
    block_id: 'akjkjsdkfjsdkfjssdfsd'
  });
});

Transaction.sync({force: true}).then(() => {
  // Table Created
  return Transaction.create({
    user_idFK: 'e86de438-2edb-47df-8c64-8fef0db3996b',
    contract_idFK: '35396b34-f176-46ff-8dc8-680431645753'
  })
})

module.exports = { User, Contract, Transaction, db };
