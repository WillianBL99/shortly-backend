import connection from '../database/db.js';
import Joi from 'joi';

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