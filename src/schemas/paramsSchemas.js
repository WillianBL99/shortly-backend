import Joi from "joi";

const paramsId = Joi.object({
    id: Joi.number().required()
});

const paramsShortUrl = Joi.object({
    shortUrl: Joi.string().required()
});

export default {paramsId, paramsShortUrl};