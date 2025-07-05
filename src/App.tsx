import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import {Airdrop} from "./Airdrop";
import { SignMessage } from "./Signmessage";
import { SendTransaction } from "./SolTransaction";


function App() {
  // const network = WalletAdapterNetwork.Devnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
    
    <ConnectionProvider endpoint={process.env.RPC ?? "https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: "flex", justifyContent: "space-around", gap:10 }}>
            <WalletMultiButton />
            <WalletDisconnectButton />
          </div>
          <Airdrop />
          <SignMessage />
          <SendTransaction />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;