import jwt from 'jsonwebtoken';

const jwtAuthWithNext = (req, res, next) => {
  // Get token from Authorization header
  const full_token = req.headers['authorization'];
  
  if (!full_token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  // Extract token from "Bearer <token>"
  const ary = full_token.split(" ");
  
  if (ary.length !== 2) {
    return res.status(401).json({ status: false, message: 'Invalid token format' });
  }

  const actualToken = ary[1];

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || process.env.SEC_KEY);
    
    // Attach decoded user data to request
    // decoded should contain: { id, email, userType, ... }
    req.user = decoded;
    
    // Continue to next middleware/controller
    next();
  } catch (err) {
    console.error('[JWT Verification Error]:', err.message);
    return res.status(401).json({ status: false, message: 'Unauthorized User' });
  }
};

export default jwtAuthWithNext;