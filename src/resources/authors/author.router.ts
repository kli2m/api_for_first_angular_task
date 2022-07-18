import routerExpress, { Request, Response } from 'express';
import { Author, toResponse } from './author.db.model';
import authorService from './author.service';

const router = routerExpress.Router({ mergeParams: true });

router.route('/').get(async (_: Request, res: Response) => {
  try {
    const authors = await authorService.getAll();
    if (authors) res.json(authors.map(toResponse));
    else res.status(404).send('Authors is not found');
  } catch (error) {
    res.status(404).send('Could not find authors');
  }
});

router.route('/:authorId').get(async (req: Request, res: Response) => {
  try {
    const author = await authorService.get(req.params.authorId);
    res.json(toResponse(author));
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

router.route('/').post(async (req: Request, res: Response) => {
  try {
    const author = await authorService.create(
      new Author({
        name: req.body.name,
        surName: req.body.surName,
      }),
    );
    res.json(toResponse(author));
  } catch (error) {
    res.status(404).send(`${error}`);
  }
});

router.route('/:authorId').put(async (req: Request, res: Response) => {
  try {
    await authorService.put(req.params.authorId, req.body);
    const newAuthor = await authorService.get(req.params.authorId);
    res.json(toResponse(newAuthor));
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

router.route('/:authorId').delete(async (req: Request, res: Response) => {
  try {
    await authorService.del(req.params.authorId);
    res.status(204).send(`AuthorId=${req.params.authorId} has been deleted`);
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

export default router;
