const path = require('path');
const fs = require('fs');

const dAppContract = artifacts.require("dAppContract");

module.exports = function (deployer) {
  const { OWNERS_ADDRESS: owners} = process.env;
  deployer.deploy(dAppContract, "dApp NFTs", "DAPP", owners.split(","));

  const abi = dAppContract.abi;

  const abiPath = path.join(__dirname, 'abi.json');
  fs.writeFileSync(abiPath, JSON.stringify(abi, null, '\t'));
};
