import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8080";

export const fetchBitcoinData = async () => {
  const response = await axios.get(`${API_BASE_URL}/bitcoin`);
  return response.data;
};

export const fetchEthereumData = async () => {
  const response = await axios.get(`${API_BASE_URL}/ethereum`);
  return response.data;
};

