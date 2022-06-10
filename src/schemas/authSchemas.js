import Joi from "joi";

const reg = /^(https:\/\/\/www\.|http:\/\/www\.|www\.|https:\/\/|http:\/\/)/;
const validateUrl = Joi.object({
	url: Joi.string().uri().regex(reg).required()
});

const register = Joi.object({
	name: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(4).required(),
	confirmPassword: Joi.ref('password')
});

const login = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(4).required()
});

export default {validateUrl, register, login};