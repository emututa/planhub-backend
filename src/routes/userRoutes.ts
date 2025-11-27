import { Router } from 'express';
import userController from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import { validateBody, validateParams } from '../middleware/validate';
import { registerUserSchema, loginUserSchema, updateUserSchema, userIdSchema } from '../schemas/userSchema';

const router = Router();

// Public routes
router.post('/register', validateBody(registerUserSchema), userController.register.bind(userController));
router.post('/login', validateBody(loginUserSchema), userController.login.bind(userController));

// Protected routes
router.get('/', authenticateToken, userController.getAllUsers.bind(userController));
router.get('/:id', authenticateToken, validateParams(userIdSchema), userController.getUserById.bind(userController));
router.put('/:id', authenticateToken, validateParams(userIdSchema), validateBody(updateUserSchema), userController.updateUser.bind(userController));
router.delete('/:id', authenticateToken, validateParams(userIdSchema), userController.deleteUser.bind(userController));

export default router;