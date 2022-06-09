import { nanoid } from 'nanoid';
import { createShortUrl, getUrlById, getUrlByShortUrl, getUserUrl, increaseUrlViews } from '../repositories/urlsRepository.js';
import messageError from '../utils/messageError.js'

export async function urlShorten(req, res){
	try {
		const {url} = req.body;
		const {userId} = res.locals;
		const shortUrl = nanoid(8);

		const urlQuery = await getUserUrl(userId, url);
		if(urlQuery){
			return res.status(201).send(
				{shortUrl: urlQuery.short_url}
			);
		}

		await createShortUrl(url, shortUrl, userId);

		res.status(201).send({shortUrl});
			
	} catch (e) {
		return messageError('Error creating short URL', e, res);
	}
}

export async function getUrl(req, res){
	try {
		const {id} = req.params;
		const url = await getUrlById(id);
		if(!url){
			return res.sendStatus(404);
		}

		res.status(200).send(url);
			
	} catch (e) {
		return messageError('Error getting URL', e, res);
	}
}

export async function openUrl(req, res){
	try {
		const {shortUrl} = req.params;

		const url = await getUrlByShortUrl(shortUrl);
		if(!url){
			return res.sendStatus(404);
		}

		await increaseUrlViews(url.views, url.id);

		res.redirect(url.url);
			
	} catch (e) {
		return messageError('Error on open URL', e, res);
	}
}

export async function deleteUrl(req, res){
	try {
		const {id} = req.params;

		await deleteUrl(id);

		res.sendStatus(204);
			
	} catch (e) {
		return messageError('Error on deleteUrl', e, res);
	}
}