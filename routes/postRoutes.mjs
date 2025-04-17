import express from 'express';
import {getAllPost, postPost, getPostById, patchPostById, deletePostById,getUserPostsByUserId} from '../controllers/postControllers.mjs'; //just for the sake of different import export styling

const router = express.Router();

// @desc: Get All Posts
// @path: /api/post
// @access: Public
router
  .route('/')
  .get(getAllPost)
  .post(postPost); //yea naming sucks

// @desc: Get One Post
// @path: /api/post/:id
// @access: Public
router
  .route('/:id')
  .get(getPostById)
  .patch(patchPostById)
  .delete(deletePostById);

router.get('/userPost/:userId', getUserPostsByUserId); //2 different ways to fetch user posts from route parametr
router.get('/userPost/', getUserPostsByUserId); // from query parametr

export default router;
