import { connection } from "../database/db.js";

export async function getUserRepository(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function createUserRepository(name, email, password) {
  return connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password]
  );
}

export async function getUserDataByIdRepository(id) {
  const query = `
    SELECT u.id, u.name,
    COALESCE(SUM(url."visitCount"), 0) AS "visitCount",
    array_agg(json_build_object('id', url.id, 'url', url.url, 'shortUrl', url."shortUrl", 'visitCount', url."visitCount")) AS "shortenedUrls"
      FROM users u
      LEFT JOIN urls url ON u.id = url."userId"
      WHERE u.id = $1
      GROUP BY u.id, u.name
    `;

  return connection.query(query, [id]);
}
