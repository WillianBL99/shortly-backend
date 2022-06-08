import Joi from "joi";

export async function urlsMiddleware(req, res, next){
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