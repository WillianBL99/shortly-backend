import connection from '../database/db.js';
import bcrypt from 'bcrypt';

export async function register(req, res) {
  try {
    const { name, email, password} = req.body;

    const jump = 10;
    const bcryptPassword = bcrypt.hashSync(password, jump);

    await connection.query(
      `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
      `,
      [name, email, bcryptPassword]
    );

    res.sendStatus(201);

  } catch (e) {
    console.log('Error on register: ', e);
    return res.status(500).send(
      { error: 'Internal server error on register' }
    );
  }
}