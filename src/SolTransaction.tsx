import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useState } from "react";

export function SendTransaction() {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  async function sendTokens() {
    try {
      if (!wallet.publicKey) {
        alert("Wallet not connected!");
        return;
      }

      // Validate receiver address
      let toPublicKey;
      try {
        toPublicKey = new PublicKey(to);
      } catch (error) {
        console.log(error);
        alert("Invalid recipient address!");
        return;
      }

      // Validate amount
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Invalid amount!");
        return;
      }

      const lamports = parsedAmount * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: toPublicKey,
          lamports,
        })
      );

      // Send transaction
      const signature = await wallet.sendTransaction(transaction, connection);

      // Wait for confirmation
      await connection.confirmTransaction(signature, "confirmed");

      alert(`✅ Sent ${parsedAmount} SOL to ${to}`);
      setTo("");
      setAmount("");
    } catch (error) {
      console.error(error);
      alert(`Error: ${error || error}`);
    }
  }

  return (
    <div>
      <h4>Send Solana</h4>
      <input
        type="text"
        placeholder="Recipient address"
        value={to}
        style={{
          padding: "10px 15px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount in SOL"
        value={amount}
        style={{
          padding: "10px 15px",
          border: "2px solid #ccc",
          borderRadius: "8px",
          fontSize: "16px",
          outline: "none",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTokens} disabled={!to || !amount}>
        Send
      </button>
    </div>
  );
}
