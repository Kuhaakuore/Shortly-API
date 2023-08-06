import { connection } from "../database/db.js";

export async function createUrlRepository(userId, url, shortUrl) {
  return connection.query(
    `INSERT INTO urls ("userId", url, "shortUrl") VALUES ($1, $2, $3)`,
    [userId, url, shortUrl]
  );
}

export async function findUrlByShortUrlRepository(shortUrl) {
  return connection.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [
    shortUrl,
  ]);
}

export async function findUrlByIdRepository(id) {
  return connection.query(`SELECT id, "shortUrl", url FROM urls WHERE id = $1`, [id]);
}
