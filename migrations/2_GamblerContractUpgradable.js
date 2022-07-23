const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const GamblerContractUpgradable = artifacts.require("GamblerContractUpgradable");


module.exports = async function (deployer) {
  const instance = await deployProxy(GamblerContractUpgradable, { deployer });
  console.log('Deployed', instance.address);
};





// For future upgrades //

// const { upgradeProxy } = require('@openzeppelin/truffle-upgrades');

// const GamblerContractUpgradableV1 = artifacts.require('GamblerContractUpgradable');
// const GamblerContractUpgradableV2 = artifacts.require('GamblerContractUpgradableV2');

// module.exports = async function (deployer) {
//   const existing = await GamblerContractUpgradableV1.deployed();
//   const instance = await upgradeProxy(existing.address, GamblerContractUpgradableV2, { deployer });
//   console.log("Upgraded", instance.address);
// };