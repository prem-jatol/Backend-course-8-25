const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  // const headerToken = req.header("Authorization");
  // Bearer ijdfoijpoiwejfp2839u49234098dsiufiopsjfsdjfoids...
  // const token = headerToken?.replace("Bearer ", "");
  const token = req?.cookies?.token; // read cookie
  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
