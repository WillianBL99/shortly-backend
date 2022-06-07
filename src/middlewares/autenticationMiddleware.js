export default function autenticationMiddleware (req, res, next) {
  const autorisation = req.headers.authorization;
  const token = autorisation?.split(' ')[1];
  
  if(!autorisation || !token) {
    return res.status(401).send(
      {error: 'Token não informado ou inválido'}
    )
  }

  res.locals.token = token;
  return next();
}