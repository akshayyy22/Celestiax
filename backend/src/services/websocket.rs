use actix::Actor;
use actix_web::{web, HttpRequest, HttpResponse};
use actix_web_actors::ws;
use tokio::sync::mpsc;

struct WebSocketSession {
    rx: mpsc::Receiver<String>,
}

impl Actor for WebSocketSession {}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for WebSocketSession {
    // Handles incoming WebSocket messages.
}

pub async fn start_websocket(
    req: HttpRequest,
    stream: web::Payload,
    tx: mpsc::Sender<String>,
) -> Result<HttpResponse, actix_web::Error> {
    let (client_tx, client_rx) = mpsc::channel(100);
    let websocket_session = WebSocketSession { rx: client_rx };
    let actor = ws::start(websocket_session, &req, stream)?;

    tokio::spawn(async move {
        if let Err(e) = crate::redis::subscriber::subscribe_to_channel("real-time-channel", tx).await {
            eprintln!("Error subscribing to Redis channel: {}", e);
        }
    });

    Ok(actor)
}
