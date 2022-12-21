import routerExpress, { Request, Response } from 'express';
import userService from '../users/user.service';
import UserType from '../../interfaces/user';
import { User, toResponse } from '../users/user.db.model';

const router = routerExpress.Router({ mergeParams: true });

router.post('/', async (req: Request, res: Response) => {
  try {
    const newUser = new User({
      login: req.body.login,
      password: req.body.password,
    });
    const user: UserType = await userService.create(newUser);
    res.json(toResponse(user));
  } catch (error: any) {
    res.status(404).send(`${error.message}`);
  }
});

export default router;
