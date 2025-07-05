import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { useEffect, useState } from "react";

export function Airdrop(){
  const wallet = useWallet();
  const [userBalance, setUserBalance] = useState(0)
  const {connection} = useConnection();

  useEffect(() => {
    async function fetchBalance() {
      if (wallet.publicKey) {
        const balance = await connection.getBalance(wallet.publicKey);
        setUserBalance(balance/1000000000);
      }
    }
    fetchBalance();
  }, [connection, wallet.publicKey, userBalance])

  async function sendAirDropToUser(){
    if(wallet.publicKey){
      const amount: number = parseInt((document.getElementById("publicKey") as HTMLInputElement)?.value || "1", 10);
      await connection.requestAirdrop(wallet.publicKey, amount * 100000000);
      alert("Successfull")
    } else{
      alert("Wallet not connected.");
    }
  }

return <div style={{gap:10}}>
  <h4>Airdrop Solana</h4>
    <input
  id="publicKey"
  type="number"
  placeholder="Amount"
  style={{
    padding: '10px 15px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }}
/>

    <button onClick={sendAirDropToUser}>Send Airdrop</button><br />
    SOL balance: {userBalance}
  </div>
} 