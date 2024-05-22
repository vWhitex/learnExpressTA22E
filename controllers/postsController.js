import {Router} from 'express';
import paginate from '../pagination.js';
import db from '../models/index.js';

const router = Router();

router.get('/', async (req, res) => {
  let [posts, pagination] = await paginate(db.Post, req.query.page, 20);
  res.render('posts/index.njk', {posts, pagination});
});

router.get('/create', async (req, res) => {
  res.render('posts/create.njk');
});

router.post('/create', async (req, res) => {
  await db.Post.create({
    title: req.body.title,
    body: req.body.body,
  });
  res.redirect('/posts');
});

router.get('/:id', async (req, res) => {
  let post = await db.Post.findByPk(req.params.id);
  res.render('posts/view.njk', {post});
});

router.get('/:id/edit', async (req, res) => {
  let post = await db.Post.findByPk(req.params.id);
  res.render('posts/edit.njk', {post});
});

router.post('/:id/edit', async (req, res) => {
  let post = await db.Post.findByPk(req.params.id);
  await post.update({
    title: req.body.title,
    body: req.body.body,
  });
  res.redirect(`/posts`);
});

router.post('/:id/delete', async (req, res) => {
  let post = await db.Post.findByPk(req.params.id);
  await post.destroy();
  res.redirect('/posts');
});


export default router;

