require("dotenv").config();
const { MNEMONIC, INFURA_TOKEN } = process.env;

const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: MNEMONIC,
          providerOrUrl: `https://sepolia.infura.io/v3/${INFURA_TOKEN}`,
        }),
      network_id: 11155111, // Sepolia's network ID
      gas: 4465030,
    },
  },
  mocha: {
  },
  compilers: {
    solc: {
      version: "0.8.20",
    },
  },
};