import Joi from "joi";

const reg = /^(https:\/\/\/www\.|http:\/\/www\.|www\.|https:\/\/|http:\/\/)/;
const validateUrl = Joi.object({
    url: Joi.string().uri().regex(reg).required()
});

export default {validateUrl};