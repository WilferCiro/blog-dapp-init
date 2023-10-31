import Web3 from "web3";
import { abi } from "./constants/ABI";
import { Contract } from "web3-eth-contract";

const addressSmartContract = import.meta.env.VITE_ADDRES_SMART_CONTRACT;
let userAccount: string;
let erc20Contract: Contract;
let isInitialized = false;

export const initEthereum = async () => {
  if (isInitialized) {
    return;
  }
  if ("ethereum" in window) {
    const provider = window?.ethereum;

    if (provider) {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts: string[]) => {
          userAccount = accounts[0];
          console.log(`Selected account is ${userAccount}`);
        })
        .catch(() => {
          return;
        });

      (provider).on(
        "accountsChanged",
        function (accounts: string[]) {
          userAccount = accounts[0];
          console.log(`Selected account changed to ${userAccount}`);
        }
      );
      const web3 = new Web3(provider);
      erc20Contract = new web3.eth.Contract(abi, addressSmartContract);
    }
    isInitialized = true;
  } else {
    console.log("ERRORR");
  }
};

interface CertSchema {
  address: string;
  tokenURI: string;
}
export interface ReturnSchema {
  blockHash: string;
  blockNumber: number;
  contractAddress: null;
  cumulativeGasUsed: number;
  effectiveGasPrice: number;
  from: string;
  gasUsed: number;
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: string;
}
export const safeMint = async ({
  address,
  tokenURI,
}: CertSchema): Promise<ReturnSchema> => {
  if (!isInitialized) {
    await initEthereum();
  }
  const response = await erc20Contract.methods
    .safeMint(address, tokenURI)
    .send({ from: userAccount });
  return response as ReturnSchema;
};
