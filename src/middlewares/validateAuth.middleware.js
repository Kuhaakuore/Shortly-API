import jwt from "jsonwebtoken";

export default function validateAuth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).send("Invalid token.");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token.");
  }
}
