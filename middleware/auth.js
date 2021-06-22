const jwt = require('jsonwebtoken');

const accessTokenSecret = 'mhpsecret';


const auth = (req, res, next) => {
  // console.log(req.cookies.token);
  const token = req.cookies.token;
  // console.log(req.cookies);

  // Check for token
  if (!token)
    // console.log(req.headers)
    return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    // Verify token
    const decoded = jwt.verify(token, accessTokenSecret);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

module.exports =auth;