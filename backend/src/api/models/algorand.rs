use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct AlgorandQuery {
    pub network: Option<String>, // Default to "algorand"
    pub limit: Option<usize>,
    pub offset: Option<usize>,
    // pub date: Option<DateRange>, // Date range for filtering transactions
}

#[derive(Deserialize)]
pub struct DateRange {
    // pub since: Option<String>,
    // pub till: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AlgorandResponse {
    pub algorand: AlgorandData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AlgorandData {
    pub transactions: Vec<AlgorandTransaction>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AlgorandTransaction {
    pub block: Block,
    pub currency: Currency,
    pub fee: f64,
    pub first_round: u64,
    pub pool_error: Option<String>,
    pub note: Option<String>,
    pub last_round: u64,
    pub index: u64,
    pub hash: String,
    pub group: Option<String>,
    pub genesis_id: String,
    pub genesis_hash: String,
    pub subtype: Option<String>,
    pub tx_type: String,
    pub sender: Sender,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Block {
    pub height: u64,
    pub timestamp: BlockTimestamp,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BlockTimestamp {
    pub time: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Currency {
    pub token_type: Option<String>,
    pub token_id: Option<String>,
    pub symbol: Option<String>,
    pub name: Option<String>,
    pub decimals: Option<u64>,
    pub address: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Sender {
    pub address: String,
    pub annotation: Option<String>,
}
