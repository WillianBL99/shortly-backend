import connection from "../database/db.js";

export async function getUserUrl(userId, url) {
  await connection.query(`
      SELECT * FROM urls
      WHERE user_id=$1 AND url=$2
  `,[userId, url]);
}

export async function getUrlById(id) {
  const url = await connection.query(`
    SELECT id, short_url as "shortUrl", url
    FROM urls
    WHERE id=$1
  `,[id]);

  return url.rows[0];
}

export async function getCompletUrlById(id) {
  const url = await connection.query(`
    SELECT * FROM urls
    WHERE id=$1
  `,[id]);

  return url.rows[0];
}

export async function getUrlByShortUrl(shortUrl) {
  const url = await connection.query(`
    SELECT * FROM urls
    WHERE short_url=$1
  `,[shortUrl]);

  return url.rows[0];
}

export async function createShortUrl(url, shortUrl, userId) {
  await connection.query(`
    INSERT INTO urls (url, short_url, user_id)
    VALUES ($1, $2, $3)
  `,[url, shortUrl, userId]);
}

export async function increaseUrlViews(currentViews, id) {
  await connection.query(`
    UPDATE urls
    SET views=$1
    WHERE id=$2
  `,[currentViews + 1, url.id]);
}

export async function deleteUrl(id) {
  await connection.query(`
    DELETE FROM urls
    WHERE id=$1
  `,[id]);
}