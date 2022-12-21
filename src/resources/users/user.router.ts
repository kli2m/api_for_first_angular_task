import routerExpress, { Request, Response } from 'express';
import { toResponse } from './user.db.model';
import userService from './user.service';

const router = routerExpress.Router({ mergeParams: true });

router.route('/').get(async (_: Request, res: Response) => {
  try {
    const users = await userService.getAll();
    if (users) res.json(users.map(toResponse));
    else res.status(404).send('Users is not found');
  } catch (error) {
    res.status(404).send('Could not find users');
  }
});

router.route('/:userId').get(async (req: Request, res: Response) => {
  try {
    const userId = req.params['userId'];
    if (userId) {
      const user = await userService.get(userId);
      if (user) {
        res.json(toResponse(user));
      } else new Error();
    } else res.status(404).send(`UserId=${req.params['userId']} not found`);
  } catch (error) {
    res.status(404).send(`UserId=${req.params['userId']} not found`);
  }
});

router.route('/:userId').put(async (req: Request, res: Response) => {
  try {
    const userId = req.params['userId'];
    if (userId) {
      await userService.put(userId, req.body);
      const newUser = await userService.get(userId);
      if (newUser) {
        res.json(toResponse(newUser));
      } else new Error();
    } else res.status(404).send(`UserId=${req.params['userId']} not found`);
  } catch (error) {
    res.status(404).send(`UserId=${req.params['userId']} not found`);
  }
});

router.route('/:userId').delete(async (req: Request, res: Response) => {
  try {
    const userId = req.params['userId'];
    if (userId) {
      await userService.del(userId);
      res.status(204).send(`UserId=${userId} has been deleted`);
    } else new Error();
  } catch (error) {
    res.status(404).send(`UserId=${req.params['userId']} not found`);
  }
});

export default router;
