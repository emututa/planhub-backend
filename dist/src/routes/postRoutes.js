"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = __importDefault(require("../controllers/postController"));
const auth_1 = require("../middleware/auth");
const validate_1 = require("../middleware/validate");
const postSchema_1 = require("../schemas/postSchema");
const router = (0, express_1.Router)();
// Public routes
router.get('/', postController_1.default.getAllPosts.bind(postController_1.default));
router.get('/:id', (0, validate_1.validateParams)(postSchema_1.postIdSchema), postController_1.default.getPostById.bind(postController_1.default));
router.get('/user/:userId', (0, validate_1.validateParams)(postSchema_1.userIdParamSchema), postController_1.default.getPostsByUserId.bind(postController_1.default));
// Protected routes
router.post('/', auth_1.authenticateToken, (0, validate_1.validateBody)(postSchema_1.createPostSchema), postController_1.default.createPost.bind(postController_1.default));
router.put('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(postSchema_1.postIdSchema), (0, validate_1.validateBody)(postSchema_1.updatePostSchema), postController_1.default.updatePost.bind(postController_1.default));
router.delete('/:id', auth_1.authenticateToken, (0, validate_1.validateParams)(postSchema_1.postIdSchema), postController_1.default.deletePost.bind(postController_1.default));
exports.default = router;
