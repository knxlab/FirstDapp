const Erc20Test = artifacts.require("Erc20Test");

module.exports = function (deployer) {
  deployer.deploy(Erc20Test);
};
