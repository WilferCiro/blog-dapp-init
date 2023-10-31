import { useEffect, useState } from "react";
import { ReturnSchema, initEthereum, safeMint } from "./service";
import "./App.css";

function App() {
  const [response, setResponse] = useState<ReturnSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    initEthereum();
  }, []);

  const mint = async () => {
    setLoading(true);
    const res = await safeMint({ address: "0x8d4e9Ad1DE5516fd5d75B96b021Dd73F99FD79d6", tokenURI: "ipfs://token" });
    setLoading(false);
    setResponse(res);
  };

  return (
    <>
      <button onClick={mint} disabled={loading}>{loading ? "Generando el NFT..." : "Generar NFT"}</button>
      {response && (
        <div>
          Se ha generado el NFT correctamnete, 
          <a href={`https://sepolia.etherscan.io/tx/${response?.transactionHash}`} target="_blank">Ver en etherscan</a>
        </div>
      )}
    </>
  );
}

export default App;
