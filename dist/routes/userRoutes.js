"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const UserRouter = (0, express_1.Router)();
UserRouter.post('/logout', userController_1.logoutUser);
UserRouter.post('/login', userController_1.loginUser);
UserRouter.post('/', userController_1.registerUser);
UserRouter.use(authMiddleware_1.protect);
UserRouter.get('/profile', userController_1.getUserProfile);
UserRouter.put('/profile', userController_1.updateUserProfile);
UserRouter.use(authMiddleware_1.protect, authMiddleware_1.admin);
UserRouter.get('/', userController_1.getUsers);
UserRouter.use(authMiddleware_1.protect, authMiddleware_1.admin);
UserRouter.delete('/:id', userController_1.deleteUser);
UserRouter.get('/:id', userController_1.getUserById);
UserRouter.put('/:id', userController_1.updateUser);
exports.default = UserRouter;
