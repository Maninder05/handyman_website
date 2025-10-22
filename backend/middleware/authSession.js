import jwt from "jsonwebtoken";
import User from "../models/ModelUser.js";

const JWT_SECRET = process.env.JWT_SECRET || "mysecret";
//const SESSION_TTL_MS = 15 * 60 * 1000; // 15 minutes
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export default async function authSession(req, res, next) {
  try {
    // Accept: Authorization: Bearer <token>  OR cookie named 'token'
    const authHeader = req.headers.authorization || "";
    const tokenFromHeader = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = tokenFromHeader || req.cookies?.token || req.query?.token;

    if (!token) return res.status(401).json({ message: "No token provided" });

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    // verify session token  if it matches
    if (!user.sessionToken || user.sessionToken !== payload.sessionToken) {
      return res.status(401).json({ message: "Session invalid" });
    }

    // check session expiry
    if (!user.sessionExpiresAt || new Date(user.sessionExpiresAt) < new Date()) {
      // clear session
      user.sessionToken = undefined;
      user.sessionExpiresAt = undefined;
      await user.save();
      return res.status(401).json({ message: "Session expired" });
    }

    // slide the session expiry forward (activity)
    user.sessionExpiresAt = new Date(Date.now() + SESSION_TTL_MS);
    await user.save();

    req.user = user;
    next();
  } catch (err) {
    console.error("authSession error:", err);
    return res.status(500).json({ message: "Auth error" });
  }
}
