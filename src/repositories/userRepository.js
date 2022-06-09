import connection from "../database/db.js";

export async function getUrlsAndUserById(id) {
	const userAndUrls = await connection.query(`
		SELECT u.id, u.name, COALESCE(SUM(ul.views),0) AS "visitCout"
		FROM urls ul
		RIGHT JOIN users u ON ul.user_id = u.id
		WHERE u.id=$1
		GROUP BY ul.user_id, u.id
	`,[id]);

	return userAndUrls.rows[0];
}

export async function getUrlsOfUser(id) {
	const urlsOfUser = await connection.query(`
		SELECT id, short_url AS "shortUrl", url, views AS "visitCount"
		FROM urls
		WHERE user_id=$1
	`,[id]);

	return urlsOfUser.rows[0];
}

export async function getRankingsOfUsers() {
	const rankings = await connection.query(`
		SELECT u.id, u.name, COUNT(ul.id) AS "linksCount", COALESCE(SUM(ul.views),0) AS "visitCount"
		FROM urls ul
		RIGHT JOIN users u ON u.id = ul.user_id
		GROUP BY ul.user_id, u.id
		ORDER BY "visitCount" DESC
		LIMIT 10
	`);

	return rankings.rows;
}