import { getRankingsOfUsers, getUrlsOfUser } from "../repositories/userRepository.js";
import messageError from "../utils/messageError.js";

export async function getUser(req, res){
	try {
		const {id} = req.params;
		const {user} = res.locals;

		const urlsOfUser = await getUrlsOfUser(id);
		res.status(200).send({...user, shortenedUrls: urlsOfUser})
		
	} catch (e) {
		return messageError('Error getting user', e, res);
	}
}

export async function getRankings(req, res){
	try {
		const rankings = await getRankingsOfUsers();
		res.status(200).send(rankings);
		
	} catch (e) {
		return messageError('Error getting rankings', e, res);
	}
}