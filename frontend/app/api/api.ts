import axios from 'axios';
import { BitcoinApiResponse } from '../types/types';

const BASE_URL = 'http://127.0.0.1:8080/api';

export const fetchBitcoinTransactions = async (): Promise<BitcoinApiResponse> => {
  try {
    const response = await axios.get<BitcoinApiResponse>(`${BASE_URL}/bitcoin`);
    return response.data; // No need to access 'bitcoin.transactions'
  } catch (error) {
    console.error('Error fetching Bitcoin transactions:', error);
    throw error;
  }
};
