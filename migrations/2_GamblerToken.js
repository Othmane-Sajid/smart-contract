const GamblerToken = artifacts.require("GamblerToken");

module.exports = function (deployer) {
  deployer.deploy(GamblerToken);
};
