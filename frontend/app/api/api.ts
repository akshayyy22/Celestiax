import axios from "axios";
import {
  BitcoinApiResponse,
  EthereumApiResponse,
  AlgorandApiResponse,
  BitcoinApiResponseSearch,
  EthereumApiResponseSearch,
  TronApiResponseSearch,
  LitecoinApiResponseSearch,
  BTCCASHApiResponseSearch,
  DashApiResponseSearch,
  DogeApiResponseSearch,
  BNBSmartChainApiResponseSearch,
  PolygonApiResponseSearch,
  AvalancheApiResponseSearch,
} from "../types/types";

const BASE_URL = "https://celestiax.onrender.com/api";

export const fetchBitcoinTransactions =
  async (): Promise<BitcoinApiResponse> => {
    try {
      const response = await axios.get<BitcoinApiResponse>(
        `${BASE_URL}/bitcoin`
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching Bitcoin transactions:", error);
      throw error;
    }
  };

export const fetchEthereumTransactions =
  async (): Promise<EthereumApiResponse> => {
    try {
      const response = await axios.get<EthereumApiResponse>(
        `${BASE_URL}/ethereum`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const fetchAlgorandTransactions =
  async (): Promise<AlgorandApiResponse> => {
    try {
      const response = await axios.get<AlgorandApiResponse>(
        `${BASE_URL}/algorand`
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching Ethereum transactions:", error);
      throw error;
    }
  };

export const fetchWalletTransactions = async (
  blockchain:
    | "bitcoin"
    | "ethereum"
    | "algorand"
    | "tron"
    | "litecoin"
    | "bitcoin-cash"
    | "dash"
    | "dogecoin"
    | "binance-smart-chain"
    | "polygon"
    | "avalanche",
  address: string
): Promise<
  | EthereumApiResponseSearch
  | BitcoinApiResponseSearch
  | TronApiResponseSearch
  | LitecoinApiResponseSearch
  | BTCCASHApiResponseSearch
  | DashApiResponseSearch
  | DogeApiResponseSearch
  | BNBSmartChainApiResponseSearch
  | PolygonApiResponseSearch
  | AvalancheApiResponseSearch
> => {
  try {
    const response = await axios.get<
      | EthereumApiResponseSearch
      | BitcoinApiResponseSearch
      | TronApiResponseSearch
      | LitecoinApiResponseSearch
      | BTCCASHApiResponseSearch
      | DashApiResponseSearch
      | DogeApiResponseSearch
      | BNBSmartChainApiResponseSearch
      | PolygonApiResponseSearch
      | AvalancheApiResponseSearch
    >(`${BASE_URL}/transaction/${blockchain}/${address}`);

    // Adjusted validation check
    if (!response.data?.Ok?.data?.items) {
      throw new Error(`Unexpected API response structure for ${blockchain}`);
    }

    return response.data; // Return only the relevant data part
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    throw error;
  }
};


