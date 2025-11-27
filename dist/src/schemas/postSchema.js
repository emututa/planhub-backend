"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userIdParamSchema = exports.postIdSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
// Create Post Schema
exports.createPostSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long'),
    description: zod_1.z.string().max(5000, 'Description too long').optional(),
    image_url: zod_1.z.string().url('Invalid image URL').optional()
});
// Update Post Schema
exports.updatePostSchema = zod_1.z.object({
    title: zod_1.z.string().min(3, 'Title must be at least 3 characters').max(200, 'Title too long').optional(),
    description: zod_1.z.string().max(5000, 'Description too long').optional(),
    image_url: zod_1.z.string().url('Invalid image URL').optional()
});
// Post ID Param Schema
exports.postIdSchema = zod_1.z.object({
    id: zod_1.z.string().uuid('Invalid post ID')
});
// User ID Param Schema
exports.userIdParamSchema = zod_1.z.object({
    userId: zod_1.z.string().uuid('Invalid user ID')
});
