import {ed25519} from "@noble/curves/ed25519";
import {useWallet} from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export function SignMessage(){
  const {publicKey, signMessage} = useWallet();

  async function onClick(){
    if(!publicKey) throw new Error("wallet not connected");
    if(!signMessage) throw new Error("wallet does not support message signing");

    const message = (document.getElementById("message") as HTMLInputElement).value;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert(`Success\nMessage signature: ${bs58.encode(signature)}`);
    };

  return(
    <div>
      <h4>Sign Message</h4>
      <input
  id="message"
  type="text"
  placeholder="Message"
  style={{
    padding: '10px 15px',
    border: '2px solid #ccc',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }}
/>
<button onClick={onClick}>Sign Message</button>
    </div>
  )
}