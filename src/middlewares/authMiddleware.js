import connection from '../database/db.js';
import Joi from 'joi';
import bcrypt from 'bcrypt';

export async function registerMiddleware(req, res, next){
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

    const user = await connection.query(`
      SELECT * FROM users WHERE email=$1
    `, [email]);

    if(user.rows[0]){
      return res.status(422).send({
        message: 'User already exists'
      });
    }

    next();

  } catch (e) {
    console.log('Error on register: ', e);
    return res.status(500).send(
      { error: 'Internal server error on register' }
    );
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

    const userQuery = await connection.query(`
      SELECT * FROM users 
      WHERE email=$1
    `, [email]);

    const user = userQuery.rows[0];

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
    delete user.password;
    delete user.id;


    await connection.query(`
      UPDATE sessions
      SET is_active=false
      WHERE user_id=$1
    `,[user_id]);

    res.locals.user_id = user_id;
    res.locals.user = user;

    next();

  } catch (e) {
    console.log('Error on register: ', e);
    return res.status(500).send(
      { error: 'Internal server error on register' }
    );
  }
}