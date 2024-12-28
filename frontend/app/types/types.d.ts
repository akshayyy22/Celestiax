export type BitcoinTransaction = {
  block: {
    timestamp: {
      time: string;
    };
    height: number;
  };
  input_value: number; // Updated from inputValue
  input_value_usd: number;
  output_count: number; // Updated from outputCount
  input_count: number;
  index: number; // Updated from string to number
  hash: string;
  fee_value: number;
  fee_value_usd: number;
  fee_value_decimal: number; // Updated from feeValueDecimal to fee_value_decimal and type
  mined_value: number; // Updated from minedValue
  mined_value_decimal: number; // Updated from minedValueDecimal
  output_value: number; // Updated from outputValue
  output_value_decimal: number; // Updated from outputValueDecimal
  tx_coinbase: boolean; // Updated from txCoinbase
  tx_locktime: string | null; // Updated from txLocktime to tx_locktime and added null type
  tx_size: number; // Updated from txSize
  tx_version: number; // Updated from txVersion
  tx_vsize: number; // Updated from txVsize
  tx_weight: number; // Updated from txWeight
};

export type EthereumTransaction = {
  block: {
    timestamp: {
      time: string;
    };
    height: number;
  };
  address: {
    address: string;
    annotation?: string; // Optional annotation for the address
  };
  hash: string;
  gas_value: number; // Renamed from gasValue
  gas_value_usd: number; // Renamed from gas_value_usd
  creates: {
    address: string; // Address created by the transaction (if any)
  };
  currency: {
    name: string; // Name of the currency (e.g., "Ether")
    symbol?: string; // Optional symbol of the currency (e.g., "ETH")
  };
  error: string; // Empty if no error occurred
  fee_payer: string; // Renamed from feePayer
  gas: number; // Gas used in the transaction
  gas_currency: {
    name: string;
    symbol?: string;
  };
  gas_price: number; // Renamed from gasPrice
  nonce: number;
  success: boolean;
  to: {
    address: string;
  };
  tx_type: string; // Renamed from txType
};

export type AlgorandTransaction = {
  block: {
    height: number;
    timestamp: {
      time: string;
    };
  };
  currency: {
    tokenType: string; // e.g., "asset"
    tokenId: string; // Unique identifier for the asset
    symbol: string; // Symbol of the asset, if applicable
    name: string; // Name of the asset (e.g., "Vote Coin")
    decimals: number; // Number of decimals for the asset
    address: string; // Address associated with the asset, if applicable
  };
  fee: number; // Transaction fee in Algos
  firstRound: number; // First round of the transaction
  poolerror: string; // Error related to the pool, if any
  note: string; // Optional note field for additional data
  lastRound: number; // Last round of the transaction
  index: number; // Index of the transaction within the block
  hash: string; // Unique hash of the transaction
  group: string; // Group identifier for atomic transactions, if applicable
  genesisId: string; // Identifier for the network (e.g., "mainnet-v1.0")
  genesisHash: string; // Hash of the genesis block for verification
  subtype: string; // Subtype of the transaction (e.g., "send")
  type: string; // Type of transaction (e.g., "axfer" for asset transfer)
  sender: {
    address: string; // Sender's address
    annotation?: string | null; // Optional annotation for the sender's address
  };
};
export type SearchApiResponse<T> = {
  apiVersion: string;
  requestId: string;
  context: string;
  data: {
    limit: number;
    offset: number;
    total: number;
    items: T[];
  };
};

export type SearchBitcoinTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};

export type SearchEthereumTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};

export type SearchTronTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchLitecoinTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchBTCCASHTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchDashTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchDogeTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchBNBSmartChainTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchPolygonTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};
export type SearchAvalancheTransaction = {
  transactionId: string;
  minedInBlockHash: string;
  minedInBlockHeight: number;
  timestamp: number;
  transactionHash: string;
  recipients: {
    address: string;
    amount: string;
  }[];
  senders: {
    address: string;
    amount: string;
  }[];
};

export type EthereumApiResponse = EthereumTransaction[];
export type BitcoinApiResponse = BitcoinTransaction[];
export type AlgorandApiResponse = AlgorandTransaction[];

export type BitcoinApiResponseSearch =
  SearchApiResponse<SearchBitcoinTransaction>;
export type EthereumApiResponseSearch =
  SearchApiResponse<SearchEthereumTransaction>;
export type TronApiResponseSearch = SearchApiResponse<SearchTronTransaction>;
export type LitecoinApiResponseSearch =
  SearchApiResponse<SearchLitecoinTransaction>;
export type BTCCASHApiResponseSearch =
  SearchApiResponse<SearchBTCCASHTransaction>;
export type DashApiResponseSearch = SearchApiResponse<SearchDashTransaction>;
export type DogeApiResponseSearch = SearchApiResponse<SearchDogeTransaction>;
export type BNBSmartChainApiResponseSearch =
  SearchApiResponse<SearchBNBSmartChainTransaction>;
export type PolygonApiResponseSearch =
  SearchApiResponse<SearchPolygonTransaction>;
export type AvalancheApiResponseSearch =
  SearchApiResponse<SearchAvalancheTransaction>;

