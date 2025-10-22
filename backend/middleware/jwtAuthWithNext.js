import jwt from 'jsonwebtoken';

const jwtAuthWithNext = (req, res, next) => {
  // Get the token from the request header
  const full_token = req.headers['authorization'];
  
  // If no token exists, reject the request
  if (!full_token) {
    return res.status(401).json({ status: false, message: 'No token provided' });
  }

  // Split "Bearer token123" into ["Bearer", "token123"]
  const ary = full_token.split(" ");
  
  if (ary.length !== 2) {
    return res.status(401).json({ status: false, message: 'Invalid token format' });
  }

  // Get the actual token 
  const actualToken = ary[1];

  try {
    // Verify the token using your secret key - FIXED: Use JWT_SECRET
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || process.env.SEC_KEY);
    
    // Put the decoded user info into req.user so other functions can use it
    req.user = decoded;
    
    // Continue to the next function
    next();
  } catch (err) {
    // If token is invalid or expired, reject the request
    console.error('[JWT Verification Error]:', err.message);
    return res.status(401).json({ status: false, message: 'Unauthorized User' });
  }
};

export default jwtAuthWithNext;