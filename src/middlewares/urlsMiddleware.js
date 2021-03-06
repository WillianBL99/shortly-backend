import Joi from "joi";
import { getCompletUrlById } from "../repositories/urlsRepository.js";
import messageError from "../utils/messageError.js";

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