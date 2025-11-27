"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const userSchema_1 = require("../schemas/userSchema");
const router = (0, express_1.Router)();
// Public routes
router.post('/register', (0, validate_1.validateBody)(userSchema_1.registerUserSchema), userController_1.default.register.bind(userController_1.default));
router.post('/login', (0, validate_1.validateBody)(userSchema_1.loginUserSchema), userController_1.default.login.bind(userController_1.default));
// Protected routes
router.get('/', auth_1.authenticateToken, userController_1.default.getAllUsers.bind(userController_1.default));
router.get('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(userSchema_1.userIdSchema), userController_1.default.getUserById.bind(userController_1.default));
router.put('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(userSchema_1.userIdSchema), (0, validate_1.validateBody)(userSchema_1.updateUserSchema), userController_1.default.updateUser.bind(userController_1.default));
router.delete('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(userSchema_1.userIdSchema), userController_1.default.deleteUser.bind(userController_1.default));
exports.default = router;
