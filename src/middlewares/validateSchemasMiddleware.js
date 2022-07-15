export default function validateSchemas(req, res, next, schema) {
	const containsParams = Object.keys( req.params ).length > 0;

	const data = containsParams ? req.params : req.body;
	const { error } = schema.validate(data, { abortEarly: false });

	if (error) {
		return res.status(422).send({
			message: 'Bad paramers or body request',
			error: error.details.map( detail => detail.message)
		});
	}

	next();
}