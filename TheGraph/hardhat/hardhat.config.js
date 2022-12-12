require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    mumbai:{
      url:"https://polygon-mumbai.g.alchemy.com/v2/KM1Kv-cqY7LlaPsoximQwOASxTzExuR5",
      accounts:["05c9162a926946c4fe7d3645742decff7853ee99f5dad08d0a7d5d95fd3afce7"]
    }
  },
  etherscan:{
    apiKey:{
      polygonMumbai: "Z2A41S3P6GICCGAFVMZM5UQ73KQ8BQBZXT"
    }
  }
};
