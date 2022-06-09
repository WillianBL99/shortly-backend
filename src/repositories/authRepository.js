import connection from '../database/db.js';

export async function createUser(name, email, bcryptPassword) {
  await connection.query(
    `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
    `,
    [name, email, bcryptPassword]
  );
}

export async function createSession(userId, token) {
  await connection.query(`
    INSERT INTO sessions (user_id, token)
    VALUES ($1, $2)
`,[userId,token]);
}

export async function getUserByEmail(email) {
  const user = await connection.query(`
    SELECT * FROM users 
    WHERE email=$1
  `, [email]);

  return user.rows[0];
}

export async function updateSession(userId) {
  await connection.query(`
    UPDATE sessions
    SET is_active=false
    WHERE user_id=$1
  `,[userId]);
}