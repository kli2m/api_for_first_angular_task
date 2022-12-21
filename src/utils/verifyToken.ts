import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../common/config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const { JWT_SECRET_KEY } = config;

  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token || !JWT_SECRET_KEY) {
      throw new Error('Token or secret key are wrong');
    }

    const isVerifyToken = jwt.verify(token, JWT_SECRET_KEY);
    if (isVerifyToken) return next();
    else throw new Error('Token or secret key are wrong');
  } catch (error) {
    res.status(401).send('Unauthorized user!');
  }
};

export default verifyToken;
