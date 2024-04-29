import jwt from 'jsonwebtoken';

const SECRET_KEY = 'NOTESAPI'; // Replace with your actual secret key

export const auth = (req, res, next) => {
  // console.log('🚀 ~ auth ~ req:', req);
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    const tokenWithoutBearer = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenWithoutBearer, SECRET_KEY);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    req.userId = decodedToken.id; // Store user ID in request object for future use
    req.userType = decodedToken.role;
    next(); // Move to the next middleware/route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized User' });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }

    const tokenWithoutBearer = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenWithoutBearer, SECRET_KEY);
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized User' });
    }
    req.userType = decodedToken.role;
    
    if (req.userType !== 'admin') {
      return res
        .status(403)
        .json({ message: 'Permission Denied: Admin access required' });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};
