import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';
import { createSession, createUser } from '../repositories/authRepository.js';
import messageError from '../utils/messageError.js';

export async function register(req, res) {
  try {
    const { name, email, password} = req.body;
    const jump = 10;
    const bcryptPassword = bcrypt.hashSync(password, jump);

    await createUser(name, email, bcryptPassword)

    res.sendStatus(201);

  } catch (e) {
    return messageError('Error on register', e, res)
  }
}

export async function login(req, res) {
  try {
    const {userId, user} = res.locals;
    const token = uuid();    

    await createSession(userId, token);

    res.status(200).send({...user, token});

  } catch (e) {
    return messageError('Error on login', e, res);
  }
}