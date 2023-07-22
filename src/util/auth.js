require('dotenv').config({path:'./env/development.env'})
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const bearerHeader = req.header('authorization');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, secretKey, (err,decoded) => {
      if (err) {
        res.status(403).json({ result: 'Invalid token' });
      } else {
        const userId = decoded?.user.userId;
        res.locals.userId = userId;
        next();
      }
    });
  } else {
    res.status(403).json({
      message: 'Token is not provided',
    });
  }
};

const generateToken = (user) => {
  const payload = { user }; 
  return jwt.sign(payload, secretKey); 
};

module.exports={ verifyToken, generateToken };