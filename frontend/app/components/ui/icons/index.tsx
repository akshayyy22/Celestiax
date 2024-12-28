import { Bitcoin } from "lucide-react";
import {
  AlgorandIcon,
  XRP,
  Tron,
  Polygon,
  Litecoin,
  BitcoinCash,
  Dash,
  Doge,
  BNBSmartChain,
  Avalanche,
  Solana,
} from "./AlgorandIcon";
import EthereumIcon from "./EthereumIcon";

export const cryptoIcons = {
  bitcoin: Bitcoin,
  ethereum: EthereumIcon,
  algorand: AlgorandIcon,
  tron: Tron,
  xrp: XRP,
  litecoin: Litecoin,
  "bitcoin-cash": BitcoinCash,
  dash: Dash,
  dogecoin: Doge,
  "binance-smart-chain": BNBSmartChain,
  polygon: Polygon,
  avalanche: Avalanche,
  solana: Solana,
} as const;
