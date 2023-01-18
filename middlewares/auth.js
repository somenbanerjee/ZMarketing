const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      if (!token) {
        throw "User is not authorized or token is missing";
      }
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          throw err.message;
        }
        req.user = decoded.user;
        next();
      });
    } else {
      throw "Bearer token missing.";
    }
  } catch (error) {
    res.status(401).json({
      status: "fail",
      message: error,
    });
  }
};

module.exports = auth;
