export default function bodyValidation(req, res, next, schema) {
	const { error } = schema.validate(req.body, { abortEarly: false });

	if (error) {
		return res.status(422).send({
			message: 'Bad body request',
			error: error.details.map( detail => detail.message)
		});
	}

	next();
}