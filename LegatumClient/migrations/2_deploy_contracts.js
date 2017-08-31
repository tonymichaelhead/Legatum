// var MetaCoin = artifacts.require("./MetaCoin.sol");
const will = artifacts.require("./will.sol");
module.exports = function(deployer) {
  
  deployer.deploy(will);
};
