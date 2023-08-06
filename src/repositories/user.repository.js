import { connection } from "../database/db.js";

export async function getUserRepository (email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function createUserRepository (name, email, password) {
  return connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
}


