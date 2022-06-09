import { nanoid } from 'nanoid';
import connection from '../database/db.js';

export async function urlShorten(req, res){
    try {
        const {url} = req.body;
        const shortUrl = nanoid(15);

        await connection.query(`
            INSERT INTO urls (url, short_url)
            VALUES ($1, $2)
        `,[url, shortUrl]);

        res.status(201).send({shortUrl});
        
    } catch (e) {
        console.log('Error creating short URL: ', e);
        return res.status(500).send(
          { error: 'Internal server error creating short URL' }
        );
    }
}

export async function getUrl(req, res){
    try {
        const {id} = req.params;

        const url = await connection.query(`
            SELECT id, short_url as "shortUrl", url
            FROM urls
            WHERE id=$1
        `,[id]);

        if(!url.rows[0]){
            return res.sendStatus(404);
        }

        res.status(200).send(url.rows[0]);
        
    } catch (e) {
        console.log('Error getting URL: ', e);
        return res.status(500).send(
          { error: 'Internal server error getting URL' }
        );
    }
}

export async function openUrl(req, res){
    try {
        const {shortUrl} = req.params;

        const urlQuery = await connection.query(`
            SELECT * FROM urls
            WHERE short_url=$1
        `,[shortUrl]);
        
        const url = urlQuery.rows[0];

        if(!url){
            return res.sendStatus(404);
        }

        await connection.query(`
            UPDATE urls
            SET views=$1
            WHERE id=$2
        `,[url.views + 1, url.id]);

        res.redirect(url.url);
        
    } catch (e) {
        console.log('Error on open URL: ', e);
        return res.status(500).send(
          { error: 'Internal server on open URL' }
        );
    }
}