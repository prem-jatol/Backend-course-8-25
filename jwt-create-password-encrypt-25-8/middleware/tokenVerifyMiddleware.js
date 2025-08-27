const jwt = require("jsonwebtoken");
const SECRET_KEY = 'this_is_my_secret_key';

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user; // Save user data from token
    next();
  });
}

module.exports = verifyToken;