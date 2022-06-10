import Joi from "joi";
import { getCompletUrlById } from "../repositories/urlsRepository.js";
import messageError from "../utils/messageError.js";
import validUrl from 'valid-url';

export async function createShortUrlMiddleware(req, res, next){
	
	const reg = /^(https:\/\/\/www\.|http:\/\/www\.|www\.|https:\/\/|http:\/\/)/;
	const validation = Joi.object({
		url: Joi.string().uri().regex(reg).required()
	});

	const { error } = validation.validate(req.body, { abortEarly: false });

	if (error) {
		return res.status(422).send(
		error.details.map( detail => detail.message)
		)
	}

	next();
}

export async function deleteUrlMeddleWare(req, res, next) {
	try {
		const {id} = req.params;
		const url = await getCompletUrlById(id);
		if(!url){
			return res.sendStatus(404);
		}
	
		if(url.user_id !== res.locals.userId){
			return res.sendStatus(405);
		}

		next();

	} catch (e) {
		return messageError('Error on deleteUrl', e, res);
	}
}