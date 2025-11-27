import { Router } from 'express';
import postController from '../controllers/postController';
import { authenticateToken } from '../middleware/auth';
import { validateBody, validateParams } from '../middleware/validate';
import { createPostSchema, updatePostSchema, postIdSchema, userIdParamSchema } from '../schemas/postSchema';

const router = Router();

// Public routes
router.get('/', postController.getAllPosts.bind(postController));
router.get('/:id', validateParams(postIdSchema), postController.getPostById.bind(postController));
router.get('/user/:userId', validateParams(userIdParamSchema), postController.getPostsByUserId.bind(postController));

// Protected routes
router.post('/', authenticateToken, validateBody(createPostSchema), postController.createPost.bind(postController));
router.put('/:id', authenticateToken, validateParams(postIdSchema), validateBody(updatePostSchema), postController.updatePost.bind(postController));
router.delete('/:id', authenticateToken, validateParams(postIdSchema), postController.deletePost.bind(postController));

export default router;