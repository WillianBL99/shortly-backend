import connection from "../database/db.js";

export async function getUser(req, res){
    try {
        const {id} = req.params;
        const userQuery = await connection.query(`
            SELECT u.id, u.name, COALESCE(SUM(ul.views),0) AS "visitCout"
            FROM urls ul
            RIGHT JOIN users u ON u.id = ul.user_id
            WHERE u.id=$1
            GROUP BY ul.user_id, u.id
        `,[id]);

        const user = userQuery.rows[0];

        if(!user){
            return res.sendStatus(404);
        }

        const urlsQuery = await connection.query(`
            SELECT id, short_url AS "shortUrl", url, views AS "visitCount"
            FROM urls
            WHERE user_id=$1
        `,[id]);

        const urls = urlsQuery.rows;

        res.status(200).send({...user, shortenedUrls: urls})
        
    } catch (e) {
        console.log('Error getting user: ', e);
        return res.status(500).send(
          { error: 'Internal server getting user' }
        );
    }
}

export async function getRankings(req, res){
    try {
        const rankings = await connection.query(`
            SELECT u.id, u.name, COUNT(ul.id) AS "linksCount", COALESCE(SUM(ul.views),0) AS "visitCount"
            FROM urls ul
            RIGHT JOIN users u ON u.id = ul.user_id
            GROUP BY ul.user_id, u.id
            ORDER BY "visitCount" DESC
            LIMIT 10
        `);

        res.status(200).send(rankings.rows);
        
    } catch (e) {
        console.log('Error getting rankings: ', e);
        return res.status(500).send(
          { error: 'Internal server getting rankings' }
        );
    }
}