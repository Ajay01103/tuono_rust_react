use tuono_lib::Request;
use tuono_lib::axum::Json;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct HealthCheckResponse {
    status: String,
    message: String,
    timestamp: i64,
}

#[tuono_lib::api(GET)]
pub async fn health_check(_req: Request) -> Json<HealthCheckResponse> {
    Json(HealthCheckResponse {
        status: "healthy".to_string(),
        message: "Service is running".to_string(),
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs() as i64,
    })
}
