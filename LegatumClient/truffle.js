module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },

    QA: {
      host: "localhost",
      port: 8545,
      network_id: "3", // Match any network id
      from : "0x5b93296d1aa3af945f64757fffec739c4dd96a1f"
      //Options -gas, gasPrice, from
      // truffle migrate --network QA
    },

    PRODUCTION: {
      host: "localhost",
      port: 8545,
      network_id: "1" // Match any network id
      //options - gas, gasPrice, from (first account available in client)
      // truffle migrate --network PRODUCTION
    }
  }
};
