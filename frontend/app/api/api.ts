import axios from 'axios';
import { BitcoinApiResponse ,  EthereumApiResponse , AlgorandApiResponse ,   BitcoinApiResponseSearch, 
  EthereumApiResponseSearch } from '../types/types';

const BASE_URL = 'http://127.0.0.1:8080/api';

export const fetchBitcoinTransactions = async (): Promise<BitcoinApiResponse> => {
  try {
    const response = await axios.get<BitcoinApiResponse>(`${BASE_URL}/bitcoin`);
    return response.data; // No need to access 'bitcoin.transactions'
  } catch (error) {
    console.error('Error fetching Bitcoin transactions:', error);
    throw error;
  }
} ;


export const fetchEthereumTransactions = async (): Promise<EthereumApiResponse> => {
    try {
      const response = await axios.get<EthereumApiResponse>(`${BASE_URL}/ethereum`);
      return response.data; // No need to access 'bitcoin.transactions'
    } catch (error) {
      console.error('Error fetching Ethereum transactions:', error);
      throw error;
    }
  };


  export const fetchAlgorandTransactions = async (): Promise<AlgorandApiResponse> => {
    try {
      const response = await axios.get<AlgorandApiResponse>(`${BASE_URL}/algorand`);
      return response.data; // No need to access 'bitcoin.transactions'
    } catch (error) {
      console.error('Error fetching Ethereum transactions:', error);
      throw error;
    }
  };




export const fetchWalletTransactions = async (
  blockchain: 'bitcoin' | 'ethereum' | 'algorand',
  address: string
): Promise<EthereumApiResponseSearch | BitcoinApiResponseSearch > => {
  try {
    const response = await axios.get<BitcoinApiResponseSearch | EthereumApiResponseSearch >(
      `${BASE_URL}/transaction/${blockchain}/${address}`
    );

    // Validate if the response contains the expected structure
    if (!response.data?.data?.items) {
      throw new Error(`Unexpected API response structure for ${blockchain}`);
    }

    return response.data;
  } catch (error) {
    console.error(
      `Error fetching transactions for blockchain: ${blockchain}, address: ${address}`,
      error
    );
    throw error;
  }
};