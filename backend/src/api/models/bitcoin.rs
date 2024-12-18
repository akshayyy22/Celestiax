use serde::{Deserialize, Serialize};


// #[derive(Debug, Deserialize)]
// pub struct BitcoinQuery { // <- Add pub
//     pub network: String,
//     pub limit: Option<u32>,
//     pub offset: Option<u32>,
//     pub from: String,
//     pub till: String,
// }

#[derive(Deserialize)]
pub struct BitcoinQuery {

    pub network: Option<String>, // Default to "bitcoin"
    pub limit: Option<usize>,
    pub offset: Option<usize>,
    // pub from: Option<String>,    // Optional
    // pub till: Option<String>,    // Optional
}



#[derive(Serialize, Deserialize)]
pub struct BitcoinTransaction {
    pub block: Block,
    pub hash: String,
    pub input_value: f64,
    pub input_value_usd: f64,
    pub output_count: u32,
    pub input_count: u32,
    pub index: u32,
    pub fee_value: f64,
    pub fee_value_usd: f64,
    pub fee_value_decimal: f64,
    pub mined_value: f64,
    pub mined_value_decimal: f64,
    pub output_value: f64,
    pub output_value_decimal: f64,
    pub tx_coinbase: bool,
    pub tx_locktime: Option<u32>,
    pub tx_size: u32,
    pub tx_version: u32,
    pub tx_vsize: u32,
    pub tx_weight: u32,
}

#[derive(Serialize, Deserialize)]
pub struct Block {
    pub timestamp: Timestamp,
    pub height: u32,
}

#[derive(Serialize, Deserialize)]
pub struct Timestamp {
    pub time: String,
}
