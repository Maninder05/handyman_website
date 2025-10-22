import jwt from "jsonwebtoken";
import { getJwtSecret } from "../config/jwt.js";

const jwtAuthWithNext = (req, res, next) => {
  // Get the token from the request header
  const full_token =
    req.headers["authorization"] || req.headers["Authorization"];

  if (!full_token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  // Accept formats like "Bearer <token>" or just the token
  const parts = full_token.split(" ");
  const actualToken = parts.length === 1 ? parts[0] : parts[1];

  if (!actualToken) {
    return res
      .status(401)
      .json({ status: false, message: "Invalid token format" });
  }

  try {
    const secret = getJwtSecret();
    const decoded = jwt.verify(actualToken, secret);

    req.user = decoded;
    next();
  } catch (err) {
    console.error("[JWT Verification Error]:", err.message);
    // Distinguish expired token from invalid signature for clearer client messages
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ status: false, message: "Token expired" });
    }
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};

export default jwtAuthWithNext;
