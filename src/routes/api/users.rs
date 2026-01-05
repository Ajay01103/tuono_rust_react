use tuono_lib::Request;
use tuono_lib::axum::Json;
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use with_tailwind::db;

#[derive(Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
}

#[derive(Serialize, Deserialize)]
pub struct UsersResponse {
    users: Vec<User>,
}

/// GET /api/users - Get all users
#[tuono_lib::api(GET)]
pub async fn users(_req: Request) -> Json<UsersResponse> {
    let pool = db::get_pool().await;
    
    let users = sqlx::query_as::<_, User>("SELECT id, name, email FROM users ORDER BY id")
        .fetch_all(pool)
        .await
        .unwrap_or_else(|e| {
            eprintln!("Database error: {}", e);
            vec![]
        });

    Json(UsersResponse { users })
}

#[derive(Deserialize)]
pub struct CreateUserRequest {
    name: String,
    email: String,
}

#[derive(Serialize, Deserialize)]
pub struct CreateUserResponse {
    success: bool,
    user: Option<User>,
    message: String,
}

/// POST /api/users - Create a new user
#[tuono_lib::api(POST)]
pub async fn users_post(req: Request) -> Json<CreateUserResponse> {
    let pool = db::get_pool().await;
    
    let payload: CreateUserRequest = match req.body() {
        Ok(p) => p,
        Err(e) => {
            eprintln!("JSON parse error: {:?}", e);
            return Json(CreateUserResponse {
                success: false,
                user: None,
                message: "Invalid JSON payload".to_string(),
            });
        }
    };

    match sqlx::query_as::<_, User>(
        "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id, name, email"
    )
    .bind(&payload.name)
    .bind(&payload.email)
    .fetch_one(pool)
    .await
    {
        Ok(user) => Json(CreateUserResponse {
            success: true,
            user: Some(user),
            message: "User created successfully".to_string(),
        }),
        Err(e) => {
            eprintln!("Database error: {}", e);
            Json(CreateUserResponse {
                success: false,
                user: None,
                message: format!("Failed to create user: {}", e),
            })
        }
    }
}
