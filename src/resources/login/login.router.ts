import routerExpress, { Request, Response } from 'express';
import loginService from './login.service';
import UserType from '../../interfaces/user';

const router = routerExpress.Router({ mergeParams: true });

router.post('/', async (req: Request, res: Response) => {
  const { login, password }: UserType = req.body;
  try {
    const token = await loginService.getToken({ login, password });
    res.json({ token });
  } catch (error: any) {
    res.status(403).send(error.message);
  }
});

export default router;
