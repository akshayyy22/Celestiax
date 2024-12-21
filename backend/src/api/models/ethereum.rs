use serde::{Deserialize, Serialize};


#[derive(Deserialize)]
pub struct EthereumQuery {

    pub network: Option<String>, // Default to "bitcoin"
    pub limit: Option<usize>,
    pub offset: Option<usize>,
    // pub from: Option<String>,    // Optional
    // pub till: Option<String>,    // Optional
}


#[derive(Debug, Serialize, Deserialize)]
pub struct EthereumResponse {
    pub ethereum: EthereumData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EthereumData {
    pub transactions: Vec<EthereumTransaction>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EthereumTransaction {
    pub block: Block,
    pub address: Option<Address>,
    pub hash: String,
    pub gas_value: Option<f64>,
    pub gas_value_usd: Option<f64>,
    pub creates: Option<CreatedContract>,
    pub currency: Option<Currency>,
    pub error: Option<String>,
    pub fee_payer: String,
    pub gas: Option<String>,
    pub gas_currency: String,
    pub gas_price: u64,
    pub nonce: Option<u64>,
    pub success: Option<bool>,
    pub to: Option<ToAddress>,
    pub tx_type: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Block {
    pub timestamp: BlockTimestamp,
    pub height: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BlockTimestamp {
    pub time: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Address {
    pub address: String,
    pub annotation: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatedContract {
    pub address: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Currency {
    pub name: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct GasCurrency {
    pub name: Option<String>,
    pub symbol: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ToAddress {
    pub address: Option<String>,
}
