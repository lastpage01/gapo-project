import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
    if (!token) return res.sendStatus(401);
  
    jwt.verify(token, "bWluZHgud2ViNjE=", (err, user) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
  
      req.user = user;
      next();
    });
  };