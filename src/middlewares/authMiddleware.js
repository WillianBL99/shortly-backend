import Joi from 'joi';
import bcrypt from 'bcrypt';
import { getUserByEmail, updateSession } from '../repositories/authRepository.js';
import messageError from '../utils/messageError.js';
import { getUrlsAndUserById } from '../repositories/userRepository.js';

export async function registerMiddleware(req, res, next){
  console.log('entrou')
  const validation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    confirmPassword: Joi.ref('password')
  });

  const { error } = validation.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send(
      error.details.map( detail => detail.message)
    )
  }

  try {
    const {email} = req.body;
    const user = await getUserByEmail(email);
    
    if(user){
      return res.status(422).send({
        message: 'User already exists'
      });
    }

    next();

  } catch (e) {
    return messageError('Error on register', e, res);
  }
}

export async function loginMiddleware(req, res, next){
  const validation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required()
  });

  const { error } = validation.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(422).send(
      error.details.map( detail => detail.message)
    )
  }

  try {
    const {email, password} = req.body;
    const user = await getUserByEmail(email);

    if(!user){
      return res.status(401).send({
        message: 'Email does not exist'
      });
    }

    if(!bcrypt.compareSync(password, user.password)){
      return res.status(401).send({
        message: 'Passwor is icorrect'
      })
    }

    const user_id = user.id;
    await updateSession(user_id);

    delete user.password;
    delete user.id;

    res.locals.userId = user_id;
    res.locals.user = user;

    next();

  } catch (e) {
    return messageError('Error on register' ,e ,res)
  }
}

export async function getUserMiddleware(req, res, next) {
  try {
    const {id} = req.params;

		const user = await getUrlsAndUserById(id);
		if(!user){
			return res.sendStatus(404);
		}	

    res.locals.user = user;
    next();

  } catch (e) {
    return messageError('Error getting user', e, res);
  }
}