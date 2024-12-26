import { Bitcoin } from "lucide-react";
import { AlgorandIcon , XRP , Tron , Polygon , Litecoin ,  BitcoinCash , Dash , Doge , BNBSmartChain,Avalanche,Solana } from "./AlgorandIcon";
import EthereumIcon from "./EthereumIcon";


export const cryptoIcons = {
  bitcoin: Bitcoin,
  ethereum: EthereumIcon,
  algorand: AlgorandIcon,
  tron: Tron,
  xrp: XRP,
  litecoin: Litecoin,
  bitcoincash: BitcoinCash,
  dash: Dash,
  doge: Doge,
  bnbsmartchain: BNBSmartChain,
  polygon: Polygon,
  // arbitrum:,
  // optimism:,
  // base:,
  avalanche: Avalanche,
  solana: Solana,
} as const;