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

export type BitcoinApiResponse = BitcoinTransaction[];