import connection from '../database/db.js';

export default async function autenticationMiddleware (req, res, next) {
  try {
    const autorisation = req.headers.authorization;
    const token = autorisation?.split(' ')[1];
    
    if(!autorisation?.includes('Bearer ') || !(token?.replaceAll('-','')?.length === 32)) {
      return res.status(401).send(
        {error: 'Token não informado ou inválido'}
      )
    }

    const session = await connection.query(`
      SELECT * FROM sessions
      WHERE token=$1 AND is_active=true
    `,[token]);
    
    if(!session.rows[0]){
      return res.status(401).send(
        {error: 'Token inválido'}
      )
    }

    res.locals.userId = session.rows[0].user_id;

    return next();

  } catch (e) {
    console.log('Error on autentication: ', e);
    return res.status(500).send(
      { error: 'Internal server error on autentication'}
    );
  }
}