// Dependencies
const sequelize = require('sequelize');
const mysql = require('mysql2');
const credentials = require('../env/db.config');

// MariaDB connection
// **************** You have to enter the connection string before running. DO NOT LEAVE IT IN THE FILE WHEN YOU ADD OR COMMIT!!!!!!!! ******************
const db = new sequelize(credentials.DB_PATH);

// Connection Authentication & Successfull connection
db
  .authenticate()
  .then( () => {
    console.log('Database has connected.');
  })
  .catch(err => {
    console.error('Error while attempting to connect.', err);
  });


// Users Table
const User = db.define('user', {
  admin: { type: sequelize.BOOLEAN },
  user_id: { type: sequelize.UUID, allowNull: false, primaryKey: true, defaultValue: sequelize.UUIDV4},
  username: { type: sequelize.STRING, unique: true, allowNull: false },
  email: { type: sequelize.STRING, unique: true, allowNull: false },
  pub_key: { type: sequelize.STRING, unique: true, allowNull: false },
  ssn: { type: sequelize.INTEGER, unique: true, allowNull: false }
});

// Contracts Table
const Contract = db.define('contract', {
  pending: { type: sequelize.BOOLEAN },
  username: { type: sequelize.STRING, unique: false, allowNull: false },
  contract_nickname: { type: sequelize.STRING, unique: true, allowNull: false },
  hash: { type: sequelize.STRING, unique: false, allowNull: true },
  contract_id: { type: sequelize.UUID,  allowNull: false, primaryKey: true, defaultValue: sequelize.UUIDV4 },
  contract_addr: { type: sequelize.STRING, allowNull: true },
  will_text: { type: sequelize.STRING, allowNull: false },
  file_name: { type: sequelize.STRING, allowNull: false },
  beneficiary: { type: sequelize.STRING, allowNull: false },
  will_hash: { type: sequelize.STRING, allowNull: true }
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
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     username: 'johndoe',
//     email: 'johndoe@johndoe.com',
//     pub_key: 'this is a test 1234342342342',
//     ssn: 2345433
//   }).then(function() {
//     return User.create({
//       username: 'T-mac',
//       email: 'tony@tony.com',
//       pub_key: 'thisrstdsrtd is a test 1234342342342',
//       ssn: 23000045433
//     })
//   })
// });



// Contract.sync({force: true}).then(() => {
//   // Table created
//   return Contract.create({
//     username: 'bullshit username',
//     hash: 'this is a test for hash',
//     contract_nickname: 'akjkjsdkfjsdkfjssdfsd',
//     will_text: 'AYYYYOOO WILL text yo',
//     file_name: 'file.js',
//     beneficiary: '12346789xxx'
//   });
// });

// Transaction.sync({force: true}).then(() => {
//   // Table Created
//   return Transaction.create({
//     user_idFK: 'e86de438-2edb-47df-8c64-8fef0db3996b',
//     contract_idFK: '35396b34-f176-46ff-8dc8-680431645753'
//   })
// })

module.exports = { User, Contract, Transaction, db };
