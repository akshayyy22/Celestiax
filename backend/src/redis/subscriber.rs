use tokio::sync::broadcast;
use redis::Client;
use redis::RedisResult;
use redis::aio::Connection;
use futures_util::StreamExt;

pub async fn subscribe_to_channel(channel: &str, tx: broadcast::Sender<String>) -> RedisResult<()> {
    // Create a Redis client
    let client = Client::open("redis://127.0.0.1")?;

    // Create a standard async connection (deprecated but necessary for PubSub)
    #[allow(deprecated)]
    let mut con: Connection = client.get_async_connection().await?;

    // Convert the connection into a PubSub connection
    let mut pubsub = con.into_pubsub();

    // Subscribe to the provided channel
    pubsub.subscribe(channel).await?;
    println!("Subscribed to Redis channel: {}", channel);

    // Spawn a task to process messages
    tokio::spawn(async move {
        while let Some(msg) = pubsub.on_message().next().await {
            if let Ok(payload) = msg.get_payload::<String>() {
                if tx.send(payload.clone()).is_err() {
                    break; // Exit loop if no receivers are available
                }
                println!("Message sent to subscribers: {}", payload);
            }
        }
    });

    Ok(())
}