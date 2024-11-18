const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  const verifyToken = await jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      } else {
        return decoded;
      }
    }
  );

  if (verifyToken) {
    // ? save user into req obj
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Token Expired");
    next(err);
  }
};

module.exports = isAuthenticated;
