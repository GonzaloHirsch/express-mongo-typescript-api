import { Router } from 'express';
import UserController from '../controllers/UserController';
// import { checkJwt } from '../middlewares/checkJwt';
// import { checkRole } from '../middlewares/checkRole';

// Middleware
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// Get all users
router.get('/', [], asyncHandler(UserController.listAll));
// router.get('/', [checkJwt, checkRole(['user', 'admin'])], asyncHandler(UserController.listAll));

// Get one user
router.get('/:id([0-9a-z]{24})', [], asyncHandler(UserController.getOneById));
// router.get('/:id([0-9a-z]{24})', [checkJwt, checkRole(['user', 'admin'])], asyncHandler(UserController.getOneById));

// Create a new user
router.post('/', [], asyncHandler(UserController.newUser));

// Edit one user
router.patch('/:id([0-9a-z]{24})', [], asyncHandler(UserController.editUser));
// router.patch('/:id([0-9a-z]{24})', [checkJwt, checkRole(['admin'])], asyncHandler(UserController.editUser));

// Delete one user
router.delete('/:id([0-9a-z]{24})', [], asyncHandler(UserController.deleteUser));
// router.delete('/:id([0-9a-z]{24})', [checkJwt, checkRole(['admin'])], UserController.deleteUser);

export default router;
