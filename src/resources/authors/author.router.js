const router = require('express').Router({ mergeParams: true });
const { Author, toResponse } = require('./author.db.model');
const authorService = require('./author.service');

router.route('/').get(async (req, res) => {
  try {
    const { authorId } = req.params;
    const authors = await authorService.getAll(authorId);
    res.json(authors.map(toResponse));
  } catch (error) {
    res.status(404).send('Could not find authors');
  }
});

router.route('/:authorId').get(async (req, res) => {
  try {
    const author = await authorService.get(req.params.authorId);
    res.json(toResponse(author));
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

router.route('/').post(async (req, res) => {
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

router.route('/:authorId').put(async (req, res) => {
  try {
    await authorService.put(req.params.authorId, req.body);
    const newAuthor = await authorService.get(req.params.authorId);
    res.json(toResponse(newAuthor));
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

router.route('/:authorId').delete(async (req, res) => {
  try {
    await authorService.del(req.params.authorId);
    res.status(204).send(`AuthorId=${req.params.authorId} has been deleted`);
  } catch (error) {
    res.status(404).send(`AuthorId=${req.params.authorId} not found`);
  }
});

module.exports = router;
