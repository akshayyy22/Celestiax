import {create} from "zustand";

interface CryptoStore {
  selectedCrypto: string;
  cryptoTime: string;
  setSelectedCrypto: (crypto: string) => void;
  setCryptoTime: (time: string) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  selectedCrypto: "", 
  cryptoTime: "",

  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  setCryptoTime: (time) => set({ cryptoTime: time }),

}));


