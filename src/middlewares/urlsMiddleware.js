import Joi from "joi";
import messageError from "../utils/messageError";

export async function createShortUrlMiddleware(req, res, next){
	const validation = Joi.object({
		url: Joi.string().uri().required()
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